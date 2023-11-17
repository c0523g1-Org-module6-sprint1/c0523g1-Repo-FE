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
export async function giveaGive(value) {
  try {
    const res = await axios.post(
      `http://localhost:8080/api/public/gift/addGift/`,
      value
    );

    if (res.status === 403) {
      console.log("Không đủ tiền để thực hiện giao dịch");
      return res.statusText;
    }

    return res.status;
  } catch (error) {
    console.error("Lỗi o giveaGive:", error);
  }
}
