import { add } from './add';

export default async function updateOutput(id: string) {
  let x = 10;
  let y = 15;
  const sum = add(x, y);
  const output = document.querySelector(`#${id}`);
  const html = `The sum of ${x} and ${y} is ${sum}`;

  if (output && html) {
    output.innerHTML = html;
  }
}
