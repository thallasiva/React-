import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import apiInstace from "../../interceptor/axiosInstance";
import { Api_url, PROJECT_USER_CONFIG_EDIT, SELECTED_PROJECT_USERS, USERS_LIST } from "../../services/apiservice";

const EditProject = ({ project }) => {
    const location = useLocation();
    // const { project } = location.state || {};
    const [getlocalStorage, setLocalstorage] = useState(null);
    const [assingProjectMemberList, setAssignMember] = useState([]);

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

        console.log("project details here", project);

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
            setAssignMember(resp.data.responseData[2][0].project_Users)
            const filterRecordsBasedOnYes = resp.data.responseData[2][0].project_Users.filter(selectedObj => selectedObj.status === 'Yes');
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

    // modal change

    const handleCheckboxChange = (e, selectedItem) => {
        // If checkbox is selected, set the status of the selected user to 'Yes'
        const updatedProjectUsers = assingProjectMemberList.map((user) => {
            if (user.userId === selectedItem.userId) {
                // If this is the selected user, set the status to "Yes"
                return { ...user, status: e.target.checked ? 'Yes' : 'No' };
            }
            // If it's not the selected user, set the status to "No"
            return { ...user, status: 'No' };
        });
    
        // Log only the userId and status for each user
        updatedProjectUsers.forEach(user => {
            console.log(`User ID: ${user.userId}, Status: ${user.status}`);
        });
    
        // Update the state with the modified list
        setAssignMember(updatedProjectUsers);
    };
    


    const editAssignMemberSave = () => {
        let payload = {
            "projUsers": [
                {
                    "projUserId": 9,
                    "projUserStatus": "Yes"
                }
            ],
            "updatedBy": "8",
            "ProjId": 1
        }

        apiInstace.post(Api_url + PROJECT_USER_CONFIG_EDIT, payload).then((resp) => {
            console.log("response", resp);
        }).catch(err => {
            console.error("error occured", err);
        });
    }

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
                {/* <button type="button" className="btn btn-primary mt-2 rounded-pill"> Assign </button> */}
                <button type="button" class="btn btn-primary mt-2 rounded-pill" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Assign
                </button>
                <div className="form-group">
                    <label> Project Members </label>
                    <div className="itemList d-flex ">
                        {getUsers.map(item => (
                            <div key={item.id} className="p-2 border m-1 rounded-pill text-center">
                                {item.userName}<br />
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

            {/* modal */}




            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Project Assign Members</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            {assingProjectMemberList.map((item, index) => (
                                <div key={index} className="d-flex align-items-center">
                                    <img
                                        src="https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg"
                                        alt="profile image"
                                        className="imageForAssign"
                                        style={{ width: '80px', height: '80px', marginRight: '10px' }} // Adjust size and margin
                                    />
                                    <div>
                                        <div>{item.userName}</div>
                                        <p>{item.roleName}</p>
                                    </div>
                                    <div className="checkbox" style={{ marginLeft: 'auto' }}>
                                        <input type="checkbox" checked={item.status === 'Yes'}
                                            onChange={(e) => handleCheckboxChange(e, item)} />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" onClick={editAssignMemberSave}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >


    );
};

export default EditProject;
