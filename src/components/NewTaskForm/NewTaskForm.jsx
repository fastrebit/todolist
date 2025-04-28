import React from 'react'
import './NewTaskForm.css'
import { nanoid } from 'nanoid'

const NewTaskForm = ({ createNewTask }) => {
  const [taskText, setTaskText] = React.useState('')
  const [min, setMin] = React.useState("")
  const [sec, setSec] = React.useState("")

  const submit = (event) => {
    event.preventDefault()
    if (taskText.trim() === '') {
      return
    }
    createNewTask({
      task: taskText,
      id: nanoid(),
      status: 'active',
      created: Date.now(),
      min: min !== "" ? min : "0",
      sec: sec !== "" ? sec : "0",
    })
    setTaskText('')
    setMin("")
    setSec("")
  }

  return (
    <header className = "header">
      <h1>todos</h1>
      <form onSubmit={submit} className="new-todo-form">
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
        />
        <input className={"new-todo-form__timer"} placeholder={"Min"} value={min} onChange={event => setMin((event.target.value))}
        />
        <input className={"new-todo-form__timer"} placeholder={"Sec"} value={sec} onChange={event => setSec((event.target.value))}
        />
        <button type="submit" style={{ display: 'none' }}></button>
      </form>
    </header>
  )
}

export default NewTaskForm
