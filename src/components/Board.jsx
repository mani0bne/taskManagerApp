import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";

export default function Board({ title, tasks, onEdit }) {
  return (
    <div className="bg-gray-900 rounded-xl p-4 flex flex-col min-h-[500px]">
      <h2 className="text-lg font-semibold text-white mb-4 border-b border-gray-700 pb-2">
        {title} ({tasks.length})
      </h2>

      <Droppable droppableId={title}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="flex flex-col gap-3 flex-1"
          >
            {tasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                onEdit={onEdit}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
