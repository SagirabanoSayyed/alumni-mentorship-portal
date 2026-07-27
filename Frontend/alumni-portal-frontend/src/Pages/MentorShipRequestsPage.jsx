import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

function MentorRequestsPage() {

    const token = localStorage.getItem("token");
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        loadRequests();
    }, []);

    const loadRequests = () => {

        const token = localStorage.getItem("token");

        axios.get(
            "http://localhost:8080/request/received",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        .then(response => {

            setRequests(response.data);

        })
        .catch(error => {

            console.log(error);

        });
    };

    const acceptRequest = (requestId) => {

        axios.put(
    `http://localhost:8080/request/${requestId}/accept`,
    {},
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
)
        .then(() => {

            alert("Request Accepted");

            loadRequests();

        })
        .catch(error => {

            console.log(error);

        });
    };

    const rejectRequest = (requestId) => {

        axios.put(
    `http://localhost:8080/request/${requestId}/reject`,
    {},
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
)
        .then(() => {

            alert("Request Rejected");

            loadRequests();

        })
        .catch(error => {

            console.log(error);

        });
    };

    return (
        <>
            <Sidebar />

            <div
                className="container mt-4"
                style={{ marginLeft: "260px" }}
            >

                <div className="card shadow border-0">

                    <div className="card-header bg-primary text-white">

                        <h3>
                            Mentorship Requests
                        </h3>

                    </div>

                    <div className="card-body">

                        {requests.length === 0 ? (

                            <div className="text-center">

                                <h5>
                                    No Requests Found
                                </h5>

                            </div>

                        ) : (

                            <table className="table table-bordered table-hover">

                                <thead>

                                    <tr>
                                        <th>ID</th>
                                        <th>Student</th>
                                        <th>Message</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>

                                </thead>

                                <tbody>

                                    {requests.map(request => (

                                        <tr key={request.requestId}>

                                            <td>
                                                {request.requestId}
                                            </td>

                                            <td>
                                                {request.student?.fullName}
                                            </td>

                                            <td>
                                                {request.message}
                                            </td>

                                            <td>

                                                <span
                                                    className={
                                                        request.status === "ACCEPTED"
                                                            ? "badge bg-success"
                                                            : request.status === "REJECTED"
                                                            ? "badge bg-danger"
                                                            : "badge bg-warning text-dark"
                                                    }
                                                >
                                                    {request.status}
                                                </span>

                                            </td>

                                            <td>

                                                {request.status === "PENDING" && (

                                                    <>
                                                        <button
                                                            className="btn btn-success btn-sm me-2"
                                                            onClick={() =>
                                                                acceptRequest(
                                                                    request.requestId
                                                                )
                                                            }
                                                        >
                                                            Accept
                                                        </button>

                                                        <button
                                                            className="btn btn-danger btn-sm"
                                                            onClick={() =>
                                                                rejectRequest(
                                                                    request.requestId
                                                                )
                                                            }
                                                        >
                                                            Reject
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

export default MentorRequestsPage;