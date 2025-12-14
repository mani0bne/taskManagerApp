import { Draggable } from "@hello-pangea/dnd";

const priorityStyle = {
  Low: "bg-green-600",
  Medium: "bg-yellow-500",
  High: "bg-red-600",
};

export default function TaskCard({ task, index, onEdit }) {
  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={() => onEdit(task)}
          className="bg-gray-800 text-white rounded-lg p-4 shadow hover:shadow-lg transition cursor-pointer"
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">{task.title}</h3>
            <span
              className={`text-xs px-2 py-1 rounded ${priorityStyle[task.priority]}`}
            >
              {task.priority}
            </span>
          </div>

          <p className="text-sm text-gray-300 mb-3">
            {task.description}
          </p>

          <div className="text-xs text-gray-400 flex justify-between">
            <span>Due: {task.dueDate}</span>
            <span>{task.status}</span>
          </div>
        </div>
      )}
    </Draggable>
  );
}
