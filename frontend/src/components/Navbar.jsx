import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { FiLogOut, FiUser, FiClipboard } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { resetState } from '../slices/taskSlice';

function Navbar() {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(resetState());
    navigate('/login');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserName(decoded.username);
      } catch (error) {
        console.log('Invalid token:', error);
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-10">
      <nav className="max-w-6xl mx-auto px-2 sm:px-6 lg:px-8 py-2">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div>
              <div className="flex items-center">
                <FiClipboard className="h-6 w-6 text-blue-600 mr-2" />
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                  TaskFlow
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center text-sm font-medium text-gray-600 bg-gray-100 py-2 px-4 rounded-lg">
              <FiUser className="mr-2 h-4 w-4 text-blue-600" />
              <span className="text-gray-800 font-semibold">{userName}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center cursor-pointer gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 px-4 
                            py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 shadow-sm"
            >
              <FiLogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
