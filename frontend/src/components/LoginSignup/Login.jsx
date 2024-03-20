import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { validateForm } from '../../utils/ValidateForm';
import { login } from '../../redux/apiCalls';
import { handleInputChange } from '../../utils/HandleOnChange';
import BtnLoader from '../../utils/BtnLoader';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState([]);
  const { loading, errorMessage, success, user } = useSelector(state => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const errors = validateForm(formData, false);
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      login(formData, dispatch);
    }
  }

  useEffect(() => {
    if (user) {
      setFormData({ email: '', password: '' });
      if (user?.isAdmin) {
        navigate('/admin/admin-dashboard');
      } else {
        navigate('/home');
      }
    }
  }, [success, navigate, user]);

  return (
    <div className='login_wrapper'>
      <div className="row auth_main">
        <div className="col-md-6 d-none d-md-block">
          <div className='bg-image'></div>
        </div>
        <div className="col-md-6 auth-form-wrapper">
          <div className='form-section'>
            <h2 className='title'>Welcome</h2>
            <div>
              <p className='need_account'>
                Need an account?
                <Link to="/sign-up">Sign Up</Link>
              </p>
            </div>
            {errorMessage && <div className="heading_error mb-4">
              <span className='input_error m-0'>{errorMessage}</span>
            </div>
            }
            <form action="" onSubmit={handleLogin}>
              <div className="row">
                <div className="col-12">
                  <div className="form-group">
                    <input
                      name="email"
                      type="email"
                      className='form-control'
                      placeholder='Email*'
                      value={formData.email}
                      onChange={(e) => handleInputChange(e, formData, setFormData, errors, setErrors)}
                    />
                    {errors.email && <span className='input_error'>{errors.email}</span>}
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <input
                      name="password"
                      type="password"
                      className='form-control'
                      placeholder='Password*'
                      value={formData.password}
                      onChange={(e) => handleInputChange(e, formData, setFormData, errors, setErrors)}
                    />
                    {errors.password && <span className='input_error'>{errors.password}</span>}
                  </div>
                </div>
              </div>
              <div>
                <button className='btn auth-btn'>
                  {loading ? <BtnLoader /> : 'Login'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
