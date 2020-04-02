import React, { Component } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
export default class Appointment extends Component {
	constructor(props) {
		super(props);
		this.handleFormData = this.handleFormData.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.isLogged = this.isLogged.bind(this);
		this.state = {
			userId: '',
			firstName: '',
			lastName: '',
			description: '',
			email: '',
			address: '',
			country: '',
			zip: 0,
			paymentMethod: 'Manual payment',
			cardName: '',
			cardNumber: 0,
			cvv: '',
			status: 'Unresolved'
		};
	}

	componentDidMount() {
		this.isLogged();
	}

	isLogged() {
		let _id = localStorage.getItem('_id');
		if (_id) {
			_id = JSON.parse(_id);
			this.setState(() => ({ userId: _id }));
			axios
				.get('/user/' + _id)
				.then((res) =>
					this.setState(() => ({
						firstName: res.data.firstName,
						lastName: res.data.lastName,
						email: res.data.email,
						address: res.data.address,
						country: res.data.country,
						zip: res.data.zip
					}))
				)
				.catch((err) => console.log(err));
		}
	}

	handleChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	handleFormData(e) {
		e.preventDefault();
		axios
			.post('/issue', {
				userId: this.state.userId,
				firstName: this.state.firstName,
				lastName: this.state.lastName,
				description: this.state.description,
				email: this.state.email,
				address: this.state.address,
				country: this.state.country,
				zip: this.state.zip,
				paymentMethod: this.state.paymentMethod,
				cardName: this.state.cardName,
				cardNumber: this.state.cardNumber,
				cvv: this.state.cvv,
				status: this.state.status
			})
			.then((res) => {
				alert('Your issue has saved successfully');
				window.location.assign('/issue-list');
			})
			.catch((err) => console.log(err));
	}

	render() {
		return (
			<Modal ariaHideApp={false} isOpen={this.props.modalStatus} onRequestClose={this.props.handleModalStatus}>
				<main className='page-content'>
					<section className='section-60 section-sm-bottom-90'>
						<div className='shell'>
							<div className='range'>
								<div className='cell-xs-12 text-center'>
									<h2>Make an Appointment</h2>
									<hr className='bg-primary' />
								</div>
								<div>
									<div className=''>
										<form
											onSubmit={this.handleFormData}
											data-form-output='form-output-global'
											data-form-type='order'
											className='rd-mailform'
										>
											<div className='range'>
												<div className='cell-sm-6'>
													<div className='form-group'>
														<label htmlFor='appointment-name' className='form-label-outside'>
															First Name
														</label>
														<input
															id='appointment-name'
															type='text'
															name='firstName'
															value={this.state.firstName}
															onChange={this.handleChange}
															data-constraints='@Required'
															className='form-control'
														/>
													</div>
												</div>
												<div className='cell-sm-6'>
													<div className='form-group'>
														<label htmlFor='appointment-name' className='form-label-outside'>
															Last Name
														</label>
														<input
															id='appointment-name'
															type='text'
															name='lastName'
															value={this.state.lastName}
															onChange={this.handleChange}
															data-constraints='@Required'
															className='form-control'
														/>
													</div>
												</div>
												<div className='cell-sm-12 offset-top-18 offset-sm-top-0'>
													<div className='form-group'>
														<label htmlFor='appointment-email' className='form-label-outside'>
															E-mail
														</label>
														<input
															id='appointment-email'
															type='email'
															name='email'
															value={this.state.email}
															onChange={this.handleChange}
															data-constraints='@Email @Required'
															className='form-control'
														/>
													</div>
												</div>
												<div className='cell-sm-6'>
													<div className='form-group'>
														<label htmlFor='appointment-name' className='form-label-outside'>
															Address
														</label>
														<input
															id='appointment-name'
															type='text'
															name='address'
															value={this.state.address}
															onChange={this.handleChange}
															data-constraints='@Required'
															className='form-control'
														/>
													</div>
												</div>
												<div className='cell-sm-6'>
													<div className='form-group'>
														<label htmlFor='appointment-name' className='form-label-outside'>
															Country
														</label>
														<input
															id='appointment-name'
															type='text'
															name='country'
															value={this.state.country}
															onChange={this.handleChange}
															data-constraints='@Required'
															className='form-control'
														/>
													</div>
												</div>
												<div className='cell-xs-12 offset-top-18'>
													<div className='form-group'>
														<label htmlFor='appointment-message' className='form-label-outside'>
															Issue Description
														</label>
														<textarea
															id='appointment-message'
															name='description'
															value={this.state.description}
															onChange={this.handleChange}
															data-constraints='@Required'
															className='form-control'
														/>
													</div>
												</div>
												<div className='cell-sm-4'>
													<div className='form-group'>
														<label htmlFor='appointment-name' className='form-label-outside'>
															Zip
														</label>
														<input
															id='appointment-name'
															name='zip'
															value={this.state.zip}
															onChange={this.handleChange}
															data-constraints='@Required'
															className='form-control'
														/>
													</div>
												</div>
												<div className='cell-sm-4'>
													<div className='form-group'>
														<label htmlFor='appointment-name' className='form-label-outside'>
															Payment Method
														</label>
														<div className='d-block my-4'>
															<div className='custom-control custom-radio'>
																<input
																	id='credit'
																	name='paymentMethod'
																	type='radio'
																	onChange={this.handleChange}
																	value='Manual payment'
																	className='custom-control-input'
																	defaultChecked
																/>
																<label className='custom-control-label' htmlFor='credit'>
																	Manual payment
																</label>
															</div>
															<div className='custom-control custom-radio'>
																<input
																	id='debit'
																	name='paymentMethod'
																	type='radio'
																	onChange={this.handleChange}
																	value='Credit card'
																	className='custom-control-input'
																/>
																<label className='custom-control-label' htmlFor='debit'>
																	Credit card
																</label>
															</div>
															<div className='custom-control custom-radio'>
																<input
																	id='paypal'
																	name='paymentMethod'
																	type='radio'
																	onChange={this.handleChange}
																	value='PayPal'
																	className='custom-control-input'
																/>
																<label className='custom-control-label' htmlFor='paypal'>
																	PayPal
																</label>
															</div>
														</div>
													</div>
												</div>
												<div className='cell-sm-4'>
													<div className='form-group'>
														<label htmlFor='appointment-name' className='form-label-outside'>
															CVV
														</label>
														<input
															disabled={this.state.paymentMethod === 'Manual payment'}
															id='appointment-name'
															name='cvv'
															value={this.state.cvv}
															onChange={this.handleChange}
															data-constraints='@Required'
															className='form-control'
														/>
													</div>
												</div>
												<div className='cell-sm-6'>
													<div className='form-group'>
														<label htmlFor='appointment-name' className='form-label-outside'>
															Card Name
														</label>
														<input
															disabled={this.state.paymentMethod === 'Manual payment'}
															id='appointment-name'
															name='cardName'
															value={this.state.cardName}
															onChange={this.handleChange}
															data-constraints='@Required'
															className='form-control'
														/>
													</div>
												</div>
												<div className='cell-sm-6'>
													<div className='form-group'>
														<label htmlFor='appointment-name' className='form-label-outside'>
															Card Number
														</label>
														<input
															disabled={this.state.paymentMethod === 'Manual payment'}
															id='appointment-name'
															name='cardNumber'
															value={this.state.cardNumber}
															onChange={this.handleChange}
															data-constraints='@Required'
															className='form-control'
														/>
													</div>
												</div>
												<div className='d-flex justify-content-center'>
													<div className='col'>
														<button type='submit' className='btn btn-primary btn-block'>
															Make an appointment
														</button>
													</div>
													<div className='col'>
														<button type='button' className='btn btn-outline-danger btn-block' onClick={this.props.handleModalStatus}>
															Close
														</button>
													</div>
												</div>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
					</section>
				</main>
			</Modal>
		);
	}
}
