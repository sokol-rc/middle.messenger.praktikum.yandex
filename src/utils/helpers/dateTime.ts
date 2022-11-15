import { DayType } from 'core/store/initial-store';

export const getDayId = (dateString: string) => {
    const date = new Date(dateString).toISOString().split('T')[0];

    const dateId = date.split('-').join('');
    return Number(dateId);
};

export const getDayById = (dayId: number, arrayDays: Array<DayType>) => {
    const foundDay = arrayDays.find((day) => day.id === dayId);
    if (typeof foundDay === 'undefined') {
        return null;
    }
    return foundDay;
};

export const getMessageTimeFromDate = (date: string) => {
    const time = new Date(date).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
    });
    return time;
};

export const getDayTextFromDate = (date: string) => {
    const d = new Date(date);
    const months =
        'января,февраля,марта,апреля,мая,июня,июля,августа,сентября,октября,ноября,декабря'.split(
            ','
        );
    const dayText = `${d.getDate()} ${months[d.getMonth()]}`;
    return dayText;
};
