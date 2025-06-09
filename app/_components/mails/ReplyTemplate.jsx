import * as React from "react";

const ReplyTemplate = ({ name, message }) => (
  <div style={{ fontFamily: "sans-serif", padding: "2rem" }}>
    <h2 style={{ margin: 0, color: "#2563eb" }}>
      Thank you{name ? `, ${name}` : ""}!
    </h2>
    {message && <p style={{ marginTop: "1rem", color: "#555" }}>{message}</p>}
    <p style={{ marginTop: "1rem", color: "#444" }}>
      We’ve received your message and will get back to you soon.
    </p>
  </div>
);

export default ReplyTemplate;
