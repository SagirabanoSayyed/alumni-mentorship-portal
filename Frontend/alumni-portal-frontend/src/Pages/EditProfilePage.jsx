import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

function EditProfilePage() {

    const navigate = useNavigate();

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
            "http://localhost:8080/profile",
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

            await axios.put(
                `http://localhost:8080/profile/${profile.user.userId}`,
                {
                    aboutMe: profile.aboutMe,
                    company: profile.company,
                    designation: profile.designation,
                    industry: profile.industry,
                    graduationYear: profile.graduationYear,
                    linkedinUrl: profile.linkedinUrl,
                    githubUrl: profile.githubUrl,
                    resumeUrl: profile.resumeUrl,
                    profilePicture: profile.profilePicture
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Profile Updated Successfully");

            navigate("/profile");

        } catch (error) {

            console.log(error);

            alert("Failed To Update Profile");
        }
    };

    return (
        <>
            <Sidebar />

            <div
                className="container mt-4"
                style={{ marginLeft: "280px" }}
            >

                <div className="card shadow border-0">

                    <div className="card-header bg-primary text-white">
                        <h3>Edit Profile</h3>
                    </div>

                    <div className="card-body">

                        <form onSubmit={handleSubmit}>

                            <div className="mb-3">

                                <label>About Me</label>

                                <textarea
                                    className="form-control"
                                    rows="3"
                                    name="aboutMe"
                                    value={profile.aboutMe || ""}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="mb-3">

                                <label>Company</label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="company"
                                    value={profile.company || ""}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="mb-3">

                                <label>Designation</label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="designation"
                                    value={profile.designation || ""}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="mb-3">

                                <label>Industry</label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="industry"
                                    value={profile.industry || ""}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="mb-3">

                                <label>Graduation Year</label>

                                <input
                                    type="number"
                                    className="form-control"
                                    name="graduationYear"
                                    value={profile.graduationYear || ""}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="mb-3">

                                <label>LinkedIn URL</label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="linkedinUrl"
                                    value={profile.linkedinUrl || ""}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="mb-3">

                                <label>GitHub URL</label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="githubUrl"
                                    value={profile.githubUrl || ""}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="mb-3">

                                <label>Resume URL</label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="resumeUrl"
                                    value={profile.resumeUrl || ""}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="mb-3">

                                <label>Profile Picture URL</label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="profilePicture"
                                    value={profile.profilePicture || ""}
                                    onChange={handleChange}
                                />

                            </div>

                            <button
                                className="btn btn-primary w-100"
                                type="submit"
                            >
                                Update Profile
                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </>
    );
}

export default EditProfilePage;