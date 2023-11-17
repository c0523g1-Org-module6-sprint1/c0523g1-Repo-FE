import axios from "axios";

export const getList = async (idLogin,name) => {
    try {
        return (await axios.get(`http://localhost:8080/api/public/relationship/friend?idLogin=${idLogin}&name=${name}`)).data
    } catch (error) {
        console.log(error);
    }
}

export const handleDeleteFriend = async (idLogin,friend) => {
    return (await axios.delete(`http://localhost:8080/api/public/relationship/friend/unfriend?idLogin=${idLogin}&idFriend=${friend.id}`)).status
}

export const handleBlockFriend = async (idLogin,friend) => {
    return (await axios.delete(`http://localhost:8080/api/public/relationship/friend/block?idLogin=${idLogin}&idFriend=${friend.id}`)).status
}