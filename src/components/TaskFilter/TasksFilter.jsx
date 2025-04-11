import React from 'react'

const TasksFilter = ({ setFilter, filter }) => {
  return (
    <li>
      <button
        className={filter === 'all' ? 'selected' : ''}
        onClick={(event) => {
          event.preventDefault()
          setFilter('all')
        }}
      >
        {' '}
        all
      </button>

      <button
        className={filter === 'completed' ? 'selected' : ''}
        onClick={(event) => {
          event.preventDefault()
          setFilter('completed')
        }}
      >
        {' '}
        completed
      </button>

      <button
        className={filter === 'active' ? 'selected' : ''}
        onClick={(event) => {
          event.preventDefault()
          setFilter('active')
        }}
      >
        {' '}
        active
      </button>
    </li>
  )
}

export default TasksFilter
