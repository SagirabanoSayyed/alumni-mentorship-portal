import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

function MyRequestsPage() {

    const [requests, setRequests] = useState([]);

    useEffect(() => {
        loadRequests();
    }, []);

    const loadRequests = () => {

        const token =
            localStorage.getItem("token");

        axios.get(
            "http://localhost:8080/request/my",
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
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
                            My Mentorship Requests
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

                            <table className="table table-hover">

                                <thead>

                                    <tr>
                                        <th>ID</th>
                                        <th>Mentor / Alumni</th>
                                        <th>Message</th>
                                        <th>Status</th>
                                    </tr>

                                </thead>

                                <tbody>

                                    {requests.map(request => (

                                        <tr
                                            key={request.requestId}
                                        >

                                            <td>
                                                {request.requestId}
                                            </td>

                                            <td>
                                                {request.mentor?.fullName}
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

export default MyRequestsPage;