//
// ─── STATUS ─────────────────────────────────────────────────────────────────────
//

const status = [ 'Not Resolved', 'Resolved', 'On The Way', 'Failed', 'Pending' ];

// ────────────────────────────────────────────────────────────────────────────────
let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let path = require('path');
let multer = require('multer');
// ────────────────────────────────────────────────────────────────────────────────
let app = express();
app.use(cors());
app.use(express.json({ extended: true }));

mongoose.connect('mongodb://localhost/online-service-mern', { useNewUrlParser: true, useUnifiedTopology: true });

//
// ─── MONGOOSE SCHEMA ────────────────────────────────────────────────────────────
//

const UserSchema = new mongoose.Schema({
	username: String,
	password: String,
	firstName: String,
	lastName: String,
	description: String,
	email: String,
	age: Number,
	address: String,
	country: String,
	phoneNumber: Number,
	role: String,
	status: String,
	zip: Number,
	image: {
		type: String,
		default: 'Public.png'
	}
});

const User = mongoose.model('User', UserSchema);

const SparePartSchema = new mongoose.Schema({
	title: String,
	brand: String,
	price: Number,
	description: String,
	quantity: Number,
	image: {
		type: String,
		default: 'question-mark.png'
	}
});

const Sparepart = mongoose.model('Sparepart', SparePartSchema);

const IssueSchema = new mongoose.Schema({
	userId: String,
	assignedEmployeeId: String,
	firstName: String,
	lastName: String,
	description: String,
	damages: [ SparePartSchema ],
	email: String,
	address: String,
	country: String,
	zip: Number,
	total: Number,
	paymentMethod: String,
	cardName: String,
	cardNumber: Number,
	cvv: String,
	status: String,
	image: String
});

const Issue = mongoose.model('Issue', IssueSchema);

//
// ─── MULTER CONFIG ──────────────────────────────────────────────────────────────
//

const userStorage = multer.diskStorage({
	destination: './client/public/uploads/users/',
	filename: function(req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	}
});

var uploadUserStorage = multer({ storage: userStorage }).single('image');

const sparepartStorage = multer.diskStorage({
	destination: './client/public/uploads/spareparts/',
	filename: function(req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	}
});

var uploadSparepartStorage = multer({ storage: sparepartStorage }).single('image');

const issueStorage = multer.diskStorage({
	destination: './client/public/uploads/proofOfPayments/',
	filename: function(req, file, cb) {
		cb(null, file.fieldname + 'Proof' + '-' + Date.now() + path.extname(file.originalname));
	}
});

var uploadIssueStorage = multer({ storage: issueStorage }).single('image');
//
// ─── ROUTES ─────────────────────────────────────────────────────────────────────
//

app.post('/register', (req, res) => {
	User.create(
		{
			username: req.body.username,
			email: req.body.email,
			password: req.body.password,
			role: req.body.role,
			status: req.body.status
		},
		(err, data) => {
			try {
				res.send(data);
			} catch (err) {
				console.log(err);
			}
		}
	);
});

app.post('/register-employee', (req, res) => {
	uploadUserStorage(req, res, (err) => {
		if (err) {
			console.log(err);
		} else {
			User.create(
				{
					username: req.body.username,
					password: req.body.password,
					firstName: req.body.firstName,
					lastName: req.body.lastName,
					description: req.body.description,
					email: req.body.email,
					age: req.body.age,
					address: req.body.address,
					country: req.body.country,
					phoneNumber: req.body.phoneNumber,
					role: req.body.role,
					status: req.body.status,
					image: req.file.filename
				},
				(err, user) => {
					try {
						res.send(user);
					} catch (error) {
						console.log(error);
					}
				}
			);
		}
	});
});

app.post('/login', (req, res) => {
	User.findOne({ username: req.body.username, password: req.body.password }, (err, user) => {
		try {
			if (user.username === req.body.username && user.password === req.body.password) {
				res.send(user);
			}
		} catch (error) {
			res.send('User not found');
			console.log(error);
		}
	});
});

// ────────────────────────────────────────────────────────────────────────────────

app.post('/sparepart', (req, res) => {
	uploadSparepartStorage(req, res, (err) => {
		if (err) {
			console.log(err);
		} else {
			Sparepart.create(
				{
					title: req.body.title,
					price: req.body.price,
					brand: req.body.brand,
					description: req.body.description,
					quantity: req.body.quantity,
					image: req.file.filename
				},
				(err, data) => {
					try {
						res.send(data);
					} catch (error) {
						console.log(error);
					}
				}
			);
		}
	});
});

app.get('/sparepart', (req, res) => {
	Sparepart.find({}, (err, sparepart) => {
		try {
			res.send(sparepart);
		} catch (error) {
			console.log(error);
		}
	});
});

app.put('/sparepart/:id', (req, res) => {
	uploadSparepartStorage(req, res, (err) => {
		if (err) {
			console.log(err);
		} else {
			Sparepart.findByIdAndUpdate(
				req.params.id,
				{
					title: req.body.title,
					price: req.body.price,
					brand: req.body.brand,
					description: req.body.description,
					quantity: req.body.quantity,
					image: req.file.filename
				},
				(err, data) => {
					try {
						res.send(data);
					} catch (error) {
						console.log(error);
					}
				}
			);
		}
	});
});

app.delete('/sparepart/:id', (req, res) => {
	Sparepart.findByIdAndRemove(req.params.id, (err, data) => {
		try {
			res.send(data);
		} catch (error) {
			console.log(error);
		}
	});
});

// ────────────────────────────────────────────────────────────────────────────────

app.get('/issue', (req, res) => {
	Issue.find({}, (err, issues) => {
		try {
			res.send(issues);
		} catch (error) {
			console.log(error);
		}
	});
});

app.post('/issue', (req, res) => {
	Issue.create(
		{
			userId: req.body.userId,
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			description: req.body.description,
			email: req.body.email,
			address: req.body.address,
			country: req.body.country,
			zip: req.body.zip,
			total: req.body.total,
			paymentMethod: req.body.paymentMethod,
			cardName: req.body.cardName,
			cardNumber: req.body.cardNumber,
			cvv: req.body.cvv,
			status: req.body.status
		},
		(err, issue) => {
			try {
				res.send(issue);
			} catch (error) {
				console.log(error);
			}
		}
	);
});
//
// ─── UPDATE: GET ISSUE BASED ISSUE ID ─────────────────────────────────────────────
//
app.get('/issue/:id', (req, res) => {
	Issue.findById(req.params.id, (err, data) => {
		try {
			res.send(data);
		} catch (error) {
			console.log(error);
		}
	});
});

app.put('/issue/:id', (req, res) => {
	uploadIssueStorage(req, res, (err) => {
		if (err) {
			console.log(err);
		} else {
			Issue.findByIdAndUpdate(
				req.params.id,
				{
					status: req.body.status,
					description: req.body.description,
					damages: req.body.damages,
					total: req.body.total,
					image: req.file.filename
				},
				(err, data) => {
					try {
						res.send(data);
					} catch (error) {
						console.log(error);
					}
				}
			);
		}
	});
});

app.delete('/issue/:id', (req, res) => {
	Issue.findByIdAndRemove(req.params.id, (err, issue) => {
		try {
			res.send(issue);
		} catch (error) {
			console.log(error);
		}
	});
});

app.put('/issue/sparepart/:id', (req, res) => {
	Issue.findByIdAndUpdate(
		req.params.id,
		{
			status: req.body.status,
			damages: req.body.damages,
			total: req.body.total
		},
		(err, data) => {
			try {
				res.send(data);
			} catch (error) {
				console.log(error);
			}
		}
	);
});

app.put('/issue/payment/:id', (req, res) => {
	uploadIssueStorage(req, res, (err) => {
		if (err) {
			console.log(err);
		} else {
			Issue.findByIdAndUpdate(
				req.params.id,
				{
					status: req.body.status,
					image: req.file.filename
				},
				(err, data) => {
					try {
						res.send(data);
					} catch (error) {
						console.log(error);
					}
				}
			);
		}
	});
});

app.put('/issue/close/:id', (req, res) => {
	Issue.findByIdAndUpdate(
		req.params.id,
		{
			userId: req.body.userId
		},
		(err, issue) => {
			try {
				console.log(issue);
			} catch (error) {
				console.log(error);
			}
		}
	);
});

//
// ─── UPDATE: GET ISSUE BASED USER ID ─────────────────────────────────────────────
//

app.get('/issue/user/:id', (req, res) => {
	Issue.find({ userId: req.params.id }, (err, data) => {
		try {
			res.send(data);
		} catch (error) {
			console.log(error);
		}
	});
});

app.put('/issue/accept/:id', (req, res) => {
	try {
		Issue.findByIdAndUpdate(
			req.params.id,
			{
				assignedEmployeeId: req.body.assignedEmployeeId
			},
			(err, data) => {
				try {
					res.send(data);
				} catch (error) {
					console.log(error);
				}
			}
		);
	} catch (error) {
		console.log(error);
	}
});

app.get('/issue/assigned/:id', (req, res) => {
	Issue.findOne({ assignedEmployeeId: req.params.id }, (err, issue) => {
		try {
			res.send(issue);
		} catch (error) {
			console.log(error);
		}
	});
});
// ────────────────────────────────────────────────────────────────────────────────
app.get('/user', (req, res) => {
	User.find({}, (err, data) => {
		try {
			res.send(data);
		} catch (error) {
			console.log(error);
		}
	});
});

app.put('/user/:id', (req, res) => {
	uploadUserStorage(req, res, (err) => {
		if (err) {
			console.log(err);
		} else {
			User.findByIdAndUpdate(
				req.params.id,
				{
					firstName: req.body.firstName,
					lastName: req.body.lastName,
					description: req.body.description,
					email: req.body.email,
					age: req.body.age,
					address: req.body.address,
					country: req.body.country,
					phoneNumber: req.body.phoneNumber,
					zip: req.body.zip,
					image: req.file.filename
				},
				(err, data) => {
					try {
						res.send(data);
					} catch (error) {
						console.log(error);
					}
				}
			);
		}
	});
});

app.get('/user/:id', (req, res) => {
	User.findById(req.params.id, (err, user) => {
		try {
			res.send(user);
		} catch (error) {
			console.log(error);
		}
	});
});

app.delete('/user/:id', (req, res) => {
	User.findByIdAndDelete(req.params.id, (err, user) => {
		try {
			res.send(user);
		} catch (error) {
			console.log(error);
		}
	});
});
// ────────────────────────────────────────────────────────────────────────────────

app.get('/employee', (req, res) => {
	User.find({ role: { $regex: /Employee/, $options: 'i' } }, (err, employee) => {
		try {
			res.send(employee);
		} catch (error) {
			console.log(error);
		}
	});
});

app.put('/employee/:id', (req, res) => {
	User.findByIdAndUpdate(
		req.params.id,
		{
			status: req.body.status
		},
		(err, user) => {
			try {
				res.send(user);
			} catch (error) {
				console.log(error);
			}
		}
	);
});

// ────────────────────────────────────────────────────────────────────────────────

app.listen(2020, (a) => {
	console.log('Server Started On PORT 2020!');
});
