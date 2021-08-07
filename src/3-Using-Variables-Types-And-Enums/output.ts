export default function updateOutput(id: string) {
    const output = document.querySelector(`#${id}`);
    if (output) {
        output.innerHTML = 'hello';
    }
}