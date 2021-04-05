//let element = document.documentElement

let isListenlingMouse = false

let contexts = new Map();

document.addEventListener('mousedown', event => {

    console.log(event.button)
    let context = Object.create(null)

    contexts.set('mouse' + (1 << event.button), context)

    start(event, context)
    let mousemove = event => {
        let button = 1

        button << 1

        while (button <= event.buttons) {
            if (button & event.buttons) {
                let key
                if (button === 2) {
                    key = 4
                } else if (button === 4) {
                    key = 2
                } else {
                    key = button
                }
                let context = contexts.get('mouse' + key)
                move(event, context)
            }
            button = button << 1
        }

        // let context = contexts.get('mouse' + event.button)
        // move(event, context)
        // console.log(event.clientX, event.clientY)
    }
    let mouseup = event => {
        let context = contexts.get('mouse' + (1 << event.button))
        end(event, context)
        contexts.delete('mouse' + (1 << event.button))
        if (event.buttons === 0) {
            document.removeEventListener('mousemove', mousemove)
            document.removeEventListener('mouseup', mouseup)
            isListenlingMouse = false
        }
    }
    if (!isListenlingMouse) {
        document.addEventListener('mousemove', mousemove)
        document.addEventListener('mouseup', mouseup)
        isListenlingMouse = true
    }
})


document.addEventListener('touchstart', event => {
    // event 有多个触点
    for (let touch of event.changedTouches) {
        let context = Object.create(null)
        contexts.set(touch.identifier, context)
        start(touch, context)
    }
})


document.addEventListener('touchmove', event => {
    for (let touch of event.changedTouches) {
        let context = contexts.get(touch.identifier)
        move(touch, context)
    }
})


document.addEventListener('touchend', event => {
    for (let touch of event.changedTouches) {
        console.log(touch.clientX, touch.clientY)
        let context = contexts.get(touch.identifier)
        end(touch, context)
        contexts.delete(touch.identifier)
    }
})

document.addEventListener('touchcancel', event => {
    for (let touch of event.changedTouches) {
        console.log(touch.clientX, touch.clientY)
        cancel(touch)
        contexts.delete(touch.identifier)
    }
})

// let handler, startX, startY,
//     isPan = false,
//     isTab = true,
//     isPress = false

let start = (point, context) => {
    //console.log('start', point.clientX, point.clientY)
    context.startX = point.clientX
    context.startY = point.clientY

    context.points = [{
        t: Date.now(),
        x: point.clientX,
        y: point.clientY
    }]

    context.isTab = true
    context.isPan = false
    context.isPress = false

    context.handler = setTimeout(() => {
        context.isTab = false
        context.isPan = false
        context.isPress = true
        context.handler = null
        dispatch('pressstart', context)
    }, 500)
}

let move = (point, context) => {
    let dx = point.clientX - context.startX, dy = point.clientY - context.startY

    if (!context.isPan && dx ** 2 + dy ** 2 > 100) {
        context.isTab = false
        context.isPan = true
        context.isPress = false
        dispatch('panstart', context)
        clearTimeout(context.handler)
    }

    if (context.isPan) {
        console.log(dx, dy)
        dispatch('pan', context)
    }

    context.points.push({
        t: Date.now(),
        x: point.clientX,
        y: point.clientY
    })


}

let end = (point, context) => {
    if (context.isTab) {
        dispatch('tab', context)
        clearTimeout(context.handler)
    }
    if (context.isPan) {
        // console.log(dx, dy)
        dispatch('panend', context)
    }
    if (context.isPress) {
        // console.log(dx, dy)
        dispatch('pressend', context)
    }
    context.points = context.points.filter(point => Date.now() - point.t < 500)

    let d, v
    if (!context.points.length) {
        v = 0
    } else {
        d = Math.sqrt((point.clientX - context.points[0].y) ** 2 + (point.clientX - context.points[0].y) ** 2)

        v = d / (Date.now() - context.points[0].t)
    }

    if (v > 1.5) { // 像素每毫秒 px/ms
        dispatch('flick', context)
        context.isFlick = true
    } else {
        context.isFlick = false
    }
    dispatch('end', context)
}

let cancel = (point, context) => {
    clearTimeout(context.handler)
    dispatch('cancel', context)
}

function dispatch(type, properties) {
    let event = new Event(type)
    for (let name in properties) {
        event[name] = properties[name]
    }
    document.dispatchEvent(event)
}