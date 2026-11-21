// İlkim Dinç, 2024502042
// Object destructuring (forms 5 to 10). Run with `node js/objects.mjs`.

// Form 5 (worked example): take properties out of an object by name.
const task = { id: 't1', title: 'Buy milk', status: 'todo' }
const { title, status } = task
console.log('form 5:', title, status) // form 5: Buy milk todo

// My data
const april = { title: 'Апрель', artist: 'Кино', year: 1989, duration: '4:39', genre: 'soviet rock' }
const cuckoo = { title: 'Кукушка', artist: 'Кино', year: 1990, duration: '6:38', genre: 'soviet rock' }
// None of my songs has a `rating` field: I never rated them.

// Form 5 (mine): properties by name. The order in the pattern does not matter.
let { year, artist } = april
console.log('form 5 (Апрель):', artist, year)

// Form 5 with a name that is not in the object: undefined, no error.
let { label } = april
console.log('form 5 (missing field):', label)

// Form 6: rename while you take it, { title: songName }
const { title: songName, year: releaseYear } = april
console.log('form 6:', songName, releaseYear)

// Form 6: after a rename, the old name is NOT a variable.
const { genre: style } = april
try {
  console.log(genre) // eslint would warn; at run time this is a ReferenceError
} catch (error) {
  console.log('form 6 (old name):', error.constructor.name, '-', error.message)
}
console.log('form 6 (new name):', style)

// Form 7: default values, for a field that is missing.
const { rating: myRating = 'not rated yet' } = cuckoo
console.log('form 7 (Кукушка, no rating):', myRating)

// Form 7: the default is NOT used when the field exists.
const { duration = 'unknown length' } = cuckoo
console.log('form 7 (Кукушка, has duration):', duration)

// Form 7 with undefined and null as values: only undefined uses the default.
const { rating = 'not rated', plays = 0 } = { rating: undefined, plays: null }
console.log('form 7 (undefined, null):', rating, plays)

// Form 8: rest, take one field out and keep the others together.
const { duration: aprilDuration, ...withoutDuration } = april
console.log('form 8:', aprilDuration, withoutDuration)

// Form 8: the rest is a NEW object, not the same one.
console.log('form 8 (new object?):', withoutDuration !== april)

// Form 9: nested patterns, and an array inside an object.
const myPlaylist = {
  name: 'Gece Kino',
  owner: { name: 'İlkim' },
  songs: ['Печаль', 'Апрель', 'Кукушка'],
}
const {
  owner: { name: ownerName },
  songs: [firstSong, ...otherSongs],
} = myPlaylist
console.log('form 9:', ownerName, firstSong, otherSongs)

// Form 9: `owner` itself is NOT a variable here, only the names inside it are.
console.log('form 9 (is owner defined?):', typeof owner)

// Form 10: a computed key, the field name comes from a variable.
const field = 'genre'
const { [field]: value } = april
console.log('form 10:', field, '=', value)

// Form 10 in a loop: the same pattern with a different key each time.
for (const key of ['title', 'duration', 'rating']) {
  const { [key]: v } = cuckoo
  console.log('form 10 (Кукушка):', key, '=', v)
}
