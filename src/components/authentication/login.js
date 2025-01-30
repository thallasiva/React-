import { Link, useNavigate } from 'react-router-dom';
import '../authentication/authentication.css';
import { useState } from 'react';
import { Api_url, SIGN_IN } from '../../services/apiservice';
import axios from 'axios';
const Login = () =>
{
    const navigate = useNavigate();

    const loginForm = {
        email: '',
        password: ''
    };
    const loginErrors = {
        email: '',
        password: ''
    };

    const validations = {
        email: (value) => (value ? "" : "Email is required"),
        password: (value) => (value ? "" : "Password is required")
    };

    const [formData, setFormData] = useState(loginForm);
    const [errors, setErrors] = useState(loginErrors);

    const handleSubmit = (e) =>
    {
        e.preventDefault();

        const errorMessages = Object.keys(formData).reduce((acc, fields) =>
        {
            acc[fields] = validations[fields](formData[fields]);
            return acc;
        }, {});

        setErrors(errorMessages);

        if (Object.values(errorMessages).every((err) => err === ""))
        {
            console.log("Form submitted successfully");
            const credentials = {
                email: formData.email,
                password: formData.password,
            };
            axios.post(`${Api_url}${SIGN_IN}`,credentials).then((resp) =>
            {
                console.log("response", resp);

                if (resp.data.responseCode === 1)
                {
                    alert(resp.data.responseData)

                } else
                {
                    localStorage.setItem("loginResponse", JSON.stringify(resp.data));
                    navigate('/otp');
                }
            })
            // handle successful form submission (e.g., navigation or API call)
        }
    };

    const handleInputChange = (e) =>
    {
        const { name, value } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));

        setErrors((previousErrors) => ({
            ...previousErrors,
            [name]: validations[name](value)
        }));
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
