import React, { useState } from "react";

export const TaskContext = React.createContext({
  tasks: [],
  addTask: (task) => {},
  updateTask: (id, task) => {},
  deleteTask: (id) => {},
  completedTask: (id) => {},
  favTask: (id) => {},
});
function TaskContextProvider(props) {
  const [tasks, setTasks] = useState([
    {
      id: "T1",
      discription: "This is fun task,everybody had fun.",
      name: "Task 1",
      isFav: true,
      isCompleted: false,
    },
    {
      id: "T2",
      discription: "This is a task,which needs everyone 's attention.",
      name: "Task 2",
      isFav: false,
      isCompleted: false,
    },
  ]);
  const addTaskHandler = (task) => {
    setTasks((prevsTask) => [...prevsTask, task]);
  };
  const addFavHandler = (id) => {
    const copyTask = [...tasks];
    const index = copyTask.findIndex((task) => task.id === id);
    copyTask[index].isFav = !copyTask[index].isFav;
    setTasks(copyTask);
  };
  const addCompleted = (id) => {
    const copyTask = [...tasks];
    const index = copyTask.findIndex((task) => task.id === id);
    copyTask[index].isCompleted = !copyTask[index].isCompleted;
    setTasks(copyTask);
  };
  const updateTaskHandler = (id, updatetask) => {
    console.log(id, updatetask);
    const copyTask = [...tasks];
    const index = tasks.findIndex((task) => task.id === id);
    copyTask[index] = updatetask;
    setTasks(copyTask);
  };
  const deleteTaskHandler = (id) => {
    const filterData = tasks.filter((task) => task.id !== id);
    setTasks(filterData);
  };

  const val = {
    tasks,
    addTask: addTaskHandler,
    updateTask: updateTaskHandler,
    deleteTask: deleteTaskHandler,
    completedTask: addCompleted,
    favTask: addFavHandler,
  };
  return (
    <TaskContext.Provider value={val}>{props.children}</TaskContext.Provider>
  );
}

export default TaskContextProvider;
