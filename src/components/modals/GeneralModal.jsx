import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './GeneralModal.css';

const GeneralModal = props => {
	return (
		<div>
			<Modal
				show={props.isOpen}
				onHide={props.toggle}
				size='lg'
				keyboard={false}
				backdrop='static'
			>
				<Modal.Header>
					<Modal.Title>Success!</Modal.Title>
				</Modal.Header>
				<Modal.Body>Thanks for your contribution!</Modal.Body>
				<Modal.Footer>
					<Button variant='primary' onClick={props.toggle}>
						OK
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};
export default GeneralModal;
