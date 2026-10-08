import { useCallback, useEffect, useReducer, useState } from 'react'
import { StaffOverlay } from './components/StaffOverlay'
import { config } from './config'
import { useIdleReset } from './hooks/useIdleReset'
import { uuid } from './lib/uuid'
import { questions } from './quiz/questions'
import { scoreQuiz, type Score } from './quiz/scoring'
import type { Answers } from './quiz/types'
import { IntroScreen } from './screens/IntroScreen'
import { QuestionScreen } from './screens/QuestionScreen'
import { ResultScreen } from './screens/ResultScreen'
import { ThanksScreen } from './screens/ThanksScreen'
import { enqueue } from './submissions/queue'
import { flushQueue, startSync } from './submissions/sync'
import type { Contact } from './submissions/types'

// Flow (SPEC §3): intro → question × N → result + form → thanks → intro
type State =
  | { step: 'intro' }
  | { step: 'question'; index: number; answers: Answers }
  | { step: 'result'; score: Score }
  | { step: 'thanks' }

type Action =
  | { type: 'start' }
  | { type: 'pick'; optionId: string }
  | { type: 'next' }
  | { type: 'submitted' }
  | { type: 'reset' }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'start':
      return { step: 'question', index: 0, answers: {} }
    case 'pick': {
      if (state.step !== 'question') return state
      const id = questions[state.index].id
      if (state.answers[id]) return state // answers are final
      return { ...state, answers: { ...state.answers, [id]: action.optionId } }
    }
    case 'next': {
      if (state.step !== 'question') return state
      const next = state.index + 1
      return next < questions.length
        ? { ...state, index: next }
        : { step: 'result', score: scoreQuiz(questions, state.answers) }
    }
    case 'submitted':
      return { step: 'thanks' }
    case 'reset':
      return { step: 'intro' }
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, { step: 'intro' })
  const [staffOpen, setStaffOpen] = useState(false)
  const reset = useCallback(() => dispatch({ type: 'reset' }), [])

  useEffect(() => startSync(), [])
  useIdleReset(
    state.step !== 'intro',
    state.step === 'thanks' ? config.thanksResetMs : config.idleResetMs,
    reset,
  )

  const submit = (score: Score, contact: Contact) => {
    enqueue({ id: uuid(), createdAt: new Date().toISOString(), ...contact, ...score })
    void flushQueue()
    dispatch({ type: 'submitted' })
  }

  return (
    <main>
      {state.step === 'intro' && (
        <IntroScreen onStart={() => dispatch({ type: 'start' })} onStaff={() => setStaffOpen(true)} />
      )}
      {state.step === 'question' && (
        <QuestionScreen
          key={state.index}
          question={questions[state.index]}
          index={state.index}
          total={questions.length}
          picked={state.answers[questions[state.index].id]}
          onPick={(optionId) => dispatch({ type: 'pick', optionId })}
          onNext={() => dispatch({ type: 'next' })}
        />
      )}
      {state.step === 'result' && (
        <ResultScreen score={state.score} onSubmit={(contact) => submit(state.score, contact)} />
      )}
      {state.step === 'thanks' && <ThanksScreen onDone={reset} />}
      {staffOpen && <StaffOverlay onClose={() => setStaffOpen(false)} />}
    </main>
  )
}
