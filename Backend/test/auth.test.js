jest.mock("../model/userModel", () => ({
  createUser: jest.fn(),
  existingUser: jest.fn(),
  getAllUser: jest.fn(),
  searchUser: jest.fn(),
  getUserById: jest.fn(),
  deleteUserById: jest.fn(),
  updateById: jest.fn(),
  saveOTP: jest.fn(),
  verifyOTP: jest.fn(),
  resetPassword: jest.fn(),
}));

jest.mock("bcrypt");
jest.mock("jsonwebtoken");

jest.mock("nodemailer", () => ({
  createTransport: jest.fn(() => ({
    sendMail: jest.fn().mockResolvedValue({
      messageId: "test-email-id",
    }),
  })),
}));

const request = require("supertest");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const app = require("../server");
const {
  createUser,
  existingUser,
  saveOTP,
  verifyOTP,
  resetPassword,
} = require("../model/userModel");

afterEach(() => {
  jest.clearAllMocks();
});

describe("POST /api/user/create", () => {
  test("returns 201 when customer registration succeeds", async () => {
    existingUser.mockResolvedValue(undefined);
    bcrypt.hash.mockResolvedValue("hashed-password");

    createUser.mockResolvedValue({
      id: 2,
      fullname: "Test Customer",
      email: "customer@test.com",
      role: "user",
    });

    const response = await request(app)
      .post("/api/user/create")
      .send({
        fullname: "Test Customer",
        email: "customer@test.com",
        password: "123456",
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe(
      "User Created Successfully"
    );
    expect(response.body.user.role).toBe("user");

    expect(createUser).toHaveBeenCalledWith(
      "Test Customer",
      "customer@test.com",
      "hashed-password",
      "user"
    );
  });

  test("returns 400 when a required field is missing", async () => {
    const response = await request(app)
      .post("/api/user/create")
      .send({
        email: "customer@test.com",
        password: "123456",
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe(
      "Fields cannot be empty"
    );
  });

  test("returns 409 when the email is already registered", async () => {
    existingUser.mockResolvedValue({
      id: 2,
      email: "customer@test.com",
    });

    const response = await request(app)
      .post("/api/user/create")
      .send({
        fullname: "Test Customer",
        email: "customer@test.com",
        password: "123456",
      });

    expect(response.statusCode).toBe(409);
    expect(response.body.message).toBe(
      "Email already registered"
    );
  });

  test("returns 500 when registration fails", async () => {
    existingUser.mockRejectedValue(new Error("Database failed"));

    const response = await request(app)
      .post("/api/user/create")
      .send({
        fullname: "Test Customer",
        email: "customer@test.com",
        password: "123456",
      });

    expect(response.statusCode).toBe(500);
    expect(response.body.message).toBe(
      "User Creation Failed"
    );
  });
});

describe("POST /api/user/login", () => {
  test("returns 200, token and safe user after successful login", async () => {
    existingUser.mockResolvedValue({
      id: 2,
      fullname: "Test Customer",
      email: "customer@test.com",
      password: "stored-password",
      role: "user",
    });

    bcrypt.compare.mockResolvedValue(true);
    JWT.sign.mockReturnValue("foodrush-test-token");

    const response = await request(app)
      .post("/api/user/login")
      .send({
        email: "customer@test.com",
        password: "123456",
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Login Successful");
    expect(response.body.token).toBe("foodrush-test-token");
    expect(response.body.user.password).toBeUndefined();
  });

  test("returns 400 when email is missing", async () => {
    const response = await request(app)
      .post("/api/user/login")
      .send({ password: "123456" });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe(
      "Fields cannot be empty"
    );
  });

  test("returns 401 when email is not registered", async () => {
    existingUser.mockResolvedValue(undefined);

    const response = await request(app)
      .post("/api/user/login")
      .send({
        email: "missing@test.com",
        password: "123456",
      });

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe(
      "Email is not registered"
    );
  });

  test("returns 401 when password is incorrect", async () => {
    existingUser.mockResolvedValue({
      id: 2,
      email: "customer@test.com",
      password: "stored-password",
      role: "user",
    });

    bcrypt.compare.mockResolvedValue(false);

    const response = await request(app)
      .post("/api/user/login")
      .send({
        email: "customer@test.com",
        password: "wrong-password",
      });

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Password Incorrect");
  });

  test("returns 500 when login database operation fails", async () => {
    existingUser.mockRejectedValue(new Error("Database failed"));

    const response = await request(app)
      .post("/api/user/login")
      .send({
        email: "customer@test.com",
        password: "123456",
      });

    expect(response.statusCode).toBe(500);
    expect(response.body.message).toBe("Login Failed");
  });
});

describe("FoodRush password reset", () => {
  test("generates an OTP for an existing email", async () => {
    existingUser.mockResolvedValue({
      id: 2,
      email: "customer@test.com",
    });

    saveOTP.mockResolvedValue();

    const response = await request(app)
      .post("/api/user/forgot-password")
      .send({ email: "customer@test.com" });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("OTP generated");
    expect(response.body.testOtp).toBeDefined();
    expect(saveOTP).toHaveBeenCalledTimes(1);
  });

  test("rejects an invalid OTP", async () => {
    verifyOTP.mockResolvedValue(undefined);

    const response = await request(app)
      .post("/api/user/verify-otp")
      .send({
        email: "customer@test.com",
        otp: "111111",
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe(
      "Invalid or expired OTP"
    );
  });

  test("resets password when the OTP is valid", async () => {
    verifyOTP.mockResolvedValue({
      id: 2,
      email: "customer@test.com",
    });

    bcrypt.hash.mockResolvedValue("new-hashed-password");
    resetPassword.mockResolvedValue();

    const response = await request(app)
      .post("/api/user/reset-password")
      .send({
        email: "customer@test.com",
        otp: "123456",
        newPassword: "newpassword123",
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe(
      "Password reset successful"
    );

    expect(resetPassword).toHaveBeenCalledWith(
      "customer@test.com",
      "new-hashed-password"
    );
  });
});