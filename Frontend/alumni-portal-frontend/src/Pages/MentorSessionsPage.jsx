import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

function MentorSessionsPage() {

    const [sessions, setSessions] = useState([]);

    useEffect(() => {

        loadSessions();

    }, []);

    const loadSessions = () => {

        const token =
            localStorage.getItem("token");

        axios.get(
            "http://localhost:8080/sessions/mentor",
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        )
        .then(response => {

            setSessions(response.data);

        })
        .catch(error => {

            console.log(error);

        });
    };

    const completeSession = (sessionId) => {

        axios.put(
            `http://localhost:8080/sessions/${sessionId}/complete`
        )
        .then(() => {

            alert("Session Completed");

            loadSessions();

        })
        .catch(error => {

            console.log(error);

            alert("Failed To Complete Session");

        });
    };

    const cancelSession = (sessionId) => {

        axios.put(
            `http://localhost:8080/sessions/${sessionId}/cancel`
        )
        .then(() => {

            alert("Session Cancelled");

            loadSessions();

        })
        .catch(error => {

            console.log(error);

            alert("Failed To Cancel Session");

        });
    };

    return (
        <>
            <Sidebar />

            <div
                className="container mt-4"
                style={{
                    marginLeft: "260px"
                }}
            >

                <div className="card shadow">

                    <div className="card-header bg-primary text-white">

                        <h3>
                            My Scheduled Sessions
                        </h3>

                    </div>

                    <div className="card-body">

                        {sessions.length === 0 ? (

                            <div className="text-center">

                                <h5>
                                    No Sessions Found
                                </h5>

                            </div>

                        ) : (

                            <table className="table table-hover">

                                <thead>

                                    <tr>
                                        <th>ID</th>
                                        <th>Student</th>
                                        <th>Date</th>
                                        <th>Time</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>

                                </thead>

                                <tbody>

                                    {sessions.map(session => (

                                        <tr
                                            key={
                                                session.sessionId
                                            }
                                        >

                                            <td>
                                                {
                                                    session.sessionId
                                                }
                                            </td>

                                            <td>
                                                {
                                                    session.student
                                                    ?.fullName
                                                }
                                            </td>

                                            <td>
                                                {
                                                    session.sessionDate
                                                }
                                            </td>

                                            <td>
                                                {
                                                    session.sessionTime
                                                }
                                            </td>

                                            <td>

                                                {session.status === "SCHEDULED" && (
                                                    <span className="badge bg-warning text-dark">
                                                        Scheduled
                                                    </span>
                                                )}

                                                {session.status === "COMPLETED" && (
                                                    <span className="badge bg-success">
                                                        Completed
                                                    </span>
                                                )}

                                                {session.status === "CANCELLED" && (
                                                    <span className="badge bg-danger">
                                                        Cancelled
                                                    </span>
                                                )}

                                            </td>

                                            <td>

                                                {session.status === "SCHEDULED" && (

                                                    <>
                                                        <button
                                                            className="btn btn-success btn-sm me-2"
                                                            onClick={() =>
                                                                completeSession(
                                                                    session.sessionId
                                                                )
                                                            }
                                                        >
                                                            Complete
                                                        </button>

                                                        <button
                                                            className="btn btn-danger btn-sm"
                                                            onClick={() =>
                                                                cancelSession(
                                                                    session.sessionId
                                                                )
                                                            }
                                                        >
                                                            Cancel
                                                        </button>
                                                    </>

                                                )}

                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        )}

                    </div>

                </div>

            </div>

        </>
    );
}

export default MentorSessionsPage;