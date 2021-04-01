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

let handler, startX, startY,
    isPan = false,
    isTab = true,
    isPress = false

let start = (point) => {
    //console.log('start', point.clientX, point.clientY)
    startX = point.clientX
    startY = point.clientY
    isTab = true
    isPan = false
    isPress = false
    handler = setTimeout(() => {
        isTab = false
        isPan = false
        isPress = true
        handler = null
        console.log('pressstart')
    }, 500)
}

let move = (point) => {
    let dx = point.clientX - startX, dy = point.clientY - startY

    if (!isPan && dx ** 2 + dy ** 2 > 100) {
        isTab = false
        isPan = true
        isPress = false
        console.log('panstart')
        clearTimeout(handler)
    }

    if (isPan) {
        console.log(dx, dy)
        console.log('pan')
    }

    console.log('move', point.clientX, point.clientY)

}

let end = (point) => {
    if (isTab) {
        console.log('tab')
        clearTimeout(handler)
    }
    if (isPan) {
        // console.log(dx, dy)
        console.log('panend')
    }
    if (isPress) {
        // console.log(dx, dy)
        console.log('pressend')
    }
    console.log('end', point.clientX, point.clientY)
}

let cancel = (point) => {
    clearTimeout(handler)
    console.log('cancel', point.clientX, point.clientY)
}