import React, { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { motion } from "framer-motion";
import { User, Mail, Save } from "lucide-react";

const ResidentProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProfile({ name });
    } catch (error) {
      console.error(error)
    }
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-emerald-100 flex items-center justify-center p-4"
    >
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h1 className="text-2xl font-bold text-emerald-700 mb-6">My Profile</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center gap-2">
            <User className="text-emerald-500" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className="w-full p-2 border border-emerald-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <Mail className="text-emerald-500" />
            <input
              type="email"
              value={email}
              disabled
              className="w-full p-2 border border-emerald-300 rounded bg-gray-100 text-gray-500"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-500 text-white p-2 rounded hover:bg-emerald-600 flex items-center justify-center gap-2"
          >
            {loading ? "Saving..." : "Save Changes"}
            {!loading && <Save size={18} />}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default ResidentProfilePage;