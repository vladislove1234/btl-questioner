import { Button } from '../components/Button'
import { Screen, Split } from '../components/Screen'
import type { Question } from '../quiz/types'

interface Props {
  question: Question
  index: number
  total: number
  /** The option the participant tapped; undefined until they answer. */
  picked: string | undefined
  onPick: (optionId: string) => void
  onNext: () => void
}

const optionBase =
  'flex min-h-[72px] w-full items-center justify-between gap-4 rounded-[40px] border px-8 py-4 text-left text-xl font-bold transition-colors duration-300'

export function QuestionScreen({ question, index, total, picked, onPick, onNext }: Props) {
  const answered = picked !== undefined
  const isCorrect = picked === question.correctOptionId

  const optionClass = (id: string) => {
    if (!answered) return 'border-line-input bg-white active:bg-line-input'
    if (id === question.correctOptionId) return 'border-ink bg-ink text-bg'
    if (id === picked) return 'border-accent bg-accent text-bg'
    return 'border-line-input bg-white opacity-40'
  }

  const mark = (id: string) => {
    if (!answered) return null
    if (id === question.correctOptionId) return '✓'
    if (id === picked) return '✗'
    return null
  }

  return (
    <Screen>
      <Split>
        <div>
          <p className="text-lg font-medium text-muted">
            Питання {index + 1} з {total}
          </p>
          <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-line">
            <div className="h-full bg-ink transition-all duration-500" style={{ width: `${((index + 1) / total) * 100}%` }} />
          </div>
          <h2 className="mt-10 text-[clamp(30px,3.6vw,48px)] leading-[1.15] font-bold tracking-[-0.01em] uppercase">
            {question.text}
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {question.options.map((o) => (
            <button
              key={o.id}
              type="button"
              disabled={answered}
              className={`${optionBase} ${optionClass(o.id)}`}
              onClick={() => onPick(o.id)}
            >
              <span>{o.text}</span>
              <span aria-hidden className="text-2xl">
                {mark(o.id)}
              </span>
            </button>
          ))}

          {/* Space is reserved up front so the options don't jump when feedback appears. */}
          <div className={`mt-4 flex items-center justify-between gap-6 ${answered ? '' : 'invisible'}`}>
            <p className={`text-2xl font-bold uppercase ${isCorrect ? 'text-ink' : 'text-accent'}`}>
              {isCorrect ? 'Так!' : 'Не правильно'}
            </p>
            <Button onClick={onNext} disabled={!answered}>
              Далі
            </Button>
          </div>
        </div>
      </Split>
    </Screen>
  )
}
