import React from 'react';
import { FiClipboard, FiCheck, FiClock } from 'react-icons/fi';

const TaskStats = ({ tasks }) => {
  const completedTasks = tasks?.filter(task => task.completed)?.length || 0;
  const totalTasks = tasks?.length || 0;
  const pendingTasks = totalTasks - completedTasks;

  const stats = [
    { 
      label: 'Total Tasks', 
      count: totalTasks, 
      borderColor: 'border-indigo-500',
      bgColor: 'bg-indigo-100',
      textColor: 'text-indigo-600',
      icon: <FiClipboard /> 
    },
    { 
      label: 'Completed', 
      count: completedTasks, 
      borderColor: 'border-green-500',
      bgColor: 'bg-green-100',
      textColor: 'text-green-600',
      icon: <FiCheck /> 
    },
    { 
      label: 'Pending', 
      count: pendingTasks, 
      borderColor: 'border-yellow-500',
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-600',
      icon: <FiClock /> 
    },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-6 mb-8">
      {stats.map((stat, index) => (
        <div 
          key={index} 
          className={`bg-white rounded-xl shadow-md p-6 border-t-4 ${stat.borderColor} flex-grow`}
        >
          <div className="flex items-center">
            <div className={`p-3 rounded-full ${stat.bgColor} mr-4 ${stat.textColor}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-800">{stat.count}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskStats;