const slider = document.querySelector('.slider-container'), 
    slide = Array.from(document.querySelectorAll('.slides'));

let isDragging = false,
    startPos = 0,
    currentTranslate = 0,
    preTranslate = 0,
    animationID = 0,
    currentIndex = 0

slide.forEach((slide, index) => {
    const slideImage = slide.querySelector('img')
    slideImage.addEventListener('dragstart', (e) => e.preventDefault())

    //Touch Events
    slide.addEventListener('touchstart', touchStart(index))
    slide.addEventListener('touchend', touchEnd)
    slide.addEventListener('touchmove', touchMove)


    //Mouse Events
    slide.addEventListener('mousedown', touchStart(index))
    slide.addEventListener('mouseup', touchEnd)
    slide.addEventListener('mouseleave', touchEnd)
    slide.addEventListener('mousemove', touchMove)
})

//Disable Context Menu
window.oncontextmenu = function(event) {
    event.preventDefault(),
    event.stopPropagation()
    return false
}

function touchStart(index) {
    return function(event) {
        currentIndex = index
        console.log(event.type.includes('mouse'))
        isDragging = true
    }
}

function touchEnd() {
    isDragging = false
}

function touchMove() {
    if (isDragging) {
        console.log('move');
    }    
}