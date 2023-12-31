export const FormartDateRequest = (day) => {
    const currentDate = new Date();
    const pastDate = new Date(day);
    const timeDifference = currentDate - pastDate;

    const minutes = Math.floor(timeDifference / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years > 0) {
        return years + " năm trước";
    } else if (months > 0) {
        return months + " tháng trước";
    } else if (weeks > 0) {
        return weeks + " tuần trước";
    } else if (days > 0) {
        return days + " ngày trước";
    } else if (hours > 0) {
        return hours + " giờ trước";
    } else if (minutes > 0) {
        return minutes + " phút trước";
    } else {
        return "Vừa xong";
    }
};