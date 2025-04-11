import React, {useMemo, useState} from 'react'
import './App.css'
import NewTaskForm from "./components/NewTaskForm/NewTaskForm.jsx";
import TaskList from "./components/TaskList/TaskList.jsx";
import Footer from "./components/Footer/Footer.jsx";


function App() {
    const [tasks, setTasks] = React.useState([
        {task: "task 1",    id: Math.random().toString(36).substring(2, 9),  status: "active",created: new Date(2025, 1, 1)},
        {task: "task 2",    id: Math.random().toString(36).substring(2, 9),  status: "active",created: new Date(Math.floor(Math.random() * 365))},
        {task: "task 3",    id: Math.random().toString(36).substring(2, 9),  status: "active",created: new Date(2025, 3, 9)},
    ]);

   const activeTasksCount = tasks.filter(task => task.status === "active").length;

    const [filter, setFilter] = React.useState("all");



    const completedTasks  = useMemo(() => {
        switch(filter) {
            case "active":
                return tasks.filter(task => task.status === "active");
            case "completed":
                return tasks.filter(task => task.status === "completed");
            case "all":
                return tasks;
        }
    }, [filter, tasks]);
   const clearCompletedTasksCount = () =>{
       setTasks(tasks.filter(task => task.status !== "completed"));
    }

    const editingTask = (id) => {
        setTasks(prevTasks =>
            prevTasks.map(task => {
                if (task.id === id) {
                    return {
                        ...task,
                        status: task.status === "active" || task.status === "completed"  ? "editing" : "active"
                    };
                }
                return task;
            })
        );
    }

    const editTask = (id, text) => {
        setTasks(prevTasks =>
            prevTasks.map(item =>
                item.id === id
                    ? { ...item, task: text, status: "active" }
                    : item
            )
        );
    };

   const createNewTask =(newTask)=>{
       setTasks((task) => [...tasks, newTask]);
    }

    const toggleTask = (id) => {
        setTasks(prevTasks =>
            prevTasks.map(task => {
                if (task.id === id) {
                    return {
                        ...task,
                        status: task.status === "active" ? "completed" : "active"
                    };
                }
                return task;
            })
        );
    };
    const removeTask = (id) => {
      setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    };
    return (
        <section className="todoapp">
            <NewTaskForm createNewTask = {createNewTask}/>
            <section className="main">
                <TaskList editTask = {editTask} tasks={completedTasks} toggleTask = {toggleTask} removeTask = {removeTask}  editingTask ={editingTask} />
                <Footer filter = {filter} setFilter={setFilter} activeTasksCount={activeTasksCount} clearCompletedTasksCount = {clearCompletedTasksCount} completedTasks={ completedTasks}/>
            </section>
        </section>
    )
}

export default App
