export const sliceString = (str, n) => {
    if (str == null) return "";
    if (str.length > n) {
        return str.slice(0, n) + "...";
    } else {
        return str;
    }
}
export const numberOfUnseenMess = (n) => {
    if (n <= 99) {
        return n;
    } else {
        return "99+";
    }
}
export const dateFormat = (str) => {
    const date = new Date(str);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    return `Thời gian: ${hour}:${minute}:${second}
     (${day}-${month}-${year})`;
}
export const dateFormatSendMessage = (str) => {
    const date = new Date(str);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    return `${hour}:${minute} - ${day} tháng ${month}, ${year}`;
}
export const dateFormatChatbox = (str) => {
    console.log(str)
    if (str.hasOwnProperty("release")){
        const date = new Date(str.release);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hour = date.getHours();
        const minute = date.getMinutes();
        return `${hour}:${minute} ${day}/${month}/${year}`;
    } else {
        return "";
    }

}
export const compareId = (id1, id2) => {
    let name = id1 + "-" + id2;
    if (id1 > id2) {
        name = id2 + "-" + id1;
    }
    return name;
}
export const IdByNow = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    return "" + year + month + day + hour + minute + second;
}