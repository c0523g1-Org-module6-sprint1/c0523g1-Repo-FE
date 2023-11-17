import axios from "axios";
import React from "react";

export async function changepassword(value) {
  try {
    const res = await axios.patch(
      `http://localhost:8080/api/public/changePassword/`,
      value
    );
    return res.status;
  } catch (error) {
    console.log(error);
  }
}
