import {
	Wrapper,
	CalendarHead,
	CalendarBody,
	SevenColGrid,
	HeadDay,
	StyledDay,
	StyledEvent,
	getRandomDarkColor
} from './styled';
import { DAYS, MONTHS } from './consts';
import {
	areDatesTheSame,
	formDataToEventObj,
	formDataToReminderObj,
	getDateObj,
	getDateObjWithTime,
	getDaysInMonth,
	getSortedDays,
	isActiveReminder,
	isToday,
	range
} from './utils';
import { useState } from 'react';
import GeneralModal from '../modals/GeneralModal';
export const Calendar = ({ startingDate, remindersArr, addReminder }) => {
	const [currentMonth, setCurrentMonth] = useState(startingDate.getMonth());
	const [currentYear, setCurrentYear] = useState(startingDate.getFullYear());
	const [showModal, setShowModal] = useState(false);
	const [modalProps, setModalProps] = useState({
		type: null,
		day: null,
		currentMonth: null,
		currentYear: null
	});
	const DAYSINMONTH = getDaysInMonth(currentMonth, currentYear);

	const nextMonth = () => {
		if (currentMonth < 11) {
			setCurrentMonth(prev => prev + 1);
		} else {
			setCurrentMonth(0);
			setCurrentYear(prev => prev + 1);
		}
	};

	const prevMonth = () => {
		if (currentMonth > 0) {
			setCurrentMonth(prev => prev - 1);
		} else {
			setCurrentMonth(11);
			setCurrentYear(prev => prev - 1);
		}
	};

	const toggleModal = ({ type = 'add', day = '0' }) => {
		if (!showModal) {
			setModalProps({ type, day, currentMonth, currentYear });
		}
		setShowModal(!showModal);
	};
	const onAddReminder = (title, date, color) => {
		addReminder(title, date, color);
	};
	const handleOnSubmit = event => {
		event.preventDefault();
		//0 - Title, 1 - Date, 2 - Time, 3 - color
		const formData = [...event.target];
		const {
			title,
			date: { day, month, year },
			time,
			color
		} = formDataToReminderObj(formData);

		onAddReminder(title, getDateObjWithTime(day, month, year, time), color);

		toggleModal({ type: null, day: null });
	};

	//onAddEvent(getDateObj(day, currentMonth, currentYear))
	return (
		<Wrapper>
			<GeneralModal
				isOpen={showModal}
				toggle={toggleModal}
				onSubmit={handleOnSubmit}
				modalProps={modalProps}
			/>
			<CalendarHead>
				<ion-icon
					onClick={prevMonth}
					name='arrow-back-circle-outline'
				></ion-icon>
				<p>
					{MONTHS[currentMonth]} {currentYear}
				</p>
				<ion-icon
					onClick={nextMonth}
					name='arrow-forward-circle-outline'
				></ion-icon>
			</CalendarHead>
			<SevenColGrid>
				{getSortedDays(currentMonth, currentYear).map(day => {
					return <HeadDay key={`day ${day}`}>{day}</HeadDay>;
				})}
			</SevenColGrid>
			<CalendarBody fourCol={DAYSINMONTH === 28}>
				{range(DAYSINMONTH).map(day => (
					<StyledDay
						key={`day ${day}`}
						onClick={() => toggleModal({ type: 'add', day })}
						active={isToday(
							new Date(),
							getDateObj(day, currentMonth, currentYear)
						)}
					>
						<p>{day}</p>
						{remindersArr.map(
							ev =>
								isActiveReminder(
									getDateObjWithTime(day, currentMonth, currentYear),
									ev.date
								) && (
									<StyledEvent key={ev.date.getTime()} bgColor={ev?.color}>
										{`${ev.title}`}
										<br />
										{`${ev.date.toLocaleTimeString([], {
											hour: '2-digit',
											minute: '2-digit'
										})}`}
									</StyledEvent>
								)
						)}
					</StyledDay>
				))}
			</CalendarBody>
		</Wrapper>
	);
};
