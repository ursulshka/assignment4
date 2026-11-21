// İlkim Dinç, 2024502042
// The same four array forms as js/arrays.mjs, now typed. Run with `npx tsx ts/arrays.ts`.

// Form 1 (worked example): the return type of the function is a tuple.
function minMax(numbers: number[]): [number, number] {
  return [Math.min(...numbers), Math.max(...numbers)]
}
const [lowest, highest] = minMax([4, 9, 2])
console.log('form 1:', lowest, highest) // form 1: 2 9

const playlist: string[] = ['Апрель', 'Печаль', 'Группа крови', 'Кукушка']

// Form 1 (mine): the tuple return type [number, number] makes minutes and seconds `number`.
function parseDuration(text: string): [number, number] {
  const [minutes = 0, seconds = 0] = text.split(':').map(Number)
  return [minutes, seconds]
}
const [minutes, seconds] = parseDuration('4:39') // Апрель
console.log('form 1 (Апрель):', minutes, 'min', seconds, 's')

// Form 2: skip and rest. secondSong is `string | undefined` (noUncheckedIndexedAccess),
// laterSongs is `string[]`.
const [, secondSong, ...laterSongs] = playlist
console.log('form 2:', secondSong ?? '(none)', laterSongs)

// Form 3: swap. Both variables must have a type that accepts the other value.
let nowPlaying: string = 'Апрель'
let upNext: string = 'Печаль'
;[nowPlaying, upNext] = [upNext, nowPlaying]
console.log('form 3:', nowPlaying, upNext)

// Form 4: defaults. With a default, the type is `string`, not `string | undefined`.
const [opener = 'Группа крови', closer = 'Кукушка'] = playlist.slice(4) // an empty array
console.log('form 4 (empty array):', opener, closer)

const [withUndefined = 'default', withNull = 'default'] = [undefined, null]
// withUndefined: string, withNull: string | null. TypeScript also knows null is kept.
console.log('form 4 (undefined, null):', withUndefined, withNull)

export {} // makes this file a module, so its names do not clash with the other files
