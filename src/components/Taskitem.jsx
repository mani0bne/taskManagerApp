export default function TaskItem({ task, onEdit }) {
  const priorityColor = {
    Low: "bg-green-100 text-green-700",
    Medium: "bg-yellow-100 text-yellow-700",
    High: "bg-red-100 text-red-700",
  };

  return (
    <div
      onClick={() => onEdit(task)}
      className="bg-white rounded-md p-3 shadow-sm mb-2 cursor-pointer hover:shadow-md transition"
    >
      <div className="flex justify-between items-center">
        <h3 className="font-medium">{task.title}</h3>
        <span
          className={`text-xs px-2 py-1 rounded ${priorityColor[task.priority]}`}
        >
          {task.priority}
        </span>
      </div>

      <p className="text-sm text-gray-600 mt-1">{task.description}</p>

      <div className="text-xs text-gray-500 mt-2">
        Due: {task.dueDate}
      </div>
    </div>
  );
}
