
export const toHourMinFormat = (strDate) => {
    const date = new Date(strDate);
    const hour = date.getHours();
    const min = date.getMinutes();

    return (hour > 9 ? hour : '0' + hour) + ':' + (min > 9 ? min : '0' + min);
};

export const getYmd = (date) => {
    const yy = date.getFullYear();
    let mm = date.getMonth() + 1;
    let dd = date.getDate();

    mm = mm > 9 ? mm : '0' + mm;
    dd = dd > 9 ? dd : '0' + dd;

    const ymd = yy + '' + mm + '' + dd;
    return ymd;
};