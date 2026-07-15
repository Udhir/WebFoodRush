import { useState } from "react";

import "../css/Page.css";
function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const submit = (e) => {
    e.preventDefault();
    alert("Message Sent");
    setName("");
    setEmail("");
    setMessage("");
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