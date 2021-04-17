const slider = document.querySelector('.slider-container'), 
    slide = Array.from(document.querySelectorAll('.slides'));

let isDragging = false,
    startPos = 0,
    currentTranslate = 0,
    preTranslate = 0,
    animationID,
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

// make responsive to viewport changes
window.addEventListener('resize', setPositionByIndex)

//Disable Context Menu
window.oncontextmenu = function(event) {
    event.preventDefault(),
    event.stopPropagation()
    return false
}

function getPositionX(event) {
    return event.type.includes('mouse')
    ? event.pageX
    : event.touches[0].clientX
}

function touchStart(index) {
    return function(event) {
        currentIndex = index
        startPos = getPositionX(event)
        isDragging = true

        // https://css-tricks.com/using-requestedanimationframe/
        animationID = requestAnimationFrame(animation)
        slider.classList.add('grabbing')
    }
}

function touchMove() {
    if (isDragging) {
        const currentPosition = getPositionX(event)
        currentTranslate = preTranslate + currentPosition - startPos
    }    
}

function touchEnd() {
    cancelAnimationFrame(animationID)
    isDragging = false

    const movedBy = currentTranslate - preTranslate

    if( movedBy < -100 && currentIndex < slide.length -1 ) 
        currentIndex += 1 
    
    if( movedBy > 100 && currentIndex > 0 ) 
    currentIndex += -1 

    setPositionByIndex()

    slider.classList.remove('grabbing')
}

function animation() {
    setSliderPosition()
    if (isDragging) requestAnimationFrame(animation)
}

function setPositionByIndex() {
    currentTranslate = currentIndex * -window.innerWidth
    preTranslate = currentTranslate
    setSliderPosition()
}

function setSliderPosition() {
    slider.style.transform = `translateX(${currentTranslate}px)`
}

