import {
	Wrapper,
	CalendarHead,
	CalendarBody,
	SevenColGrid,
	HeadDay,
	StyledDay,
	StyledEvent
} from './styled';
import { MONTHS } from './consts';
import {
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
export const Calendar = ({
	startingDate,
	remindersArr,
	addReminder,
	editReminder,
	removeReminder
}) => {
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

	const toggleModal = ({ type = 'add', day = '0', reminder }) => {
		if (!showModal) {
			type = 'edit'
				? setModalProps({ type, day, currentMonth, currentYear, reminder })
				: setModalProps({ type, day, currentMonth, currentYear });
		}
		setShowModal(!showModal);
	};
	const onAddReminder = (title, date, color) => {
		addReminder(title, date, color);
	};
	const handleOnAddReminder = event => {
		event.preventDefault();
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
	const onEditReminder = (title, date, color, reminder) => {
		editReminder(title, date, color, reminder);
	};
	const handleOnEditReminder = (event, reminder) => {
		event.preventDefault();

		const formData = [...event.target];
		const {
			title,
			date: { day, month, year },
			time,
			color
		} = formDataToReminderObj(formData);

		onEditReminder(
			title,
			getDateObjWithTime(day, month, year, time),
			color,
			reminder
		);

		toggleModal({ type: null, day: null });
	};
	const onRemoveReminder = reminder => {
		removeReminder(reminder);
	};
	const handleOnRemoveReminder = (event, reminder) => {
		onRemoveReminder(reminder);
		toggleModal({ type: null, day: null });
	};

	//onAddEvent(getDateObj(day, currentMonth, currentYear))
	return (
		<Wrapper>
			<GeneralModal
				isOpen={showModal}
				toggle={toggleModal}
				onAddReminder={handleOnAddReminder}
				onEditReminder={handleOnEditReminder}
				onRemoveReminder={handleOnRemoveReminder}
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
						onClick={event =>
							event.currentTarget === event.target &&
							toggleModal({ type: 'add', day })
						}
						active={isToday(
							new Date(),
							getDateObj(day, currentMonth, currentYear)
						)}
					>
						<p
							onClick={event =>
								event.currentTarget === event.target &&
								toggleModal({ type: 'add', day })
							}
						>
							{day}
						</p>
						{remindersArr.map(
							ev =>
								isActiveReminder(
									getDateObjWithTime(day, currentMonth, currentYear),
									ev.date
								) && (
									<div>
										<StyledEvent
											key={ev.date.getTime()}
											bgColor={ev?.color}
											onClick={event =>
												event.currentTarget === event.target &&
												toggleModal({ type: 'edit', day, reminder: ev })
											}
										>
											{`${ev.title}`}
											<br />
											{`${ev.date.toLocaleTimeString([], {
												hour: '2-digit',
												minute: '2-digit'
											})}`}
										</StyledEvent>
									</div>
								)
						)}
					</StyledDay>
				))}
			</CalendarBody>
		</Wrapper>
	);
};
