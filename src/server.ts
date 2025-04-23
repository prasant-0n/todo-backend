import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import todoRoutes from './routes/todoRoutes';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

connectDB();

// ✅ Use the router, not the controller directly!
app.use('/api/todos', todoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT} 🚀`));
