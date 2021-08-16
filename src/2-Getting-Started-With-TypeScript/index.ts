let x = 10;
let y = 15;
const sum = x + y;
const result = `The sum of ${x} and ${y} is ${sum}`;
console.log(result);

const output = document.querySelector('#output');

if (output) {
  output.innerHTML = result;
}
