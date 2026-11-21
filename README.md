# Destructuring Field Guide

Name: İlkim Dinç  
Student number: 2024502042

Bonuses claimed: none yet (write them here, for example **Bonus 1: Tests**).

## Run

```
npm install
npm run all      # runs the JS and TS examples
npm run check    # type-checks in strict mode
```

## How an entry looks

### Form 1: array destructuring, `const [x, y] = f()`

**Syntax:** `const [lowest, highest] = minMax([4, 9, 2])`

**Example** (from `js/arrays.mjs`):

```js
const [lowest, highest] = minMax([4, 9, 2])
console.log('form 1:', lowest, highest)
```

**Output:** `form 1: 2 9`

**Use it when:** a function returns several values in order.

**Watch out:** the order matters, and a missing item gives `undefined`.

## Field guide

(Forms 1 to 12 go here, one entry each.)

## Pitfalls

## Props and children

## JavaScript vs TypeScript

## My own log

(Your errors, wrong guesses and surprises, in your own words. See the handout.)
