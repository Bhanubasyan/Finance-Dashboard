import React from "react";
import Layout from "../components/Layout";
import "../style/Profile.css";

const Profile = () => {
  return (
    <Layout>
      <div className="profile-page">

        {/* Left Section */}
        <div className="profile-left">
          <div className="profile-card">
            <img
              src="https://i.pravatar.cc/150"
              alt="user"
              className="profile-img"
            />
            <h2>Bhanu</h2>
            <p>Frontend Developer</p>

            <button>Edit Profile</button>
          </div>
        </div>

        {/* Right Section */}
        <div className="profile-right">

          <div className="info-card">
            <h3>Personal Info</h3>
            <p><strong>Name:</strong> Bhanu</p>
            <p><strong>Email:</strong> bhanu@email.com</p>
            <p><strong>Phone:</strong> +91 9876543210</p>
          </div>

          <div className="info-card">
            <h3>Account Info</h3>
            <p><strong>Account Type:</strong> Viewer</p>
            <p><strong>Joined:</strong> April 2026</p>
          </div>

        </div>

      </div>
    </Layout>
  );
};

export default Profile;