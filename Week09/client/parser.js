const EOF = Symbol("EOF")

let currentToken = null, currentAttribute = null

function emit(token) {
    console.log(token)
}

function data(c) {
    if (c == '<') {
        return tagOpen
    } else if (c == EOF) {
        emit({
            type: 'EOF'
        })
        return
    } else {
        emit({
            type: 'text',
            content: c
        })
        return data
    }
}

function tagOpen(c) {
    if (c == '/') {
        return endTagOpen
    } else if (c.match(/^[a-zA-Z]$/)) {
        currentToken = {
            type: 'startTag',
            tagName: ''
        }
        return tagName(c)
    } else {
        return
    }
}
// \t 下一个tab \n 换行 \f 换页
function tagName(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName
    } else if (c == '/') {
        return selfClosingStartTag
    } else if (c.match(/^[a-zA-Z]$/)) {
        currentToken.tagName += c
        return tagName
    } else if (c == '>') {
        emit(currentToken)
        return data
    } else {
        return tagName
    }
}

function beforeAttributeName(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName
    } else if (c == '/' || c == '>' || c == EOF) {
        return afterAttributeName
    } else if (c == '=') {

    } else {
        currentAttribute = {
            name: '',
            value: ''
        }
        return attributeName(c)
    }
}

function attributeName(c) {
    if (c.match(/^[\t\n\f ]$/) || c == '/' || c == '>' || c == EOF) {
        return afterAttributeName(c)
    } else if (c == '=') {
        return beforeAttributeValue
    } else if (c == '\u0000') {

    } else if (c == '"' || c == '\'') {
        return
    } else if (c == '<') {
        return tagOpen
    } else {
        currentAttribute.name += c
        return attributeName
    }
}

function afterAttributeName(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return afterAttributeName
    } else if (c === '/') {
        return selfClosingStartTag
    } else if (c === '=') {
        return beforeAttributeValue
    } else if (c === '>') {
        currentToken[currentAttribute.name] = currentAttribute.value
        emit(currentToken)
        return data
    } else if (c === EOF) {

    } else {
        currentToken[currentAttribute.name] = currentAttribute.value
        currentAttribute = {
            name: '',
            value: ''
        }
        return attributeName(c)
    }
}

function beforeAttributeValue(c) {
    if (c.match(/^[\t\n\f ]$/) || c == '/' || c == '>' || c == EOF) {
        return beforeAttributeValue
    } else if (c == '"') {
        return doubleQuotedAttributeValue
    } else if (c == '\'') {
        return singleQuotedAttributeValue
    } else if (c == '>') {

    } else {
        return UnquotedAttributeValue
    }
}

function doubleQuotedAttributeValue(c) {
    if (c == '\"') {
        currentToken[currentAttribute.name] = currentAttribute.value
        return afterQuotedAttributeValue
    } else if (c == '\u0000') {

    } else if (c == EOF) {

    } else {
        currentAttribute.value += c
        return doubleQuotedAttributeValue
    }
}

function singleQuotedAttributeValue(c) {
    if (c == '\'') {
        currentToken[currentToken.name] = currentAttribute.value
        return afterAttributeValue
    } else if (c == '\u0000') {

    } else if (c == EOF) {

    } else {
        currentAttribute.value += c
        return doubleQuotedAttributeValue
    }
}



function UnquotedAttributeValue(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        currentToken[currentAttribute.name] = currentAttribute.value
        return beforeAttributeName
    } else if (c == '/') {
        currentToken[currentAttribute.name] = currentAttribute.value
        return selfClosingStartTag
    } else if (c == '>') {
        currentToken[currentAttribute.name] = currentAttribute.value
        emit(currentToken)
        return data
    } else if (c == '\u0000') {

    } else if (c == '"' || c == '\'' || c == '<' || c == '=') {

    } else if (c == EOF) {

    } else {
        currentAttribute.value += c
        return UnquotedAttributeValue
    }
}

function afterAttributeValue(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return afterAttributeName
    } else if (c == '/') {
        return selfClosingStartTag
    } else if (c == '=') {
        return beforeAttributeValue
    } else if (c === '>') {
        currentToken[currentAttribute.name] = currentAttribute.value
        emit(currentToken)
        return data
    } else if (c == EOF) {

    } else {
        currentToken[currentAttribute.name] = currentAttribute.value
        currentAttribute = {
            name: '',
            value: ''
        }
        return attributeName(c)
    }
}

function afterQuotedAttributeValue(c) {
    if (c.match(/^[\t\f\n ]$/)) {
        return beforeAttributeName
    } else if (c == '/') {
        return selfClosingStartTag
    } else if (c == '>') {
        currentToken[currentAttribute.name] = currentAttribute.value
        emit(currentToken)
        return data
    } else if (c == EOF) {

    } else {
        currentAttribute.value += c
        return doubleQuotedAttributeValue
    }
}

function selfClosingStartTag(c) {
    if (c == '>') {
        currentToken.isSelfClosing = true
        return data
    } else if (c == 'EOF') {

    } else {

    }
}

function endTagOpen(c) {
    if (c.match(/^[a-zA-Z]$/)) {
        currentToken = {
            tagName: '',
            type: 'endTag'
        }
        return tagName(c)
    } else if (c == '>') {

    } else if (c == EOF) {

    }
}



module.exports.parserHTML = function parserHTML(html) {
    let state = data
    for (let c of html) {
        state = state(c)
    }
    state = state(EOF)
}