import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useDarkMode } from "./toogledarkmode.jsx";
import { supabase } from "./client.js";

export default function Profile() {
  const { darkMode } = useDarkMode();
  const navigate = useNavigate();
  const [profilePicture, setProfilePicture] = useState("https://via.placeholder.com/150");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) throw error;
        if (!user) {
          navigate("/login");
          return;
        }
        setUsername(user.user_metadata?.username || "User");
        setEmail(user.email || "");
      } catch (err) {
        setError(err.message || "Failed to load profile data.");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [navigate]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        data: { username },
      });
      if (error) throw error;
      setIsEditing(false);
    } catch (err) {
      setError(err.message || "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, backgroundColor: "#FF6B6B", transition: { duration: 0.2 } },
  };

  if (loading) {
    return (
      <div className={`min-h-screen ${darkMode ? "bg-gray-800" : "bg-gray-50"} flex items-center justify-center`}>
        <p className="text-blue-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-800 text-white" : "bg-gray-50 text-gray-800"} flex items-center justify-center p-4`}>
      <motion.div
        className="max-w-md w-full bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <h1 className="text-2xl font-bold text-blue-500 dark:text-blue-400 mb-6">Profile</h1>

        {error && (
          <motion.p
            className="text-coral-500 mb-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {error}
          </motion.p>
        )}

        <div className="flex flex-col items-center mb-6">
          <motion.img
            src={profilePicture}
            alt="Profile"
            className="rounded-full w-32 h-32 object-cover mb-4 border-4 border-blue-500 dark:border-blue-400"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          />
          <label className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-coral-500 transition">
            Change Picture
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              disabled={loading}
            />
          </label>
        </div>

        <form onSubmit={handleSave}>
          <div className="mb-4">
            <label className="block font-semibold mb-2 text-gray-800 dark:text-gray-200">Username</label>
            {isEditing ? (
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 border border-gray-800 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white focus:border-blue-500 focus:outline-none"
                required
                disabled={loading}
              />
            ) : (
              <p className="text-lg font-medium">{username}</p>
            )}
          </div>

          <div className="mb-6">
            <label className="block font-semibold mb-2 text-gray-800 dark:text-gray-200">Email</label>
            <p className="text-gray-600 dark:text-gray-300">{email}</p>
          </div>

          <div className="flex justify-between">
            <motion.button
              type={isEditing ? "submit" : "button"}
              onClick={() => !isEditing && setIsEditing(true)}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg"
              variants={buttonVariants}
              whileHover="hover"
              disabled={loading}
            >
              {isEditing ? "Save" : "Edit Profile"}
            </motion.button>
            {isEditing && (
              <motion.button
                type="button"
                onClick={() => setIsEditing(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded-lg"
                variants={buttonVariants}
                whileHover="hover"
                disabled={loading}
              >
                Cancel
              </motion.button>
            )}
          </div>
        </form>

        {isEditing && (
          <motion.p
            className="text-lime-500 mt-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            Update your username and click Save.
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}