
import { FaUserGraduate } from "react-icons/fa";

function WelcomeBanner({ user }) {

    const message = {

        STUDENT:
            "Connect with mentors and grow your career.",

        MENTOR:
            "Guide students and share your experience.",

        ALUMNI:
            "Support the next generation of professionals.",

        ADMIN:
            "Manage and monitor the Alumni Portal."

    };

    return (

        <div className="dashboard-banner">

            <div className="banner-content">

                <h1>

                    Welcome Back,

                    {" "}

                    {user.fullName}

                    👋

                </h1>

                <h4>

                    {user.role} Dashboard

                </h4>

                <p>

                    {message[user.role]}

                </p>

            </div>

            <div className="banner-image">

                <FaUserGraduate />

            </div>

        </div>

    );

}

export default WelcomeBanner;