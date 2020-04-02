import React, { Component, Fragment } from 'react';
import Appointment from '../components/Appointment';
import Picture from '../res/builder.jpg';
import Picture2 from '../res/builder2.jpg';
import Picture3 from '../res/builder3.jpg';
export default class Index extends Component {
	constructor() {
		super();
		this.handleModalStatus = this.handleModalStatus.bind(this);
		this.state = {
			modalStatus: false,
			_id: ''
		};
	}

	handleModalStatus() {
		this.setState(() => ({ modalStatus: !this.state.modalStatus }));
	}

	render() {
		return (
			<Fragment>
				<div className='jumbotron animated bounce infinite'>
					<h1 className='display-3'>We are here to assist you</h1>
					<p className='lead'>This site created by Evan Henderson</p>
					<hr className='my-2' />
					<button
						disabled={!localStorage.getItem('_id')}
						onClick={this.handleModalStatus}
						className='btn btn-outline-primary'
					>
						Make an appointment
					</button>
					<Appointment modalStatus={this.state.modalStatus} handleModalStatus={this.handleModalStatus} />
				</div>
			</Fragment>
		);
	}
}
