import { useState } from 'react';
import './App.css';
import { Calendar } from './components/calendar';
import { MOCKREMINDERS } from './components/calendar/consts';

function App() {
	const [reminders, setReminders] = useState(MOCKREMINDERS);

	const sortReminders = reminders => {
		const remindersSorted = reminders.sort((a, b) => {
			return a.date.getTime() - b.date.getTime();
		});
		return remindersSorted;
	};

	const addReminder = (title, date, color) => {
		let isValidReminder = true;

		if (title.length > 30) {
			isValidReminder = false;
			window.alert('Title is too long!');
		}
		// reminders.forEach(reminder => {
		// 	if (reminder.date.getTime() === date.getTime()) {
		// 		isValidReminder = false;
		// 		window.alert('There is already a reminder at this time!');
		// 	}
		// });
		if (isValidReminder) {
			setReminders(prev => {
				return sortReminders([...prev, { date, title, color }]);
			});
		}
	};

	const editReminder = (title, date, color, reminder) => {
		let isValidReminder = true;

		if (title.length > 30) {
			isValidReminder = false;
			window.alert('Title is too long!');
		}
		reminders.forEach(reminder => {
			if (reminder.date.getTime() === date.getTime()) {
				//isValidReminder = false;
				//window.alert('There is already a reminder at this time!');
			}
		});

		if (isValidReminder) {
			const newState = reminders.map(reminderToReplace => {
				if (reminderToReplace === reminder) {
					return { date, title, color };
				}
				return reminderToReplace;
			});

			setReminders(sortReminders(newState));
		}
	};

	const removeReminder = reminder => {
		setReminders(current => {
			return current.filter(reminderToRemove => {
				return reminderToRemove !== reminder;
			});
		});
	};

	return (
		<div>
			<Calendar
				startingDate={new Date()}
				remindersArr={reminders}
				addReminder={addReminder}
				editReminder={editReminder}
				removeReminder={removeReminder}
			/>
		</div>
	);
}

export default App;
