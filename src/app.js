const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const app = express();
const { errorHandler } = require('./middlewares/error.middlewares.js');

const enquiryRouter = require('./routes/enquiry.routes.js');

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true,
  })
);

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use(cookieParser());

// Set security headers with Helmet middleware
app.use(helmet());

// Log requests with Morgan middleware (use 'combined' format for production)
app.use(morgan('dev'));

// Routes
app.use('/api/v1/enquiries', enquiryRouter);

app.use((_, __, next) => {
  error = new Error('Endpoint Not Found');
  next(error);
});

// Error handling middleware
app.use(errorHandler);

module.exports = { app };
