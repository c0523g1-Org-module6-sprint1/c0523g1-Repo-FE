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

    return `Thời gian: ${addZero(hour)}:${addZero(minute)}:${addZero(second)}
     (${addZero(day)}-${addZero(month)}-${year})`;
}
export const dateFormatSendMessage = (str) => {
    const date = new Date(str);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();

    return `${addZero(hour)}:${addZero(minute)} - ${addZero(day)} tháng ${addZero(month)}, ${year}`;
}
export const addZero = (str) => {
    str += "";
    if (str.length == 1){
        return "0" + str;
    } else {
        return str;
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