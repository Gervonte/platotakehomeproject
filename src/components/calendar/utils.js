import { DAYS } from './consts';

export const range = end => {
	const { result } = Array.from({ length: end }).reduce(
		({ result, current }) => ({
			result: [...result, current],
			current: current + 1
		}),
		{ result: [], current: 1 }
	);
	return result;
};

export const getDaysInMonth = (month, year) => {
	return new Date(year, month + 1, 0).getDate();
};

export const getSortedDays = (month, year) => {
	const dayIndex = new Date(year, month, 1).getDay();
	return [...DAYS.slice(dayIndex), ...DAYS.slice(0, dayIndex)];
};

export const getDateObj = (day, month, year) => {
	return new Date(year, month, day);
};

export const getDateObjWithTime = (day, month, year, time = '00:00') => {
	const hours = time.substring(0, 2);
	const minutes = time.substring(3, 5);

	return new Date(year, month, day, hours, minutes);
};

export const isToday = (firstDate, secondDate) => {
	return (
		firstDate.getFullYear() === secondDate.getFullYear() &&
		firstDate.getMonth() === secondDate.getMonth() &&
		firstDate.getDate() === secondDate.getDate()
	);
};

export const isActiveReminder = (firstDate, secondDate) => {
	return (
		firstDate.getFullYear() === secondDate.getFullYear() &&
		firstDate.getMonth() === secondDate.getMonth() &&
		firstDate.getDate() === secondDate.getDate()
	);
};

export const formDataToReminderObj = formData => {
	//0 - Title, 1 - Date, 2 - Time, 3 - color
	const reminderObj = {
		title: formData[0].value,
		date: {
			day: new Date(formData[1].value).getDate() + 1,
			month: new Date(formData[1].value).getMonth(),
			year: new Date(formData[1].value).getFullYear()
		},
		time: formData[2].value,
		color: formData[3].value
	};

	return reminderObj;
};

export const formatForDate = date => {
	if (date < 10) {
		return `0${date}`;
	}
	return date;
};
