const { createPayment } = require("../model/paymentModel");
const crypto = require("crypto");
const pool = require("../database/db");

const payEsewa = async (req, res) => {
  try {
    const { order_id, amount } = req.body;
    
    const cleanAmount = amount.toString();
    const transaction_uuid = `${order_id}-${Date.now()}`;

    const ESEWA_SECRET = "8gBm/:&EnhH.1/q";
    const ESEWA_PRODUCT_CODE = "EPAYTEST";

    // EXACT format required by eSewa (no spaces)
    const message = `total_amount=${cleanAmount},transaction_uuid=${transaction_uuid},product_code=${ESEWA_PRODUCT_CODE}`;
    
    const signature = crypto.createHmac("sha256", ESEWA_SECRET).update(message).digest("base64");

    const payment = await createPayment(
      req.user.id,
      order_id,
      cleanAmount,
      "eSewa",
      "Pending",
      transaction_uuid
    );

    res.json({
      message: "Redirect to eSewa",
      payment,
      esewaConfig: {
        amount: cleanAmount,
        tax_amount: "0",
        total_amount: cleanAmount,
        transaction_uuid: transaction_uuid,
        product_code: ESEWA_PRODUCT_CODE,
        product_service_charge: "0",
        product_delivery_charge: "0",
        success_url: "http://localhost:5173/payment-success",
        failure_url: "http://localhost:5173/payment-failure",
        signed_field_names: "total_amount,transaction_uuid,product_code",
        signature: signature,
      },
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const payCOD = async (req, res) => {
  try {
    const { order_id, amount } = req.body;

    const payment = await createPayment(
      req.user.id,
      order_id,
      amount,
      "COD",
      "Pending",
      `COD-${order_id}-${Date.now()}`
    );

    res.status(200).json({ message: "COD Payment Recorded", payment });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const payKhalti = async (req, res) => {
  try {
    const { order_id, amount } = req.body;
    
    const transaction_uuid = `KHALTI-${order_id}-${Date.now()}`;

    const payment = await createPayment(
      req.user.id,
      order_id,
      amount,
      "Khalti",
      "Pending",
      transaction_uuid
    );

    res.json({
      message: "Redirect to Khalti",
      payment,
      khaltiConfig: {
        total_amount: amount,
        transaction_uuid: transaction_uuid,
        success_url: "http://localhost:5173/payment-success",
        failure_url: "http://localhost:5173/payment-failure"
      }
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// Re-added the missing history function!
const history = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM payments WHERE user_id = $1 ORDER BY id ASC", 
      [req.user.id]
    );
    res.status(200).json({ history: result.rows });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

module.exports = {
  payEsewa,
  payCOD,
  payKhalti,
  history
};