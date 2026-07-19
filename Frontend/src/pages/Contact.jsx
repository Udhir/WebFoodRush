import { useState } from "react";
import API from "../service/Api";
import toast from "react-hot-toast";

import "../css/Page.css";
function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast.error("Please fill all fields");
      return;
    }
    
    try {
      const response = await API.post("/contact/submit", { name, email, message });
      toast.success(response.data.message || "Message Sent");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send message");
    }
  };

  return (
    <div className="page">
      <h1>Contact Us</h1>
      <form onSubmit={submit}>
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <textarea placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} />
        <button>Send</button>
      </form>
    </div>
  );
}

export default Contact;