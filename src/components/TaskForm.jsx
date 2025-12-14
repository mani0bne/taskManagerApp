import { useEffect, useState } from "react";

const EMPTY_FORM = {
  title: "",
  description: "",
  priority: "Low",
  status: "To-Do",
  dueDate: "",
};

export default function TaskForm({ open, onClose, onSave, onDelete, current }) {
  const [form, setForm] = useState(EMPTY_FORM);

  // ✅ Only update when modal opens or task changes
  useEffect(() => {
    if (open) {
      setForm(current ? current : EMPTY_FORM);
    }
  }, [open, current]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      onDelete(form.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 w-96">
        <h2 className="font-semibold mb-3">
          {form.id ? "Edit Task" : "Add Task"}
        </h2>

        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="border p-2 w-full mb-2 rounded"
          required
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="border p-2 w-full mb-2 rounded"
        />

        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
          className="border p-2 w-full mb-2 rounded"
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="border p-2 w-full mb-2 rounded"
        >
          <option>To-Do</option>
          <option>In-Progress</option>
          <option>Completed</option>
        </select>

        <input
          type="date"
          name="dueDate"
          value={form.dueDate}
          onChange={handleChange}
          className="border p-2 w-full mb-3 rounded"
        />

        <div className="flex justify-between items-center">
          {form.id && (
            <button
              onClick={handleDelete}
              className="text-red-600 text-sm"
            >
              Delete
            </button>
          )}

          <div className="flex gap-2 ml-auto">
            <button onClick={onClose}>Cancel</button>
            <button
              onClick={() => onSave(form)}
              className="bg-blue-600 text-white px-3 py-1 rounded"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
