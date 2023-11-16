import axios from "axios";

export const getAll = async (name) => {
  try {
      const res = await axios.get(`http://localhost:8080/accounts?username=${name}`)
      return res.data.content
  }catch (e) {
      alert("Error")
  }
}

export const getAllType = async () => {
  try {
      const res = await axios.get("http://localhost:8080/api/admin/accountType")
      return res.data
  }catch (e) {
      alert("Error")
  }
}