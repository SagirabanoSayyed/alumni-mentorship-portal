import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

function FeedbackReceivedPage() {

    const [feedbacks, setFeedbacks] =
        useState([]);

    useEffect(() => {

        loadFeedbacks();

    }, []);

    const loadFeedbacks = () => {

        const token =
            localStorage.getItem("token");

        axios.get(
            "http://localhost:8080/feedback/received",
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        )
        .then(response => {

            setFeedbacks(
                response.data
            );

        })
        .catch(error => {

            console.log(error);

        });
    };

    const getStars = (rating) => {

        return "⭐".repeat(rating);
    };

    return (
        <>
            <Sidebar />

            <div
                className="container py-4"
                style={{
                    marginLeft: "260px"
                }}
            >

                <div className="card shadow border-0">

                    <div className="card-header bg-primary text-white">

                        <h3 className="mb-0">
                            Feedback Received
                        </h3>

                    </div>

                    <div className="card-body">

                        {feedbacks.length === 0 ? (

                            <div className="text-center py-5">

                                <h4>
                                    No Feedback Available
                                </h4>

                                <p className="text-muted">
                                    Student feedback will appear here.
                                </p>

                            </div>

                        ) : (

                            <div className="table-responsive">

                                <table className="table table-hover align-middle">

                                    <thead className="table-dark">

                                        <tr>
                                            <th>ID</th>
                                            <th>Student</th>
                                            <th>Rating</th>
                                            <th>Comments</th>
                                        </tr>

                                    </thead>

                                    <tbody>

                                        {feedbacks.map(
                                            feedback => (

                                            <tr
                                                key={
                                                    feedback.feedbackId
                                                }
                                            >

                                                <td>
                                                    {
                                                        feedback.feedbackId
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        feedback.student
                                                        ?.fullName
                                                    }
                                                </td>

                                                <td>

                                                    <span
                                                        className="badge bg-warning text-dark"
                                                    >
                                                        {
                                                            getStars(
                                                                feedback.rating
                                                            )
                                                        }
                                                    </span>

                                                </td>

                                                <td>
                                                    {
                                                        feedback.comments
                                                    }
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

export default FeedbackReceivedPage;