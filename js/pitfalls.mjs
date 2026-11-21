// İlkim Dinç, 2024502042
// Things that surprise people. Run with `node js/pitfalls.mjs`.

// Pitfall 1 (worked example): destructuring undefined or null throws a TypeError.
try {
  const { a } = undefined
  console.log(a)
} catch (error) {
  console.log('pitfall 1:', error.constructor.name) // pitfall 1: TypeError
}

// Pitfall 2: a default only applies to undefined, not to null
// TODO

// Pitfall 3: assigning without const/let needs parentheses, ({ a } = obj)
// TODO

// Pitfall 4: it copies references, not deep copies (nested objects are shared)
// TODO

// Pitfall 5: in objects the order does not matter, in arrays it does
// TODO
