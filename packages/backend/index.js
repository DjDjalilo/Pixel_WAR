const bodyparser = require('body-parser');
const cors = require('cors');
const express = require('express');

const login = require('./routes/login');
const users = require('./routes/users');

const app = express();
const PORT = 3003;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
	res.status(404).send('PixelWar Backend');
});

app.use('/login', login);
app.use('/users', users);

app.use((req, res, next, err) => {
	console.error(err.stack);

	if (res.headersSent) {
		return next(err);
	}

	return res.status(500).send('Something broke!');
});

const server = app.listen(PORT, () => {
	const { port } = server.address();

	console.log(`PixelWar Backend listening on http://localhost:${port}`);
});
