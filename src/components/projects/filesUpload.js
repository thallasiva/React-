import React, { useEffect, useState } from "react";

import apiInstace from "../../interceptor/axiosInstance";
import { Api_url, PROJECT_FOLDER_FILES } from "../../services/apiservice";

const FilesUpload = (project) => {
    const [apiResponse, setApiResponse] = useState({});

    console.log("project details", project);


    useEffect(() => {
        let payload = { "REQ_ID": 5, "_PROJ_ID": project.project.projectId, "_USER_ID": 27 }
        apiInstace.post(Api_url + PROJECT_FOLDER_FILES, [payload]).then((resp) => {
            if (resp.responseCode === 1) {
                alert("invalid response");
            } else {
                console.log("resp.responseData[0][0]", resp.data.responseData[0][0].folder_structure);
                setApiResponse(resp.responseData)
            }
        }).catch(err => {
            console.error("error occurred:", err);
        })
    }, [project]);  // Add `project` as dependency if it can change over time
    

    return (
        <div>
            <p> Files upload</p>
        </div>
    )
};

export default FilesUpload;