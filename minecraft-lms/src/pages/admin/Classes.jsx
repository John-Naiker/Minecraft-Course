import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getAllClasses, createClass, updateClass, deleteClass } from '../../firebase/utils';

export default function Classes() {
  const [classes, setClasses] = useState([
    {
      id: 1,
      name: 'Minecraft Programming 101',
      startTime: '14:00',
      status: 'active'
    }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    startTime: '',
    duration: 90,
    serverIP: '',
    meetLink: ''
  });

  useEffect(() => {
    loadClasses();
  }, []);

  const loadClasses = async () => {
    try {
      const data = await getAllClasses();
      setClasses(data);
    } catch (error) {
      console.error('Error loading classes:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingClass) {
        await updateClass(editingClass.id, formData);
      } else {
        await createClass(formData);
      }
      setIsModalOpen(false);
      setEditingClass(null);
      resetForm();
      loadClasses();
    } catch (error) {
      console.error('Error saving class:', error);
    }
  };

  const handleEdit = (classData) => {
    setEditingClass(classData);
    setFormData({
      name: classData.name,
      startTime: classData.startTime,
      duration: classData.duration,
      serverIP: classData.serverIP,
      meetLink: classData.meetLink
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (classId) => {
    if (window.confirm('Are you sure you want to delete this class?')) {
      try {
        await deleteClass(classId);
        loadClasses();
      } catch (error) {
        console.error('Error deleting class:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      startTime: '',
      duration: 90,
      serverIP: '',
      meetLink: ''
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold">Classes</h1>
        <button
          onClick={() => {
            resetForm();
            setEditingClass(null);
            setIsModalOpen(true);
          }}
          className="px-4 py-2 bg-gradient-to-r from-[#B95DCD] to-[#748DF4] rounded-lg"
        >
          Add Class
        </button>
      </div>

      {/* Classes List */}
      <div className="grid gap-6">
        {classes.map((classItem) => (
          <motion.div
            key={classItem.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#03041A]/80 backdrop-blur-sm border border-[#B95DCD]/10 rounded-xl p-6"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-medium mb-2">{classItem.name}</h3>
                <div className="space-y-1 text-[#F1F2F0]/60">
                  <p>Start Time: {classItem.startTime}</p>
                  <p>Status: {classItem.status}</p>
                </div>
              </div>
              <div className="space-x-4">
                <button
                  onClick={() => handleEdit(classItem)}
                  className="text-[#748DF4] hover:text-[#748DF4]/80"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(classItem.id)}
                  className="text-[#DA5A33] hover:text-[#DA5A33]/80"
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-[#03041A] border border-[#B95DCD]/10 rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              {editingClass ? 'Edit Class' : 'Add Class'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Class Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-[#03041A]/80 border border-[#B95DCD]/10 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Start Time (HH:MM)</label>
                <input
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                  className="w-full px-3 py-2 bg-[#03041A]/80 border border-[#B95DCD]/10 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Duration (minutes)</label>
                <input
                  type="number"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 bg-[#03041A]/80 border border-[#B95DCD]/10 rounded-lg"
                  min="1"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Server IP</label>
                <input
                  type="text"
                  value={formData.serverIP}
                  onChange={(e) => setFormData({ ...formData, serverIP: e.target.value })}
                  className="w-full px-3 py-2 bg-[#03041A]/80 border border-[#B95DCD]/10 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Google Meet Link</label>
                <input
                  type="url"
                  value={formData.meetLink}
                  onChange={(e) => setFormData({ ...formData, meetLink: e.target.value })}
                  className="w-full px-3 py-2 bg-[#03041A]/80 border border-[#B95DCD]/10 rounded-lg"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingClass(null);
                  }}
                  className="px-4 py-2 text-[#F1F2F0]/60 hover:text-[#F1F2F0]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-[#B95DCD] to-[#748DF4] rounded-lg"
                >
                  {editingClass ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
