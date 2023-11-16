import axios from "axios";
import React from "react";

export async function getAll() {
  try {
    const res = await axios.get("http://localhost:8080/api/public/gift");
    return res.data;
  } catch (error) {
    console.log("loi o getAll");
  }
}
export async function getMoney(name) {
  try {
    const res = await axios.get(
      `http://localhost:8080/api/public/gift/getMoney/${name}`
    );
    return res.data;
  } catch (error) {
    console.log("loi o getAll");
  }
}
