import tasks from "../data/tasks";

export const loadTask=()=>{
    const saved = localStorage.getItem("task-data");
    return saved ? JSON.parse(saved) : tasks;
};

export const saveTask=(tasks)=>{
    localStorage.setItem("task-data", JSON.stringify(tasks));
}