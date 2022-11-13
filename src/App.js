import { useState } from 'react';
import './App.css';
import { Calendar } from './components/calendar';
import { MOCKEVENTS } from './components/calendar/consts';

function App() {
	const [events, setEvents] = useState(MOCKEVENTS);

	const addEvent = (date, color) => {
		const title = window.prompt('text');
		setEvents(prev => [...prev, { date, title, color }]);
	};

	return (
		<div>
			<Calendar
				startingDate={new Date()}
				eventsArr={events}
				addEvent={addEvent}
			/>
		</div>
	);
}

export default App;
