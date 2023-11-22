import axios from "axios";

export const getList = async (idLogin,name,limit) => {
    try {
        const res = (await axios.get(`http://localhost:8080/api/public/friend?idLogin=${idLogin}&name=${name}&limit=${limit}`))
        console.log(res)
        const  totalLimit = res.data.totalElements
        return [res.data.content,totalLimit];
    } catch (error) {
        console.log(error);
    }
}

export const handleDeleteFriend = async (idLogin,friend) => {
    return (await axios.delete(`http://localhost:8080/api/public/friend/unfriend?idLogin=${idLogin}&idFriend=${friend.id}`)).status
}

export const handleBlockFriend = async (idLogin,friend) => {
    return (await axios.delete(`http://localhost:8080/api/public/friend/block?idLogin=${idLogin}&idFriend=${friend.id}`)).status
}

export const handleUnBlockFriend = async (idLogin,friend) => {
    return (await axios.delete(`http://localhost:8080/api/public/friend/unblock?idLogin=${idLogin}&idFriend=${friend.id}`)).status
}