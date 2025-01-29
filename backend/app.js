const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // CORS paketini dahil edin
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors()); // CORS ayarlarını yapılandırın
app.use(bodyParser.json());

app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);

// Hata işleyici middleware
app.use(errorHandler);

module.exports = app;