import axios from "axios";

export const GetProfileApi = async () => {
  try {
    const res = await axios.get(`http://localhost:8080/profile`);
    return res;
  } catch (e) {
    console.log(e);
  }
};
export const GetFriendsApi = async (name) => {
  try {
    const res = await axios.get(
      `http://localhost:8080/friends?name_like=${name}`
    );
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
export const GetUnknowApi = async (name) => {
  try {
    const res = await axios.get(
      `http://localhost:8080/unknow?name_like=${name}`
    );
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
export const GetChatBoxApi = async (id1, id2) => {
  try {
    const res1 = await axios.get(
      `http://localhost:8080/mess?sender=${id1}&recipient=${id2}`
    );
    const res2 = await axios.get(
      `http://localhost:8080/mess?sender=${id2}&recipient=${id1}`
    );

    let res = [...res1.data, ...res2.data];
    res.sort((a, b) => new Date(b.releaseTime) - new Date(a.releaseTime));

    return res;
  } catch (e) {
    console.log(e);
  }
};
