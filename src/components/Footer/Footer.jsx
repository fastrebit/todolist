import React from 'react'
import TasksFilter from '../TaskFilter/TasksFilter.jsx'
import './Footer.css'

const Footer = ({ activeTasksCount, clearCompletedTasksCount, filter, setFilter }) => {
  return (
    <footer className="footer">
      <span className={'todo-count'}> {activeTasksCount} items left</span>
      <ul className={'filters'}>
        <TasksFilter filter={filter} setFilter={setFilter} />
      </ul>
      <button className={'clear-completed'} onClick={() => clearCompletedTasksCount()}>
        clear-completed
      </button>
    </footer>
  )
}

export default Footer
