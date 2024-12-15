import React from 'react';
import { useNavigate } from 'react-router-dom';
import UserInfoForm from './UserInfoForm';

const HealthTips = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    alert('You have logged out successfully!');
    navigate('/');
  };

  return (
    <div className="container mt-5">
      <UserInfoForm/>
      <div className="row">
        <div className="col-md-12 text-center mt-3">
        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default HealthTips;
