
import "../css/Page.css";

function About() {
  return (
    <div className="page">
      <h1>About FoodRush</h1>
      <p>
        FoodRush is a modern online food ordering platform developed using
        React, Node.js, Express and PostgreSQL.
      </p>

      <div className="about-grid">
        <div>
          <h2>Mission</h2>
          <p>Deliver fresh food quickly and safely.</p>
        </div>
        <div>
          <h2>Vision</h2>
          <p>Become Nepal's trusted food delivery platform.</p>
        </div>
        <div>
          <h2>Services</h2>
          <ul>
            <li>Fast Delivery</li>
            <li>Secure Payment</li>
            <li>Fresh Food</li>
            <li>24/7 Support</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default About;