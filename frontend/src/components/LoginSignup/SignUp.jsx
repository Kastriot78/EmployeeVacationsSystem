import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../redux/apiCalls';
import { validateForm } from '../../utils/ValidateForm';
import { userSlice } from '../../redux/userRedux';
import { handleInputChange } from '../../utils/HandleOnChange';
import BtnLoader from '../../utils/BtnLoader';

import './style.css';

const SignUp = () => {
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState([]);
    const { errorMessage, loading, success } = useSelector(state => state.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignUp = (e) => {
        e.preventDefault();

        const errors = validateForm(formData, true);
        setErrors(errors);

        if (Object.keys(errors).length === 0) {
            register(formData, dispatch);
        }
    }

    useEffect(() => {
        if (success) {
            setFormData({ name: '', lastName: '', email: '', password: '' });
            navigate('/');
        }
        return (() => {
            dispatch(userSlice.actions.clearState());
        })
    }, [success, navigate, dispatch]);

    return (
        <div className='login_wrapper'>
            <div className="row auth_main">
                <div className="col-md-6 d-none d-md-block">
                    <div className='bg-image'></div>
                </div>
                <div className="col-md-6 auth-form-wrapper">
                    <div className='form-section'>
                        <h2 className='title'>Sign Up!</h2>
                        <p>Enter details to create your account</p>
                        {errorMessage && <div className="heading_error mb-4">
                            <span className='input_error m-0'>{errorMessage}</span>
                        </div>
                        }
                        <form action="" onSubmit={handleSignUp}>
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-group">
                                        <input
                                            name='name'
                                            type="text"
                                            className='form-control'
                                            placeholder='Name*'
                                            value={formData.name}
                                            onChange={(e) => handleInputChange(e, formData, setFormData, errors, setErrors)}
                                        />
                                        {errors.name && <span className='input_error'>{errors.name}</span>}
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group">
                                        <input
                                            name='lastName'
                                            type="text"
                                            className='form-control'
                                            placeholder='Last Name*'
                                            value={formData.lastName}
                                            onChange={(e) => handleInputChange(e, formData, setFormData, errors, setErrors)}
                                        />
                                        {errors.lastName && <span className='input_error'>{errors.lastName}</span>}
                                    </div>
                                </div>
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
                                <span className='already_text'>
                                    Already Registered?
                                    <Link to="/">Login</Link>
                                </span>
                            </div>
                            <div>
                                <button className='btn auth-btn'>
                                    {loading ? <BtnLoader /> : 'Register'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp;
