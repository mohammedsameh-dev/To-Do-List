import { useEffect, useRef, useState } from "react";
export default function App() {
  localStorage.getItem("tasks");
  const [tasks, setTasks] = useState([
    // { name: "Go To Gym", id: 1 },
    // { name: "Time To Sutdy", id: 2 },
    // { name: "Go To Sleep", id: 3 },
  ]);
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);
  const text = useRef();
  const addTask = () => {
    let textinput = text.current.value;
    if (textinput === "") return;
    let newTask = {
      name: textinput,
    };

    let copy = [...tasks];
    copy.push(newTask);
    setTasks(copy);
    localStorage.setItem("tasks", JSON.stringify(copy));
    text.current.value = "";
  };
  const editeTask = (index) => {
    let newName = prompt("Enter the new task name:", tasks[index].name);
    if (newName === null || newName.trim() === "") return;
    let copy = [...tasks];
    copy[index].name = newName;
    setTasks(copy);
    localStorage.setItem("tasks", JSON.stringify(copy));
  };
  const deleteTask = (index) => {
    let copy = [...tasks];
    copy.splice(index, 1);
    setTasks(copy);
    localStorage.setItem("tasks", JSON.stringify(copy));
  };

  return (
    <>
      <div className="container flex flex-col gap-3 h-[100vh] w-full justify-center items-center">
        <h1 className="font-bold text-5xl">To Do List</h1>

        <div className="w-[100%] md:w-[40%] bg-gray-800 flex flex-col gap-5 justify-center items-center p-5 rounded-2xl">
          <h2 className="text-3xl text-white">Task Form</h2>
          <input
            type="text"
            placeholder="Enter The Task"
            className="input"
            ref={text}
          />
          <button className="btn btn-primary" onClick={addTask}>
            Add Task
          </button>
        </div>

        <table className="table text-center bg-blue-950 text-white mt-5">
          <thead>
            <tr>
              <th>#</th>
              <th>Task Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((el, index) => {
              return (
                <tr key={el.id}>
                  <td>{index + 1}</td>
                  <td>{el.name}</td>
                  <td className="flex gap-5 justify-center items-center">
                    <button
                      className="btn btn-error"
                      onClick={() => deleteTask(index)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-success"
                      onClick={() => editeTask(index)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              );
            })}
            {tasks.length === 0 && (
              <tr>
                <td colSpan="3" className="text-gray-300 py-4">
                  No tasks available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
