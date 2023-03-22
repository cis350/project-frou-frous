import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    const username = sessionStorage.getItem('username');
    if (username === '' || username === null) {
      navigate('/login');
    }
  }, []);
  return (
    <div>
      <div className="header">
        <Link to="/"> Home</Link>
        <Link to="/login"> Logout</Link>
      </div>
    </div>
  );
}

export default Home;
