const EOF = Symbol("EOF")

function data(c) {

}

module.exports.parserHTML = function parserHTML(html) {
    let state = data
    for (let c of html) {
        state = state(c)
    }
    state = state(EOF)
}