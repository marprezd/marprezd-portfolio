import { Card, CardHeader } from '@nextui-org/card'

interface Props {
  title: string
  description: string
}

export default function PageHero({ title, description }: Props) {
  return (
    <div className="relative z-10 mx-auto max-w-[85rem] px-4 pb-10 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto mt-5 max-w-xl text-center">
        <h1 className="block text-4xl font-bold md:text-5xl lg:text-6xl">
          {title}
        </h1>
      </div>
      <div className="mx-auto mt-5 max-w-3xl text-center">
        <p className="text-lg">
          {description}
        </p>
      </div>
    </div>
  )
}
