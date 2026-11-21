# Destructuring Field Guide

Name: İlkim Dinç  
Student number: 2024502042

Bonuses claimed: **Bonus 4: Git repository** (see the end of this file).

My data in every example: songs by **Кино (Kino)**, the band I listen to.

| Song | Year | Length |
|---|---|---|
| Апрель | 1989 | 4:39 |
| Печаль | 1989 | 5:31 |
| Группа крови | 1988 | 4:44 |
| Кукушка | 1990 | 6:38 |

## Run

```
npm install
npm run all      # runs the JS and TS examples
npm run check    # type-checks in strict mode
npm run all > output.txt
```

Every output below is copied from `output.txt`, which is the real output of `npm run all` on my
machine. Warnings that React prints to stderr (in P3 and in the `key` experiment) are not in
`output.txt` because `>` only saves stdout; I copied them from the terminal.

## The idea in one sentence

Destructuring is a short way to write several plain assignments at once: the pattern on the left
describes the shape of the value on the right, and every name in the pattern becomes a variable.

```js
const [minutes, seconds] = parseDuration('4:39')
// is the same as
const result = parseDuration('4:39')
const minutes = result[0]
const seconds = result[1]
```

Arrays are taken apart **by position**, objects **by name**.

**Rest and spread use the same three dots for opposite jobs.** In a pattern (left side),
`...others` is *rest*: it *collects* what is left into a new array or object. In an expression
(right side), `[...list]` or `{...obj}` is *spread*: it *expands* an array or object into separate
items. Rest gathers, spread scatters.

## Field guide

### Form 1: values by position, `const [x, y] = f()`

**Syntax:** `const [minutes, seconds] = parseDuration('4:39')`

**Example** (from `js/arrays.mjs`):

```js
function parseDuration(text) {
  const parts = text.split(':').map(Number) // '4:39' -> [4, 39]
  return [parts[0], parts[1]]
}
const [minutes, seconds] = parseDuration('4:39') // Апрель
console.log('form 1 (Апрель):', minutes, 'min', seconds, 's')

const [m, s, extra] = parseDuration('5:31') // Печаль
console.log('form 1 (too few items):', m, s, extra)
```

**Output:**

```
form 1 (Апрель): 4 min 39 s
form 1 (too few items): 5 31 undefined
```

**As plain assignments:** `const minutes = result[0]; const seconds = result[1]`.

**Use it when:** a function returns several values that belong together and their order is fixed,
like minutes and seconds, or `useReducer`, which returns `[state, dispatch]`.

**Watch out:** the names do not matter, only the position. Asking for more items than the array has
is not an error: the extra name (`extra`) is just `undefined`.

### Form 2: skip and collect the rest, `const [, second, ...others] = list`

**Syntax:** `const [, secondSong, ...laterSongs] = playlist`

**Example** (from `js/arrays.mjs`):

```js
const playlist = ['Апрель', 'Печаль', 'Группа крови', 'Кукушка']
const [, secondSong, ...laterSongs] = playlist
console.log('form 2:', secondSong, laterSongs)

const [, , , , ...nothingLeft] = playlist
console.log('form 2 (rest with nothing left):', nothingLeft)
```

**Output:**

```
form 2: Печаль [ 'Группа крови', 'Кукушка' ]
form 2 (rest with nothing left): []
```

**As plain assignments:** `const secondSong = playlist[1]; const laterSongs = playlist.slice(2)`.

**Use it when:** you want the first few items by name and the others as a list, for example
"now playing" and "up next".

**Watch out:** each empty comma skips one item, which is easy to miscount. The rest is always a
new array, so when nothing is left it is `[]`, not `undefined`. The rest must be the last item in
the pattern.

### Form 3: swap two variables, `[a, b] = [b, a]`

**Syntax:** `[nowPlaying, upNext] = [upNext, nowPlaying]`

**Example** (from `js/arrays.mjs`):

```js
let nowPlaying = 'Апрель'
let upNext = 'Печаль'
;[nowPlaying, upNext] = [upNext, nowPlaying]
console.log('form 3:', nowPlaying, upNext)
```

**Output:** `form 3: Печаль Апрель`

**As plain assignments:** `const temp = nowPlaying; nowPlaying = upNext; upNext = temp`.
The right side `[upNext, nowPlaying]` builds a new array first, so both old values are saved before
anything is assigned. That is why no temporary variable is needed.

**Use it when:** two variables must trade values, for example skipping to the next song.

**Watch out:** there is no `const`/`let` (the variables already exist), so a line that starts with
`[` can be glued to the line before it. That is why I put a `;` at the start of the line.

### Form 4: default values in arrays, `const [a = 1, b = 2] = []`

**Syntax:** `const [opener = 'Группа крови', closer = 'Кукушка'] = []`

**Example** (from `js/arrays.mjs`):

```js
const [opener = 'Группа крови', closer = 'Кукушка'] = []
console.log('form 4 (empty array):', opener, closer)

const [first = 'Группа крови', second = 'Кукушка'] = ['Апрель']
console.log('form 4 (one item):', first, second)

const [withUndefined = 'default', withNull = 'default'] = [undefined, null]
console.log('form 4 (undefined, null):', withUndefined, withNull)
```

**Output:**

```
form 4 (empty array): Группа крови Кукушка
form 4 (one item): Апрель Кукушка
form 4 (undefined, null): default null
```

**As plain assignments:** `const first = arr[0] === undefined ? 'Группа крови' : arr[0]`.

**Use it when:** an item may be missing and there is a sensible value to use instead.

**Watch out:** the default is used only when the item is `undefined`. A `null` is a real value and
is kept. (I guessed `undefined, null` here and was wrong about the first one, see my log.)

### Form 5: properties by name, `let { a, b } = t`

**Syntax:** `let { year, artist } = april`

**Example** (from `js/objects.mjs`):

```js
const april = { title: 'Апрель', artist: 'Кино', year: 1989, duration: '4:39', genre: 'soviet rock' }
let { year, artist } = april
console.log('form 5 (Апрель):', artist, year)

let { label } = april
console.log('form 5 (missing field):', label)
```

**Output:**

```
form 5 (Апрель): Кино 1989
form 5 (missing field): undefined
```

**As plain assignments:** `let year = april.year; let artist = april.artist`.

**Use it when:** you need a few fields of an object several times and do not want to write
`april.` every time.

**Watch out:** the variable name must be the same as the field name. A field that does not exist
(`label`) gives `undefined`, with no error, so a typo is silent in JavaScript.

### Form 6: rename while you take it, `const { a: alpha } = t`

**Syntax:** `const { title: songName, year: releaseYear } = april`

**Example** (from `js/objects.mjs`):

```js
const { title: songName, year: releaseYear } = april
console.log('form 6:', songName, releaseYear)

const { genre: style } = april
try {
  console.log(genre)
} catch (error) {
  console.log('form 6 (old name):', error.constructor.name, '-', error.message)
}
console.log('form 6 (new name):', style)
```

**Output:**

```
form 6: Апрель 1989
form 6 (old name): ReferenceError - genre is not defined
form 6 (new name): soviet rock
```

**As plain assignments:** `const style = april.genre`. There is no line that creates `genre`.

**Use it when:** the field name clashes with a variable you already have (two songs both have a
`title`), or the name is not clear in this place.

**Watch out:** left of the colon is the field to read, right of the colon is the new variable. The
old name is not a variable. I expected `console.log(genre)` to print `soviet rock`; it threw a
ReferenceError.

### Form 7: default values in objects, `const { a = 1 } = t`

**Syntax:** `const { rating: myRating = 'not rated yet' } = cuckoo`

**Example** (from `js/objects.mjs`):

```js
const cuckoo = { title: 'Кукушка', artist: 'Кино', year: 1990, duration: '6:38', genre: 'soviet rock' }

const { rating: myRating = 'not rated yet' } = cuckoo
console.log('form 7 (Кукушка, no rating):', myRating)

const { duration = 'unknown length' } = cuckoo
console.log('form 7 (Кукушка, has duration):', duration)

const { rating = 'not rated', plays = 0 } = { rating: undefined, plays: null }
console.log('form 7 (undefined, null):', rating, plays)
```

**Output:**

```
form 7 (Кукушка, no rating): not rated yet
form 7 (Кукушка, has duration): 6:38
form 7 (undefined, null): not rated null
```

**As plain assignments:** `const duration = cuckoo.duration === undefined ? 'unknown length' : cuckoo.duration`.

**Use it when:** a field is optional (I never rated my songs, so none of them has `rating`).

**Watch out:** same rule as form 4: `undefined` (or a missing field) uses the default, `null` does
not. `plays` stayed `null`, not `0`. The first line also shows that rename and default can be
combined: `rating: myRating = ...`.

### Form 8: rest in an object, `const { a, ...others } = t`

**Syntax:** `const { duration: aprilDuration, ...withoutDuration } = april`

**Example** (from `js/objects.mjs`):

```js
const { duration: aprilDuration, ...withoutDuration } = april
console.log('form 8:', aprilDuration, withoutDuration)
console.log('form 8 (new object?):', withoutDuration !== april)
```

**Output:**

```
form 8: 4:39 { title: 'Апрель', artist: 'Кино', year: 1989, genre: 'soviet rock' }
form 8 (new object?): true
```

**As plain assignments:** `const withoutDuration = { ...april }; delete withoutDuration.duration`.

**Use it when:** you want "everything except one field", for example to pass the rest on. This is
exactly what React components do with `{ children, ...rest }` (P4).

**Watch out:** the rest is a new object, but it is a shallow copy: objects nested inside it are
shared with the original (pitfall 4).

### Form 9: nested patterns, `const { p: { x }, list: [first] } = t`

**Syntax:** `const { owner: { name: ownerName }, songs: [firstSong, ...otherSongs] } = myPlaylist`

**Example** (from `js/objects.mjs`):

```js
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
console.log('form 9 (is owner defined?):', typeof owner)
```

**Output:**

```
form 9: İlkim Печаль [ 'Апрель', 'Кукушка' ]
form 9 (is owner defined?): undefined
```

**As plain assignments:** `const ownerName = myPlaylist.owner.name; const firstSong = myPlaylist.songs[0]; const otherSongs = myPlaylist.songs.slice(1)`.

**Use it when:** you need a value that sits a few levels deep and the shape is fixed.

**Watch out:** `owner:` followed by a pattern is a path, not a variable: `owner` itself is not
created (`typeof owner` is `undefined`). If `owner` were missing, the inner pattern would try to
destructure `undefined` and throw. Deep patterns get hard to read quickly.

### Form 10: a computed key, `const { [key]: value } = t`

**Syntax:** `const { [field]: value } = april`

**Example** (from `js/objects.mjs`):

```js
const field = 'genre'
const { [field]: value } = april
console.log('form 10:', field, '=', value)

for (const key of ['title', 'duration', 'rating']) {
  const { [key]: v } = cuckoo
  console.log('form 10 (Кукушка):', key, '=', v)
}
```

**Output:**

```
form 10: genre = soviet rock
form 10 (Кукушка): title = Кукушка
form 10 (Кукушка): duration = 6:38
form 10 (Кукушка): rating = undefined
```

**As plain assignments:** `const value = april[field]`.

**Use it when:** the field name is only known at run time, for example a column that the user
chose for sorting.

**Watch out:** a computed key always needs a new name after the colon (`[field]: value`), because
the pattern cannot know what to call the variable.

### Form 11: patterns in parameters, with defaults, `function f({ a = 1, b } = {})`

**Syntax:** `function describeSong({ title, artist = 'unknown artist', year } = {})`

**Example** (from `js/params.mjs`):

```js
function describeSong({ title, artist = 'unknown artist', year } = {}) {
  return `${title} - ${artist} (${year})`
}
console.log('form 11:', describeSong({ title: 'Печаль', artist: 'Кино', year: 1989 }))
console.log('form 11 (no artist):', describeSong({ title: 'Печаль', year: 1989 }))
console.log('form 11 (no argument):', describeSong())

function describeSongStrict({ title }) {
  return title
}
try {
  describeSongStrict()
} catch (error) {
  console.log('form 11 (no `= {}`):', error.constructor.name, '-', error.message)
}

const toSeconds = ([minutes, seconds]) => minutes * 60 + seconds
console.log('form 11b (Кукушка 6:38):', toSeconds([6, 38]), 'seconds')
```

**Output:**

```
form 11: Печаль - Кино (1989)
form 11 (no artist): Печаль - unknown artist (1989)
form 11 (no argument): undefined - unknown artist (undefined)
form 11 (no `= {}`): TypeError - Cannot destructure property 'title' of 'undefined' as it is undefined.
form 11b (Кукушка 6:38): 398 seconds
```

**As plain assignments:** `function describeSong(options) { if (options === undefined) options = {}; const title = options.title; ... }`.

**Use it when:** a function takes several options; the caller can give them in any order and skip
the ones with defaults. Every React component with `({ title, children })` is this form.

**Watch out:** there are two different defaults: `artist = '...'` is for one field, and `= {}` at
the end is for the whole argument. Without `= {}`, calling with no argument throws a TypeError.

### Form 12: patterns in loops, `for (const [k, v] of Object.entries(o))`

**Syntax:** `for (const [key, value] of Object.entries(sadness))` and `for (const [song, count] of plays)`

**Example** (from `js/params.mjs`):

```js
const sadness = { title: 'Печаль', artist: 'Кино', year: 1989, duration: '5:31' }
for (const [key, value] of Object.entries(sadness)) {
  console.log('form 12 (object):', key, '->', value)
}

const plays = new Map([['Апрель', 14], ['Печаль', 9], ['Группа крови', 3]])
for (const [song, count] of plays) {
  console.log('form 12 (Map):', song, count)
}

for (const { title, year } of [{ title: 'Апрель', year: 1989 }, { title: 'Кукушка', year: 1990 }]) {
  console.log('form 12 (array of objects):', title, year)
}
```

**Output:**

```
form 12 (object): title -> Печаль
form 12 (object): artist -> Кино
form 12 (object): year -> 1989
form 12 (object): duration -> 5:31
form 12 (Map): Апрель 14
form 12 (Map): Печаль 9
form 12 (Map): Группа крови 3
form 12 (array of objects): Апрель 1989
form 12 (array of objects): Кукушка 1990
```

**As plain assignments:** inside the loop, `const key = entry[0]; const value = entry[1]`.

**Use it when:** you loop over pairs (object entries, a Map) or over a list of objects and only
need some fields.

**Watch out:** `Object.entries` turns the object into an array of `[key, value]` pairs first, so the
pattern is an array pattern (form 1), not an object pattern. A Map gives the same pairs directly.

## Pitfalls

**Pitfall 1: destructuring `undefined` throws.**

```js
const found = library.find((song) => song.title === 'Кукушка') // not in the library
const { year } = found
```

Output: `pitfall 1 (find returned undefined): Cannot destructure property 'year' of 'found' as it is undefined.`

Why: a pattern reads fields from the value, and `undefined` and `null` have no fields at all, so
there is nothing to read from. `find` returns `undefined` when nothing matches, which makes this
easy to hit.

**Pitfall 2: a default applies to `undefined`, not to `null`.**

```js
const fromServer = { title: 'Печаль', duration: null }
const { duration = '?:??' } = fromServer
```

Output: `pitfall 2 (null is kept): null`

Why: JavaScript checks `value === undefined` before it uses the default; `null` is a value that
someone set on purpose, so it is kept.

**Pitfall 3: assignment without `const`/`let` needs parentheses.**

```js
let title
let year
// { title, year } = { title: 'Апрель', year: 1989 }   <- SyntaxError
;({ title, year } = { title: 'Апрель', year: 1989 })
```

Output: `pitfall 3 (with parentheses): Апрель 1989`

Why: a line that starts with `{` is read as a block of code, not as an object pattern; the
parentheses make it an expression.

**Pitfall 4: it copies references, not deep copies.**

```js
const album = { name: 'Звезда по имени Солнце', band: { name: 'Кино' } }
const { band } = album
band.name = 'КИНО (changed)'
const { name, ...restOfAlbum } = album
```

Output:

```
pitfall 4 (album changed too): КИНО (changed)
pitfall 4 (rest shares band): true Звезда по имени Солнце
```

Why: `band` is not a copy of the inner object, it points to the same object, so changing it through
one name changes it for both. The rest object is new, but only one level deep.

**Pitfall 5: order matters in arrays, not in objects.**

```js
const { year: y1, title: t1 } = { title: 'Апрель', year: 1989 }
const [y2, t2] = ['Апрель', 1989] // names in the wrong order
```

Output:

```
pitfall 5 (object, any order): Апрель 1989
pitfall 5 (array, wrong order): year = Апрель title = 1989
```

Why: an object pattern matches by name, an array pattern by position, and the names I choose for
an array pattern mean nothing to JavaScript.

## TypeScript topics

All in `ts/types.ts`. `npm run check` passes with `strict` and `noUncheckedIndexedAccess`.

**T1: in a pattern, `{ a: string }` is a rename, not a type.**

```ts
const { title: string } = april                  // makes a variable called `string`
const { title, year }: { title: string; year: number } = april  // the correct way
```

Output: `T1 (a variable named string): Апрель` and `T1 (typed correctly): Апрель 1989`.
The colon inside a pattern always means "rename". A type always goes after the whole pattern.

**T2: a tuple return type and `as const`.**

```ts
function lengthOf(song: Song): [number, number] { ... }
const [mins, secs] = lengthOf(april)            // both number

const loose = ['Апрель', 1989]                  // (string | number)[]
const exact = ['Апрель', 1989] as const         // readonly ['Апрель', 1989]
const [looseTitle] = loose                      // string | number | undefined
const [exactTitle, exactYear] = exact           // 'Апрель' and 1989
```

Output: `T2 (tuple): 279 seconds` and `T2 (as const): string Апрель 1989`.
Without the tuple type the function would return `number[]`, and every destructured item would be
`number | undefined`. `as const` makes the array a readonly tuple, so each position has its own
exact type.

**T3: `noUncheckedIndexedAccess`.**

```ts
const playlist: string[] = ['Печаль', 'Апрель']
const [first] = playlist                        // string | undefined
if (first !== undefined) console.log(first.toUpperCase())
const [opener = 'silence'] = [] as string[]     // string, because of the default
```

Output: `T3 (after a check): ПЕЧАЛЬ` and `T3 (default): SILENCE`.
When I called `first.toUpperCase()` without the check, `npm run check` said
`error TS18048: 'first' is possibly 'undefined'.` even though the array has two songs: the type
`string[]` does not know the length.

**T4: optional fields and defaults.**

```ts
type Song = { title: string; year: number; duration: string; rating?: number }
const { rating } = april                        // number | undefined
const { rating: ratingOrZero = 0 } = april      // number
```

Output: `T4: undefined 0`. An optional field adds `undefined` to the type; a default takes it away
again. A default does not take away `null` (see P6).

**T5: a compile error that destructuring causes.**

```ts
const found = library.find((s) => s.title === 'Кукушка')   // Song | undefined
// @ts-expect-error Property 'year' does not exist on type 'Song | undefined'.
const { year: foundYear } = found
// The fix:
const { year: safeYear = 0 } = found ?? {}
```

Output: `T5 (what the error protects me from): Cannot destructure property 'year' of 'found' as it is undefined.`
and `T5 (fixed): 0`. This is pitfall 1, caught by the compiler before the program runs. The fix
gives a fallback object so the right side is never `undefined`.

## Props and children

A React component receives **one object**: its props. The attributes I write in JSX become fields
of that object, and the content between the tags becomes one more field, called `children`. So
`children` is not a second argument and not something special in the function: it is a prop like
the others, it just gets its value from a different place in the JSX. The code is in
`js/props.jsx` and `ts/props.tsx`, rendered with `renderToStaticMarkup`.

### P1: props is one object

```jsx
function SongCardA(props) {
  console.log('P1 (keys of the props object):', Object.keys(props))
  return <article><h3>{props.title}</h3><p>{props.artist}</p>{props.children}</article>
}
function SongCardB({ title, artist, children }) {
  return <article><h3>{title}</h3><p>{artist}</p>{children}</article>
}
<SongCardA title="Апрель" artist="Кино">1989</SongCardA>
```

```
P1 (keys of the props object): [ 'title', 'artist', 'children' ]
P1 A: <article><h3>Апрель</h3><p>Кино</p>1989</article>
P1 B: <article><h3>Апрель</h3><p>Кино</p>1989</article>
```

The keys show it: one object with `title`, `artist` and `children`. `SongCardB` is form 11 (a
pattern in the parameter list) and the pattern itself is form 5 (fields by name). It is the same as
writing `function SongCardB(props) { const { title, artist, children } = props; ... }`.

### P2: children is only a prop

```jsx
<SongCardB title="Печаль">sad song</SongCardB>
<SongCardB title="Печаль" children="sad song" />
<SongCardB title="Печаль" children="from the attribute">from the tags</SongCardB>
```

```
P2 (between tags): <article><h3>Печаль</h3><p></p>sad song</article>
P2 (children attr): <article><h3>Печаль</h3><p></p>sad song</article>
P2 (both): <article><h3>Печаль</h3><p></p>from the tags</article>
```

The first two give exactly the same HTML, so writing between the tags is only a nicer way to set
the `children` prop. When I gave both, the content between the tags won. In TypeScript the third
line does not even compile: `'children' are specified twice`. (Also: I did not give `artist` here,
so `<p></p>` is empty: a missing prop is just `undefined`.)

### P3: what children can be

```
P3 string   : <div>Группа крови</div>
P3 number   : <div>1988</div>
P3 zero     : <div>0</div>
P3 element  : <div><b>Кукушка</b></div>
P3 several  : <div><b>Апрель</b><i>Печаль</i></div>
P3 array    : <div><li>Апрель</li><li>Печаль</li></div>
P3 undefined: <div></div>
P3 null     : <div></div>
P3 false    : <div></div>
P3 true     : <div></div>
P3 nothing  : <div></div>
P3 function : <div></div>
P3 called   : <div>Кукушка 6:38</div>
```

Strings and numbers are shown as text, elements as HTML, and several elements or an array are
shown one after another. `undefined`, `null`, `false`, `true` and no children at all show nothing.
This is what makes `{isPlaying && <Song />}` work. But `0` is a number, so it **is** shown: I
expected `{false}` to show `0` as well, and it showed nothing.

A function shows nothing, and React printed this warning to the terminal:
`Functions are not valid as a React child. This may happen if you return children instead of <children /> from render. Or maybe you meant to call this function rather than return it.`
A function as children only works when the component calls it (`children(m, s)` in
`WithDuration`, "P3 called"). In TypeScript a function is not a `ReactNode`, so the compiler
rejects it unless the props type says `children: (m: number, s: number) => ReactNode`.

### P4: separating children from the other props

```jsx
function Section({ title, children, ...rest }) {
  console.log('P4 (rest):', rest)
  return <section {...rest}><h2>{title}</h2>{children}</section>
}
<Section title="Кино 1989" id="kino" className="album" data-year="1989">Апрель, Печаль</Section>

function SpreadFirst({ children, ...rest }) { return <section {...rest} className="fixed">{children}</section> }
function SpreadLast({ children, ...rest })  { return <section className="fixed" {...rest}>{children}</section> }
<SpreadFirst className="mine">Кукушка</SpreadFirst>
```

```
P4 (rest): { id: 'kino', className: 'album', 'data-year': '1989' }
P4: <section id="kino" class="album" data-year="1989"><h2>Кино 1989</h2>Апрель, Печаль</section>
P4 spread first: <section class="fixed">Кукушка</section>
P4 spread last : <section class="mine">Кукушка</section>
P4 objects     : { className: 'fixed' } { className: 'mine' }
```

The pattern is form 8 (rest in an object): `title` and `children` are taken out and everything else
goes into `rest`, which is then spread onto the `<section>`. Here the same three dots appear twice:
rest in the parameter (collect), spread in the JSX (scatter). The order decides who wins: the
**later** one overwrites the earlier one, exactly like in a plain object spread (last line). So
`{...rest} className="fixed"` means "the caller cannot change the class", and
`className="fixed" {...rest}` means "fixed is only a default". I also checked that a name taken out
in the pattern is not in `rest`: `exp rest: <p>Печаль / rest has title: false</p>`.

### P5: props or children?

```jsx
function AlbumWithSlots({ header, footer, tracks }) { ... <header>{header}</header> ... <footer>{footer}</footer> }
function AlbumFrame({ children }) { return <div className="album">{children}</div> }
```

```
P5 props   : <div class="album"><header>Кино, 1989</header><ol><li>Звезда по имени Солнце</li><li>Апрель</li><li>Печаль</li></ol><footer>3 songs</footer></div>
P5 children: <div class="album"><header>Кино, 1989</header><ol><li>Звезда по имени Солнце</li><li>Апрель</li><li>Печаль</li></ol><footer>3 songs</footer></div>
```

Same HTML, two designs. With props (`header`, `footer`), the **component** decides the layout: the
header is always on top and the footer at the bottom, and the caller only fills in the slots. With
`children`, the **caller** decides everything inside, and the component is only a frame. I would
use named props when there are several places to fill and the order must stay the same (a card
with a title and a footer), and `children` when there is one main content area and the component
does not care what is in it (a box, a layout, a modal).

### P6: defaults for props

```jsx
function Track({ title, duration = '?:??' }) {
  return <p>{title} <small>{duration}</small></p>
}
```

```
P6 given    : <p>Кукушка <small>6:38</small></p>
P6 missing  : <p>Кукушка <small>?:??</small></p>
P6 undefined: <p>Кукушка <small>?:??</small></p>
P6 null     : <p>Кукушка <small></small></p>
```

This is form 7 inside the props pattern. A missing prop and `duration={undefined}` both use the
default. `duration={null}` does not: the prop is `null`, and React shows nothing for `null`, so the
`<small>` is empty on the screen. In TypeScript the type of `duration` inside the component is
`string | null`: the default removed `undefined` but not `null`.

### P7: types for props and children

```tsx
type LyricsProps = { song: string; children?: ReactNode }               // (a) by hand
function Playlist({ name, children }: PropsWithChildren<{ name: string }>) // (b)
type PlayButtonProps = ComponentProps<'button'> & { song: string }       // (c)
```

```
P7a with    : <blockquote title="Апрель">first line</blockquote>
P7a without : <blockquote title="Апрель">(no lyrics yet)</blockquote>
P7b         : <ul aria-label="Gece Kino"><li>Печаль</li><li>Кукушка</li></ul>
P7c         : <button type="button" disabled="" aria-label="play">▶ Группа крови</button>
```

- **(a) `children?: ReactNode`:** I write it myself. `ReactNode` is everything React can show
  (P3), and `?` makes it optional, so `<Lyrics song="Апрель" />` is fine. Without it in the type,
  `<Plain title="Апрель">text</Plain>` is rejected because children is not a known prop.
- **(b) `PropsWithChildren<P>`:** the same as `P & { children?: ReactNode }`, only shorter.
- **(c) `ComponentProps<'button'>`:** every prop a real `<button>` accepts (`disabled`, `onClick`,
  `aria-label`...), so I can take out my own `song` and spread the rest onto the button. It rejects
  props a button does not have. When I tried `href`, `npm run check` said:
  `error TS2322: ... Property 'href' does not exist on type 'IntrinsicAttributes & ClassAttributes<HTMLButtonElement> & ButtonHTMLAttributes<HTMLButtonElement> & { ...; }'. Did you mean 'ref'?`

### Two more experiments

- **`key` is not a prop.** `<ShowKey key="april" />` gave `exp key: <p>key inside the component: undefined</p>`,
  and React warned: ``key` is not a prop. Trying to access it will result in `undefined` being returned.``
  React keeps `key` for itself (to tell list items apart) and never passes it to the component.
- **A component cannot change its props.** `props.title = 'changed'` gave
  `exp change props: TypeError - Cannot assign to read only property 'title' of object '#<Object>'`.
  React freezes the props object in development; props are input, and only the parent can change them.

## JavaScript vs TypeScript

| Form | Stays the same in TS | What I must add | Error when I get it wrong |
|---|---|---|---|
| 1 values by position | the pattern `[minutes, seconds]` | a tuple return type `[number, number]` | without it the items are `number \| undefined`: `'minutes' is possibly 'undefined'` |
| 2 skip and rest | `[, second, ...others]` | nothing, but `second` is `string \| undefined` | `TS18048: 'second' is possibly 'undefined'` when I use it without a check |
| 3 swap | `[a, b] = [b, a]` | both variables need types that accept each other's value | `TS2322: Type 'number' is not assignable to type 'string'` if I swap a string and a number |
| 4 array defaults | `[a = 'x'] = list` | nothing; the default removes `undefined` from the type | none, this is the fix for T3 |
| 5 fields by name | `{ title, year }` | a type for the object (`Song`) | a missing field is `TS2339: Property 'label' does not exist on type 'Song'` instead of a silent `undefined` |
| 6 rename | `{ title: songName }` | the type goes after the pattern: `{ title: songName }: Song` | writing `{ title: string }` does not type anything, it renames to `string` (T1) |
| 7 object defaults | `{ rating = 0 }` | an optional field in the type: `rating?: number` | without `?`, an object without `rating` fails: `TS2741: Property 'rating' is missing in type '{ title: string; }' but required in type 'Strict'` |
| 8 object rest | `{ duration, ...rest }` | nothing; `rest` is typed as `Omit<Song, 'duration'>` | using `rest.duration` gives `TS2339: Property 'duration' does not exist on type ...` |
| 9 nested | `{ owner: { name } }` | a type with the nested shape (`Playlist`) | an item of a nested array is `string \| undefined` (T3) |
| 10 computed key | `{ [field]: value }` | the key must be typed as `keyof Song` | a plain `string` key gives `TS2537: Type 'Song' has no matching index signature for type 'string'` |
| 11 parameters | `({ title, artist = '...' } = {})` | a type after the pattern, and `= {}` only works if every field is optional | `TS2741: Property 'title' is missing in type '{}' but required in type '{ title: string; artist?: string \| undefined; }'` |
| 12 loops | `for (const [k, v] of ...)` | `new Map<string, number>()` for typed Map entries | `Object.entries` gives `key: string`, so `sadness[key]` is `TS7053: Element implicitly has an 'any' type because expression of type 'string' can't be used to index type ...` |
| props | `({ title, children })` | a props type with `children?: ReactNode` | `Property 'children' does not exist on type` |

## My own log

These are the things that went wrong or surprised me while I wrote and ran the examples. For each
one I wrote down my guess before running the code.

1. **A default does not replace `null`.** I guessed `[withUndefined = 'default', withNull = 'default'] = [undefined, null]`
   would give `undefined, null`. The output was `default null`. I learned that the default only
   works for `undefined`; `null` stays `null`. Later the same thing happened in P6: `duration={null}`
   left the duration empty on the screen.
2. **After a rename, the old name is gone.** After `const { genre: style } = april` I guessed
   `console.log(genre)` would print `soviet rock`. It threw `ReferenceError - genre is not defined`.
   `{ genre: style }` only creates `style`; `genre` is just the name of the field to read.
3. **Rest with nothing left is `[]`.** I did not know what `const [, , , , ...nothingLeft] = playlist`
   would give with four songs. It gives an empty array, not `undefined`.
4. **Destructuring does not copy.** I did not know what `album.band.name` would be after
   `band.name = 'КИНО (changed)'`. It was `КИНО (changed)`: `band` and `album.band` are the same object.
5. **`= {}` in the parameter.** I was surprised that `describeSong()` with no argument did not crash
   (`undefined - unknown artist (undefined)`), but the version without `= {}` gave
   `TypeError - Cannot destructure property 'title' of 'undefined' as it is undefined.`
6. **`'first' is possibly 'undefined'`.** In `ts/types.ts` I called `first.toUpperCase()` after
   `const [first] = playlist`, and `npm run check` gave
   `ts/types.ts:41:1 - error TS18048: 'first' is possibly 'undefined'.` The playlist had two songs,
   but the type `string[]` does not know that. I fixed it with an `if` check.
7. **`{false}` shows nothing, `{0}` shows 0.** I guessed both would show `0`. Only `0` did.
8. **`key` is not a prop.** I guessed `props.key` would be `april`. It was `undefined`, with the
   warning ``key` is not a prop``.
9. **`href` on a button.** I gave `href` to `PlayButton` (typed with `ComponentProps<'button'>`) and
   got a very long `TS2322` error. The important part was the last line, `Property 'href' does not
   exist`. `href` belongs to `<a>`, not to `<button>`.
10. **Props are frozen.** Changing `props.title` gave
    `TypeError - Cannot assign to read only property 'title' of object '#<Object>'`.

## Bonus 4: Git repository

Bonus 4: Git repository: https://github.com/ursulshka/assignment4

The repository has a `.gitignore` for `node_modules`, and it runs after `git clone`, `npm install`
and `npm run all`. The history shows the work in steps (`git log --oneline`). I did the assignment
in one day, so the commits are all from that day.
