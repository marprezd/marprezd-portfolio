import { Card, CardHeader } from '@nextui-org/card'

interface Props {
  title: string
  description: string
}

export default function PageHero({ title, description }: Props) {
  return (
    <div className="basis-full">
      <Card className="h-[320px] rounded-3xl bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-pink-700 via-rose-800 to-red-900">
        <CardHeader className="absolute top-1 z-10 flex-col !items-start xl:top-3">
          <div className="max-w-96 rounded-xl bg-white/10 p-4">
            <h1 className="mb-4 leading-none tracking-tight text-white">
              {title}
            </h1>
            <p className="text-lg text-white">
              {description}
            </p>
          </div>
        </CardHeader>
      </Card>
    </div>
  )
}
