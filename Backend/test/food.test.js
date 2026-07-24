jest.mock("../model/foodModel", () => ({
  createFood: jest.fn(),
  getAllFood: jest.fn(),
  searchFood: jest.fn(),
  getFoodById: jest.fn(),
  deleteFoodById: jest.fn(),
  updateFoodById: jest.fn(),
}));

const request = require("supertest");
const app = require("../server");

const {
  getAllFood,
  searchFood,
  getFoodById,
} = require("../model/foodModel");

afterEach(() => {
  jest.clearAllMocks();
});

describe("GET /api/food/getAll", () => {
  test("returns all FoodRush foods", async () => {
    const foods = [
      {
        id: 1,
        foodname: "Chicken Burger",
        price: "350.00",
        category: "Burger",
      },
      {
        id: 2,
        foodname: "Chicken Momo",
        price: "200.00",
        category: "Momo",
      },
    ];

    getAllFood.mockResolvedValue(foods);

    const response = await request(app)
      .get("/api/food/getAll");

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe(
      "Food Fetch Successful"
    );
    expect(response.body.foods).toEqual(foods);
    expect(response.body.foods).toHaveLength(2);
  });

  test("searches foods using the search query", async () => {
    searchFood.mockResolvedValue([
      {
        id: 1,
        foodname: "Chicken Burger",
        category: "Burger",
      },
    ]);

    const response = await request(app)
      .get("/api/food/getAll?search=burger");

    expect(response.statusCode).toBe(200);
    expect(searchFood).toHaveBeenCalledWith("burger");
    expect(response.body.foods).toHaveLength(1);
  });

  test("returns 500 when food retrieval fails", async () => {
    getAllFood.mockRejectedValue(new Error("Database failed"));

    const response = await request(app)
      .get("/api/food/getAll");

    expect(response.statusCode).toBe(500);
    expect(response.body.message).toBe("Fetch Failed");
  });
});

describe("GET /api/food/getById/:id", () => {
  test("returns a food by ID", async () => {
    getFoodById.mockResolvedValue({
      id: 1,
      foodname: "Chicken Burger",
      price: "350.00",
    });

    const response = await request(app)
      .get("/api/food/getById/1");

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Food Found");
    expect(response.body.food.foodname).toBe(
      "Chicken Burger"
    );
    expect(getFoodById).toHaveBeenCalledWith("1");
  });

  test("returns 404 when food does not exist", async () => {
    getFoodById.mockResolvedValue(undefined);

    const response = await request(app)
      .get("/api/food/getById/999");

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe("Food Not Found");
  });
});