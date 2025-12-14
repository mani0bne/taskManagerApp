export default function Header({ onAdd }) {
  return (
    <header className="bg-gray-900 px-6 py-4 flex justify-between items-center shadow">
      <h1 className="text-2xl font-bold text-white">Task Board</h1>

      <button
        onClick={onAdd}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
      >
        + Add Task
      </button>
    </header>
  );
}
