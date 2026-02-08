import { useState, useEffect } from "react";
import api from "../api";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ name: "", email: "" });
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      const res = await api.get("/auth/me");
      setUser(res.data);
      setForm({
        name: res.data.name,
        email: res.data.email,
      });
    };

    loadProfile();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const updateProfile = async (e) => {
    e.preventDefault();

    const res = await api.put("/auth/me", form);
    setUser(res.data);
    setMsg("Profile updated successfully!");
  };

  if (!user) return <div className="p-10">Loading...</div>;

  return (
    <div className="bg-gray-100 min-h-screen p-6">

      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6">

        <h2 className="text-2xl font-bold mb-4">
          My Profile
        </h2>

        {msg && (
          <div className="bg-green-100 text-green-700 p-2 mb-4 rounded">
            {msg}
          </div>
        )}

        <form onSubmit={updateProfile}>

          <label className="block mb-2">Name</label>
          <input
            name="name"
            className="input mb-4"
            value={form.name}
            onChange={handleChange}
          />

          <label className="block mb-2">Email</label>
          <input
            name="email"
            className="input mb-4"
            value={form.email}
            onChange={handleChange}
          />

          <button className="btn-primary">
            Save Changes
          </button>

        </form>

        <div className="mt-6">
          <h3 className="font-bold mb-2">Account Info</h3>

          <p>Role: {user.role}</p>
          <p>User ID: {user._id}</p>
        </div>

      </div>

    </div>
  );
};

export default Profile;
