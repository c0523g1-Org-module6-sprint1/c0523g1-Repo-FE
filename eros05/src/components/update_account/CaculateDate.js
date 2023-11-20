import moment from "moment/moment";

export const calculateDate = (expirationDate) => {
    const currentDate = moment();
    const endDate  = moment(expirationDate)
    let startDate = moment(currentDate.format('YYYY-MM-DD'));
    const remainingDays = endDate.diff(startDate , 'days');
    return remainingDays
}