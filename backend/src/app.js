import express from "express";
import cors from "cors"; 
import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/taskRoutes.js"; 

const app = express();

app.use(express.json()); 
app.use(cors()); 

app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes); 

export { app };
