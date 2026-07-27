import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function FeedbackPage() {

    const { sessionId } = useParams();

    const navigate = useNavigate();

    const [feedback, setFeedback] = useState({
        sessionId: sessionId,
        rating: "",
        comments: ""
    });

    const handleChange = (e) => {

        setFeedback({
            ...feedback,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const token =
                localStorage.getItem("token");

            const response =
                await axios.post(
                    "http://localhost:8080/feedback",
                    feedback,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

                if (typeof response.data === "string") {
                    alert(response.data);
                } else {
                    alert(response.data.message || "Feedback Submitted Successfully");
                }

            navigate("/sessions");

        } catch(error) {

            console.log(error);

            alert(
                error.response?.data ||
                "Failed To Submit Feedback"
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

                <div className="card shadow border-0">

                    <div className="card-header bg-primary text-white">

                        <h3>
                            Session Feedback
                        </h3>

                    </div>

                    <div className="card-body">

                        <form
                            onSubmit={handleSubmit}
                        >

                            <div className="mb-3">

                                <label
                                    className="form-label"
                                >
                                    Rating
                                </label>

                                <select
                                    className="form-select"
                                    name="rating"
                                    value={feedback.rating}
                                    onChange={handleChange}
                                    required
                                >

                                    <option value="">
                                        Select Rating
                                    </option>

                                    <option value="5">
                                        ⭐⭐⭐⭐⭐ Excellent
                                    </option>

                                    <option value="4">
                                        ⭐⭐⭐⭐ Very Good
                                    </option>

                                    <option value="3">
                                        ⭐⭐⭐ Good
                                    </option>

                                    <option value="2">
                                        ⭐⭐ Average
                                    </option>

                                    <option value="1">
                                        ⭐ Poor
                                    </option>

                                </select>

                            </div>

                            <div className="mb-3">

                                <label
                                    className="form-label"
                                >
                                    Feedback Comments
                                </label>

                                <textarea
                                    className="form-control"
                                    rows="5"
                                    name="comments"
                                    value={feedback.comments}
                                    onChange={handleChange}
                                    placeholder="Share your experience..."
                                    required
                                />

                            </div>

                            <button
                                type="submit"
                                className="btn btn-success"
                            >
                                Submit Feedback
                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </>
    );
}

export default FeedbackPage;