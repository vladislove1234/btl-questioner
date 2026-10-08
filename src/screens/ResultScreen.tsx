import { useState, type ChangeEvent, type FormEvent } from 'react'
import { Button } from '../components/Button'
import { Screen, Split } from '../components/Screen'
import { formatNational, fullPhone, isValidPhone } from '../lib/phone'
import type { Score } from '../quiz/scoring'
import type { Contact } from '../submissions/types'

interface Props {
  score: Score
  onSubmit: (contact: Contact) => void
}

const inputClass =
  'h-[74px] w-full rounded-[40px] border border-line-input bg-white px-8 text-lg font-bold text-ink outline-none placeholder:text-sand-dark focus:border-ink'

export function ResultScreen({ score, onSubmit }: Props) {
  // `phone` holds only the national part ("67 123 45 67"); +380 is shown as a fixed prefix.
  const [contact, setContact] = useState<Contact>({ name: '', phone: '', company: '' })

  const valid = contact.name.trim() !== '' && isValidPhone(contact.phone) && contact.company.trim() !== ''

  const set = (field: keyof Contact) => (e: ChangeEvent<HTMLInputElement>) => {
    const value = field === 'phone' ? formatNational(e.target.value) : e.target.value
    setContact((c) => ({ ...c, [field]: value }))
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (valid) onSubmit({ name: contact.name.trim(), phone: fullPhone(contact.phone), company: contact.company.trim() })
  }

  return (
    <Screen>
      <Split>
        <div className="text-center landscape:text-left">
          <p className="text-[clamp(120px,14vw,200px)] leading-[0.85] font-bold tracking-[-0.02em]">
            {score.correct} з {score.total}
          </p>
          <p className="mt-6 text-2xl font-medium uppercase">правильних відповідей</p>
        </div>

        <form onSubmit={submit} className="flex flex-col gap-5" noValidate>
          <label className="flex flex-col gap-2 text-lg font-medium">
            Ваше імʼя та прізвище
            <input className={inputClass} autoComplete="off" value={contact.name} onChange={set('name')} />
          </label>
          <div className="flex flex-col gap-2 text-lg font-medium">
            <label htmlFor="phone">Ваш номер телефону</label>
            <div className="flex h-[74px] w-full items-center gap-[0.3em] rounded-[40px] border border-line-input bg-white px-8 text-lg font-bold focus-within:border-ink">
              <span aria-hidden>+380</span>
              <input
                id="phone"
                className="h-full min-w-0 flex-1 bg-transparent text-ink outline-none placeholder:text-sand-dark"
                type="tel"
                inputMode="tel"
                autoComplete="off"
                placeholder="XX XXX XX XX"
                value={contact.phone}
                onChange={set('phone')}
              />
            </div>
          </div>
          <label className="flex flex-col gap-2 text-lg font-medium">
            В якій компанії працюєте?
            <input className={inputClass} autoComplete="off" value={contact.company} onChange={set('company')} />
          </label>
          <Button type="submit" disabled={!valid} className="mt-3 w-full">
            Надіслати 😉
          </Button>
          <p className="text-center text-sm text-muted">
            Натискаючи кнопку, ви погоджуєтесь на обробку персональних даних
          </p>
        </form>
      </Split>
    </Screen>
  )
}
