import React, {  useMemo, useState } from 'react'
import './App.css'
import NewTaskForm from './components/NewTaskForm/NewTaskForm.jsx'
import TaskList from './components/TaskList/TaskList.jsx'
import Footer from './components/Footer/Footer.jsx'
import { nanoid } from 'nanoid'


function App() {
  const [tasks, setTasks] = useState([
    { task: 'task 1', id: nanoid(), status: 'active', created: new Date(2025, 1, 1), min: 10, sec: 11 },
    { task: 'task 2', id:nanoid(), status: 'active', created: new Date(Math.floor(Math.random() * 365)), min: 10, sec: 11 },
    { task: 'task 3', id: nanoid(), status: 'active', created: new Date(2025, 3, 9), min: 10, sec: 11 },
  ])

  const [intervals, setIntervals] = useState({})
  const [filter, setFilter] = useState('all')

  const activeTasksCount = tasks.filter((task) => task.status === 'active').length

  const completedTasks = useMemo(() => {
    switch (filter) {
      case 'active':
        return tasks.filter((task) => task.status === 'active')
      case 'completed':
        return tasks.filter((task) => task.status === 'completed')
      case 'all':
        return tasks
    }
  }, [filter, tasks])

  const clearCompletedTasksCount = () => {
    setTasks(tasks.filter((task) => task.status !== 'completed'))
  }

  const startTimer = (id) => {
    if (intervals[id]) return

    const intervalId = setInterval(() => {
      setTasks((prevTasks) =>
          prevTasks.map((task) => {
            if (task.id === id) {
              if (task.sec <= 0) {
                return { ...task, min: task.min - 1, sec: 59 }
              }
              return { ...task, sec: task.sec - 1 }
            }
            return task
          })
      )
    }, 1000)
    setIntervals((prev) => ({ ...prev, [id]: intervalId }))
  }

  const endTimer = (id) => {
    const intervalId = intervals[id]
    if (intervalId) {
      clearInterval(intervalId)
      setIntervals((prev) => {
        const updated = { ...prev }
        delete updated[id]
        return updated
      })
    }
  }


  const editingTask = (id) => {
    setTasks((prevTasks) =>
        prevTasks.map((task) => {
          if (task.id === id) {
            return {
              ...task,
              status: task.status === 'active' || task.status === 'completed' ? 'editing' : 'active',
            }
          }
          return task
        })
    )
  }

  const editTask = (id, text) => {
    setTasks((prevTasks) =>
        prevTasks.map((item) => (item.id === id ? { ...item, task: text, status: 'active' } : item))
    )
  }

  const createNewTask = (newTask) => {
    setTasks((tasks) => [...tasks, newTask])
  }

  const toggleTask = (id) => {
    setTasks((prevTasks) =>
        prevTasks.map((task) => {
          if (task.id === id) {
            return {
              ...task,
              status: task.status === 'active' ? 'completed' : 'active',
            }
          }
          return task
        })
    )
  }

  const removeTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
    endTimer(id)
  }

  return (
      <section className="todoapp">
        <NewTaskForm createNewTask={createNewTask} />
        <section className="main">
          <TaskList
              editTask={editTask}
              tasks={completedTasks}
              toggleTask={toggleTask}
              removeTask={removeTask}
              editingTask={editingTask}
              startTimer={startTimer}
              endTimer={endTimer}
          />
          <Footer
              filter={filter}
              setFilter={setFilter}
              activeTasksCount={activeTasksCount}
              clearCompletedTasksCount={clearCompletedTasksCount}
              completedTasks={completedTasks}
          />
        </section>
      </section>
  )
}

export default App
