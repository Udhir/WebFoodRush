jest.mock("../model/orderModel", () => ({
  createOrder: jest.fn(),
  addOrderItem: jest.fn(),
  getAllOrders: jest.fn(),
  getMyOrders: jest.fn(),
  updateStatus: jest.fn(),
  deleteOrderById: jest.fn(),
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
  createOrder,
  addOrderItem,
  getMyOrders,
} = require("../model/orderModel");

afterEach(() => {
  jest.clearAllMocks();
});

describe("FoodRush order API", () => {
  test("POST /api/order/create places an order", async () => {
    createOrder.mockResolvedValue({
      id: 20,
      user_id: 2,
      total_price: 600,
      payment_method: "cash_on_delivery",
    });

    addOrderItem.mockResolvedValue({
      id: 30,
      order_id: 20,
    });

    const response = await request(app)
      .post("/api/order/create")
      .send({
        user_id: 2,
        total_price: 600,
        payment_method: "cash_on_delivery",
        items: [
          {
            food_id: 1,
            quantity: 1,
            price: 350,
          },
          {
            food_id: 3,
            quantity: 1,
            price: 250,
          },
        ],
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe(
      "Order Placed Successfully"
    );
    expect(addOrderItem).toHaveBeenCalledTimes(2);
  });

  test("returns 400 when required order data is missing", async () => {
    const response = await request(app)
      .post("/api/order/create")
      .send({
        user_id: 2,
        items: [],
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("Field Empty");
  });

  test("GET /api/order/myOrders/:id returns customer orders", async () => {
    const orders = [
      {
        id: 20,
        user_id: 2,
        total_price: "600.00",
        status: "Delivered",
      },
    ];

    getMyOrders.mockResolvedValue(orders);

    const response = await request(app)
      .get("/api/order/myOrders/2");

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("My Orders");
    expect(response.body.orders).toEqual(orders);
  });

  test("returns 500 when order creation fails", async () => {
    createOrder.mockRejectedValue(new Error("Database failed"));

    const response = await request(app)
      .post("/api/order/create")
      .send({
        user_id: 2,
        total_price: 600,
        payment_method: "cash_on_delivery",
        items: [],
      });

    expect(response.statusCode).toBe(500);
    expect(response.body.message).toBe("Order Failed");
  });
});