// İlkim Dinç, 2024502042
// Array destructuring (forms 1 to 4). Plain JavaScript: run with `node js/arrays.mjs`.

// Form 1 (worked example): take values out of an array by position.
function minMax(numbers) {
  return [Math.min(...numbers), Math.max(...numbers)]
}
const [lowest, highest] = minMax([4, 9, 2])
console.log('form 1:', lowest, highest) // form 1: 2 9

// Form 2: skip an item and collect the rest, [, second, ...others]
// TODO

// Form 3: swap two variables without a temporary, [a, b] = [b, a]
// TODO

// Form 4: default values, const [a = 1] = []
// TODO
