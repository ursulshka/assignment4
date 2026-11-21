// İlkim Dinç, 2024502042
// Destructuring in parameters and loops (forms 11 and 12). Run with `node js/params.mjs`.

// Form 11 (worked example): an options object in the parameter list, with defaults.
function createTask({ title, status = 'todo' } = {}) {
  return { title, status }
}
console.log('form 11:', createTask({ title: 'Read' })) // form 11: { title: 'Read', status: 'todo' }

// Form 11b: the same idea with an array parameter, ([x, y]) => ...
// TODO

// Form 12: loops over entries, for (const [key, value] of Object.entries(obj)) and a Map
// TODO
