import { useNavigate } from "react-router-dom";
import {
    FaHome,
    FaUser,
    FaUsers,
    FaHandshake,
    FaCalendarAlt,
    FaSignOutAlt,
    FaGraduationCap,
    FaUserGraduate,
    FaChalkboardTeacher,
    FaCog,
    FaChartBar,
    FaTools
} from "react-icons/fa";

import "./Sidebar.css";
import { FaStar } from "react-icons/fa";

function Sidebar({ role }) {

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (

        <div className="sidebar">

            <div className="sidebar-header">

                <FaGraduationCap className="sidebar-logo" />

                <h2>Alumni Portal</h2>

            </div>

            <ul>

                <li onClick={() => navigate("/dashboard")}>
                    <FaHome />
                    <span>Dashboard</span>
                </li>
               
                <li onClick={() => navigate("/profile")}>
                    <FaUser />
                    <span>My Profile</span>
                </li>
                
                <li onClick={() => navigate("/skills")}>
    <FaTools />
    <span>My Skills</span>
</li>
               
    


                {/* STUDENT */}

                {role === "STUDENT" && (
                    <>
                        <li onClick={() => navigate("/directory")}>
                            <FaUsers />
                            <span>Alumni Directory</span>
                        </li>

                        <li onClick={() => navigate("/my-requests")}>
    <FaHandshake />
    <span>My Requests</span>
</li>

                        <li onClick={() => navigate("/sessions")}>
                            <FaCalendarAlt />
                            <span>My Sessions</span>
                        </li>

                    </>
                )}

                {/* ALUMNI */}

                {role === "ALUMNI" && (
    <>
        <li onClick={() => navigate("/students")}>
            <FaUserGraduate />
            <span>My Students</span>
        </li>

        <li onClick={() => navigate("/mentor-requests")}>
            <FaHandshake />
            <span>Mentorship Requests</span>
        </li>
        
        <li onClick={() => navigate("/create-session")}>
    <FaCalendarAlt />
    <span>Schedule Session</span>
</li>
        <li onClick={() => navigate("/sessions")}>
            <FaCalendarAlt />
            <span>Sessions</span>
        </li>


        <li
    onClick={() =>
        navigate("/feedback-received")
    }
>
    <FaStar />
    <span>
        Feedback Received
    </span>
</li>
    </>

    
)}
                {/* MENTOR */}

                {role === "MENTOR" && (
    <>
        <li onClick={() => navigate("/assigned-students")}>
            <FaUserGraduate />
            <span>Assigned Students</span>
        </li>

        <li onClick={() => navigate("/mentor-requests")}>
            <FaHandshake />
            <span>Mentorship Requests</span>
        </li>
        
        <li onClick={() => navigate("/create-session")}>
    <FaCalendarAlt />
    <span>Schedule Session</span>
</li>
        <li onClick={() => navigate("/sessions")}>
            <FaCalendarAlt />
            <span>Mentoring Sessions</span>
        </li>

        <li
    onClick={() =>
        navigate("/feedback-received")
    }
>
    <FaStar />
    <span>
        Feedback Received
    </span>
</li>

        
    </>
)}

                {/* ADMIN */}

                {role === "ADMIN" && (
                    <>
                        <li onClick={() => navigate("/users")}>
                            <FaUsers />
                            <span>Manage Users</span>
                        </li>

                        <li onClick={() => navigate("/alumni")}>
                            <FaUserGraduate />
                            <span>Manage Alumni</span>
                        </li>

                        <li onClick={() => navigate("/mentors")}>
                            <FaChalkboardTeacher />
                            <span>Manage Mentors</span>
                        </li>

                        <li onClick={() => navigate("/reports")}>
                            <FaChartBar />
                            <span>Reports</span>
                        </li>

                        <li onClick={() => navigate("/settings")}>
                            <FaCog />
                            <span>Settings</span>
                        </li>
                    </>
                )}

            </ul>

            <button
                className="logout-btn-sidebar"
                onClick={logout}
            >
                <FaSignOutAlt />
                Logout
            </button>

        </div>
    );
}

export default Sidebar;