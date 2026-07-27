import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

function CreateProfilePage() {

    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    const [profile, setProfile] = useState({
        aboutMe: "",
        company: "",
        designation: "",
        industry: "",
        graduationYear: "",
        linkedinUrl: "",
        githubUrl: "",
        resumeUrl: "",
        profilePicture: ""
    });

    useEffect(() => {

        const token = localStorage.getItem("token");

        axios.get(
            "http://localhost:8080/dashboard",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        .then(response => {
            setUser(response.data);
        })
        .catch(error => {
            console.log(error);
        });

    }, []);

    const handleChange = (e) => {

        setProfile({
            ...profile,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const token = localStorage.getItem("token");

            await axios.post(
                "http://localhost:8080/profile",
                profile,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Profile Created Successfully");

            navigate("/profile");

        } catch (error) {

            console.log(error);

            alert("Failed To Create Profile");
        }
    };

    return (
        <>
            <Sidebar />

            <div
                className="container mt-4"
                style={{ marginLeft: "280px" }}
            >

                <div className="card shadow-lg border-0">

                    <div className="card-header bg-primary text-white">

                        <h3 className="mb-0">
                            Complete Your Profile
                        </h3>

                        <small>
                            Role : {user?.role}
                        </small>

                    </div>

                    <div className="card-body">

                        <form onSubmit={handleSubmit}>

                            <div className="mb-3">

                                <label className="form-label">
                                    About Me
                                </label>

                                <textarea
                                    className="form-control"
                                    rows="4"
                                    name="aboutMe"
                                    value={profile.aboutMe}
                                    onChange={handleChange}
                                />

                            </div>

                            {(user?.role === "ALUMNI" ||
                                user?.role === "MENTOR") && (

                                <>
                                    <div className="row">

                                        <div className="col-md-6">

                                            <div className="mb-3">

                                                <label className="form-label">
                                                    Company
                                                </label>

                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="company"
                                                    value={profile.company}
                                                    onChange={handleChange}
                                                />

                                            </div>

                                        </div>

                                        <div className="col-md-6">

                                            <div className="mb-3">

                                                <label className="form-label">
                                                    Designation
                                                </label>

                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="designation"
                                                    value={profile.designation}
                                                    onChange={handleChange}
                                                />

                                            </div>

                                        </div>

                                    </div>

                                    <div className="row">

                                        <div className="col-md-6">

                                            <div className="mb-3">

                                                <label className="form-label">
                                                    Industry
                                                </label>

                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="industry"
                                                    value={profile.industry}
                                                    onChange={handleChange}
                                                />

                                            </div>

                                        </div>

                                        <div className="col-md-6">

                                            <div className="mb-3">

                                                <label className="form-label">
                                                    Graduation Year
                                                </label>

                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    name="graduationYear"
                                                    value={profile.graduationYear}
                                                    onChange={handleChange}
                                                />

                                            </div>

                                        </div>

                                    </div>
                                </>
                            )}

                            {user?.role !== "ADMIN" && (

                                <div className="mb-3">

                                    <label className="form-label">
                                        LinkedIn URL
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="linkedinUrl"
                                        value={profile.linkedinUrl}
                                        onChange={handleChange}
                                    />

                                </div>

                            )}

                            {(user?.role === "STUDENT" ||
                                user?.role === "MENTOR") && (

                                <div className="mb-3">

                                    <label className="form-label">
                                        GitHub URL
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="githubUrl"
                                        value={profile.githubUrl}
                                        onChange={handleChange}
                                    />

                                </div>

                            )}

                            {user?.role === "STUDENT" && (

                                <div className="mb-3">

                                    <label className="form-label">
                                        Resume URL
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="resumeUrl"
                                        value={profile.resumeUrl}
                                        onChange={handleChange}
                                    />

                                </div>

                            )}

                            <div className="mb-3">

                                <label className="form-label">
                                    Profile Picture URL
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="profilePicture"
                                    value={profile.profilePicture}
                                    onChange={handleChange}
                                />

                            </div>

                            <button
                                className="btn btn-primary w-100"
                                type="submit"
                            >
                                Save Profile
                            </button>

                        </form>

                    </div>

                </div>

            </div>
        </>
    );
}

export default CreateProfilePage;