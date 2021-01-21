function match(string) {
    let state = start
    for (let c of string) {
        state = state(c)
    }
    return state === end
}

function start(c) {
    if (c === 'a') {
        return foundA1
    } else {
        return start
    }
}
function foundA1(c) {
    if (c === 'b') {
        return foundB1
    } else {
        return start(c)
    }
}
function foundB1(c) {
    if (c === 'a') {
        return foundA2
    } else {
        return start
    }
}

function foundA2(c) {
    if (c === 'b') {
        return foundB2
    } else {
        return start(c)
    }
}

function foundB2(c) {
    if (c === 'a') {
        return foundA3
    } else {
        return start
    }
}

function foundA3(c) {
    if (c === 'b') {
        return foundB3
    } else {
        return start(c)
    }
}

function foundB3(c) {
    if (c === 'x') {
        return end
    } else {
        return foundB2(c)
    }
}

function end() {
    return end
}

console.log(match('ababababx')) 