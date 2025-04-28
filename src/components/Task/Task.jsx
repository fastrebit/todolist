import React from 'react'
import { formatDistanceToNow } from 'date-fns'
import "./Task.css"

const Task = ({ task,min,sec, toggleTask, startTimer,id,endTimer, removeTask, created, editingTask, status, editTask }) => {
  const [editText, setEditText] = React.useState(`${task}`)
  if (status === 'active' || status === 'completed') {
    return (
      <div className="view">
        <input className={'toggle'} type="checkbox" onChange={() => toggleTask(id)} />
        <label>
          <span className="title">{task}</span>
            <span className="description">
                <button className={"icon icon-play"} onClick={()=>startTimer(id)}/>
                <button className={"icon icon-pause"} onClick={()=>endTimer(id)}/>
                {min}:{sec}
            </span>
          <span className="description">created {formatDistanceToNow(created)}</span>
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
