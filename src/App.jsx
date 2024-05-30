import { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (title === "") {
      alert("Please enter a title for the task.");
      return;
    }

    setTasks([...tasks, { title, description, done: false }]);
    setTitle("");
    setDescription("");
  };

  const editTask = (index) => {
    const task = tasks[index];
    setTitle(task.title);
    setDescription(task.description);
    deleteTask(index);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const markTaskAsDone = (index) => {
    const updatedTasks = tasks.map((task, i) => {
      if (i === index) {
        return { ...task, done: !task.done };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <div className="container">
      <div className="task-form">
        <h2>Add a Task</h2>
        <input
          type="text"
          id="taskTitle"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          id="taskDescription"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button onClick={addTask}>Add</button>
      </div>
      <div className="taskcontainer">
        <div className="task-list">
          <h2>Task List</h2>
          <div id="tasks">
            {tasks.map((task, index) => (
              <div
                key={index}
                className="task"
                style={{
                  boxShadow: task.done
                    ? "0 0 8px var(--done-button-box-color)"
                    : "0 0 0 transparent",
                }}
              >
                <h3
                  style={{
                    textDecoration: task.done ? "line-through" : "none",
                  }}
                >
                  {task.title}
                </h3>
                <p
                  style={{
                    textDecoration: task.done ? "line-through" : "none",
                  }}
                >
                  {task.description}
                </p>
                <div className="task-actions">
                  <button
                    className="edit-button"
                    onClick={() => editTask(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => deleteTask(index)}
                  >
                    Delete
                  </button>
                  <button
                    className="done-button"
                    onClick={() => markTaskAsDone(index)}
                  >
                    Done
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

// Create the root and render the App component
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
