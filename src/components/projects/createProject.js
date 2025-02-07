import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiInstace from "../../interceptor/axiosInstance";
import { Api_url, CREATE_PROJECT, USERS_LIST } from "../../services/apiservice";

const CreateProject = () => {
    const navigate = useNavigate();

    const [modalVisible, setModalVisible] = useState(false);
    const [getlocalStorage, setLocalstorage] = useState(null);
    const toggleModal = () => {
        setModalVisible(!modalVisible);
    }

    // form validations and state
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
        pedate: (value) => (value ? "" : "Project end date is required"),
        pmarket: (value) => (value ? "" : "Project market is required"),
        pmethd: (value) => (value ? "" : "Project methodology is required"),
        pnote: (value) => (value ? "" : "")
    };

    const [formData, setFormData] = useState(projectCreateForm);
    const [getError, setErrors] = useState(projectCreateErrors);
    const [filterParams, setFilterParams] = useState([]);

    // set uses list
    const [getUsersListResponse, setUserListResponse] = useState([]);
    // filter userecords based on id
    const [getActiveUser, setActiveUsers] = useState([]);



    useEffect(() => {
        const otpResponse = JSON.parse(localStorage.getItem("otpValidateResponse"));
        setLocalstorage(otpResponse.data.responseData[1][0]);

    }, []);

    useEffect(() => {
        console.log("local storage response", getlocalStorage);
        if (getlocalStorage) {
            userslistapi();
            getMargetandMethodlogy();

        }

    }, [getlocalStorage])

    const handleInputs = (e) => {
        const { name, value } = e.target;
        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));

        setErrors((previousError) => ({
            ...previousError,
            [name]: formValidations[name](value)
        }));
    };

    // userslist

    const userslistapi = () => {

        let payload = {
            "REQ_ID": 6,
            "_USER_ID": getlocalStorage?.userId,

        }
        apiInstace.post(Api_url + USERS_LIST, payload).then((resp) => {

            console.log("users list here", resp);
            if (resp.data.responseCode === 1) {
                alert("fatching user list facing the issue")
            } else {
                let showActiveUsers = resp.data.responseData[1].filter(item => item.status === "Active");
                console.log("Active users", showActiveUsers);

                setUserListResponse(showActiveUsers)
            }


        }).catch(err => {
            console.error("error occred", err);

        })
    }

    const getMargetandMethodlogy = () => {

        let payload = {
            "REQ_ID": 9,
             "_USER_ID": "getlocalStorage?.userId"
        };

        apiInstace.post(Api_url+USERS_LIST,payload).then(resp => {
            console.log("response",resp);
            

        }).catch(err => {
            console.error("api fatch response failed",err);
            
        })


    }

    const handleCheckboxSelect = (e) => {
        let exists = filterParams.find(filter => filter === e.target.value); // Check if value already exists in the array
        if (exists) {
            const updatedFilters = filterParams.filter(filter => filter !== e.target.value); // Remove the item if it exists
            setFilterParams(updatedFilters); // Update the state with the new array
            console.log("selected checkboxs", updatedFilters)
        } else {
            const updatedFilters = [...filterParams, e.target.value];
            setFilterParams(updatedFilters);
            console.log("removed checkboxs", updatedFilters)

        }
    };



    const handleSubmit = (e) => {
        e.preventDefault();

        const errorMessage = Object.keys(formData).reduce((acc, fields) => {
            acc[fields] = formValidations[fields](formData[fields]);
            return acc;
        }, {});

        setErrors(errorMessage);

        if (Object.values(errorMessage).every(err => err === "")) {
            const payload = {
                "ProjName": formData.pname,
                "ProjDesc": formData.pdesc,
                "ProjStatus": "Draft",
                "StartDate": formData.psdate,
                "EndDate": formData.pedate,
                "Market": formData.pmarket,
                "Methodology": formData.pmethd,
                "Notes": formData.pnote,
                "userId": getlocalStorage?.userId,
                "ProjUsers": []
            };

            apiInstace.post(Api_url + CREATE_PROJECT, payload).then((resp) => {
                if (resp.responseCode === 1) {
                    alert("Form submitting error");
                } else {
                    alert("Form submitted successfully");
                    navigate('/projects/projectsList');
                }
            });
        } else {
            console.error("Form validation error");
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

                {/* Trigger modal on click */}
                <button type="button" className="btn btn-primary" onClick={toggleModal}>
                    Assign
                </button>

                <div className="border p-2 mt-3"></div>

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

            {/* Modal */}
            {modalVisible && (
                <div className="modal fade show" style={{ display: "block" }} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Assign new users</h5>
                                <button type="button" className="btn-close" onClick={toggleModal} aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                {
                                    getUsersListResponse.map(item => (
                                        <div className="row" >
                                            <div className="col-sm-3">
                                                <p className="m-0">{item.user_name}</p>
                                                <p className="font-sm m-0 text-red smallText">{item.user_name}</p>
                                            </div>
                                            <div className="col-sm-6">
                                                {item.company_name}
                                            </div>
                                            <div className="col-sm-2">
                                                <input type="checkbox" id="vehicle1" name="vehicle1" value={item.login_id}

                                                    onChange={(e) => handleCheckboxSelect(e)}
                                                />
                                            </div>
                                            <hr />
                                        </div>


                                    ))
                                }

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={toggleModal}>Close</button>
                                <button type="button" className="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            )
            }
        </div >
    );
};

export default CreateProject;
