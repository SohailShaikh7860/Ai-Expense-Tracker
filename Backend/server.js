import app from './app.js';
import dotenv from 'dotenv';
import connectDB from './DB/Db.js';
dotenv.config();

const PORT = process.env.PORT || 8001;

 connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});