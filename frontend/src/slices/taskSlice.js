import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addTask, deleteTask, getTasks, updateTask } from "../services/taskServices";

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async (userId) => {
  const response = await getTasks(userId); 
  return response;
});

export const createTask = createAsyncThunk("tasks/createTask", async (task) => {
  const response = await addTask(task);
  return response;
});

export const editTask = createAsyncThunk("tasks/editTask", async ({ id, task }) => {
  const response = await updateTask(id, task);
  return response;
});

export const removeTask = createAsyncThunk("tasks/deleteTask", async (id) => {
  await deleteTask(id);
  return id;
});

const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    resetState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload.tasks;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(editTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex((task) => task._id === action.payload._id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      });
  },
});

export const { resetState } = taskSlice.actions; 
export default taskSlice.reducer;
