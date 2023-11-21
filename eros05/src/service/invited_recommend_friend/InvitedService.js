import axios from "axios";



export const findAll = async (id,sortByDesc) => {

    try {
        const res = await axios.get(`http://localhost:8080/api/public/invited/${id}/${sortByDesc}`)
        return res.data
    } catch (e) {
        return e
    }
}
export const acceptFriends = async (invitedID) => {
    return (await axios.put(`http://localhost:8080/api/public/invited/accept/${invitedID}`))
}


export const deleteInviteds = async (invitedID) => {
    return (await axios.delete(`http://localhost:8080/api/public/invited/delete/${invitedID}`))
}
