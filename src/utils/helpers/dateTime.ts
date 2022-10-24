export const getDayId = (dateString) => {
    const date = new Date(dateString).toLocaleDateString([], {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
    const dateId = date.split('.').join('');
    return dateId;
};

export const getDayById = (dayId, arrayDays) => {
    const foundDay = arrayDays.find((day) => day.id === dayId);
    if (typeof foundDay === 'undefined') {
        return null;
    }
    return foundDay;
};

export const getMessageTimeFromDate = (date) => {
    const time = new Date(date).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
	});
	return time;
};

export const getDayTextFromDate = (date) => {
	const d = new Date(date);
	const months = 'января,февраля,марта,апреля,мая,июня,июля,августа,сентября,октября,ноября,декабря'.split(',');
	const dayText = `${d.getDate()} ${months[d.getMonth()]}`
	return dayText;
	}
