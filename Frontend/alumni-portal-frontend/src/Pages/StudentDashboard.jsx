import Sidebar from "../components/Sidebar";

function StudentDashboard({ user }) {

    return (
        <>
            <Sidebar />

            <div
                className="dashboard-container"
                style={{
                    marginLeft: "270px",
                    padding: "30px",
                    background: "#f5f7fb",
                    minHeight: "100vh"
                }}
            >

                {/* Welcome Section */}
                <div
                    className="card border-0 shadow-lg mb-4"
                    style={{
                        borderRadius: "20px",
                        background:
                            "linear-gradient(135deg,#2563eb,#4f46e5)"
                    }}
                >

                    <div className="card-body text-white">

                        <h1>
                            Welcome {user.fullName} 👋
                        </h1>

                        <h5>
                            Student Dashboard
                        </h5>

                        <p>
                            Explore mentors, build connections and
                            accelerate your career.
                        </p>

                    </div>

                </div>

                {/* Stats */}
                <div className="row g-4">

                    <div className="col-md-3">

                        <div
                            className="card border-0 shadow"
                            style={{ borderRadius: "20px" }}
                        >

                            <div className="card-body text-center">

                                <h1 className="text-primary">
                                    5
                                </h1>

                                <p>
                                    Requests Sent
                                </p>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-3">

                        <div
                            className="card border-0 shadow"
                            style={{ borderRadius: "20px" }}
                        >

                            <div className="card-body text-center">

                                <h1 className="text-success">
                                    2
                                </h1>

                                <p>
                                    Active Mentors
                                </p>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-3">

                        <div
                            className="card border-0 shadow"
                            style={{ borderRadius: "20px" }}
                        >

                            <div className="card-body text-center">

                                <h1 className="text-warning">
                                    3
                                </h1>

                                <p>
                                    Upcoming Sessions
                                </p>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-3">

                        <div
                            className="card border-0 shadow"
                            style={{ borderRadius: "20px" }}
                        >

                            <div className="card-body text-center">

                                <h1 className="text-danger">
                                    10
                                </h1>

                                <p>
                                    Connections
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

                {/* Quick Actions */}

                <div
                    className="card border-0 shadow mt-4"
                    style={{ borderRadius: "20px" }}
                >

                    <div className="card-body">

                        <h3 className="mb-4">
                            Quick Actions
                        </h3>

                        <div className="row">

                            <div className="col-md-3">
                                <button className="btn btn-primary w-100">
                                    🔍 Search Alumni
                                </button>
                            </div>

                            <div className="col-md-3">
                                <button className="btn btn-success w-100">
                                    🤝 Find Mentor
                                </button>
                            </div>

                            <div className="col-md-3">
                                <button className="btn btn-warning w-100">
                                    📅 My Sessions
                                </button>
                            </div>

                            <div className="col-md-3">
                                <button className="btn btn-info text-white w-100">
                                    👤 My Profile
                                </button>
                            </div>

                        </div>

                    </div>

                </div>

                {/* Recent Activity */}

                <div
                    className="card border-0 shadow mt-4"
                    style={{ borderRadius: "20px" }}
                >

                    <div className="card-body">

                        <h3>
                            Recent Activity
                        </h3>

                        <ul className="list-group list-group-flush mt-3">

                            <li className="list-group-item">
                                ✅ Mentorship request sent to Rahul Sharma
                            </li>

                            <li className="list-group-item">
                                📅 Session scheduled for tomorrow
                            </li>

                            <li className="list-group-item">
                                👤 Profile updated successfully
                            </li>

                            <li className="list-group-item">
                                🎓 Connected with 2 new alumni
                            </li>

                        </ul>

                    </div>

                </div>

            </div>
        </>
    );
}

export default StudentDashboard;