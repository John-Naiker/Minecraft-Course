import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Users() {
  const [users, setUsers] = useState([
    {
      id: 1,
      username: 'john',
      role: 'student',
      classId: '1'
    }
  ]);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold">Users</h1>
        <button
          className="px-4 py-2 bg-gradient-to-r from-[#B95DCD] to-[#748DF4] rounded-lg"
        >
          Add User
        </button>
      </div>

      {/* Users List */}
      <div className="grid gap-6">
        {users.map((user) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#03041A]/80 backdrop-blur-sm border border-[#B95DCD]/10 rounded-xl p-6"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-medium mb-2">{user.username}</h3>
                <div className="space-y-1 text-[#F1F2F0]/60">
                  <p>Role: {user.role}</p>
                  <p>Class: Minecraft Programming 101</p>
                </div>
              </div>
              <div className="space-x-4">
                <button
                  className="text-[#748DF4] hover:text-[#748DF4]/80"
                >
                  Edit
                </button>
                <button
                  className="text-[#DA5A33] hover:text-[#DA5A33]/80"
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
