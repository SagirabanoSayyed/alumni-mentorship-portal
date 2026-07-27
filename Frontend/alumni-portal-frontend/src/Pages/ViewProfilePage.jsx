import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";


function ViewProfilePage() {

    const { id } = useParams();

    const [profile, setProfile] = useState(null);
    const [message, setMessage] = useState("");

    const sendRequest = async () => {

        try {
            
            const token = localStorage.getItem("token");
            const response = await axios.post(
                "http://localhost:8080/request",
                {
                    mentorId: profile.user.userId,
                    message: message
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            
            alert(response.data);
            
            if(response.data === "Request Sent Successfully"){
                setMessage("");
            }
    
        } catch(error) {

            console.log(error);
        
            if(error.response){
                alert(error.response.data);
            } else {
                alert("Failed To Send Request");
            }
        }
    };

    useEffect(() => {

    const token = localStorage.getItem("token");

    axios.get(
        `http://localhost:8080/profile/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
    .then(response => {

        setProfile(response.data);

    })
    .catch(error => {

        console.log(error);

    });

}, [id]);


    if (!profile) {
        return (
            <div className="text-center mt-5">
                <h2>Loading Profile...</h2>
            </div>
        );
    }

    return (
        <>
            <Sidebar />

            <div
                className="container py-4"
                style={{ marginLeft: "260px" }}
            >

                <div className="card shadow border-0">

                    <div
                        className="bg-primary"
                        style={{
                            height: "150px"
                        }}
                    ></div>

                    <div className="card-body text-center">

                        <img
                            src={
                                profile.profilePicture ||
                                "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                            }
                            alt="Profile"
                            className="rounded-circle shadow"
                            style={{
                                width: "140px",
                                height: "140px",
                                marginTop: "-80px",
                                objectFit: "cover"
                            }}
                        />

                        <h2 className="mt-3">
                            {profile.user?.fullName}
                        </h2>

                        <span className="badge bg-success">
                            {profile.user?.role}
                        </span>

                        <p className="mt-3">
                            {profile.aboutMe}
                        </p>

                    </div>

                </div>

                <div className="row mt-4">

                    <div className="col-md-6">

                        <div className="card shadow-sm">

                            <div className="card-body">

                                <h4>
                                    Professional Details
                                </h4>

                                <hr />

                                <p>
                                    <strong>Company:</strong>
                                    {" "}
                                    {profile.company || "N/A"}
                                </p>

                                <p>
                                    <strong>Designation:</strong>
                                    {" "}
                                    {profile.designation || "N/A"}
                                </p>

                                <p>
                                    <strong>Industry:</strong>
                                    {" "}
                                    {profile.industry || "N/A"}
                                </p>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-6">

                        <div className="card shadow-sm">

                            <div className="card-body">

                                <h4>
                                    Education
                                </h4>

                                <hr />

                                <p>
                                    <strong>Graduation Year:</strong>
                                    {" "}
                                    {profile.graduationYear || "N/A"}
                                </p>

                                <p>
                                    <strong>Email:</strong>
                                    {" "}
                                    {profile.user?.email}
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

                <div className="card shadow-sm mt-4">

                    <div className="card-body">

                        <h4>
                            Professional Links
                        </h4>

                        <hr />

                        {profile.linkedinUrl && (
                            <p>
                                <a
                                    href={profile.linkedinUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    LinkedIn Profile
                                </a>
                            </p>
                        )}

                        {profile.githubUrl && (
                            <p>
                                <a
                                    href={profile.githubUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    GitHub Profile
                                </a>
                            </p>
                        )}

                        {profile.resumeUrl && (
                            <p>
                                Resume:
                                {" "}
                                {profile.resumeUrl}
                            </p>
                        )}

                    </div>

                </div>

                {profile.user?.role !== "STUDENT" && (

<div className="card shadow-sm mt-4">

    <div className="card-body">

        <h4>Request Mentorship</h4>

        <textarea
            className="form-control mb-3"
            rows="4"
            placeholder="Write your request..."
            value={message}
            onChange={(e) =>
                setMessage(e.target.value)
            }
        />

        <button
            className="btn btn-success"
            onClick={sendRequest}
        >
            Send Mentorship Request
        </button>

    </div>

</div>

)}

                

            </div>

        </>
    );
}

export default ViewProfilePage;