import React, { Component } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

export default class PaymentForm extends Component {
	constructor(props) {
		super(props);
		this.handleFileChange = this.handleFileChange.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.state = {
			image: null
		};
	}

	handleFileChange(e) {
		this.setState({ image: e.target.files[0] });
	}

	handleFormSubmit(e) {
		e.preventDefault();
		const config = { headers: { 'content-type': 'multipart/form-data' } };
		let formData = new FormData();
		formData.append('image', this.state.image);
		formData.append('status', 'Have Paid');
		axios
			.put('/issue/payment/' + this.props._id, formData, config)
			.then((res) => {
				console.log(res);
				alert('Your proof has been sent successfully!');
				window.location.assign('/issue-list');
			})
			.catch((err) => console.log(err));
	}

	render() {
		const customStyles = {
			content: {
				top: '50%',
				left: '50%',
				right: 'auto',
				bottom: 'auto',
				marginRight: '-50%',
				transform: 'translate(-50%, -50%)'
			}
		};
		return (
			<Modal
				style={customStyles}
				ariaHideApp={false}
				isOpen={this.props.modalStatus}
				onRequestClose={this.props.handleModalStatus}
			>
				<form onSubmit={this.handleFormSubmit}>
					<div className='form-group'>
						<label htmlFor='image'>Please Select Proof Image</label>
						<input onChange={this.handleFileChange} type='file' className='form-control-file' name='image' id='image' />
						<div className='form-check'>
							<label className='form-check-label'>
								<input type='checkbox' className='form-check-input' value='checkedValue' required />
								Confirm Payment
							</label>
						</div>
					</div>
					<button type='submit' className='btn btn-primary btn-block'>
						Submit
					</button>
				</form>
			</Modal>
		);
	}
}
