import React, { useState, useEffect } from 'react'
import TodoItem from '../TodoItem/TodoItem'
import './TodoPhase.css'

export interface ToDo {
  id: string
  text: string
  isCompleted: boolean
};

export interface ToDoPhase {
  todosFromStorage: ToDo[]
  phaseName: string
  phaseId: number
  isPhaseCompleted: boolean
  isEditable: boolean
  setPhaseCompleted: (phaseName: string, newBoolean: boolean) => void
  handleIsEditable: (phaseId: number) => void
};

const TodoPhase: React.FC<ToDoPhase> = ({ todosFromStorage, isPhaseCompleted, phaseName, phaseId, setPhaseCompleted, isEditable, handleIsEditable }) => {
  const [todos, setTodos] = useState<ToDo[]>(localStorage.getItem(`${phaseName}-todoList`) ? JSON.parse(localStorage.getItem(`${phaseName}-todoList`) as any) : todosFromStorage)

  const handleAddTodo = (text: string) => {
    const newTodos = [...todos, { text, isCompleted: false, id: crypto.randomUUID() }]
    setTodos(newTodos)
  }

  const handleCompleteTodo = (id: string) => {
    const newTodos = todos.map(todo =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    )

    setTodos(newTodos)
  }

  const handleRemoveTodo = (id: string) => {
    const newTodos = todos.filter(todo => todo.id !== id)
    if (newTodos.length === 1) {
      setTodos(newTodos)
    }
  }

  const handleSaveEdit = (id: string, newText: string) => {
    const newTodos = todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    )
    setTodos(newTodos)
  }

  useEffect(() => {
    todos.every(todo => todo.isCompleted) ? setPhaseCompleted(phaseName, true) : setPhaseCompleted(phaseName, false)

    if (isPhaseCompleted) {
      if (phaseId !== 3) {
        handleIsEditable(phaseId)
      }
    }
    localStorage.setItem(`${phaseName}-todoList`, JSON.stringify(todos))
  }, [todos, isPhaseCompleted, phaseName])

  useEffect(() => {
    const localeStorageTodos = localStorage.getItem(`${phaseName}-todoList`) || []
    setTodos(JSON.parse(localeStorageTodos as any))
  }, [phaseName])

  return (
    <div className="todo-phase">
      <div className="todo-phase_heading">
        <span className="todo-phase_heading--number">{phaseId}</span>
        <div className="todo-phase_heading--header">
          {phaseName}
        </div>
        {isPhaseCompleted && todos.length > 0 && <span className="todo-phase__checkmark">&#10004;</span>}
      </div>
      <form
        onSubmit={(event: React.ChangeEvent<HTMLFormElement>) => {
          event.preventDefault()
          handleAddTodo(event.target[0].value)
          event.target[0].value = ''
        }}>
        <div className="todo-phase__item">
            <input type="text" placeholder="type here..." defaultValue="" className={ isEditable ? 'todo-item__input' : 'disabled'} disabled={!isEditable}/>
            <button type="submit" className="todo-phase__submit" disabled={!isEditable}>Add Todo</button >
        </div>
      </form>
        <ul className="todo-item__list">
            {todos && todos.map((todo: ToDo) => (
              <TodoItem key={todo.id} todo={todo} handleCompleteTodo={handleCompleteTodo}
              handleRemoveTodo={handleRemoveTodo}
              handleEditTodo={handleSaveEdit}/>
            ))}
        </ul>
    </div>
  )
}

export default TodoPhase
