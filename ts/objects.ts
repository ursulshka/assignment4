// İlkim Dinç, 2024502042
// The same six object forms as js/objects.mjs, now typed.

type Task = { id: string; title: string; status: 'todo' | 'in-progress' | 'done' }

// Form 5 (worked example)
const task: Task = { id: 't1', title: 'Buy milk', status: 'todo' }
const { title, status } = task
console.log('form 5:', title, status) // form 5: Buy milk todo

// My data
type Song = {
  title: string
  artist: string
  year: number
  duration: string
  genre: string
  rating?: number // optional: I never rated my songs
}

const april: Song = { title: 'Апрель', artist: 'Кино', year: 1989, duration: '4:39', genre: 'soviet rock' }
const cuckoo: Song = { title: 'Кукушка', artist: 'Кино', year: 1990, duration: '6:38', genre: 'soviet rock' }

// Form 5: the types come from Song. artist: string, year: number.
const { artist, year } = april
console.log('form 5 (Апрель):', artist, year)

// Form 6: rename. The type goes after the whole pattern, never inside it (see T1).
const { title: songName, year: releaseYear }: Song = april
console.log('form 6:', songName, releaseYear)

// Form 7: default for an optional field. rating is `number | undefined`,
// myRating with a default is `number`.
const { rating: myRating = 0 } = cuckoo
console.log('form 7 (Кукушка, no rating):', myRating)

// Form 8: rest. The type of withoutDuration is Song without `duration` (Omit<Song, 'duration'>).
const { duration, ...withoutDuration } = april
const check: Omit<Song, 'duration'> = withoutDuration
console.log('form 8:', duration, check)

// Form 9: nested patterns with a type for the whole object.
type Playlist = { name: string; owner: { name: string }; songs: string[] }
const myPlaylist: Playlist = { name: 'Gece Kino', owner: { name: 'İlkim' }, songs: ['Печаль', 'Апрель', 'Кукушка'] }
const {
  owner: { name: ownerName },
  songs: [firstSong, ...otherSongs],
} = myPlaylist
// firstSong is `string | undefined`: the array might be empty.
console.log('form 9:', ownerName, firstSong ?? '(empty)', otherSongs)

// Form 10: computed key. With a `keyof Song` key the value is the union of all field types.
const field: keyof Song = 'genre'
const { [field]: value } = april
console.log('form 10:', field, '=', value)

// Form 10 with a key that TypeScript knows exactly: the value type is exact too.
const yearKey = 'year' as const
const { [yearKey]: exactYear } = cuckoo // exactYear: number
console.log('form 10 (exact key):', exactYear + 1, '(year + 1, so it is a number)')

export {} // makes this file a module, so its names do not clash with the other files
