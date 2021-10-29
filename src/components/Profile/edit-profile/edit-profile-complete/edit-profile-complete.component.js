import React from "react";
import { useHistory } from "react-router-dom";
export default function EditProfileComplete({ id }) {
  let history = useHistory();
  history.push("/Profile?id=" + id);
  return (
    <div>
      <div>Complete!</div>
    </div>
  );
}
