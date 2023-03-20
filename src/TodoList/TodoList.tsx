import TodoPhase from '../TodoPhase/TodoPhase'
import React, { useEffect, useState } from 'react'
import { fetchUselessFactData } from '../lib/ApiClient'
import './TodoList.css'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function TodoList () {
  const [phases, setPhases] = useState([
    { todosFromStorage: [], phaseName: 'foundation', phaseId: 1, isPhaseCompleted: false, isEditable: true },
    { todosFromStorage: [], phaseName: 'discovery', phaseId: 2, isPhaseCompleted: false, isEditable: false },
    { todosFromStorage: [], phaseName: 'delivery', phaseId: 3, isPhaseCompleted: false, isEditable: false }
  ])

  const [uselessFact, setUselessFact] = useState<any | null>(null)
  const [allPhasesCompleted, setAllPhasesCompleted] = useState<boolean>(false)

  const handleIsEditable = (phaseId: number) => {
    const updatedPhases = [...phases]
    const phaseIndex = updatedPhases.findIndex(phase => phase.phaseId === phaseId)
    if (phaseIndex >= 0) {
      const prevPhase = updatedPhases[phaseIndex - 1]
      const currentPhase = updatedPhases[phaseIndex]
      if (prevPhase && prevPhase.isPhaseCompleted) {
        const nextPhase = updatedPhases[phaseIndex + 1]
        if (nextPhase) {
          nextPhase.isEditable = !nextPhase.isEditable
        }
      } else if (currentPhase) {
        const nextPhase = updatedPhases[phaseIndex + 1]
        if (nextPhase) {
          nextPhase.isEditable = !nextPhase.isEditable
        }
      }
    }
    setPhases(updatedPhases)
  }

  const handlePhaseChange = (phaseName: string, newBoolean: boolean) => {
    const copyPhases = [...phases]
    copyPhases.find(phase => phase.phaseName === phaseName)!.isPhaseCompleted = newBoolean
    setPhases(copyPhases)
  }

  useEffect(() => {
    if (phases.every(phase => phase.isPhaseCompleted)) {
      setAllPhasesCompleted(true)
      fetchUselessFactData().then(data => { setUselessFact(data) })
    } else {
      setAllPhasesCompleted(false)
    }
  }, [phases, setPhases, allPhasesCompleted])

  return (
    <div>
    <div className="todo-screen">
      <h1>My startup progress</h1>
      {phases.map(phase => <TodoPhase key={phase.phaseId}
       isEditable={phase.isEditable}
       handleIsEditable={handleIsEditable}
       todosFromStorage={phase.todosFromStorage}
       phaseName={phase.phaseName}
       phaseId={phase.phaseId}
       isPhaseCompleted={phase.isPhaseCompleted}
       setPhaseCompleted={handlePhaseChange} />)}

    </div>
    {(uselessFact && allPhasesCompleted) && <div className="useless-fact">&bdquo;{uselessFact.text}&rdquo;</div>}
    </div>
  )
}

export default TodoList
