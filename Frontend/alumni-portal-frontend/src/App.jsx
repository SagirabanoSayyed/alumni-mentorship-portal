import { BrowserRouter, Routes, Route }
from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import CreateProfilePage from "./pages/CreateProfilePage";
import DirectoryPage from "./pages/DirectoryPage";
import EditProfilePage from "./pages/EditProfilePage";
import ViewProfilePage from "./pages/ViewProfilePage";
import MentorRequestsPage from "./pages/MentorShipRequestsPage";
import MyRequestPage
from "./pages/MyRequestPage";
import CreateSessionPage
from "./pages/CreateSessionPage";
import MentorSessionsPage from "./pages/MentorSessionsPage";
import MySessionsPage from "./pages/MySessionsPage";
import FeedbackPage
from "./pages/FeedbackPage";
import FeedbackReceivedPage from "./pages/FeedbackReceivedPage";
import SkillsPage from "./pages/SkillsPage";


function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<LoginPage />}
                />

                <Route
                    path="/register"
                    element={<RegisterPage />}
                />

            <Route path="/dashboard" element={<DashboardPage />} />
            <Route
    path="/profile"
    element={<ProfilePage />}
/>
<Route
    path="/create-profile"
    element={<CreateProfilePage />}
/>

<Route
    path="/directory"
    element={<DirectoryPage />}
/>

<Route
    path="/edit-profile"
    element={<EditProfilePage />}
/>

<Route
    path="/directory/profile/:id"
    element={<ViewProfilePage />}
/>

<Route
    path="/mentor-requests"
    element={<MentorRequestsPage />}
/>

<Route
    path="/my-requests"
    element={<MyRequestPage />}
/>

<Route
    path="/create-session"
    element={<CreateSessionPage />}
/>
<Route
    path="/mentor-sessions"
    element={<MentorSessionsPage />}
/>
<Route
    path="/sessions"
    element={<MySessionsPage />}
/>

<Route
    path="/feedback/:sessionId"
    element={<FeedbackPage />}
/>

<Route
    path="/feedback-received"
    element={<FeedbackReceivedPage />}
/>

<Route
    path="/skills"
    element={<SkillsPage />}
/>

            </Routes>

           

        </BrowserRouter>
    );
}

export default App;