import React from 'react'
import './TaskList.css'
import Task from '../Task/Task.jsx'

const TaskList = ({ tasks, toggleTask, removeTask, createNewTask, editingTask, editTask }) => {
  return (
    <ul className="todo-list">
      {tasks.map((item) => {
        return (
          <li className={item.status} key={item.id}>
            <Task
              task={item.task}
              status={item.status}
              removeTask={removeTask}
              toggleTask={toggleTask}
              id={item.id}
              createNewTask={createNewTask}
              created={item.created}
              editingTask={editingTask}
              editTask={editTask}
            />
          </li>
        )
      })}
    </ul>
  )
}

export default TaskList
