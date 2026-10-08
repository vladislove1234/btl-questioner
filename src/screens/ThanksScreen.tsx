import { Button } from '../components/Button'
import { Screen, Split } from '../components/Screen'
import { asset } from '../lib/asset'

export function ThanksScreen({ onDone }: { onDone: () => void }) {
  return (
    <Screen>
      <Split>
        <div className="flex flex-col gap-8">
          <h2 className="text-[clamp(34px,4.4vw,60px)] leading-[0.95] font-bold tracking-[-0.01em] uppercase">
            Дякуємо, що познайомилися з нами ще краще!
          </h2>
          <p className="text-2xl font-medium">Залишився останній крок: долучайтеся до нашої спільноти рієлторів</p>
          <p className="text-xl font-medium text-muted">
            Тут ми будемо ділитися найновішою інформацією й анонсувати нові проєкти 🫶🏼
          </p>
          <Button onClick={onDone} className="self-start">
            На початок
          </Button>
        </div>
        <img
          src={asset('images/qr.png')}
          alt="QR-код спільноти рієлторів"
          className="mx-auto aspect-square w-[min(100%,420px)]"
        />
      </Split>
    </Screen>
  )
}
