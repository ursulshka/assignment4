// İlkim Dinç, 2024502042
// Destructuring in parameters and loops (forms 11 and 12). Run with `node js/params.mjs`.

// Form 11 (worked example): an options object in the parameter list, with defaults.
function createTask({ title, status = 'todo' } = {}) {
  return { title, status }
}
console.log('form 11:', createTask({ title: 'Read' })) // form 11: { title: 'Read', status: 'todo' }

// Form 11 (mine): a song card. artist has a default, and the whole parameter has `= {}`.
function describeSong({ title, artist = 'unknown artist', year } = {}) {
  return `${title} - ${artist} (${year})`
}
console.log('form 11:', describeSong({ title: 'Печаль', artist: 'Кино', year: 1989 }))
console.log('form 11 (no artist):', describeSong({ title: 'Печаль', year: 1989 }))
console.log('form 11 (no argument):', describeSong())

// Form 11 without `= {}`: calling with no argument throws.
function describeSongStrict({ title }) {
  return title
}
try {
  describeSongStrict()
} catch (error) {
  console.log('form 11 (no `= {}`):', error.constructor.name, '-', error.message)
}

// Form 11b: the same idea with an array parameter, ([minutes, seconds]) => ...
const toSeconds = ([minutes, seconds]) => minutes * 60 + seconds
console.log('form 11b (Апрель 4:39):', toSeconds([4, 39]), 'seconds')
console.log('form 11b (Печаль 5:31):', toSeconds([5, 31]), 'seconds')
console.log('form 11b (Группа крови 4:44):', toSeconds([4, 44]), 'seconds')
console.log('form 11b (Кукушка 6:38):', toSeconds([6, 38]), 'seconds')

// Form 12: loops over entries, for (const [key, value] of Object.entries(obj))
const sadness = { title: 'Печаль', artist: 'Кино', year: 1989, duration: '5:31' }
for (const [key, value] of Object.entries(sadness)) {
  console.log('form 12 (object):', key, '->', value)
}

// Form 12 with a Map: how many times I played each song this week.
const plays = new Map([
  ['Апрель', 14],
  ['Печаль', 9],
  ['Группа крови', 3],
])
for (const [song, count] of plays) {
  console.log('form 12 (Map):', song, count)
}

// Form 12 with an array of objects: a pattern for each item.
const songs = [
  { title: 'Апрель', year: 1989 },
  { title: 'Кукушка', year: 1990 },
]
for (const { title, year } of songs) {
  console.log('form 12 (array of objects):', title, year)
}
