import React from 'react'
import { formatDistanceToNow } from 'date-fns'

const Task = ({ task, toggleTask, id, removeTask, created, editingTask, status, editTask }) => {
  const [editText, setEditText] = React.useState('')
  if (status === 'active' || status === 'completed') {
    return (
      <div className="view">
        <input className={'toggle'} type="checkbox" onChange={() => toggleTask(id)} />
        <label>
          <span className="description">{task}</span>
          <span className="created">created {formatDistanceToNow(created)}</span>
        </label>
        <button
          className={'icon icon-edit'}
          onClick={() => {
            editingTask(id)
          }}
        ></button>
        <button className={'icon icon-destroy'} onClick={() => removeTask(id)}></button>
      </div>
    )
  }
  if (status === 'editing') {
    const submit = (event) => {
      event.preventDefault()
      if (editText.trim()) {
        editTask(id, editText)
      }
    }
    return (
      <form onSubmit={submit}>
        <input className="edit" type="text" value={editText} onChange={(e) => setEditText(e.target.value)} />
      </form>
    )
  }
}

export default Task
