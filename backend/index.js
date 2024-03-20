import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

// routes
import userRoutes from './Routes/userRoutes.js';
import vacationRoutes from './Routes/vacationRoutes.js';

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
  origin: process.env.CORS_DOMAINS,
  credentials:true
};

app.use(cors(corsOptions));

app.use('/api/users', userRoutes);
app.use('/api/vacations', vacationRoutes);

mongoose.connect(process.env.DB_CONNECTION_URL_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('DB Connection Successfull')
}).catch(err => {
    console.log('Error connecting DB: ', err.message);
});

app.use("/images", express.static("images"));

app.get('/', (req, res) => {
    res.send('Welcome to Vacations Tracker API..!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Export the Express API
export default app;
