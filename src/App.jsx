import { useEffect, useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import Header from "./components/Header";
import Board from "./components/Board";
import TaskForm from "./components/TaskForm";
import { loadTask, saveTask as saveToStorage } from "./utils/storage";

export default function App() {
  const [tasks, setTasks] = useState(() => loadTask());
  const [showForm, setShowForm] = useState(false);
  const [activeTask, setActiveTask] = useState(null);

  // ✅ ONLY saves to localStorage
  useEffect(() => {
    saveToStorage(tasks);
  }, [tasks]);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const taskId = Number(result.draggableId);
    const newStatus = result.destination.droppableId;

    setTasks(prev =>
      prev.map(t =>
        t.id === taskId ? { ...t, status: newStatus } : t
      )
    );
  };

  // ✅ Renamed (NO conflict)
  const handleSaveTask = (task) => {
    setTasks(prev => {
      if (task.id) {
        return prev.map(t => (t.id === task.id ? task : t));
      }
      return [...prev, { ...task, id: Date.now() }];
    });
    setShowForm(false);
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Header
        onAdd={() => {
          setActiveTask({
            title: "",
            description: "",
            priority: "Low",
            status: "To-Do",
            dueDate: "",
          });
          setShowForm(true);
        }}
      />

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 flex-1">
          <Board
            title="To-Do"
            tasks={tasks.filter(t => t.status === "To-Do")}
            onEdit={t => {
              setActiveTask(t);
              setShowForm(true);
            }}
          />
          <Board
            title="In-Progress"
            tasks={tasks.filter(t => t.status === "In-Progress")}
            onEdit={t => {
              setActiveTask(t);
              setShowForm(true);
            }}
          />
          <Board
            title="Completed"
            tasks={tasks.filter(t => t.status === "Completed")}
            onEdit={t => {
              setActiveTask(t);
              setShowForm(true);
            }}
          />
        </div>
      </DragDropContext>

      <TaskForm
        open={showForm}
        current={activeTask}
        onClose={() => setShowForm(false)}
        onSave={handleSaveTask}
        onDelete={deleteTask}
      />
    </div>
  );
}
