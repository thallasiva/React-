import { useLocation } from "react-router-dom";

const EditProject = () => {

    const location = useLocation();
    const { project } = location.state || {};

    const validations = {
        endDate: (value) => (value ? "" : "End date is required"),
        market: (value) => (value ? "" : "Market is required"),
        methodology: (value) => (value ? "" : "Methodology is required"),
        notes: (value) => (value ? "" : "Notes is required"),
        projectDescription: (value) => (value ? "" : "Project Description is required"),
        projectName: (value) => (value ? "" : "Project Name is required"),
        startDate: (value) => (value ? "" : "Start date is required"),
    }

    console.log("selected project details here", project);

    const inputHanleChange = (e) => {
        e.preventDefault();
    }


    return (
        <div className="m-4 p-4">
            <h2> Edit Project </h2>
            <div className="form-group">
                <label> Project Name </label>
                <input type="text" placeholder="project name" value={project.projectName} className="w-100" onChange={inputHanleChange} />
            </div>

            <div className="form-group">
                <label> Project Description </label>
                <textarea rows={5} placeholder="Project Description" value={project.projectDescription} className="w-100" onChange={inputHanleChange}></textarea>
            </div>

            <div className="form-group">
                <label> Project Members </label>
                <textarea rows={5} placeholder="Project Description" className="w-100" onChange={inputHanleChange}></textarea>
            </div>
            <div className="row">
                <div className="col-6">
                    <div className="form-group">
                        <label> Start Date </label>
                        <input type="date" placeholder="project name" value={project.startDate} className="w-100" onChange={inputHanleChange} />
                    </div>
                </div>
                <div className="col-6">

                    <div className="form-group">
                        <label> End Date </label>
                        <input type="date" placeholder="project name" value={project.endDate} className="w-100" onChange={inputHanleChange} />
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-6">
                    <div className="form-group">
                        <label> Market </label>
                        <select className="w-100 form-control" value={project.market} onChange={inputHanleChange}>
                            <option value={''}> Select Market</option>

                        </select>

                    </div>
                </div>
                <div className="col-6">

                    <div className="form-group">
                        <label> Methodology </label>
                        <select className="w-100 form-control" value={project.market} onChange={inputHanleChange}>
                            <option value={''}> Select Market</option>

                        </select>
                    </div>
                </div>
            </div>
            <div className="form-group">
                <label> Note </label>
                <textarea rows={5} placeholder="Project Description" value={project.notes} onChange={inputHanleChange} className="w-100"></textarea>
            </div>
        </div>
    )
};

export default EditProject;
