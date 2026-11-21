// İlkim Dinç, 2024502042
// Props and children in TypeScript. Run with `npx tsx ts/props.tsx`.
import type { ReactNode } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

type CardProps = { title: string; children?: ReactNode }

// Worked example: the type goes after the whole pattern, and children is in the type too.
function Card({ title, children }: CardProps) {
  return <section><h2>{title}</h2>{children}</section>
}
console.log(renderToStaticMarkup(<Card title="Hi">text</Card>))
// <section><h2>Hi</h2>text</section>

// TODO: P1 to P7.
