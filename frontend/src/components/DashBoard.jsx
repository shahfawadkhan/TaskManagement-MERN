import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, createTask, editTask, removeTask } from '../slices/taskSlice';
import Navbar from './Navbar';
import { 
  FiLoader, 
  FiClipboard, 
  FiCheck, 
  FiClock, 
  FiEdit, 
  FiTrash2,
  FiPlus,
  FiX
} from 'react-icons/fi';
import TaskStats from './TaskStats';

const TaskDashboard = () => {
  const [formValue, setFormValue] = useState({
    title: "",
    description: "",
    completed: false, 
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const { tasks, loading } = useSelector((state) => state.tasks);

  const handleFormChange = (e) => {
    const value = e.target.type === 'checkbox' 
      ? e.target.checked 
      : e.target.value;
    setFormValue({ ...formValue, [e.target.name]: value });
  };

  const handleEditClick = (task) => {
    setFormValue({
      title: task.title,
      description: task.description,
      completed: task.completed
    });
    setEditId(task._id);
    setEditMode(true);
    setShowModal(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    if (editMode) {
      dispatch(editTask({ id: editId, task: formValue }));
      setEditMode(false);
      setEditId(null);
    } else {
      dispatch(createTask(formValue));
    }
    
    setFormValue({ title: "", description: "", completed: false });
    setShowModal(false);

    window.location.reload()
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditId(null);
    setFormValue({ title: "", description: "", completed: false });
    setShowModal(false);
  };

  const completedTasks = tasks?.filter(task => task.completed)?.length || 0;
  const pendingTasks = (tasks?.length || 0) - completedTasks;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
        <div>
            <h1 className="text-3xl font-bold text-gray-800">My Tasks</h1>
            <p className="text-gray-500 mt-1">Manage your tasks efficiently</p>
          </div>
          <div className="flex items-center gap-4">
            {loading && (
              <div className="flex items-center text-blue-600">
                <FiLoader className="animate-spin h-5 w-5 mr-2" />
                <span>Loading...</span>
              </div>
            )}
            <button
              onClick={() => {
                setEditMode(false);
                setEditId(null);
                setFormValue({ title: "", description: "", completed: false });
                setShowModal(true);
              }}
              className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white flex items-center px-4 py-2 rounded-lg transition duration-200 font-medium"
            >
              <FiPlus className="mr-2" />
              Create Task
            </button>
          </div>
        </div>

      
        <TaskStats tasks={tasks}/>
       
        <div className="flex flex-col gap-8">
          <div className="scroll-my-12">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-4 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-white">Task List</h2>
                <span className="bg-white bg-opacity-25 text-black text-sm py-1 px-3 rounded-full">
                  {tasks?.length || 0} Tasks
                </span>
              </div>

              <div className="overflow-x-auto">
              <div className="overflow-x-auto">
                 <table className="w-full divide-y divide-gray-200">
                     <thead className="bg-gray-50">
                         <tr>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Status
        </th>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Title
        </th>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Description
        </th>
        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
          Actions
        </th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      {tasks?.length > 0 ? (
        tasks.map((task) => (
          <tr key={task._id} className="hover:bg-gray-50 transition duration-150">
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full ${task.completed ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                <span className={`ml-2 text-xs px-2 py-1 rounded-full ${
                  task.completed 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {task.completed ? 'Completed' : 'Pending'}
                </span>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm font-medium text-gray-900">{task.title}</div>
            </td>
            <td className="px-6 py-4">
              <div className="text-sm text-gray-500">{task.description}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => handleEditClick(task)}
                  className="text-blue-600 hover:text-blue-800 p-1 cursor-pointer rounded hover:bg-blue-50 transition"
                >
                  <FiEdit className="h-5 w-5" />
                </button>
                <button
                  onClick={() => dispatch(removeTask(task._id))}
                  className="text-red-600 hover:text-red-800 p-1 cursor-pointer rounded hover:bg-red-50 transition"
                >
                  <FiTrash2 className="h-5 w-5" />
                </button>
              </div>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="4" className="px-6 py-10 text-center">
            <FiClipboard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 font-medium">No tasks available</p>
            <p className="text-gray-400 mt-1">Add a new task to get started</p>
          </td>
        </tr>
      )}
    </tbody>
            </table>
        </div>
    </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-md">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-white">
                {editMode ? "Edit Task" : "Add New Task"}
              </h2>
              <button 
                onClick={handleCancelEdit} 
                className="text-white hover:text-gray-200 focus:outline-none cursor-pointer"
              >
                <FiX className="h-6 w-6" />
              </button>
            </div>
            
            <form onSubmit={handleFormSubmit} className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
                <input
                  type="text"
                  name="title"
                  placeholder="What needs to be done?"
                  value={formValue.title}
                  onChange={handleFormChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <input
                  type="text"
                  name="description"
                  placeholder="Add some details..."
                  value={formValue.description}
                  onChange={handleFormChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  name="completed"
                  value={formValue.completed.toString()}
                  onChange={(e) => {
                    setFormValue({
                      ...formValue,
                      completed: e.target.value === "true"
                    });
                  }}
                  className="w-full p-3 border cursor-pointer border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="false">Pending</option>
                  <option value="true" >Completed</option>
                </select>
              </div>
              
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  {editMode ? "Update Task" : "Add Task"}
                </button>
                
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 transition duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskDashboard;
