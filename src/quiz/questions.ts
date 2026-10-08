import type { Question } from './types'

// Shown in this order; options are not shuffled (SPEC §4.2). Avoid "№": the font has no glyph for it.
export const questions: Question[] = [
  {
    id: 'q1',
    text: 'Який простір бюро «Будинки та люди» вже реалізовано?',
    options: [
      { id: 'a', text: 'З.40' },
      { id: 'b', text: 'З.45' },
      { id: 'c', text: 'Курдонери' },
      { id: 'd', text: 'Парк 340' },
    ],
    correctOptionId: 'a',
  },
  {
    id: 'q2',
    text: 'Яке оздоблення фасаду фронтальної будівлі З.40?',
    options: [
      { id: 'a', text: 'Клінкерна цегла' },
      { id: 'b', text: 'Керамічна плитка' },
      { id: 'c', text: 'Декоративна штукатурка' },
      { id: 'd', text: 'Панелі з імітацією клінкерної цегли' },
    ],
    correctOptionId: 'a',
  },
  {
    id: 'q3',
    text: 'Де знаходиться будівництво простору «Курдонери»?',
    options: [
      { id: 'a', text: 'Січинського, 9' },
      { id: 'b', text: 'Пасічна, 89' },
      { id: 'c', text: 'Вашингтона, 9' },
      { id: 'd', text: 'Луганська, 9' },
    ],
    correctOptionId: 'a',
  },
  {
    id: 'q4',
    text: 'Скільки дворів буде в просторі Курдонери?',
    options: [
      { id: 'a', text: '2' },
      { id: 'b', text: '4' },
      { id: 'c', text: '6' },
      { id: 'd', text: '22' },
    ],
    correctOptionId: 'c',
  },
  {
    id: 'q5',
    text: 'Чим будуть оздоблені вентильовані фасади всіх будинків в «Курдонерах»?',
    options: [
      { id: 'a', text: 'Клінкерною цеглою' },
      { id: 'b', text: 'Керамічною плиткою' },
      { id: 'c', text: 'Фасадними панелями' },
      { id: 'd', text: 'Штучним каменем' },
    ],
    correctOptionId: 'b',
  },
  {
    id: 'q6',
    text: 'Хто є архітектором простору «Курдонери»?',
    options: [
      { id: 'a', text: 'Володимир Безбородов' },
      { id: 'b', text: 'Drozdov&Partners' },
      { id: 'c', text: 'Archimatika' },
      { id: 'd', text: 'Денис Павлячек' },
    ],
    correctOptionId: 'b',
  },
  {
    id: 'q7',
    text: 'Якої поверховості будинки першої черги простору «Курдонери»?',
    options: [
      { id: 'a', text: '8 поверхів' },
      { id: 'b', text: '7 поверхів' },
      { id: 'c', text: '6, 9, та 10' },
      { id: 'd', text: '8, 9, та 10' },
    ],
    correctOptionId: 'c',
  },
  {
    id: 'q8',
    text: 'Чи співпрацює бюро «Будинки та люди» з рієлторами?',
    options: [
      { id: 'a', text: 'Так' },
      { id: 'b', text: 'Ні' },
    ],
    correctOptionId: 'a',
  },
]
