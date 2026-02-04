import connectDb from './src/config/dbConnect.js';
import { app } from './src/app.js';
import { configDotenv } from 'dotenv';

configDotenv();
connectDb();

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});

// testing 

const x = 10;


