import React, { useEffect, useState } from "react"
import { data, useLocation } from "react-router-dom";
import { Api_url, SELECTED_PROJECT_USERS } from "../../services/apiservice";
import apiInstace from "../../interceptor/axiosInstance";
import EditProject from "./editProject";
import FilesUpload from "./filesUpload";
const ViewProject = () => {

    const location = useLocation();
    const { project } = location.state || {};
    const [getlocalStorage, setlocalStorage] = useState(null);
    const [assingProjectMember, setAssginProjectMembers] = useState([]);

    const [selectedProjectName, setSelectedProject] = useState("View Project");

    const tabsGroup = [
        { id: 1, name: "Edit Project" },
        { id: 2, name: "Files" },
        { id: 3, name: "Milestones" },
        { id: 4, name: "Posts" },
        { id: 5, name: "Delete Project" }
    ];



    useEffect(() => {
        const otpResponse = JSON.parse(localStorage.getItem("otpValidateResponse"));
        console.log("asfdsadfasf", otpResponse);

        setlocalStorage(otpResponse.data.responseData[1][0]);
    }, [project]);

    useEffect(() => {
        if (getlocalStorage) {
            projectMembers();
            setSelectedProject("View Project")
        }
    }, [getlocalStorage])

    const selectProjectButtonStyle = (selectedProject) => {
        console.log("Selected project details", selectedProject);
        setSelectedProject(selectedProject.name); // Correct way to update state

    }


    // project member get api call

    const projectMembers = () => {
        console.log("get localstorage value", getlocalStorage);
        let payload = {
            projectId: project.projectId,
            userId: getlocalStorage?.userId
        };
        apiInstace.post(Api_url + SELECTED_PROJECT_USERS, payload).then(resp => {
            let names = resp.data.responseData[2][0].project_Users.filter((Object, index, listArr) => Object.status !== "No")
            console.log(names);
            setAssginProjectMembers(names);
        }).catch(err => {
            console.error("error occured", err);

        })
    }

    return (
        <div>
            <div className="d-flex justify-content-start border border-primary p-3">
                {
                    tabsGroup.map(item => {
                        return (
                            <button key={item.id} className="ms-3 w-200" onClick={() => selectProjectButtonStyle(item)}
                            > {item.name}</button>
                        )
                    })
                }
            </div>
            {selectedProjectName === 'View Project' && (
                <div>
                    <div className="form-group">
                        <label> Project Name</label>
                        <input type="text" placeholder="Project Name" className="form-control" value={project.projectName} readOnly />
                    </div>
                    <div className="form-group">
                        <label> Project Description</label>
                        <input type="text" placeholder="Project Description" className="form-control" value={project.projectDescription} readOnly />
                    </div>
                    <div className="form-group">
                        <label className="me-2">Project Members:</label>

                        <div className="d-flex border p-3">
                            {assingProjectMember.map(item => (
                                <span key={item.id} className="me-2 membersList">{item.userName}<br />{item.roleName}</span>
                            ))}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col form-group">
                            <label> Start Date</label>
                            <input type="date" className="form-control" value={project.startDate} readOnly />
                        </div>
                        <div className="col form-group">
                            <label> End Date</label>
                            <input type="date" className="form-control" value={project.endDate} readOnly />
                        </div>
                    </div>
                    <div className="form-group">
                        <label> Notes </label>
                        <textarea rows={5} placeholder="Note" className="form-control" value={project.notes} readOnly></textarea>
                    </div>
                </div>
            )}

            {/* edit project */}
            {selectedProjectName === 'Edit Project' && (
                <div>
                    <EditProject project={project} ></EditProject>
                    {/* <p>Edit Project Details</p> */}
                </div>
            )}

            {/* {selectedProjectName === 'Files' && (
                <div>
                    <FilesUpload></FilesUpload>
                </div>
            )} */}

            {selectedProjectName === 'Files' && (
                <div>
                    {/* <EditProject project={project} ></EditProject> */}
                    <FilesUpload project={project}></FilesUpload>
                    {/* <p>Edit Project Details</p> */}
                </div>
            )}
        </div>
    )

};

export default ViewProject;