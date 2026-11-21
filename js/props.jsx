// İlkim Dinç, 2024502042
// Props and children in plain JavaScript (JSX). Run with `npx tsx js/props.jsx`.
import { renderToStaticMarkup } from 'react-dom/server'

// Worked example: props is ONE object; the parameter pattern takes it apart.
// These two components are the same thing written two ways.
function CardA(props) {
  return <section><h2>{props.title}</h2>{props.children}</section>
}
function CardB({ title, children }) {
  return <section><h2>{title}</h2>{children}</section>
}
console.log('A:', renderToStaticMarkup(<CardA title="Hi">text</CardA>))
console.log('B:', renderToStaticMarkup(<CardB title="Hi">text</CardB>))
// A: <section><h2>Hi</h2>text</section>
// B: <section><h2>Hi</h2>text</section>

// TODO: the rest of the props and children section of the handout (P1 to P7).
