import React, { useState } from 'react'
import './TodoItem.css'

interface ToDo {
  id: string
  text: string
  isCompleted: boolean
};

const TodoItem: React.FC<{ todo: ToDo, handleCompleteTodo: (id: string) => void, handleEditTodo: (id: string, text: string) => void, handleRemoveTodo: (id: string) => void }> = ({ todo, handleCompleteTodo, handleEditTodo, handleRemoveTodo }) => {
  const [editing, setEditing] = useState(false)
  const [text, setText] = useState(todo.text)

  const handleEdit = () => {
    setEditing(true)
  }

  const handleSave = (id: string) => {
    handleEditTodo(id, text)
    setEditing(false)
  }
  // some classes have wrong BEM naming due to time constraints and last minute refactoring
  return (
    <li className="todo-item">
        <label className="checkbox-container">
      {editing
        ? (
        <>
          <input type="text" className="todo-item__input" value={text} onChange={(e) => { setText(e.target.value) }} />
          <button className="todo-item__button" onClick={() => { handleSave(todo.id) }}>Save</button>
        </>
          )
        : (
        <>
          <input type="checkbox" className="todoitem__list-item__checkbox" checked={todo.isCompleted} onChange={() => { handleCompleteTodo(todo.id) }} />
          <span className="checkmark"></span>
          <span>{todo.text}</span>
          <button className="todo-item__button" onClick={handleEdit}>Edit</button>
          {/* <button className="todo-item__button" onClick={() => { handleRemoveTodo(todo.id) }}>Remove</button> */}
        </>
          )}
      </label>
    </li>
  )
}

export default TodoItem
