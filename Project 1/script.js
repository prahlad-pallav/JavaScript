const accordians = document.querySelectorAll('.accordian');

accordians.forEach(item =>{
    const icon = item.querySelector('.icon');
    const answer = item.querySelector('.answer');

    item.addEventListener('click',() =>{
        icon.classList.toggle('active');
        answer.classList.toggle('active');
    })

})

