import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../styles/ProfilePage.css";

function ProfilePage() {

    const [profile, setProfile] = useState(null);

    const [stats, setStats] = useState({
        totalRequests: 0,
        acceptedRequests: 0,
        upcomingSessions: 0,
        completedSessions: 0
    });

    const navigate = useNavigate();

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
            axios.get(
                "http://localhost:8080/dashboard/student",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            .then(response => {
            
                setStats(response.data);
            
            })
            .catch(error => {
            
                console.log(error);
            
            });
        })
        .catch(error => {

            console.log(error);

            if (error.response?.status === 404) {
                navigate("/create-profile");
            }
        });

    }, [navigate]);

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

            <div className="profile-container">

                <div className="card profile-card">

                    <div className="profile-banner"></div>

                    <div className="text-center">

                        <img
                            src={
                                profile.profilePicture ||
                                "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                            }
                            alt="Profile"
                            className="profile-image shadow"
                        />

                        <h2 className="profile-name mt-3">
                            {profile.user?.fullName}
                        </h2>

                        <p className="profile-designation">
                            {profile.user?.role}
                        </p>

                        <div className="mb-3">

                            {profile.user?.role === "STUDENT" && (
                                <span className="badge bg-info">
                                    Student
                                </span>
                            )}

                            {profile.user?.role === "ALUMNI" && (
                                <span className="badge bg-success">
                                    Alumni
                                </span>
                            )}

                            {profile.user?.role === "MENTOR" && (
                                <span className="badge bg-primary">
                                    Mentor
                                </span>
                            )}

                            {profile.user?.role === "ADMIN" && (
                                <span className="badge bg-dark">
                                    Admin
                                </span>
                            )}

                        </div>

                    </div>

                    <div className="container pb-4">

                        {/* Stats */}

                        <div className="row g-4 mb-4">

{profile.user?.role === "STUDENT" && (
    <>
        <div className="col-md-4">
            <div className="card stat-card shadow">
                <h2 className="text-primary">
                    {stats.totalRequests}
                </h2>
                <p>Requests Sent</p>
            </div>
        </div>

        <div className="col-md-4">
            <div className="card stat-card shadow">
                <h2 className="text-success">
                    {stats.acceptedRequests}
                </h2>
                <p>Accepted Requests</p>
            </div>
        </div>

        <div className="col-md-4">
            <div className="card stat-card shadow">
                <h2 className="text-warning">
                    {stats.completedSessions}
                </h2>
                <p>Sessions Attended</p>
            </div>
        </div>
    </>
)}

{profile.user?.role === "ALUMNI" && (
    <>
        <div className="col-md-3">
            <div className="card stat-card shadow">
                <h2 className="text-primary">18</h2>
                <p>Students Mentored</p>
            </div>
        </div>

        <div className="col-md-3">
            <div className="card stat-card shadow">
                <h2 className="text-success">12</h2>
                <p>Requests Received</p>
            </div>
        </div>

        <div className="col-md-3">
            <div className="card stat-card shadow">
                <h2 className="text-danger">25</h2>
                <p>Sessions Conducted</p>
            </div>
        </div>

        <div className="col-md-3">
            <div className="card stat-card shadow">
                <h2 className="text-warning">4.9★</h2>
                <p>Rating</p>
            </div>
        </div>
    </>
)}

{profile.user?.role === "MENTOR" && (
    <>
        <div className="col-md-3">
            <div className="card stat-card shadow">
                <h2 className="text-primary">20</h2>
                <p>Students Guided</p>
            </div>
        </div>

        <div className="col-md-3">
            <div className="card stat-card shadow">
                <h2 className="text-success">8</h2>
                <p>Pending Requests</p>
            </div>
        </div>

        <div className="col-md-3">
            <div className="card stat-card shadow">
                <h2 className="text-danger">30</h2>
                <p>Sessions Conducted</p>
            </div>
        </div>

        <div className="col-md-3">
            <div className="card stat-card shadow">
                <h2 className="text-warning">4.8★</h2>
                <p>Rating</p>
            </div>
        </div>
    </>
)}

{profile.user?.role === "ADMIN" && (
    <>
        <div className="col-md-3">
            <div className="card stat-card shadow">
                <h2 className="text-primary">250</h2>
                <p>Total Users</p>
            </div>
        </div>

        <div className="col-md-3">
            <div className="card stat-card shadow">
                <h2 className="text-success">120</h2>
                <p>Students</p>
            </div>
        </div>

        <div className="col-md-3">
            <div className="card stat-card shadow">
                <h2 className="text-info">80</h2>
                <p>Alumni</p>
            </div>
        </div>

        <div className="col-md-3">
            <div className="card stat-card shadow">
                <h2 className="text-warning">50</h2>
                <p>Mentors</p>
            </div>
        </div>
    </>
)}

</div>

                        {/* About Me */}

                        <div className="card section-card mb-4">

                            <div className="card-body">

                                <h4 className="section-title">
                                    About Me
                                </h4>

                                <p>
                                    {profile.aboutMe}
                                </p>

                            </div>

                        </div>

                        {/* Student */}

                        {profile.user?.role === "STUDENT" && (

                            <div className="card section-card mb-4">

                                <div className="card-body">

                                    <h4 className="section-title">
                                        Student Information
                                    </h4>

                                    <p>
                                        <strong>Email:</strong>{" "}
                                        {profile.user?.email}
                                    </p>

                                    {profile.githubUrl && (
                                        <p>
                                            <strong>GitHub:</strong>{" "}
                                            <a
                                                href={profile.githubUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                View GitHub
                                            </a>
                                        </p>
                                    )}

                                    {profile.resumeUrl && (
                                        <p>
                                            <strong>Resume:</strong>{" "}
                                            {profile.resumeUrl}
                                        </p>
                                    )}

                                </div>

                            </div>

                        )}

                        {/* Alumni / Mentor */}

                        {(profile.user?.role === "ALUMNI" ||
                            profile.user?.role === "MENTOR") && (

                            <div className="row g-4">

                                <div className="col-md-6">

                                    <div className="card section-card">

                                        <div className="card-body">

                                            <h4 className="section-title">
                                                Professional Details
                                            </h4>

                                            <p>
                                                <strong>Company:</strong>{" "}
                                                {profile.company}
                                            </p>

                                            <p>
                                                <strong>Designation:</strong>{" "}
                                                {profile.designation}
                                            </p>

                                            <p>
                                                <strong>Industry:</strong>{" "}
                                                {profile.industry}
                                            </p>

                                        </div>

                                    </div>

                                </div>

                                <div className="col-md-6">

                                    <div className="card section-card">

                                        <div className="card-body">

                                            <h4 className="section-title">
                                                Education
                                            </h4>

                                            <p>
                                                <strong>Graduation Year:</strong>{" "}
                                                {profile.graduationYear}
                                            </p>

                                            <p>
                                                <strong>Email:</strong>{" "}
                                                {profile.user?.email}
                                            </p>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        )}

                        {/* Admin */}

                        {profile.user?.role === "ADMIN" && (

                            <div className="card section-card mb-4">

                                <div className="card-body">

                                    <h4 className="section-title">
                                        Administrator Information
                                    </h4>

                                    <p>
                                        <strong>Email:</strong>{" "}
                                        {profile.user?.email}
                                    </p>

                                    <p>
                                        <strong>Role:</strong>{" "}
                                        {profile.user?.role}
                                    </p>

                                </div>

                            </div>

                        )}

                        {/* Links */}

                        <div className="card section-card mt-4">

                            <div className="card-body">

                                <h4 className="section-title">
                                    Professional Links
                                </h4>

                                {profile.linkedinUrl && (
                                    <p>
                                        🔗 LinkedIn:{" "}
                                        <a
                                            href={profile.linkedinUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            View Profile
                                        </a>
                                    </p>
                                )}

                                {profile.githubUrl && (
                                    <p>
                                        💻 GitHub:{" "}
                                        <a
                                            href={profile.githubUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            View GitHub
                                        </a>
                                    </p>
                                )}

                                {profile.resumeUrl && (
                                    <p>
                                        📄 Resume: {profile.resumeUrl}
                                    </p>
                                )}

                            </div>

                        </div>

                        <div className="text-center mt-4">

                            <button
                                className="btn btn-primary profile-btn me-2"
                                onClick={() => navigate("/edit-profile")}
                            >
                                Edit Profile
                            </button>

                            

                            {profile.githubUrl && (
                                <a
                                    href={profile.githubUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="btn btn-dark profile-btn me-2"
                                >
                                    GitHub
                                </a>
                            )}

                            {profile.linkedinUrl && (
                                <a
                                    href={profile.linkedinUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="btn btn-info text-white profile-btn"
                                >
                                    LinkedIn
                                </a>
                            )}

                        </div>

                    </div>

                </div>

            </div>
        </>
    );
}

export default ProfilePage;