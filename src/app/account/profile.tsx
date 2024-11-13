// src/app/account/profile.tsx
import React, { useState, useEffect } from 'react';

const Profile: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await fetch('/api/users/me');
        const data = await response.json();
        setName(data.name);
        setEmail(data.email);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    }
    fetchProfile();
  }, []);

  const handleSave = async () => {
    try {
      const response = await fetch('/api/users/me', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });
      if (!response.ok) throw new Error('Error updating profile');
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="container">
      <h1>Your Profile</h1>
      <div>
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button onClick={handleSave}>Save Changes</button>
    </div>
  );
};

export default Profile;
