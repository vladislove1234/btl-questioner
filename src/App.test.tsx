import { act, fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import App from './App'
import { questions } from './quiz/questions'
import { loadQueue } from './submissions/queue'

beforeEach(() => {
  localStorage.clear()
  vi.spyOn(console, 'warn').mockImplementation(() => {})
})

afterEach(() => vi.useRealTimers())

it('runs the full flow and queues the submission', async () => {
  const user = userEvent.setup()
  render(<App />)

  await user.click(screen.getByText('натисніть, щоб почати'))

  // Answer the first question wrong, the rest right.
  for (const [i, q] of questions.entries()) {
    const correct = q.options.find((o) => o.id === q.correctOptionId)!
    const wrong = q.options.find((o) => o.id !== q.correctOptionId)!
    await user.click(screen.getByRole('button', { name: new RegExp((i === 0 ? wrong : correct).text) }))
    expect(screen.getByText(i === 0 ? 'Упс, цього разу не правильно' : 'Так!')).toBeVisible()
    await user.click(screen.getByRole('button', { name: 'Далі' }))
  }

  const total = questions.length
  expect(screen.getByText(`${total - 1} з ${total}`)).toBeInTheDocument()

  const submit = screen.getByRole('button', { name: /Надіслати/ })
  await user.type(screen.getByLabelText('Ваше імʼя та прізвище'), 'Олена Петренко')
  await user.type(screen.getByLabelText('Ваш номер телефону'), '0671234567')
  expect(screen.getByLabelText('Ваш номер телефону')).toHaveValue('67 123 45 67')
  expect(submit).toBeDisabled()
  await user.type(screen.getByLabelText('В якій компанії працюєте?'), 'АН Дім')
  await user.click(submit)

  expect(screen.getByText(/Дякуємо, що познайомилися/)).toBeInTheDocument()

  // No VITE_SUBMIT_URL in tests, so the send fails and the submission stays queued.
  const [queued] = loadQueue()
  expect(queued).toMatchObject({
    name: 'Олена Петренко',
    phone: '+380 67 123 45 67',
    company: 'АН Дім',
    correct: total - 1,
    total,
  })
})

it('opens the staff check after holding the badge for 5 s, without starting the test', () => {
  vi.useFakeTimers()
  render(<App />)
  const badge = screen.getByTestId('badge')

  fireEvent.pointerDown(badge)
  act(() => vi.advanceTimersByTime(5000))
  fireEvent.pointerUp(badge)
  fireEvent.click(badge)

  expect(screen.getByText('у черзі: 0')).toBeInTheDocument()
  expect(screen.getByText('натисніть, щоб почати')).toBeInTheDocument()
})
