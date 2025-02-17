import React, { useEffect } from "react"
import { useLocation } from "react-router-dom";

const ViewProject = () => {

    const location = useLocation();
    const { project } = location.state || {};

    const tabsGroup = [
        { id: 1, name: "Edit Project" },
        { id: 2, name: "Files" },
        { id: 3, name: "Milestones" },
        { id: 4, name: "Posts" },
        { id: 5, name: "Delete Project" }
    ];



    useEffect(() => {
        console.log("project details here", project);
    }, [project]);

    const selectProjectButtonStyle = (selectedProject) => {
        console.log("Selected project details", selectedProject);
        // You can add any logic for handling the selected button click here.
    }

    return (
        <div>
            <p> View Project application here</p>
            <div className="d-flex justify-content-start border border-primary p-3">
                {
                    tabsGroup.map(item => {
                        return (
                            <button key={item.id} className="ms-3 w-200" onClick={() => selectProjectButtonStyle(item)}
                            > {item.name}</button>
                        )
                    })
                }
                {/* <button className="ms-3 w-200" > Edit Project </button>
                <button className="ms-3 w-200" > Files </button>
                <button className="ms-3 w-200" > Milestone </button>
                <button className="ms-3 w-200" > Posts </button>
                <button className="ms-3 w-200" > Delete Project </button> */}
            </div>
        </div >
    )

};

export default ViewProject;