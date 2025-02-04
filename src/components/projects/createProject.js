import React, { useEffect, useState } from "react";
import apiInstace from "../../interceptor/axiosInstance";
import { useNavigate } from "react-router-dom";
import { Api_url, CREATE_PROJECT } from "../../services/apiservice";

const CreateProject = () => {

    const navigate = useNavigate();

    // form validations here

    const projectCreateForm = {

        pname: '',
        pdesc: '',
        psdate: '',
        pedate: '',
        pmarket: '',
        pmethd: '',
        pnote: ''
    };

    const projectCreateErrors = {
        pname: '',
        pdesc: '',
        psdate: '',
        pedate: '',
        pmarket: '',
        pmethd: '',
        pnote: ''
    };


    const formValidations = {
        pname: (value) => (value ? "" : "Project name is required"),
        pdesc: (value) => (value ? "" : "Project description is required"),
        psdate: (value) => (value ? "" : "Project start date is required"),
        pedate: (value) => (value ? "" : "Project start date is required"),
        pmarket: (value) => (value ? "" : "Project start date is required"),
        pmethd: (value) => (value ? "" : "Project start date is required"),
        pnote: (value) => (value ? "" : "")
    };

    // set and get form validations
    const [formData, setFormData] = useState(projectCreateForm);
    const [getError, setErrors] = useState(projectCreateErrors);
    const [getLocalDtrgeValues, setLocalStorage] = useState(null);

    useEffect(() => {
        const otpResp = setLocalStorage(JSON.parse(localStorage.getItem('otpValidateResponse')));
        console.log("otp response", otpResp);


    },[]);



    useEffect(() => {
        console.log("otp response here",getLocalDtrgeValues);


    },[getLocalDtrgeValues]);  // Fetch users and projects once otpValidate is set




    // handle input values
    const handleInputs = (e) => {
        const { name, value } = e.target;
        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));

        setErrors((preivousError) => ({
            ...preivousError,
            [name]: formValidations[name](value)
        }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        const errorMessage = Object.keys(formData).reduce((acc, fields) => {
            acc[fields] = formValidations[fields](formData[fields]);
            return acc;
        }, {});

        setErrors(errorMessage);

        if (Object.values(errorMessage).every(err => err === "")) {
            console.log("form submitted successfully");

            const payload = {
                "ProjName": formData.pname,
                "ProjDesc": formData.pdesc,
                "ProjStatus": "Draft",
                "StartDate": formData.psdate,
                "EndDate": formData.pedate,
                "Market": formData.pmarket,
                "Methodology": formData.pmethd,
                "Notes": formData.pnote,
                "userId": "27",
                "ProjUsers": []

            }

            apiInstace.post(Api_url + CREATE_PROJECT, payload).then((resp) => {
                if (resp.responseCode === 1) {
                    alert("form submitting error");
                } else {
                    alert("form submitted successfully");
                    navigate('/projects/projectsList')
                }
            })

        } else {
            console.error("form validation error");

        }
    }




    return (
        <div className="p-4 container">

            <h3> Create Project </h3>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label> Project Name </label>
                    <input type="text" className="form-control" name="pname" value={formData.pname} onChange={handleInputs} />
                </div>
                {getError.pname && <span className="text-danger">{getError.pname}</span>}


                <div className="form-group">
                    <label> Project Description </label>
                    <textarea rows={4} className="w-100" name="pdesc" value={formData.pdesc} onChange={handleInputs} />
                </div>
                {getError.pdesc && <span className="text-danger">{getError.pdesc}</span>}
                <button type="button" className="btn btn-primary ms-2 btn-sm"> Assign </button>

                <div className="border p-2 mt-3">

                </div>

                <div className="row">
                    <div className="col-sm-6">
                        <label> Start Date </label>
                        <input type="date" className="form-control" name="psdate" value={formData.psdate} onChange={handleInputs} />
                    </div>
                    {getError.psdate && <span className="text-danger">{getError.psdate}</span>}

                    <div className="col-sm-6">
                        <label> End Date </label>
                        <input type="date" className="form-control" name="pedate" value={formData.pedate} onChange={handleInputs} />
                    </div>
                    {getError.pedate && <span className="text-danger">{getError.pedate}</span>}

                </div>

                <div className="row">
                    <div className="col-sm-6">
                        <label> Market </label>
                        <select className="w-100 form-control" name="pmarket" value={formData.pmarket} onChange={handleInputs}>
                            <option value={1}> One </option>
                            <option value={2}> Two </option>
                            <option value={3}> Three </option>
                        </select>
                    </div>
                    {getError.pmarket && <span className="text-danger">{getError.pmarket}</span>}

                    <div className="col-sm-6">
                        <label> Methodology </label>
                        <select className="w-100 form-control" name="pmethd" value={formData.pmethd} onChange={handleInputs}>
                            <option value={1}> One </option>
                            <option value={2}> Two </option>
                            <option value={3}> Three </option>
                        </select>
                    </div>
                    {getError.pmethd && <span className="text-danger">{getError.pmethd}</span>}

                </div>

                <div className="form-group">
                    <label> Notes </label>
                    <textarea rows={5} className="w-100" name="pnote" value={formData.pnote} onChange={handleInputs} />
                </div>
                <div className="float-end mb-3">
                    <button type="submit" className="btn btn-danger ms-2 btn-sm"> Save </button>
                    <button type="button" className="btn btn-success ms-2 btn-sm"> Create </button>
                    <button type="button" className="btn btn-secondary ms-2 btn-sm"> Cancel </button>
                </div>
            </form>
        </div>
    )

};

export default CreateProject;