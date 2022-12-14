import React from 'react';
import { formatForDate } from '../calendar/utils';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import './GeneralModal.css';

const GeneralModal = props => {
	const handleOnAddReminder = e => {
		props.onAddReminder(e);
	};

	const handleOnEditReminder = (e, reminder) => {
		props.onEditReminder(e, reminder);
	};

	const handleOnRemoveReminder = (e, reminder) => {
		props.onRemoveReminder(e, reminder);
	};

	return (
		<div>
			<Modal
				show={props.isOpen}
				onHide={props.toggle}
				size='lg'
				keyboard={false}
				backdrop='static'
				centered
			>
				<Modal.Header>
					<Modal.Title>
						{props.modalProps.type === 'add' && `Add a reminder`}
						{props.modalProps.type === 'edit' && (
							<>
								Edit Reminder{' '}
								<ion-icon
									onClick={e => {
										handleOnRemoveReminder(e, props.modalProps.reminder);
									}}
									style={{
										fontSize: '25px',
										position: 'absolute',
										right: '10px',
										top: '21px'
									}}
									name='trash-outline'
								/>
							</>
						)}
					</Modal.Title>
				</Modal.Header>
				<Form
					onSubmit={e => {
						return props.modalProps.type === 'add'
							? handleOnAddReminder(e)
							: handleOnEditReminder(e, props.modalProps.reminder);
					}}
				>
					{props.modalProps.type === 'add' && (
						<>
							<Modal.Body>
								<Form.Group>
									<Form.Label>Title</Form.Label>
									<Form.Control
										type='text'
										placeholder='Enter a title for your reminder (max 30 chars)'
									/>
								</Form.Group>
								<br />
								<Row className='mb-3'>
									<Form.Group as={Col}>
										<Form.Label>Date</Form.Label>
										<Form.Control
											type='date'
											plaintext
											defaultValue={`${
												props.modalProps.currentYear
											}-${formatForDate(
												props.modalProps.currentMonth + 1
											)}-${formatForDate(props.modalProps.day)}`}
										/>
									</Form.Group>
									<Form.Group as={Col}>
										<Form.Label>Time</Form.Label>
										<Form.Control
											defaultValue={'00:00'}
											type='time'
											step={60}
										/>
									</Form.Group>
								</Row>
								<Form.Group as={Col}>
									<Form.Label>Color</Form.Label>
									<Form.Control
										type='color'
										defaultValue='#0d6efd'
										title='Choose your color'
									/>
								</Form.Group>
							</Modal.Body>
							<Modal.Footer>
								<Button variant='secondary' onClick={props.toggle}>
									Cancel
								</Button>
								<Button variant='primary' type='submit'>
									Save Changes
								</Button>
							</Modal.Footer>
						</>
					)}
					{props.modalProps.type === 'edit' && (
						<>
							<Modal.Body>
								<Form.Group>
									<Form.Label>Title</Form.Label>
									<Form.Control
										defaultValue={props.modalProps.reminder.title}
										type='text'
										placeholder='Enter a title for your reminder (max 30 chars)'
									/>
								</Form.Group>
								<br />
								<Row className='mb-3'>
									<Form.Group as={Col}>
										<Form.Label>Date</Form.Label>
										<Form.Control
											type='date'
											plaintext
											defaultValue={`${
												props.modalProps.currentYear
											}-${formatForDate(
												props.modalProps.currentMonth + 1
											)}-${formatForDate(props.modalProps.day)}`}
										/>
									</Form.Group>
									<Form.Group as={Col}>
										<Form.Label>Time</Form.Label>
										<Form.Control
											defaultValue={props.modalProps.reminder.date.toLocaleTimeString(
												'it-IT'
											)}
											type='time'
											step={60}
										/>
									</Form.Group>
								</Row>
								<Row className='mb-4'>
									<Form.Group as={Col}>
										<Form.Label>Color</Form.Label>
										<Form.Control
											type='color'
											defaultValue={props.modalProps.reminder.color}
											title='Choose your color'
										/>
									</Form.Group>
								</Row>
							</Modal.Body>
							<Modal.Footer>
								<Button variant='secondary' onClick={props.toggle}>
									Cancel
								</Button>
								<Button variant='primary' type='submit'>
									Save Changes
								</Button>
							</Modal.Footer>
						</>
					)}
				</Form>
			</Modal>
		</div>
	);
};
export default GeneralModal;
