jest.mock("../model/cartModel", () => ({
  addCart: jest.fn(),
  getCart: jest.fn(),
  deleteCart: jest.fn(),
  updateQuantity: jest.fn(),
}));

jest.mock("../middleware/verifyToken", () => ({
  verifyToken: (req, res, next) => {
    req.user = {
      id: 2,
      email: "customer@test.com",
      role: "user",
    };
    next();
  },
}));

const request = require("supertest");
const app = require("../server");

const {
  addCart,
  getCart,
  deleteCart,
  updateQuantity,
} = require("../model/cartModel");

afterEach(() => {
  jest.clearAllMocks();
});

describe("FoodRush cart API", () => {
  test("POST /api/cart/add adds food to cart", async () => {
    addCart.mockResolvedValue({
      id: 10,
      user_id: 2,
      food_id: 1,
      quantity: 2,
    });

    const response = await request(app)
      .post("/api/cart/add")
      .send({
        user_id: 2,
        food_id: 1,
        quantity: 2,
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe(
      "Food Added To Cart"
    );
    expect(addCart).toHaveBeenCalledWith(2, 1, 2);
  });

  test("returns 400 when food ID is missing", async () => {
    const response = await request(app)
      .post("/api/cart/add")
      .send({
        user_id: 2,
        quantity: 1,
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("Field Empty");
  });

  test("GET /api/cart/getCart/:id returns cart items", async () => {
    const cart = [
      {
        id: 10,
        foodname: "Chicken Burger",
        price: "350.00",
        quantity: 1,
      },
    ];

    getCart.mockResolvedValue(cart);

    const response = await request(app)
      .get("/api/cart/getCart/2");

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe(
      "Cart Fetched Successfully"
    );
    expect(response.body.cart).toEqual(cart);
  });

  test("PUT /api/cart/update/:id changes quantity", async () => {
    updateQuantity.mockResolvedValue({
      id: 10,
      quantity: 3,
    });

    const response = await request(app)
      .put("/api/cart/update/10")
      .send({ quantity: 3 });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Quantity Updated");
    expect(updateQuantity).toHaveBeenCalledWith("10", 3);
  });

  test("DELETE /api/cart/delete/:id removes cart item", async () => {
    deleteCart.mockResolvedValue();

    const response = await request(app)
      .delete("/api/cart/delete/10");

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe(
      "Cart Item Deleted"
    );
    expect(deleteCart).toHaveBeenCalledWith("10");
  });
});