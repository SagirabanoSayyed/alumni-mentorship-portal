import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AnalyticsChart from "../components/AnalyticsChart";

import {
    FaUsers,
    FaHandshake,
    FaCalendarAlt,
    FaStar,
    FaChartLine,
    FaUserGraduate,
    FaPlusCircle,
    FaSearch,
    FaUser,
    FaClipboardList
} from "react-icons/fa";

import "../styles/Dashboard.css";
import Sidebar from "../components/Sidebar";

function DashboardPage() {

    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {

        try {

            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/");
                return;
            }

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            const dashboardResponse = await axios.get(
                "http://localhost:8080/dashboard",
                config
            );

            setUser(dashboardResponse.data);

            let statsResponse = null;

            switch (dashboardResponse.data.role) {

                case "STUDENT":

                    statsResponse = await axios.get(
                        "http://localhost:8080/dashboard/student",
                        config
                    );

                    break;

                case "MENTOR":

                    statsResponse = await axios.get(
                        "http://localhost:8080/dashboard/mentor",
                        config
                    );

                    break;

                case "ALUMNI":

                    statsResponse = await axios.get(
                        "http://localhost:8080/dashboard/alumni",
                        config
                    );

                    break;

                case "ADMIN":

                    statsResponse = await axios.get(
                        "http://localhost:8080/dashboard/admin",
                        config
                    );

                    break;

                default:

                    statsResponse = null;
            }

            if (statsResponse) {
                setStats(statsResponse.data);
            }

        }
        catch (error) {

            console.error(error);

            if (
                error.response?.status === 401 ||
                error.response?.status === 403
            ) {

                localStorage.removeItem("token");
                navigate("/");

            }

        }
        finally {

            setLoading(false);

        }

    };

    const logout = () => {

        localStorage.removeItem("token");
        navigate("/");

    };

    if (loading) {

        return (
            <div className="text-center mt-5">
                <h3>Loading Dashboard...</h3>
            </div>
        );

    }

    if (!user) {

        return (
            <div className="text-center mt-5">
                <h3>Unable to load dashboard.</h3>
            </div>
        );

    }

    const studentCards = stats ? [

        {
            title: "Total Requests",
            value: stats.totalRequests,
            icon: <FaHandshake />,
            color: "blue"
        },

        {
            title: "Pending Requests",
            value: stats.pendingRequests,
            icon: <FaClipboardList />,
            color: "orange"
        },

        {
            title: "Accepted Requests",
            value: stats.acceptedRequests,
            icon: <FaUsers />,
            color: "green"
        },

        {
            title: "Upcoming Sessions",
            value: stats.upcomingSessions,
            icon: <FaCalendarAlt />,
            color: "purple"
        },

        {
            title: "Completed Sessions",
            value: stats.completedSessions,
            icon: <FaChartLine />,
            color: "cyan"
        }

    ] : [];

    const mentorCards = stats ? [

        {
            title: "Assigned Students",
            value: stats.assignedStudents,
            icon: <FaUserGraduate />,
            color: "blue"
        },

        {
            title: "Pending Requests",
            value: stats.pendingRequests,
            icon: <FaClipboardList />,
            color: "orange"
        },

        {
            title: "Accepted Requests",
            value: stats.acceptedRequests,
            icon: <FaHandshake />,
            color: "green"
        },

        {
            title: "Upcoming Sessions",
            value: stats.upcomingSessions,
            icon: <FaCalendarAlt />,
            color: "purple"
        },

        {
            title: "Completed Sessions",
            value: stats.completedSessions,
            icon: <FaChartLine />,
            color: "cyan"
        },

        {
            title: "Average Rating",
            value: Number(stats.averageRating).toFixed(1),
            icon: <FaStar />,
            color: "red"
        }

    ] : [];

    const cards =
        user.role === "STUDENT"
            ? studentCards
            : mentorCards;

    const quickActions = [];

    if (user.role === "STUDENT") {

        quickActions.push(

            {
                title: "Find Alumni",
                icon: <FaSearch />,
                action: () => navigate("/directory")
            },

            {
                title: "My Requests",
                icon: <FaHandshake />,
                action: () => navigate("/my-requests")
            },

            {
                title: "Sessions",
                icon: <FaCalendarAlt />,
                action: () => navigate("/sessions")
            }

        );

    }

    if (
        user.role === "MENTOR" ||
        user.role === "ALUMNI"
    ) {

        quickActions.push(

            {
                title: "Students",
                icon: <FaUsers />,
                action: () => navigate("/assigned-students")
            },

            {
                title: "Schedule",
                icon: <FaPlusCircle />,
                action: () => navigate("/create-session")
            },

            {
                title: "Requests",
                icon: <FaHandshake />,
                action: () => navigate("/mentor-requests")
            }

        );

    }

    if (user.role === "ADMIN") {

        quickActions.push(

            {
                title: "Users",
                icon: <FaUsers />,
                action: () => navigate("/users")
            },

            {
                title: "Mentors",
                icon: <FaUserGraduate />,
                action: () => navigate("/mentors")
            },

            {
                title: "Profile",
                icon: <FaUser />,
                action: () => navigate("/profile")
            }

        );

    }
    return (
    <div className="dashboard-container">

        <Sidebar role={user.role} />

        <div className="dashboard-content">

            {/* Welcome Banner */}

            <div className="dashboard-banner">

                <div>

                    <h1>
                        Welcome Back,
                        <br />
                        {user.fullName} 👋
                    </h1>

                    <h5>{user.role} Dashboard</h5>

                    <p>
                        {user.role === "STUDENT" &&
                            "Connect with experienced alumni and accelerate your career."}

                        {user.role === "MENTOR" &&
                            "Guide students, manage mentoring sessions and inspire future professionals."}

                        {user.role === "ALUMNI" &&
                            "Support students and contribute back to your alumni community."}

                        {user.role === "ADMIN" &&
                            "Manage users, reports and monitor the entire Alumni Portal."}
                    </p>

                </div>

                <div className="banner-avatar">

                    {user.fullName.charAt(0).toUpperCase()}

                </div>

            </div>

            {/* Statistics */}

            <div className="stats-grid">

                {cards.map((card, index) => (

                    <div
                        className="stats-card"
                        key={index}
                    >

                        <div className="stats-header">

                            <div>

                                <div className="stats-title">

                                    {card.title}

                                </div>

                                <div className="stats-value">

                                    {card.value}

                                </div>

                            </div>

                            <div className={`stats-icon ${card.color}`}>

                                {card.icon}

                            </div>

                        </div>

                    </div>

                ))}

            </div>

            {/* Bottom Row */}

            <div className="dashboard-row">

                {/* Quick Actions */}

                <div className="dashboard-panel">

                    <h3>

                        Quick Actions

                    </h3>

                    <div className="action-grid">

                        {quickActions.map((item, index) => (

                            <button
                                key={index}
                                className="action-btn"
                                onClick={item.action}
                            >

                                {item.icon}

                                <span>

                                    {item.title}

                                </span>

                            </button>

                        ))}

                    </div>

                </div>

                {/* Progress */}

                <div className="dashboard-panel">

                    <h3>

                        Progress

                    </h3>

                    {user.role === "STUDENT" && (

                        <>

                            <div className="progress-label">

                                Accepted Requests

                            </div>

                            <div className="progress">

                                <div
                                    className="progress-bar bg-success"
                                    style={{
                                        width:
                                            `${stats.totalRequests === 0
                                                ? 0
                                                : (stats.acceptedRequests / stats.totalRequests) * 100
                                            }%`
                                    }}
                                />

                            </div>

                            <p>

                                {stats.acceptedRequests}

                                {" / "}

                                {stats.totalRequests}

                            </p>

                        </>

                    )}

                    {(user.role === "MENTOR" ||
                        user.role === "ALUMNI") && (

                        <>

                            <div className="progress-label">

                                Completed Sessions

                            </div>

                            <div className="progress">

                                <div
                                    className="progress-bar bg-primary"
                                    style={{
                                        width:
                                            `${(stats.completedSessions /
                                                Math.max(
                                                    1,
                                                    stats.completedSessions +
                                                    stats.upcomingSessions
                                                )) * 100}%`
                                    }}
                                />

                            </div>

                            <p>

                                {stats.completedSessions}

                                {" Completed"}

                            </p>

                        </>

                    )}

                    {user.role === "ADMIN" && (

                        <p>

                            Admin analytics will appear here.

                        </p>

                    )}

                </div>

            </div>

            {/* Schedule */}

            <div className="dashboard-panel schedule-panel">

                <h3>

                    Today's Schedule

                </h3>

                <div className="schedule-item">

                    <div>

                        <strong>

                            No sessions scheduled today.

                        </strong>

                        <p>

                            Your upcoming sessions will appear here.

                        </p>

                    </div>

                </div>

            </div>

            {/* Analytics */}

<div className="dashboard-panel mt-4">

    <h3 className="mb-4">

        Analytics

    </h3>

    <AnalyticsChart

        stats={stats}

        role={user.role}

    />

</div>

</div>

</div>

      
);

}

export default DashboardPage;