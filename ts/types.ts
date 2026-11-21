// İlkim Dinç, 2024502042
// What only TypeScript adds (topics T1 to T5). See the handout.

// T1 (worked example): `{ a: string }` inside a pattern is a RENAME, not a type.
const point = { x: 1, y: 2 }
const { x: horizontal } = point // x is renamed to horizontal; there is no variable x
console.log('T1:', horizontal) // T1: 1

type Song = { title: string; year: number; duration: string; rating?: number }
const april: Song = { title: 'Апрель', year: 1989, duration: '4:39' }

// T1 (mine): this LOOKS like "title has type string", but it makes a variable called `string`.
const { title: string } = april
console.log('T1 (a variable named string):', string)

// T1, the correct way: the type goes after the whole pattern.
const { title, year }: { title: string; year: number } = april
console.log('T1 (typed correctly):', title, year)

// T2: a tuple return type. Without it, the function returns number[] and
// with noUncheckedIndexedAccess each destructured item would be `number | undefined`.
function lengthOf(song: Song): [number, number] {
  const [minutes = 0, seconds = 0] = song.duration.split(':').map(Number)
  return [minutes, seconds]
}
const [mins, secs] = lengthOf(april) // both `number`
console.log('T2 (tuple):', mins * 60 + secs, 'seconds')

// T2: `as const` turns an array into a readonly tuple with literal types.
const loose = ['Апрель', 1989] // (string | number)[]
const exact = ['Апрель', 1989] as const // readonly ['Апрель', 1989]
const [looseTitle] = loose // string | number | undefined
const [exactTitle, exactYear] = exact // 'Апрель' and 1989 (literal types)
console.log('T2 (as const):', typeof looseTitle, exactTitle, exactYear)

// T3: noUncheckedIndexedAccess. `first` is `string | undefined`, even though the array has items,
// because TypeScript does not track the length of a string[].
const playlist: string[] = ['Печаль', 'Апрель']
const [first] = playlist

// first.toUpperCase()  <- error: 'first' is possibly 'undefined'
if (first !== undefined) {
  console.log('T3 (after a check):', first.toUpperCase())
}
const [opener = 'silence'] = [] as string[] // with a default the type is `string`
console.log('T3 (default):', opener.toUpperCase())

// T4: optional fields and defaults change the type of the variable.
const { rating } = april // number | undefined (optional field)
const { rating: ratingOrZero = 0 } = april // number (the default removes undefined)
console.log('T4:', rating, ratingOrZero)

// T5: one compile error that destructuring causes.
// find() returns Song | undefined, and you cannot destructure a value that may be undefined.
const library: Song[] = [april]
const found = library.find((s) => s.title === 'Кукушка')
try {
  // @ts-expect-error Property 'year' does not exist on type 'Song | undefined'.
  const { year: foundYear } = found
  console.log(foundYear)
} catch (error) {
  console.log('T5 (what the error protects me from):', (error as Error).message)
}
// The fix: give a fallback object (or check first), so the right side is never undefined.
const { year: safeYear = 0 } = found ?? {}
console.log('T5 (fixed):', safeYear)

export { } // makes this file a module, so its names do not clash with the other files
