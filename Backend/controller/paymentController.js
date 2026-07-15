const crypto = require("crypto");
const { createPayment, paymentHistory } = require("../model/paymentModel");

const ESEWA_SECRET = "8gBm/:&EnhH.1/q(";
const ESEWA_PRODUCT_CODE = "EPAYTEST";

const payCOD = async (req, res) => {
  try {
    const payment = await createPayment(
      req.user.id,
      req.body.order_id,
      req.body.amount,
      "Cash On Delivery",
      "Pending",
      null
    );

    res.json({ message: "COD Selected", payment });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const payEsewa = async (req, res) => {
  try {
    const { order_id, amount } = req.body;
    const transaction_uuid = `${order_id}-${Date.now()}`;

    const message = `total_amount=${amount},transaction_uuid=${transaction_uuid},product_code=${ESEWA_PRODUCT_CODE}`;
    const signature = crypto.createHmac("sha256", ESEWA_SECRET).update(message).digest("base64");

    const payment = await createPayment(
      req.user.id,
      order_id,
      amount,
      "eSewa",
      "Pending",
      transaction_uuid
    );

    res.json({
      message: "Redirect to eSewa",
      payment,
      esewaConfig: {
        amount,
        tax_amount: 0,
        total_amount: amount,
        transaction_uuid,
        product_code: ESEWA_PRODUCT_CODE,
        product_service_charge: 0,
        product_delivery_charge: 0,
        success_url: "http://localhost:3000/payment-success",
        failure_url: "http://localhost:3000/payment-failure",
        signed_field_names: "total_amount,transaction_uuid,product_code",
        signature,
      },
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const history = async (req, res) => {
  try {
    const payments = await paymentHistory(req.user.id);
    res.json(payments);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

module.exports = { payCOD, payEsewa, history };