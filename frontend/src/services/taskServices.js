import axios from 'axios';

const base_url = 'http://localhost:4000/api/tasks';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const addTask = async (task) => {
  const response = await axios.post(
    `${base_url}/add-task`,
    task,
    getAuthHeaders()
  );
  return response.data;
};

export const getTasks = async () => {
  const response = await axios.get(`${base_url}/get-tasks`, getAuthHeaders());
  console.log('API Response:', response.data);
  return response.data;
};

export const updateTask = async (id, task) => {
  const response = await axios.put(
    `${base_url}/edit-task/${id}`,
    task,
    getAuthHeaders()
  );
  return response.data;
};

export const deleteTask = async (id) => {
  await axios.delete(`${base_url}/delete-task/${id}`, getAuthHeaders());
};
