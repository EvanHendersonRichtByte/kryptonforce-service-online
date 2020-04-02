import React, { Component, Fragment } from 'react';
import axios from 'axios';
import PaymentForm from '../components/PaymentForm';
export default class IssueList extends Component {
	constructor() {
		super();
		this.handleModalStatus = this.handleModalStatus.bind(this);
		this.handleAssignedEmployee = this.handleAssignedEmployee.bind(this);
		this.getTotal = this.getTotal.bind(this);
		this.state = {
			userId: '',
			issues: [],
			employee: '',
			modalStatus: false
		};
	}

	componentDidMount() {
		this.handleUserIssues();
	}

	handleModalStatus() {
		this.setState({ modalStatus: !this.state.modalStatus });
	}

	handleUserIssues() {
		let _id = localStorage.getItem('_id');
		if (_id) {
			_id = JSON.parse(_id);
			axios.get('/issue/user/' + _id).then((res) => {
				this.setState({ issues: res.data });
			});
		}
	}

	handleAssignedEmployee(id) {
		axios
			.get('/user/' + id)
			.then((res) => {
				alert(`Assigned Employee named ${res.data.firstName} ${res.data.firstName}`);
			})
			.catch((err) => console.log(err));
	}

	getTotal(res) {
		let total = 0;
		res.damages.forEach((subTotal) => {
			total += subTotal.price;
		});
		return <span>{total}</span>;
	}

	handleIssueClose(res) {
		axios.delete('/issue/' + res._id).then((res) => {
			alert('your issue has been canceled');
			window.location.assign('/issue-list');
		});
	}

	isPaid(res) {
		if (res.status === 'Unresolved' && res.damages < 0) {
			return (
				<td>
					<span className='text-danger'>Unresolved</span>
				</td>
			);
		} else if (res.damages > 0 && res.status === 'Resolved') {
			return (
				<td className='text-center'>
					<button className='btn btn-outline-warning' onClick={() => this.handleModalStatus()}>
						Pay Now
					</button>
				</td>
			);
		} else if (res.status === 'Resolved' && res.image > 0) {
			return (
				<td className='text-center'>
					<span className='text-danger'>Already Paid</span>
				</td>
			);
		} else {
			return (
				<td className='text-center'>
					<span className='text-danger'>F</span>
				</td>
			);
		}
	}

	render() {
		return (
			<Fragment>
				<div className='container'>
					<table className='table table-hover table-inverse'>
						<thead className='thead-inverse text-center'>
							<tr>
								<th>#</th>
								<th>Description</th>
								<th>Address</th>
								<th>Country</th>
								<th>Zip</th>
								<th>Assigned Employee</th>
								<th>List of Damages</th>
								<th>Status</th>
							</tr>
						</thead>
						<tbody>
							{this.state.issues.map((res) => {
								return (
									<tr key={res._id}>
										<td>{res._id.substring(0, 5)}</td>
										<td>{res.description}</td>
										<td>{res.address}</td>
										<td>{res.country}</td>
										<td>{res.zip}</td>
										<td className='text-center'>
											<button
												disabled={!res.assignedEmployeeId}
												className='btn btn-outline-primary'
												onClick={() => this.handleAssignedEmployee(res.assignedEmployeeId)}
											>
												Reveal
											</button>
										</td>
										<td>
											<ul>
												{res.damages.map((data) => {
													return (
														<li key={data._id}>
															{data.title} ${data.price} || {data.quantity}
														</li>
													);
												})}
											</ul>
											<hr />
											<div className='col-md-12'>
												<div className='row text-center'>
													<div className='col-md-4'>Total</div>
													<div className='col-md-8'>{this.getTotal(res)}</div>
												</div>
											</div>
										</td>
										<td className='text-center d-flex justify-content-around'>
											<button onClick={() => this.handleIssueClose(res)} className='btn btn-outline-warning'>
												{res.damages <= 0 ? <span className='text-danger'>Cancel Issue</span> : <span>Pay Now</span>}
											</button>
											{res.image && (
												<button className='btn btn-outline-danger' onClick={() => this.handleIssueClose(res)}>
													Mark as Closed
												</button>
											)}
										</td>
										<PaymentForm modalStatus={this.state.modalStatus} handleModalStatus={this.handleModalStatus} _id={res._id} />
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</Fragment>
		);
	}
}
