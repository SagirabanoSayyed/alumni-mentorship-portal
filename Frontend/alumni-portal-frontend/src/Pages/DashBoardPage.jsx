import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";
import Sidebar from "../components/Sidebar";
import {
  FaHome,
  FaUser,
  FaUsers,
  FaHandshake,
  FaCalendarAlt,
  FaSignOutAlt
} from "react-icons/fa";

function DashboardPage() {

    const [user, setUser] = useState(null);

const [stats, setStats] = useState({
    totalRequests: 0,
    acceptedRequests: 0,
    upcomingSessions: 0,
    completedSessions: 0
});

    const navigate = useNavigate();

    useEffect(() => {

        const token = localStorage.getItem("token");
    
        console.log("TOKEN =", token);
    
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
    
            return axios.get(
                "http://localhost:8080/dashboard/student",
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );
    
        })
        .then(response => {
    
            setStats(response.data);
    
        })
        .catch(error => {
    
            console.log(error);
    
        });
    
    }, []);

    const logout = () => {

        localStorage.removeItem("token");

        navigate("/");
    };

    if (!user) {
        return <h2>Loading...</h2>;
    }

    return (
    <>
       
        <Sidebar role={user.role} />

        <div className="dashboard-container">

            <div
                className="card border-0 shadow-lg mb-4"
                style={{
                    borderRadius: "25px",
                    overflow: "hidden"
                }}
            >

                <div
                    style={{
                        background:
                            "linear-gradient(135deg,#2563eb,#7c3aed)",
                        height: "120px"
                    }}
                />

                <div
                    style={{
                        padding: "30px"
                    }}
                >

                    <h1
                        style={{
                            fontWeight: "700"
                        }}
                    >
                        Welcome Back,
                        {" "}
                        {user.fullName}
                        {" "}
                        👋
                    </h1>

                    <p
                        className="text-muted fs-5"
                    >
                        Manage your mentorship journey,
                        sessions and professional growth.
                    </p>

                    <span
                        className="badge bg-primary p-2"
                    >
                        {user.role}
                    </span>

                </div>

            </div>

            <div className="row g-4 mb-4">

                <div className="col-md-3">

                    <div
                        className="card border-0 shadow-sm h-100"
                        style={{
                            borderRadius: "20px"
                        }}
                    >

                        <div className="card-body text-center">

                            <div
                                style={{
                                    fontSize: "40px"
                                }}
                            >
                                📨
                            </div>

                            <h2
                                className="text-primary fw-bold"
                            >
                                {stats.totalRequests}
                            </h2>

                            <p className="text-muted">
                                Requests Sent
                            </p>

                        </div>

                    </div>

                </div>

                <div className="col-md-3">

                    <div
                        className="card border-0 shadow-sm h-100"
                        style={{
                            borderRadius: "20px"
                        }}
                    >

                        <div className="card-body text-center">

                            <div
                                style={{
                                    fontSize: "40px"
                                }}
                            >
                                ✅
                            </div>

                            <h2
                                className="text-success fw-bold"
                            >
                                {stats.acceptedRequests}
                            </h2>

                            <p className="text-muted">
                                Accepted Requests
                            </p>

                        </div>

                    </div>

                </div>

                <div className="col-md-3">

                    <div
                        className="card border-0 shadow-sm h-100"
                        style={{
                            borderRadius: "20px"
                        }}
                    >

                        <div className="card-body text-center">

                            <div
                                style={{
                                    fontSize: "40px"
                                }}
                            >
                                📅
                            </div>

                            <h2
                                className="text-warning fw-bold"
                            >
                                {stats.upcomingSessions}
                            </h2>

                            <p className="text-muted">
                                Upcoming Sessions
                            </p>

                        </div>

                    </div>

                </div>

                <div className="col-md-3">

                    <div
                        className="card border-0 shadow-sm h-100"
                        style={{
                            borderRadius: "20px"
                        }}
                    >

                        <div className="card-body text-center">

                            <div
                                style={{
                                    fontSize: "40px"
                                }}
                            >
                                ⭐
                            </div>

                            <h2
                                className="text-info fw-bold"
                            >
                                {stats.completedSessions}
                            </h2>

                            <p className="text-muted">
                                Completed Sessions
                            </p>

                        </div>

                    </div>

                </div>

            </div>

            <div
                className="card border-0 shadow-sm mb-4"
                style={{
                    borderRadius: "20px"
                }}
            >

                <div className="card-body">

                    <h3
                        className="fw-bold mb-4"
                    >
                        🚀 Quick Overview
                    </h3>

                    <div className="row">

                        <div className="col-md-6">

                            <div
                                className="alert alert-primary"
                            >
                                Total mentorship requests:
                                {" "}
                                <strong>
                                    {stats.totalRequests}
                                </strong>
                            </div>

                        </div>

                        <div className="col-md-6">

                            <div
                                className="alert alert-success"
                            >
                                Accepted requests:
                                {" "}
                                <strong>
                                    {stats.acceptedRequests}
                                </strong>
                            </div>

                        </div>

                    </div>

                </div>

            </div>

            <div
                className="card border-0 shadow-sm"
                style={{
                    borderRadius: "20px"
                }}
            >

                <div className="card-body">

                    <h3
                        className="fw-bold mb-4"
                    >
                        📌 Recent Activity
                    </h3>

                    <ul
                        className="list-group list-group-flush"
                    >

                        <li
                            className="list-group-item"
                        >
                            📨 Mentorship request sent
                        </li>

                        <li
                            className="list-group-item"
                        >
                            ✅ Request accepted
                        </li>

                        <li
                            className="list-group-item"
                        >
                            📅 Session scheduled
                        </li>

                        <li
                            className="list-group-item"
                        >
                            ⭐ Feedback submitted
                        </li>

                    </ul>

                </div>

            </div>

        </div>

    </>
);
            }

export default DashboardPage;