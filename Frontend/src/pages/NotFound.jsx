import { Link } from "react-router-dom";

import "../css/Page.css";

function NotFound() {
  return (
    <div className="page">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <Link to="/">Go Home</Link>
    </div>
  );
}

export default NotFound;