
// abcabx

function match(string) {
    let state = start
    for (let c of string) {
        state = state(c)
    }
    return state === end
}

function start(c) {
    if (c === 'a') {
        return foundA
    } else {
        return start
    }
}

function foundA(c) {
    if (c === 'b') {
        return foundB
    } else {
        return start(c)
    }
}

function foundB(c) {
    if (c === 'c') {
        return foundC
    } else {
        return start(c)
    }
}

function foundC(c) {
    if (c === 'a') {
        return foundA2
    } else {
        return start(c)
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
    if (c === 'x') {
        return end
    } else {
        return foundB(c)
    }
}


function end() {
    return end
}




// function ok(s) {
//     return ['', s]
// }

// function cond(p, cb = ok) {
//     return function (s) {
//         if (s.length === 0) {
//             return
//         }
//         if (p(s[0])) {
//             const res = cb(s.slice(1))
//             if (!res) return
//             return [s[0] + res[0], res[1]]
//         }
//         return
//     }
// }

// function char(c, cb = ok) {
//     return cond((s) => s === c, cb)
// }


// function getParser(c) {
//     if (c.length > 1) {
//         return char(c[0], getParser(c.slice(1)))
//     } else {
//         return char(c, ok)
//     }
// }

// const helloParser = getParser('hello')


// console.log(helloParser('hello 11'))
// console.log(helloParser('hell'))


// const PsParser = getParser('Ps')

// console.log(PsParser('hello'))
// console.log(PsParser('ps'))
// console.log(PsParser('Ps'))
// console.log(PsParser('Ps ss'))


console.log(match('abcabcabx'))