import type { CardData } from '../model/Effects.ts'

interface CardProps {
    info: CardData
    className?: string
  }

export function Card({ info={title: "Test Title", description: "Test Description"}, className = ""}: CardProps) {
    return (
        <div className={"card "+className}>
            <h2>{info.title}</h2>
            <p>{info.description}</p>
        </div>
    )
}