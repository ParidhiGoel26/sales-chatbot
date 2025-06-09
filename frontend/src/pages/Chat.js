import React from 'react';
import ChatWindow from '../components/ChatWindow';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

function Chat() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <div>
      <Navbar />
      <ChatWindow />

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button
          onClick={handleLogout}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            backgroundColor: '#6c757d',
            color: '#fff',
            border: 'none',
            borderRadius: '5px'
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Chat;
