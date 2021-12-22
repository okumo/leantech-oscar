const express = require('express');
const cors = require('cors');

const app = express();
const db = require('./app/models');

db.sequelize.sync();
const corsOptions = {
  origin: 'http://localhost:8080',
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to leantech api made by Oscar.' });
});

require('./app/routes/ordenCompra.route')(app);
require('./app/routes/ordenVenta.route')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
