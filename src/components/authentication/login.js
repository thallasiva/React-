import { Link, useNavigate } from 'react-router-dom';
import '../authentication/authentication.css'; 
import { useState } from 'react';

const Login = () => {
    const navigate = useNavigate();

    const loginForm = {
        email: '',
        password: ''
    };
    const loginErrors = {
        email: '',
        password: ''
    };

    const [formData, setFormData] = useState(loginForm);
    const [errors, setErrors] = useState(loginErrors);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate both fields before submitting
        const newErrors = { ...loginErrors };
        handleErrors('email', formData.email, newErrors);
        handleErrors('password', formData.password, newErrors);

        if (!newErrors.email && !newErrors.password) {
            navigate('/otp'); // Proceed to OTP page if no errors
        } else {
            setErrors(newErrors); // Update error state
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleErrors = (name, value, newErrors) => {
        let errorMessage = '';
        
        if (name === 'email') {
            if (!value) {
                errorMessage = 'Email is required';
            } 
        }

        if (name === 'password') {
            if (!value) {
                errorMessage = 'Password is required';
            }
        }

        newErrors[name] = errorMessage;
    };

    return (
        <div className="login-container">
            <h3 className="text-center">Project Management</h3>
            <p className="text-center text-sm">Project login to continue</p>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleInputChange} 
                    />
                    {errors.email && <small className="text-danger">{errors.email}</small>}
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        name="password" 
                        value={formData.password} 
                        onChange={handleInputChange} 
                    />
                    {errors.password && <small className="text-danger">{errors.password}</small>}
                </div>
                <p className="float-end text-sm">
                    <Link to="/forgot-password">Forgot password?</Link>
                </p>
                <button type="submit" className="btn btn-primary w-100">Submit</button>
            </form>
        </div>
    );
};

export default Login;
