import React, { use, useEffect, useState } from "react";

import apiInstace from "../../interceptor/axiosInstance";
import { Api_url, PROJECT_FOLDER_FILES } from "../../services/apiservice";

const FilesUpload = (project) => {
    const [apiResponse, setApiResponse] = useState({});
    const [localStrorageResp, setLocalStorageRespone] = useState({});
    const [folderResponse, setFolderResponse] = useState([]); // Initialize as empty array

    console.log("project details", project);

    useEffect(() => {
        const localstorage = JSON.parse(localStorage.getItem('otpValidateResponse'));
        console.log("local storage response", localstorage);
        if (localstorage && localstorage.data.responseData) {
            setLocalStorageRespone(localstorage.data.responseData[1][0]);

        }
    }, [])


    useEffect(() => {
        if (!localStrorageResp || !project) {
            console.log("Missing data, skipping API call.");
            return;
        }

        console.log("localstorager response", localStrorageResp);
        let payload = { "REQ_ID": 5, "_PROJ_ID": project.project.projectId, "_USER_ID": localStrorageResp.userId }
        apiInstace.post(Api_url + PROJECT_FOLDER_FILES, [payload]).then((resp) => {
            if (resp.responseCode === 1) {
                alert("invalid response");
            } else {
                const folder_Data = resp.data.responseData[0][0].folder_structure || [];
                console.log("resp.responseData[0][0]", folder_Data);


                setApiResponse(resp.responseData);
                setFolderResponse(folder_Data);
            }
        }).catch(err => {
            console.error("error occurred:", err);
        })
    }, [project, localStrorageResp]);  // Add `project` as dependency if it can change over time





    return (
        <div>
            {
                folderResponse.map((item, index) => (
                    <div key={index}>

                        <img src="https://icon-library.com/images/folde-icon/folde-icon-28.jpg" alt="foler image" className="imageIcon" />
                        {item.folder_name}

                    </div>
                ))
            }
        </div>
    )
};

export default FilesUpload;