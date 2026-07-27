import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

function DirectoryPage() {

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const [profiles, setProfiles] = useState([]);
    const [search, setSearch] = useState("");

    const loadProfiles = () => {

        axios.get(
            "http://localhost:8080/profile/all",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        .then(response => {

            const filteredProfiles = response.data.filter(
                profile =>
                    profile.user &&
                    (
                        profile.user.role === "ALUMNI" ||
                        profile.user.role === "MENTOR"
                    )
            );

            setProfiles(filteredProfiles);

        })
        .catch(error => {

            console.log(error);

        });

    };

    const searchByName = () => {

        if (!search.trim()) {

            loadProfiles();
            return;

        }

        axios.get(
            `http://localhost:8080/profile/search/name/${search}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        .then(response => {

            const filteredProfiles = response.data.filter(
                profile =>
                    profile.user &&
                    (
                        profile.user.role === "ALUMNI" ||
                        profile.user.role === "MENTOR"
                    )
            );

            setProfiles(filteredProfiles);

        })
        .catch(error => {

            console.log(error);

        });

    };

    useEffect(() => {

        loadProfiles();

    }, []);

    return (

        <>
            <Sidebar />

            <div
                className="container mt-4"
                style={{ marginLeft: "260px" }}
            >

                <h2 className="mb-4">
                    Alumni Directory
                </h2>

                <div className="row mb-4">

                    <div className="col-md-10">

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by Name..."
                            value={search}
                            onChange={(e) => {

                                const value = e.target.value;

                                setSearch(value);

                                if (value.trim() === "") {

                                    loadProfiles();
                                    return;
                                }

                                axios.get(
                                    `http://localhost:8080/profile/search/name/${value}`,
                                    {
                                        headers: {
                                            Authorization: `Bearer ${token}`
                                        }
                                    }
                                )
                                .then(response => {

                                    const filteredProfiles = response.data.filter(
                                        profile =>
                                            profile.user &&
                                            (
                                                profile.user.role === "ALUMNI" ||
                                                profile.user.role === "MENTOR"
                                            )
                                    );

                                    setProfiles(filteredProfiles);

                                })
                                .catch(error => {

                                    console.log(error);

                                });

                            }}
                        />

                    </div>

                    <div className="col-md-2">

                        <button
                            className="btn btn-primary w-100"
                            onClick={searchByName}
                        >
                            Search
                        </button>

                    </div>

                </div>

                <div className="row">

                    {

                        profiles.map(profile => (

                            <div
                                className="col-md-4 mb-4"
                                key={profile.profileId}
                            >

                                <div className="card shadow h-100">

                                    <div className="card-body text-center">

                                        <img
                                            src={
                                                profile.profilePicture ||
                                                "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                                            }
                                            alt="profile"
                                            width="100"
                                            height="100"
                                            className="rounded-circle mb-3"
                                        />

                                        <h4>
                                            {profile.user?.fullName}
                                        </h4>

                                        <span className="badge bg-primary">
                                            {profile.user?.role}
                                        </span>

                                        <hr />

                                        <p>
                                            <strong>Company:</strong>
                                            <br />
                                            {profile.company || "N/A"}
                                        </p>

                                        <p>
                                            <strong>Designation:</strong>
                                            <br />
                                            {profile.designation || "N/A"}
                                        </p>

                                        <p>
                                            <strong>Industry:</strong>
                                            <br />
                                            {profile.industry || "N/A"}
                                        </p>

                                        <p>
                                            <strong>Graduation Year:</strong>
                                            <br />
                                            {profile.graduationYear || "N/A"}
                                        </p>

                                        <button
                                            className="btn btn-primary"
                                            onClick={() =>
                                                navigate(`/directory/profile/${profile.user.userId}`)
                                            }
                                        >
                                            View Profile
                                        </button>

                                    </div>

                                </div>

                            </div>

                        ))

                    }

                </div>

            </div>

        </>

    );

}

export default DirectoryPage;