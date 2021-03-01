let iframe = document.createElement('iframe')

document.body.innerHTML = ''
document.body.appendChild(iframe)

function happen(element, event) {
    return new Promise((resolve, reject) => {
        let handler = () => {
            resolve()
            element.removeEventListener(event, handler)
        }
        element.addEventListener(event, handler)
    })
}

void async function () {
    for (let standard of standards) {
        iframe.src = standard
        console.log(standard.url)
        await happen(iframe, 'load')
        console.log(iframe.contentDocument.querySelectorAll('.propdef'))
    }
}()