// İlkim Dinç, 2024502042
// Array destructuring (forms 1 to 4). Plain JavaScript: run with `node js/arrays.mjs`.

// Form 1 (worked example): take values out of an array by position.
function minMax(numbers) {
  return [Math.min(...numbers), Math.max(...numbers)]
}
const [lowest, highest] = minMax([4, 9, 2])
console.log('form 1:', lowest, highest) // form 1: 2 9

// My data: Kino songs.
const playlist = ['Апрель', 'Печаль', 'Группа крови', 'Кукушка']

// Form 1 (mine): a function returns two values in an array, and I take them by position.
function parseDuration(text) {
  const parts = text.split(':').map(Number) // '4:39' -> [4, 39]
  return [parts[0], parts[1]]
}
const [minutes, seconds] = parseDuration('4:39') // Апрель
console.log('form 1 (Апрель):', minutes, 'min', seconds, 's')

// Form 1, with too few items: the extra name gets undefined, no error.
const [m, s, extra] = parseDuration('5:31') // Печаль
console.log('form 1 (too few items):', m, s, extra)

// Form 2: skip the first item and collect the rest, [, second, ...others]
const [, secondSong, ...laterSongs] = playlist
console.log('form 2:', secondSong, laterSongs)

// Form 2: rest when nothing is left over is an empty array, not undefined.
const [, , , , ...nothingLeft] = playlist
console.log('form 2 (rest with nothing left):', nothingLeft)

// Form 3: swap two variables without a temporary, [a, b] = [b, a]
let nowPlaying = 'Апрель'
let upNext = 'Печаль'
;[nowPlaying, upNext] = [upNext, nowPlaying]
console.log('form 3:', nowPlaying, upNext)

// Form 4: default values, used when the item is missing.
const [opener = 'Группа крови', closer = 'Кукушка'] = []
console.log('form 4 (empty array):', opener, closer)

const [first = 'Группа крови', second = 'Кукушка'] = ['Апрель']
console.log('form 4 (one item):', first, second)

// Form 4 with undefined and null as items: only undefined uses the default.
const [withUndefined = 'default', withNull = 'default'] = [undefined, null]
console.log('form 4 (undefined, null):', withUndefined, withNull)
