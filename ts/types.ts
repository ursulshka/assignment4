// İlkim Dinç, 2024502042
// What only TypeScript adds (topics T1 to T5). See the handout.

// T1 (worked example): `{ a: string }` inside a pattern is a RENAME, not a type.
const point = { x: 1, y: 2 }
const { x: horizontal } = point // x is renamed to horizontal; there is no variable x
console.log('T1:', horizontal) // T1: 1

// T2 to T5: TODO
