import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import {changePassword} from '../../features/user/userSlice.js';

const ProfilePassword = (props) => {
  const isDetail = props.isDetail;
  
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  const [validationError, setValidationError] = useState('');
  const dispatch = useDispatch();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { oldPassword, newPassword, confirmPassword } = passwordData;
    
    // Validation checks
    if (newPassword !== confirmPassword) {
      setValidationError('New password and confirm password do not match');
      return;
    }
    
    if (newPassword.length < 6 || newPassword.length > 18) {
      setValidationError('New password must be between 6 and 18 characters');
      return;
    }
    
    if (oldPassword === newPassword) {
      setValidationError('Old password and new password cannot be the same');
      return;
    }
    console.log(props.currentUser.id)
    await dispatch(changePassword({
      id: props.currentUser.id,
      newPass: newPassword,
      oldPass: oldPassword
    })).then(
      (response) => {
        console.log(response)
      }
    )
    
    setValidationError('');
  };
  
  return (
    <div
      id="password_tab"
      className={!isDetail ? 'tab-pane fade show active' : 'tab-pane fade'}
    >
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Change Password</h5>
          {validationError && <p className="text-danger">{validationError}</p>}
          <div className="row">
            <div className="col-md-10 col-lg-6">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Old Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="oldPassword"
                    value={passwordData.oldPassword}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handleInputChange}
                  />
                </div>
                <button className="btn btn-primary" type="submit">
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePassword;
