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

    const now = new Date();

    if (now.getFullYear() - year >= 1) {
        return `${addZero(hour)}:${addZero(minute)} - ${addZero(day)} tháng ${addZero(month)}, ${year}`;
    } else if (now.getMonth() + 1 - month >= 1) {
        return `${now.getMonth() + 1 - month} tháng trước`;
    } else if (now.getDate() - day >= 1) {
        return `${now.getDate() - day} ngày trước`;
    } else if (now.getMinutes() - minute >= 1) {
        return `${now.getMinutes() - minute} phút trước`;
    } else {
        return `Mới đây`;
    }

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