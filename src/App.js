import { useState } from 'react';
import './App.css';
import { Calendar } from './components/calendar';
import { MOCKREMINDERS } from './components/calendar/consts';

function App() {
	const [reminders, setReminders] = useState(MOCKREMINDERS);
	//console.log(reminders);
	const sortReminders = reminders => {
		const remindersSorted = reminders.sort((a, b) => {
			return a.date.getTime() - b.date.getTime();
		});
		return remindersSorted;
	};

	const addReminder = (title, date, color) => {
		setReminders(prev => {
			return sortReminders([...prev, { date, title, color }]);
		});
	};

	return (
		<div>
			<Calendar
				startingDate={new Date()}
				remindersArr={reminders}
				addReminder={addReminder}
			/>
		</div>
	);
}

export default App;
