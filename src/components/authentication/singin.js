import React, { useState } from "react";

const Singup = () =>
{

    const signupForm = {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        mobile: '',
    };

    const signupErros = {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        mobile: '',
    };

    const [formData, setFormData] = useState(signupForm);
    const [errors, setErrors] = useState(signupErros);

    const handleSubmit = (e) =>
    {
        e.preventDefault();

        const errorMessage = Object.keys(formData).reduce((acc,field) => {
            const error = validations[field](formData[field]);
            acc[field] = error;
            return acc;
        });

        setErrors(errorMessage);

        if(Object.values(errorMessage).every((err) => err === "")) {
            console.log("Form submitted successfully!", formData);

        }


    }

    const handleInputChange = (e) =>
    {

        const { name, value } = e.target;
        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));

        const error = validations[name](value);

        setErrors((previousError) => ({
            ...previousError,
            [name]: error
        }));

    };

    const validations = {
        fistname: (value) => value ? "" : "First name is required",
        lastname: (value) => value ? "" : "Last name is required",
        email: (value) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) ? "" : "Email is required",
        mobile: (value) => /^\d{10}$/.test(value) ? "" : "Mobile number must be 10 digits.",
        password: (value) => value ? "" : "Password is required"
    };

    <div>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label> First Name</label>
                <input type="text" name="firstname" onChange={handleInputChange} />
            </div>
            {errors.firstname && <span className="text-danger">{errors.firstname}</span>}
            <div className="form-group">
                <label> Last Name</label>
                <input type="text" name="lastname" onChange={handleInputChange} />
            </div>
            <div className="form-group">
                <label> Email</label>
                <input type="text" name="email" onChange={handleInputChange} />
            </div>
            <div className="form-group">
                <label> mobile</label>
                <input type="text" name="mobile" onChange={handleInputChange} />
            </div>
            <div className="form-group">
                <label> Password</label>
                <input type="text" name="password" onChange={handleInputChange} />
            </div>
        </form>
    </div>

};

export default Singup;