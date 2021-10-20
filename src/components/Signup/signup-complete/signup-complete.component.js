import React from "react";

export default function SignupComplete({ name, email, content }) {
  return (
    <div>
      <div>Name: {name}</div>
      <div>Email: {email}</div>
      <div>Content: {content}</div>
      <div>Complete!</div>
    </div>
  );
}
