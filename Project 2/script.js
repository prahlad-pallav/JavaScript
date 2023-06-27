
let content = document.querySelector('#counter');

let increment = () => {
    let currentValue = parseInt(content.innerText);
    currentValue += 1;
    content.innerText = currentValue;
}


let decrement = () => {
    let currentValue = parseInt(content.innerText);
    currentValue -= 1;
    content.innerText = currentValue;
}


let reset = () => {
    let currentValue = parseInt(content.innerText);
    currentValue = 0;
    content.innerText = currentValue;
}