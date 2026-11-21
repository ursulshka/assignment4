// İlkim Dinç, 2024502042
// Forms 11 and 12 in TypeScript, and the typing rules for patterns in parameters.

type TaskInput = { title: string; status?: 'todo' | 'done' }

// Form 11 (worked example): the type goes after the whole pattern.
function createTask({ title, status = 'todo' }: TaskInput) {
  return { title, status }
}
console.log('form 11:', createTask({ title: 'Read' })) // form 11: { title: 'Read', status: 'todo' }

// Form 11 (mine): every field optional, so `= {}` is allowed as a default for the whole parameter.
type SongCard = { title?: string; artist?: string; year?: number }

function describeSong({ title = 'untitled', artist = 'unknown artist', year }: SongCard = {}): string {
  // title and artist are `string` here (they have defaults), year is `number | undefined`.
  return `${title} - ${artist} (${year ?? 'year?'})`
}
console.log('form 11:', describeSong({ title: 'Печаль', artist: 'Кино', year: 1989 }))
console.log('form 11 (no artist):', describeSong({ title: 'Печаль', year: 1989 }))
console.log('form 11 (no argument):', describeSong())

// Form 11b: an array parameter typed as a tuple.
const toSeconds = ([minutes, seconds]: [number, number]): number => minutes * 60 + seconds
console.log('form 11b (Апрель 4:39):', toSeconds([4, 39]))
console.log('form 11b (Кукушка 6:38):', toSeconds([6, 38]))

// Form 12: Object.entries gives [string, T][] , so key is `string`, not 'title' | 'year'.
const sadness = { title: 'Печаль', artist: 'Кино', year: 1989, duration: '5:31' }
for (const [key, value] of Object.entries(sadness)) {
  // value: string | number
  console.log('form 12 (object):', key, '->', value)
}

// Form 12 with a typed Map: song is `string`, count is `number`.
const plays = new Map<string, number>([
  ['Апрель', 14],
  ['Печаль', 9],
  ['Группа крови', 3],
])
for (const [song, count] of plays) {
  console.log('form 12 (Map):', song, count)
}

// Form 12 with an array of objects.
const songs: { title: string; year: number }[] = [
  { title: 'Апрель', year: 1989 },
  { title: 'Кукушка', year: 1990 },
]
for (const { title, year } of songs) {
  console.log('form 12 (array of objects):', title, year)
}

export {} // makes this file a module, so its names do not clash with the other files
