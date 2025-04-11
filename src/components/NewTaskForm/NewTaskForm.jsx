import React from 'react'
import './NewTaskForm.css'

const NewTaskForm = ({ createNewTask }) => {
  const [taskText, setTaskText] = React.useState('')

  const submit = (event) => {
    event.preventDefault()
    createNewTask({
      task: taskText,
      id: Math.random().toString(36).substring(2, 9),
      status: 'active',
      created: Date.now(),
    })
    setTaskText('')
  }

  return (
    <header>
      <h1>todos</h1>
      <form onSubmit={submit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
        />
      </form>
    </header>
  )
}

export default NewTaskForm
