let element = document.documentElement

element.addEventListener('mousedown', event => {
    start(event)
    let mousemove = event => {
        move(event)
        console.log(event.clientX, event.clientY)
    }
    let mouseup = event => {
        end(event)
        element.removeEventListener('mousemove', mousemove)
        element.removeEventListener('mouseup', mouseup)
    }
    element.addEventListener('mousemove', mousemove)
    element.addEventListener('mouseup', mouseup)

})

element.addEventListener('touchstart', event => {
    // event 有多个触点
    console.log(event.changedTouches)
    for (let touch of event.changedTouches) {
        console.log(touch.clientX, touch.clientY)
        start(touch)
    }
})


element.addEventListener('touchmove', event => {
    console.log(event.changedTouches)
    for (let touch of event.changedTouches) {
        console.log(touch.clientX, touch.clientY)
        move(touch)
    }
})


element.addEventListener('touchend', event => {
    console.log(event.changedTouches)
    for (let touch of event.changedTouches) {
        console.log(touch.clientX, touch.clientY)
        end(touch)
    }
})

element.addEventListener('touchcancel', event => {
    for (let touch of event.changedTouches) {
        console.log(touch.clientX, touch.clientY)
        cancel(touch)
    }
})


let start = (point) => {
    console.log('start', point.clientX, point.clientY)
}

let move = (point) => {
    console.log('move', point.clientX, point.clientY)
}

let end = (point) => {
    console.log('end', point.clientX, point.clientY)
}

let cancel = (point) => {
    console.log('cancel', point.clientX, point.clientY)
}