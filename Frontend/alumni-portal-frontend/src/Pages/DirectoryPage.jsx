import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

function DirectoryPage() {

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const [profiles, setProfiles] = useState([]);

    const [search, setSearch] = useState("");
    const [company, setCompany] = useState("");
    const [industry, setIndustry] = useState("");
    const [year, setYear] = useState("");
    const [skill, setSkill] = useState("");

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
        .catch(error => console.log(error));

    };

    const searchProfiles = () => {

        let url = "";

        if (search.trim() !== "") {

            url = `http://localhost:8080/profile/search/name/${search}`;

        }
        else if (company.trim() !== "") {

            url = `http://localhost:8080/profile/search/company/${company}`;

        }
        else if (industry.trim() !== "") {

            url = `http://localhost:8080/profile/search/industry/${industry}`;

        }
        else if (year.trim() !== "") {

            url = `http://localhost:8080/profile/search/year/${year}`;

        }
        else if (skill.trim() !== "") {

    url = `http://localhost:8080/profile/search/skill/${skill}`;

}
        else {

            loadProfiles();
            return;

        }

        axios.get(
            url,
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
        .catch(error => console.log(error));

    };

    const clearFilters = () => {

        setSearch("");
        setCompany("");
        setIndustry("");
        setYear("");
        setSkill("");
        loadProfiles();

    };

    useEffect(() => {

        loadProfiles();

    }, []);

    return (

        <>
            <Sidebar />

            <div
                className="container-fluid py-4"
                style={{
                    marginLeft: "290px",
                    width: "calc(100% - 290px)",
                    paddingRight: "30px"
                }}
            >

                <div className="mb-4">

                    <h2 className="fw-bold">
                        🎓 Alumni Directory
                    </h2>

                    <p className="text-muted mb-0">

                        {profiles.length} Alumni Found

                    </p>

                </div>

                <div className="card shadow-sm border-0 mb-4 mx-auto"
    style={{ maxWidth: "1350px" }}>

    <div className="card-body">

        <div className="row g-3">

            <div className="col-md-4">
                <input
                    type="text"
                    className="form-control"
                    placeholder="🔍 Search Name"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="col-md-4">
                <input
                    type="text"
                    className="form-control"
                    placeholder="🏢 Company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                />
            </div>

            <div className="col-md-4">
                <input
                    type="text"
                    className="form-control"
                    placeholder="🏭 Industry"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                />
            </div>

            <div className="col-md-3">
                <input
                    type="number"
                    className="form-control"
                    placeholder="🎓 Year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                />
            </div>

            <div className="col-md-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="💻 Skill"
                    value={skill}
                    onChange={(e) => setSkill(e.target.value)}
                />
            </div>

            <div className="col-md-3 d-grid">
                <button
                    className="btn btn-primary"
                    onClick={searchProfiles}
                >
                    Search
                </button>
            </div>

            <div className="col-md-3 d-grid">
                <button
                    className="btn btn-outline-secondary"
                    onClick={clearFilters}
                >
                    Clear Filters
                </button>
            </div>

        </div>

    </div>

</div>

                <div className="row">

{
    profiles.length === 0 ? (

        <div className="col-12">

            <div
                className="alert alert-warning text-center py-3 shadow-sm"
                role="alert"
            >

                <h5 className="mb-1">
                    🔍 No Alumni Found
                </h5>

                <small>
                    Try another search or click
                    <strong> Clear Filters</strong>.
                </small>

            </div>

        </div>

    ) : (

        profiles.map(profile => (

            <div
                className="col-xl-4 col-lg-6 col-md-6 mb-4"
                key={profile.profileId}
            >

                <div
                    className="card border-0 shadow h-100"
                    style={{
                        transition: "all 0.3s ease",
                        borderRadius: "15px",
                        cursor: "pointer"
                    }}
                    onMouseEnter={(e) => {

                        e.currentTarget.style.transform =
                            "translateY(-8px)";

                        e.currentTarget.style.boxShadow =
                            "0 15px 30px rgba(0,0,0,0.15)";

                    }}
                    onMouseLeave={(e) => {

                        e.currentTarget.style.transform =
                            "translateY(0px)";

                        e.currentTarget.style.boxShadow =
                            "0 .5rem 1rem rgba(0,0,0,.15)";

                    }}
                >

                    <div className="card-body d-flex flex-column">

                        <div className="text-center">

                            <img
                                src={
                                    profile.profilePicture &&
                                    profile.profilePicture.trim() !== ""
                                        ? profile.profilePicture
                                        : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                                }
                                onError={(e) => {
                                    e.target.src =
                                        "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
                                }}
                                alt="Profile"
                                width="110"
                                height="110"
                                className="rounded-circle border border-3 border-primary mb-3"
                                style={{
                                    objectFit: "cover"
                                }}
                            />

                            <h4 className="fw-bold mb-2">
                                {profile.user?.fullName}
                            </h4>

                            <span
                                className={
                                    profile.user?.role === "MENTOR"
                                        ? "badge bg-success px-3 py-2"
                                        : "badge bg-primary px-3 py-2"
                                }
                            >
                                {profile.user?.role}
                            </span>

                        </div>

                        <hr />

                        <div className="mb-3">

                            <div className="mb-2">
                                <strong>🏢 Company</strong>
                                <br />
                                {profile.company || "Not Available"}
                            </div>

                            <div className="mb-2">
                                <strong>💼 Designation</strong>
                                <br />
                                {profile.designation || "Not Available"}
                            </div>

                            <div className="mb-2">
                                <strong>🏭 Industry</strong>
                                <br />
                                {profile.industry || "Not Available"}
                            </div>

                            <div className="mb-2">
                                <strong>🎓 Graduation Year</strong>
                                <br />
                                {profile.graduationYear || "Not Available"}
                            </div>

                            <div className="mb-2">
                                <strong>📝 About Me</strong>
                                <br />

                                <small className="text-muted">

                                    {
                                        profile.aboutMe
                                            ? profile.aboutMe.length > 80
                                                ? profile.aboutMe.substring(0, 80) + "..."
                                                : profile.aboutMe
                                            : "No description available."
                                    }

                                </small>

                            </div>

                        </div>

                        <div className="mt-auto">

                            <button
    className="btn btn-primary w-100 rounded-pill"
    onClick={() =>
        navigate(`/directory/profile/${profile.user.userId}`)
    }
>
    👤 View Professional Profile
</button>

                    </div>

                </div>

            </div>

        </div>

        ))

    )
}

                </div>

            </div>

        </>

    );

}

export default DirectoryPage;
                        