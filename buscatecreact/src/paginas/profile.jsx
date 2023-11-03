import React, { useState } from "react";

function UserProfile({ user }) {
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [customAnswer, setCustomAnswer] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);

  const handleInfoChange = (e) => {
    setAdditionalInfo(e.target.value);
  };

  const handleCustomAnswerChange = (e) => {
    setCustomAnswer(e.target.value);
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
  };

  const saveProfileChanges = () => {
    // Handle saving changes to the database or storage (e.g., Firebase)
    // Use the additionalInfo, customAnswer, and profilePicture state values
  };

  return (
    <div>
      <h1>User Profile</h1>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>

      <div>
        <h2>Additional Information</h2>
        <select>
          {/* Options for selecting additional information */}
        </select>
        <input
          type="text"
          placeholder="Or enter custom info"
          value={additionalInfo}
          onChange={handleInfoChange}
        />
      </div>

      <div>
        <h2>Custom Answer</h2>
        <textarea
          value={customAnswer}
          onChange={handleCustomAnswerChange}
        ></textarea>
      </div>

      <div>
        <h2>Profile Picture</h2>
        <input type="file" onChange={handleProfilePictureChange} />
      </div>

      <button onClick={saveProfileChanges}>Save Changes</button>
    </div>
  );
}

export default UserProfile;