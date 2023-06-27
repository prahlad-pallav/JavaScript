let wrap = document.querySelector('#wrapper');
let contain = document.querySelector('.container');
let image = document.querySelector('img');
let content = document.querySelector('h1');

    contain.addEventListener('click', () => {
        wrap.classList.toggle('active');
        contain.classList.toggle('active');

        if(image.src =='http://127.0.0.1:5500/Modes/assests/dark.png'){
            image.src = "http://127.0.0.1:5500/Modes/assests/light.png";
        }else{
            image.src = 'http://127.0.0.1:5500/Modes/assests/dark.png';
        }

        if(content.innerText === "Switch to Dark Mode"){
            content.innerText = "Switch to Light Mode";
        }
        else{
            content.innerText = "Switch to Dark Mode";
        }

    })