import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import apiInstace from "../../interceptor/axiosInstance";
import { Api_url, SELECTED_PROJECT_USERS, USERS_LIST } from "../../services/apiservice";

const EditProject = () => {
    const location = useLocation();
    const { project } = location.state || {};
    const [getlocalStorage, setLocalstorage] = useState(null);

    const errorsMessage = {
        endDate: '',
        market: '',
        methodology: '',
        notes: '',
        projectDescription: '',
        projectName: '',
        startDate: '',
    }

    const formDataVa = {
        endDate: '',
        market: '',
        methodology: '',
        notes: '',
        projectDescription: '',
        projectName: '',
        startDate: '',
    }

    const [errors, setErrors] = useState(errorsMessage);
    const [formData, setFormData] = useState(formDataVa);
    const [getMarket, setMarketResponse] = useState([]);
    const [getMethodlogy, ssetMethodlyResponse] = useState([]);
    const [getUsers, selectedUsers] = useState([]);

    const validations = {
        endDate: (value) => (value ? "" : "End date is required"),
        market: (value) => (value ? "" : "Market is required"),
        methodology: (value) => (value ? "" : "Methodology is required"),
        notes: (value) => (value ? "" : "Notes is required"),
        projectDescription: (value) => (value ? "" : "Project Description is required"),
        projectName: (value) => (value ? "" : "Project Name is required"),
        startDate: (value) => (value ? "" : "Start date is required"),
    };

    useEffect(() => {
        const otpResponse = JSON.parse(localStorage.getItem("otpValidateResponse"));
        setLocalstorage(otpResponse.data.responseData[1][0]);
    }, []);

    useEffect(() => {
        if (getlocalStorage) {
            getMargetandMethodlogy();
            selectedProjectUser();
        }
    }, [getlocalStorage]);

    const inputHanleChange = (e) => {
        const { name, value } = e.target;
        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));

        setErrors((previous) => ({
            ...previous,
            [name]: validations[name](value)
        }));
    };

    const editProjectDetails = (e) => {
        e.preventDefault();

        const errorsMessage = Object.keys(formData).reduce((acc, field) => {
            acc[field] = validations[field](formData[field]);
            return acc;
        }, {});

        setErrors(errorsMessage);

        if (Object.values(errorsMessage).every(err => err === "")) {
            updateProjectDetails(); // API call to update project
        } else {
            console.error("Form validation failed");
        }
    };

    const updateProjectDetails = () => {
        const updatedProjectData = {
            projectId: project.projectId,
            projectName: formData.projectName,
            projectDescription: formData.projectDescription,
            startDate: formData.startDate,
            endDate: formData.endDate,
            market: formData.market,
            methodology: formData.methodology,
            notes: formData.notes,
            users: getUsers.map(user => user.id),
        };

        apiInstace.post(Api_url + '/updateProject', updatedProjectData)
            .then(response => {
                console.log("Project updated successfully", response);
                // Handle success, maybe redirect or show a success message
            })
            .catch(err => {
                console.error("API call failed", err);
            });
    };

    const getMargetandMethodlogy = () => {
        let payload = {
            "REQ_ID": 9,
            "_USER_ID": getlocalStorage?.userId
        };

        apiInstace.post(Api_url + USERS_LIST, payload).then(resp => {
            console.log("market_name", resp.data.responseData[1][0].market_name);
            ssetMethodlyResponse(resp.data.responseData[1][0].methodology_name);
            setMarketResponse(resp.data.responseData[1][0].market_name);
            console.log("methodlogy", resp.data.responseData[1][0].methodology_name);
        }).catch(err => {
            console.error("API fetch failed", err);
        });
    };

    const selectedProjectUser = () => {
        let payload = {
            projectId: project.projectId,
            userId: getlocalStorage?.userId
        };

        apiInstace.post(Api_url + SELECTED_PROJECT_USERS, payload).then((resp) => {
            console.log("response", resp.data.responseData[2][0].project_Users);
            const filterRecordsBasedOnYes = resp.data.responseData[2][0].project_Users.filter((selectedObj, index, list) => {
                return selectedObj.status === 'Yes' &&
                    list.findIndex(listObj => listObj === selectedObj) === index;
            });
            console.log("Filtered Users: ", filterRecordsBasedOnYes);
            selectedUsers(filterRecordsBasedOnYes);
        }).catch(err => {
            console.error("Error occurred", err);
        });
    };

    const handleCancel = () => {
        // Reset form or navigate away (e.g., using react-router)
        setFormData(formDataVa); // Reset form
        setErrors(errorsMessage); // Reset errors
        // Optionally, navigate to another page or reset state
        console.log("Form reset");
    };

    return (
        <div className="m-4 p-4">
            <form onSubmit={editProjectDetails}>
                <h2> Edit Project </h2>

                <div className="form-group">
                    <label> Project Name </label>
                    <input
                        type="text"
                        placeholder="Project Name"
                        value={formData.projectName || project.projectName}
                        className="w-100"
                        onChange={inputHanleChange}
                        name="projectName"
                    />
                    {errors.projectName && <div className="error">{errors.projectName}</div>}
                </div>

                <div className="form-group">
                    <label> Project Description </label>
                    <textarea
                        rows={5}
                        placeholder="Project Description"
                        value={formData.projectDescription || project.projectDescription}
                        className="w-100"
                        onChange={inputHanleChange}
                        name="projectDescription"
                    />
                    {errors.projectDescription && <div className="error">{errors.projectDescription}</div>}
                </div>

                <div className="form-group">
                    <label> Project Members </label>
                    <div className="itemList">
                        {getUsers.map(item => (
                            <div key={item.id}>
                                {item.roleName}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="row">
                    <div className="col-6">
                        <div className="form-group">
                            <label> Start Date </label>
                            <input
                                type="date"
                                value={formData.startDate || project.startDate}
                                className="w-100"
                                onChange={inputHanleChange}
                                name="startDate"
                            />
                            {errors.startDate && <div className="error">{errors.startDate}</div>}
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label> End Date </label>
                            <input
                                type="date"
                                value={formData.endDate || project.endDate}
                                className="w-100"
                                onChange={inputHanleChange}
                                name="endDate"
                            />
                            {errors.endDate && <div className="error">{errors.endDate}</div>}
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-6">
                        <div className="form-group">
                            <label> Market </label>
                            <select
                                className="w-100 form-control"
                                value={formData.market || project.market}
                                onChange={inputHanleChange}
                                name="market"
                            >
                                <option value={''} disabled> Select Market </option>
                                {getMarket.map((item, index) => (
                                    <option key={index} value={item}>{item}</option>
                                ))}
                            </select>
                            {errors.market && <div className="error">{errors.market}</div>}
                        </div>
                    </div>

                    <div className="col-6">
                        <div className="form-group">
                            <label> Methodology </label>
                            <select
                                className="w-100 form-control"
                                value={formData.methodology || project.methodology}
                                onChange={inputHanleChange}
                                name="methodology"
                            >
                                <option value={''} disabled> Select Methodology </option>
                                {getMethodlogy.map((item, index) => (
                                    <option key={index} value={item}>{item}</option>
                                ))}
                            </select>
                            {errors.methodology && <div className="error">{errors.methodology}</div>}
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <label> Notes </label>
                    <textarea
                        rows={5}
                        placeholder="Project Notes"
                        value={formData.notes || project.notes}
                        onChange={inputHanleChange}
                        className="w-100"
                        name="notes"
                    />
                    {errors.notes && <div className="error">{errors.notes}</div>}
                </div>

                <div className="d-flex justify-content-center mt-4">
                    <button className="btn btn-danger" type="button" onClick={handleCancel}> Cancel </button>
                    <button className="btn btn-primary outline ms-2" type="submit"> Update </button>
                </div>
            </form>
        </div>
    );
};

export default EditProject;
