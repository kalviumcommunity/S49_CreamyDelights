import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';
import Joi from 'joi';
import Cookie from "js-cookie"

const schema = Joi.object({
  name: Joi.string().required().label('Name'),
  email: Joi.string().required().label('Email'),
  password: Joi.string().min(6).required().label('Password'),
});

function Profile({ closeModal }) {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const userDataResponse = await axios.get('http://localhost:8000/getUserData');
      setUsers(userDataResponse.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const validation = schema.validate(formData, { abortEarly: false });
      if (validation.error) {
        const newErrors = {};
        validation.error.details.forEach((error) => {
          newErrors[error.path[0]] = error.message;
        });
        setErrors(newErrors);
      } else {
        setErrors({});
        if (editingUser) {
          await axios.put(`http://localhost:8000/updateUser/${editingUser._id}`, formData);
          alert('User profile updated successfully!');
          closeModal();
          await fetchUserData();
          setFormData({ name: '', email: '', password: '' });
          setEditingUser(null);
          console.log(formData);
        } else {
          const response= await axios.post('http://localhost:8000/postUserData', formData);
          alert('User profile saved successfully!');
          closeModal();
          await fetchUserData();
          setFormData({ name: '', email: '', password: '' });
          Cookie.set("Username",formData.name)
          Cookie.set("Token",response.data.token)
        }
      }
    } catch (error) {
      console.error('Error saving user profile:', error);
    }
  };

  const editUser = (user) => {
    setFormData({ name: user.name, email: user.email, password: '' }); // Set form data to the user being edited
    setEditingUser(user);
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:8000/deleteUser/${userId}`);
      await fetchUserData();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="reg">LogIn</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>
          <button type="submit">{editingUser ? 'Update' : 'Submit'}</button>
        </form>

        <div>
          <h3>Users:</h3>
          <ul>
            {users.map((user) => (
              <li key={user._id}>
                {user.name} - {user.email}
                <button onClick={() => editUser(user)}>Edit</button>
                <button onClick={() => deleteUser(user._id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Profile;
