// İlkim Dinç, 2024502042
// Things that surprise people. Run with `node js/pitfalls.mjs`.

// Pitfall 1 (worked example): destructuring undefined or null throws a TypeError.
try {
  const { a } = undefined
  console.log(a)
} catch (error) {
  console.log('pitfall 1:', error.constructor.name) // pitfall 1: TypeError
}

// Pitfall 1 (mine): a song lookup that finds nothing returns undefined.
const library = [{ title: 'Апрель', year: 1989 }]
const found = library.find((song) => song.title === 'Кукушка') // not in the library
try {
  const { year } = found
  console.log(year)
} catch (error) {
  console.log('pitfall 1 (find returned undefined):', error.message)
}

// Pitfall 2: a default only applies to undefined, not to null
const fromServer = { title: 'Печаль', duration: null } // "we have no duration" sent as null
const { duration = '?:??' } = fromServer
console.log('pitfall 2 (null is kept):', duration)

// Pitfall 3: assigning without const/let needs parentheses, ({ a } = obj)
let title
let year
// { title, year } = { title: 'Апрель', year: 1989 }   <- SyntaxError: the { starts a block
;({ title, year } = { title: 'Апрель', year: 1989 })
console.log('pitfall 3 (with parentheses):', title, year)

// Pitfall 4: it copies references, not deep copies (nested objects are shared)
const album = { name: 'Звезда по имени Солнце', band: { name: 'Кино' } }
const { band } = album
band.name = 'КИНО (changed)'
console.log('pitfall 4 (album changed too):', album.band.name)

// The rest object is also shallow: the nested object is the same one.
const { name, ...restOfAlbum } = album
console.log('pitfall 4 (rest shares band):', restOfAlbum.band === album.band, name)

// Pitfall 5: in objects the order does not matter, in arrays it does
const song = { title: 'Апрель', year: 1989 }
const { year: y1, title: t1 } = song
console.log('pitfall 5 (object, any order):', t1, y1)

const pair = ['Апрель', 1989]
const [y2, t2] = pair // I put the names in the wrong order
console.log('pitfall 5 (array, wrong order):', 'year =', y2, 'title =', t2)
