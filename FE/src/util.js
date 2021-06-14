
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

export const getWeek = () => {
    /* 
        getDay() 결과값
        0- 일요일
        1- 월요일
        6- 토요일
        주 => 일요일 ~ 토요일
        
        월요일 ~ 일요일 형태로 구하기 위해
        getDay로 일요일 나오면 7로 설정
    */
    const today = new Date();
    const day = (today.getDay() || 7) - 1;
    const date = today.getDate() - day;
    const startWeekDate = new Date(today.setDate(date));
    const endWeekDate = new Date(today.setDate(today.getDate() + 6));
  
    return {startWeekDate, endWeekDate};
}

export const findNode = (nList, eTarget) => {  
    let num = 0
    if (nList.length === 0) return 0;
    nList.forEach(ele => {
        if(ele.nodeName !== '#text'){
            if(eTarget === ele) num++;
        }
        num += findNode(ele.childNodes, eTarget);
    })
    return num;
}