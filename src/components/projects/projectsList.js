import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiInstance from "../../interceptor/axiosInstance";
import { Api_url, EDIT_OR_DELETE_PROJECTS, GET_PROJECTS_LIST } from "../../services/apiservice";

const ProjectList = () => {

    const [projectsList, setProjects] = useState([]);
    const [otpValidateResponse, otpSetResponse] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        try {
            let otpResponse = JSON.parse(localStorage.getItem('otpValidateResponse'));
            console.log("otp validation respoinse", otpResponse.data.responseData[1][0]);
            if (otpResponse && otpResponse.data && otpResponse.data.responseData) {
                otpSetResponse(otpResponse);
            }
        } catch (error) {
            console.error("Error parsing OTP validation response", error);
        }
    }, []);

    useEffect(() => {
        if (otpValidateResponse) {
            getProjectsList();
            console.log("otpValidateResponse", otpValidateResponse);
        }
    }, [otpValidateResponse]);

    const getProjectsList = () => {
        let payload = {
            "userId": otpValidateResponse.data.responseData[1][0].userId
        }
        apiInstance.post(Api_url + GET_PROJECTS_LIST, payload)
            .then(resp => {
                console.log("Response:", resp);
                setProjects(resp.data.responseData[1]); // Assuming response contains data you need

            })
            .catch(err => {
                console.error("Error occurred", err);
            })
    }

    const deleteProject = (selectedProject) => {
        console.log("selectedProject", selectedProject);

        let payload = {
            "ProjName": selectedProject.projectName,
            "ProjDesc": selectedProject.projectDescription,
            "ProjStatus": "Deleted",
            "StartDate": selectedProject.startDate,
            "EndDate": selectedProject.endDate,
            "Market": selectedProject.market,
            "Methodology": selectedProject.methodology,
            "Notes": selectedProject.notes,
            "userId": otpValidateResponse.data.responseData[1][0].userId,
            "ProjId": selectedProject.projectId
        }

        apiInstance.post(Api_url + EDIT_OR_DELETE_PROJECTS, payload).then((resp) => {

            if(resp.data.responseCode === 1) {
                alert("Invalid request")
            }else {
                alert("project deleted successfully");
                getProjectsList();
            }
        }).catch(err => {
            console.error("error occured", err);

        })

    }

    const getProjectButtonStyle = (buttonStatus) => {
        switch (buttonStatus) {
            case "Draft":
                return { backgroundColor: "#f4f6f6", color: "white", border: "none", width: '120px' }
            case "In Progress":
                return { backgroundColor: "#ffbc65", color: "white", border: "none", width: '120px' }
            case "Complete":
                return { backgroundColor: "green", color: "white", border: "none", width: '120px' }
            default:
                return { backgroundColor: "black", color: "white", border: "none", width: '120px' }
        }
    }

    const disbaleButtonOnStatusBased = (disableButton) => {
        switch (disableButton) {
            case "Draft":
                return { backgroundColor: "#f4f6f6", color: "white", border: "none", width: '120px', pointerEvents: 'none' }
            case "In Progress":
                return { backgroundColor: "#f4f6f6", color: "white", border: "none", width: '120px', pointerEvents: 'none' }
            case "Complete":
                return { backgroundColor: "green", color: "white", border: "none", width: '120px' }
            default:
                return { backgroundColor: "black", color: "white", border: "none", width: '120px' }
        }
    }

    const editProjectDetails = (selectedProjectDetails) => {
        console.log("selectedProjectDetails", selectedProjectDetails);
        navigate('/projects/viewProject', { state: { project: selectedProjectDetails } });
    };

    return (
        <div className="p-4">
            <div className="mb-4">
                <div className="mb-4">
                    <span className="float-start">
                        <input type="text" placeholder="search" />
                    </span>
                    <Link to={'/projects/createProject'} className="btn btn-primary float-end mb-3">
                        Create Project
                    </Link>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {projectsList.map((project) => (
                        <tr key={project.id}>
                            <td onClick={() => editProjectDetails(project)}>{project.projectName}</td>
                            <td>{project.startDate}</td>
                            <td>{project.endDate}</td>
                            <td><button style={getProjectButtonStyle(project.projectStatus)} className="btn btn-success rounded-pill">
                                {project.projectStatus}
                            </button></td>
                            <td><button style={disbaleButtonOnStatusBased(project.projectStatus)} className="btn btn-secondary rounded-pill">Archive</button>
                                <button type="button" className="btn btn-primary rounded-pill ms-3" onClick={() => deleteProject(project)}> Delete Button </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProjectList;
