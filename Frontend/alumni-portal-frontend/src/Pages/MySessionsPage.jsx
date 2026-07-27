import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

function MySessionsPage() {
    const navigate = useNavigate();
    const [sessions, setSessions] = useState([]);

    useEffect(() => {

        loadSessions();

    }, []);

    const loadSessions = () => {

        const token =
            localStorage.getItem("token");

        axios.get(
            "http://localhost:8080/sessions/student",
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

    return (
        <>
            <Sidebar />

            <div
                className="container py-4"
                style={{ marginLeft: "260px" }}
            >

                <div className="card shadow border-0">

                    <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">

                        <h3 className="mb-0">
                            My Mentorship Sessions
                        </h3>

                    </div>

                    <div className="card-body">

                        {sessions.length === 0 ? (

                            <div className="text-center py-5">

                                <h4>
                                    No Sessions Scheduled Yet
                                </h4>

                                <p className="text-muted">
                                    Your upcoming mentorship sessions will appear here.
                                </p>

                            </div>

                        ) : (

                            <div className="table-responsive">

                                <table className="table table-hover align-middle">

                                    <thead className="table-dark">

                                    <tr>
    <th>ID</th>
    <th>Mentor</th>
    <th>Date</th>
    <th>Time</th>
    <th>Meeting Link</th>
    <th>Status</th>
    <th>Action</th>
</tr>

                                    </thead>

                                    <tbody>

                                        {sessions.map(session => (

                                            <tr
                                                key={session.sessionId}
                                            >

                                                <td>
                                                    {session.sessionId}
                                                </td>

                                                <td>
                                                    {session.mentor?.fullName}
                                                </td>

                                                <td>
                                                    {session.sessionDate}
                                                </td>

                                                <td>
                                                    {session.sessionTime}
                                                </td>

                                                <td>

                                                    <a
                                                        href={session.meetingLink}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="btn btn-sm btn-primary"
                                                    >
                                                        Join Meeting
                                                    </a>

                                                </td>

                                                <td>

                                                    {session.status === "SCHEDULED" && (
                                                        <span className="badge bg-success">
                                                            Scheduled
                                                        </span>
                                                    )}

                                                    {session.status === "COMPLETED" && (
                                                        <span className="badge bg-primary">
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

    {session.status === "COMPLETED" && (

        <button
            className="btn btn-warning btn-sm"
            onClick={() =>
                navigate(
                    `/feedback/${session.sessionId}`
                )
            }
        >
            Give Feedback
        </button>

    )}

</td>

                                            </tr>

                                        ))}

                                    </tbody>

                                </table>

                            </div>

                        )}

                    </div>

                </div>

            </div>

        </>
    );
}

export default MySessionsPage;