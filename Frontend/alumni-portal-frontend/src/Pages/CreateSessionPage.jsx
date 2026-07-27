import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

function CreateSessionPage() {

    const navigate = useNavigate();

    const [acceptedRequests,
            setAcceptedRequests] =
            useState([]);

    const [session,
            setSession] =
            useState({

        requestId: "",
        sessionDate: "",
        sessionTime: "",
        meetingLink: ""

    });

    useEffect(() => {

        loadAcceptedRequests();

    }, []);

    const loadAcceptedRequests = () => {

        const token =
            localStorage.getItem("token");

        axios.get(
            "http://localhost:8080/request/accepted",
            {
                headers: {
                    Authorization:
                    `Bearer ${token}`
                }
            }
        )
        .then(response => {

            setAcceptedRequests(
                response.data
            );

        })
        .catch(error => {

            console.log(error);

        });
    };

    const handleChange = (e) => {

        setSession({

            ...session,

            [e.target.name]:
            e.target.value
        });
    };

    const handleSubmit =
    async (e) => {

        e.preventDefault();

        try {

            const token =
            localStorage.getItem(
                "token"
            );

            const response =
            await axios.post(
                "http://localhost:8080/sessions",
                session,
                {
                    headers: {
                        Authorization:
                        `Bearer ${token}`
                    }
                }
            );

            alert(response.data);

            navigate(
                "/mentor-sessions"
            );

        } catch(error) {

            console.log(error);

            alert(
                error.response?.data ||
                "Failed To Create Session"
            );
        }
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
                            Schedule Session
                        </h3>

                    </div>

                    <div className="card-body">

                        <form
                            onSubmit={
                                handleSubmit
                            }
                        >

                            <div className="mb-3">

                                <label>
                                    Select Accepted Request
                                </label>

                                <select
                                    className="form-select"
                                    name="requestId"
                                    value={
                                        session.requestId
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                >

                                    <option value="">
                                        Select Request
                                    </option>

                                    {
                                        acceptedRequests
                                        .map(request => (

                                            <option
                                                key={
                                                    request.requestId
                                                }
                                                value={
                                                    request.requestId
                                                }
                                            >

                                                {
                                                    request.student
                                                    ?.fullName
                                                }

                                                {" - "}

                                                {
                                                    request.message
                                                }

                                            </option>
                                        ))
                                    }

                                </select>

                            </div>

                            <div className="mb-3">

                                <label>
                                    Session Date
                                </label>

                                <input
                                    type="date"
                                    className="form-control"
                                    name="sessionDate"
                                    value={
                                        session.sessionDate
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                />

                            </div>

                            <div className="mb-3">

                                <label>
                                    Session Time
                                </label>

                                <input
                                    type="time"
                                    className="form-control"
                                    name="sessionTime"
                                    value={
                                        session.sessionTime
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                />

                            </div>

                            <div className="mb-3">

                                <label>
                                    Meeting Link
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="meetingLink"
                                    value={
                                        session.meetingLink
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="https://meet.google.com/..."
                                    required
                                />

                            </div>

                            <button
                                className="btn btn-success w-100"
                                type="submit"
                            >
                                Schedule Session
                            </button>

                        </form>

                    </div>

                </div>

            </div>
        </>
    );
}

export default CreateSessionPage;