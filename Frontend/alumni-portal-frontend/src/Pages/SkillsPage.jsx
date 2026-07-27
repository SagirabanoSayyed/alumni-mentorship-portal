import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

function SkillsPage() {
    
   

    const token = localStorage.getItem("token");
    const [skillName, setSkillName] = useState("");
    const [skills, setSkills] = useState([]);
    

   const loadSkills = () => {

    axios.get(
        "http://localhost:8080/skills/my-skills",
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
    .then(response => {

        setSkills(response.data);

    })
    .catch(error => {

        console.log(error);

    });

};

    const addSkill = () => {

    if (!skillName) {

        alert("Please enter Skill Name");
        return;

    }

    axios.post(
        "http://localhost:8080/skills/add",
        {
            skillName: skillName
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
    .then(() => {

        alert("Skill Added Successfully");

        setSkillName("");

        loadSkills();

    })
    .catch(error => {

        console.log(error);

        alert(
            error.response?.data ||
            "Unable to add skill"
        );

    });

};

    const deleteSkill = (id) => {

    axios.delete(
        `http://localhost:8080/skills/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
    .then(() => {

        alert("Skill Deleted");

        loadSkills();

    })
    .catch(error => {

        console.log(error);

    });

};

 useEffect(() => {

    if (!token) {
        alert("Please login first");
        return;
    }

    loadSkills();

}, []);

    return (

        <>
            <Sidebar />

            <div
                className="container mt-4"
                style={{ marginLeft: "260px" }}
            >

                <h2 className="mb-4">
                    Skills Management
                </h2>

                <div className="card p-4 shadow">

                    <div className="row">

                       <div className="col-md-8">

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Skill"
                                value={skillName}
                                onChange={(e)=>setSkillName(e.target.value)}
                            />

                        </div>

                        <div className="col-md-2">

                            <button
                                className="btn btn-success w-100"
                                onClick={addSkill}
                            >

                                Add Skill

                            </button>

                        </div>

                        <div className="col-md-2">

                            <button
                                className="btn btn-primary w-100"
                                onClick={loadSkills}
                            >

                                View Skills

                            </button>

                        </div>

                    </div>

                </div>

                <br />

                <table className="table table-bordered table-hover">

                    <thead className="table-dark">

                        <tr>

                            <th>Skill ID</th>

                            <th>Skill Name</th>

                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            skills.map(skill => (

                                <tr key={skill.id}>

                                    <td>{skill.skillId}</td>

                                    <td>{skill.skillName}</td>

                                    <td>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() =>
    deleteSkill(skill.id)
}
                                        >

                                            Delete

                                        </button>

                                    </td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

            </div>

        </>

    );

}

export default SkillsPage;