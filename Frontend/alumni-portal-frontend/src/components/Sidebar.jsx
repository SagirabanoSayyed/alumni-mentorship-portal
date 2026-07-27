import { useNavigate, useLocation } from "react-router-dom";
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
    FaTools,
    FaStar
} from "react-icons/fa";

import "./Sidebar.css";

function Sidebar({ role }) {

    const navigate = useNavigate();
    const location = useLocation();

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    const isActive = (path) => location.pathname === path;

    return (
        <div className="sidebar">

            <div className="sidebar-header">
                <FaGraduationCap className="sidebar-logo" />
                <h2>Alumni Portal</h2>
            </div>

            <ul>

                {/* Common */}

                <li
                    className={isActive("/dashboard") ? "active" : ""}
                    onClick={() => navigate("/dashboard")}
                >
                    <FaHome />
                    <span>Dashboard</span>
                </li>

                <li
                    className={isActive("/profile") ? "active" : ""}
                    onClick={() => navigate("/profile")}
                >
                    <FaUser />
                    <span>My Profile</span>
                </li>

                <li
                    className={isActive("/skills") ? "active" : ""}
                    onClick={() => navigate("/skills")}
                >
                    <FaTools />
                    <span>My Skills</span>
                </li>

                {/* STUDENT */}

                {role === "STUDENT" && (
                    <>
                        <li
                            className={isActive("/directory") ? "active" : ""}
                            onClick={() => navigate("/directory")}
                        >
                            <FaUsers />
                            <span>Alumni Directory</span>
                        </li>

                        <li
                            className={isActive("/my-requests") ? "active" : ""}
                            onClick={() => navigate("/my-requests")}
                        >
                            <FaHandshake />
                            <span>My Requests</span>
                        </li>

                        <li
                            className={isActive("/sessions") ? "active" : ""}
                            onClick={() => navigate("/sessions")}
                        >
                            <FaCalendarAlt />
                            <span>My Sessions</span>
                        </li>
                    </>
                )}

                {/* ALUMNI */}

                {role === "ALUMNI" && (
                    <>
                        <li
                            className={isActive("/students") ? "active" : ""}
                            onClick={() => navigate("/students")}
                        >
                            <FaUserGraduate />
                            <span>My Students</span>
                        </li>

                        <li
                            className={isActive("/mentor-requests") ? "active" : ""}
                            onClick={() => navigate("/mentor-requests")}
                        >
                            <FaHandshake />
                            <span>Mentorship Requests</span>
                        </li>

                        <li
                            className={isActive("/create-session") ? "active" : ""}
                            onClick={() => navigate("/create-session")}
                        >
                            <FaCalendarAlt />
                            <span>Schedule Session</span>
                        </li>

                        <li
                            className={isActive("/sessions") ? "active" : ""}
                            onClick={() => navigate("/sessions")}
                        >
                            <FaCalendarAlt />
                            <span>Sessions</span>
                        </li>

                        <li
                            className={isActive("/feedback-received") ? "active" : ""}
                            onClick={() => navigate("/feedback-received")}
                        >
                            <FaStar />
                            <span>Feedback Received</span>
                        </li>
                    </>
                )}

                {/* MENTOR */}

                {role === "MENTOR" && (
                    <>
                        <li
                            className={isActive("/assigned-students") ? "active" : ""}
                            onClick={() => navigate("/assigned-students")}
                        >
                            <FaUserGraduate />
                            <span>Assigned Students</span>
                        </li>

                        <li
                            className={isActive("/mentor-requests") ? "active" : ""}
                            onClick={() => navigate("/mentor-requests")}
                        >
                            <FaHandshake />
                            <span>Mentorship Requests</span>
                        </li>

                        <li
                            className={isActive("/create-session") ? "active" : ""}
                            onClick={() => navigate("/create-session")}
                        >
                            <FaCalendarAlt />
                            <span>Schedule Session</span>
                        </li>

                        <li
                            className={isActive("/sessions") ? "active" : ""}
                            onClick={() => navigate("/sessions")}
                        >
                            <FaCalendarAlt />
                            <span>Mentoring Sessions</span>
                        </li>

                        <li
                            className={isActive("/feedback-received") ? "active" : ""}
                            onClick={() => navigate("/feedback-received")}
                        >
                            <FaStar />
                            <span>Feedback Received</span>
                        </li>
                    </>
                )}

                {/* ADMIN */}

                {role === "ADMIN" && (
                    <>
                        <li
                            className={isActive("/users") ? "active" : ""}
                            onClick={() => navigate("/users")}
                        >
                            <FaUsers />
                            <span>Manage Users</span>
                        </li>

                        <li
                            className={isActive("/alumni") ? "active" : ""}
                            onClick={() => navigate("/alumni")}
                        >
                            <FaUserGraduate />
                            <span>Manage Alumni</span>
                        </li>

                        <li
                            className={isActive("/mentors") ? "active" : ""}
                            onClick={() => navigate("/mentors")}
                        >
                            <FaChalkboardTeacher />
                            <span>Manage Mentors</span>
                        </li>

                        <li
                            className={isActive("/reports") ? "active" : ""}
                            onClick={() => navigate("/reports")}
                        >
                            <FaChartBar />
                            <span>Reports</span>
                        </li>

                        <li
                            className={isActive("/settings") ? "active" : ""}
                            onClick={() => navigate("/settings")}
                        >
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