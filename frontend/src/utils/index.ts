import moment from "moment";

export const getTimeHMDMY = (time?: Date | null | undefined) => {
    if (time) {
        return moment(time).utcOffset("+07:00").format("HH:mm DD/MM/YYYY");
    }
    return moment().utcOffset("+07:00").format("HH:mm DD/MM/YYYY");

}
export const getTimeDMY = (time?: Date | null | undefined) => {
    if (time) {
        return moment(time).utcOffset("+07:00").format("DD/MM/YYYY");
    }
    return moment().utcOffset("+07:00").format("DD/MM/YYYY");

} 