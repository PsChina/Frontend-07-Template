
function sleep(t) {
    return new Promise((resolve) => {
        setTimeout(resolve, t);
    })
}


async function* counter() {
    let i = 0
    while (true) {
        await sleep(1000)
        yield i++
    }
}

(async function () {
    for await (let v of counter()) {
        console.log(v)
    }
})()