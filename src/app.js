import express from 'express';
import cors from 'cors';

// Note: Always add .js extensions to local relative imports in ESM
import authRoutes from './routes/auth.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

// Replace module.exports = app with export default
export default app;