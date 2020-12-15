const regexp = /([0-9]+)|([ \t]+)|([\n\r]+)|(\*)|(\/)|(\+)|(\-)/g

const dictinary = ['Number', 'Whitespace', 'LineTerminator', '*', '/', '+', '-']

function* tokenize(source) {
    let result = null, lastIndex
    while (true) {
        result = regexp.exec(source)
        lastIndex = regexp.lastIndex
        if (!result)
            break
        if (regexp.lastIndex - lastIndex > result[0].length)
            break
        const token = {
            type: null,
            value: null
        }
        const { length } = result
        for (let i = 1; i < length; i++) {
            if (result[i])
                token.type = dictinary[i - 1]
        }
        token.value = result[0]
        yield token
    }
    yield {
        type: 'EOF'
    }
}
let source = []

for (let token of tokenize('10 * 25 / 2')) {
    if (token.type !== 'Whitespace' && token.type !== 'LineTerminator') {
        source.push(token)
    }

}

function Expression(tokens) {

}

function AdditiveExpression(source) {

}

function MutiplicativeExpression(source) {
    const [firstToken, seconedToken] = source

    if (firstToken.type === 'Number') {
        let node = {
            type: 'MutipcativeExpression',
            children: [source[0]],
        }
        source[0] = node
        return MutiplicativeExpression(source)
    }

    if (firstToken.type === 'MutipcativeExpression' && seconedToken && (seconedToken.type === '*' || seconedToken.type === '/')) {
        let node = {
            type: 'MutipcativeExpression',
            operator: seconedToken.type,
            children: []
        }
        node.children.push(source.shift())
        node.children.push(source.shift())
        node.children.push(source.shift())
        source.unshift(node)
        return MutiplicativeExpression(source)
    }

    if (firstToken.type === 'MutipcativeExpression') {
        return source[0]
    }

    return MutiplicativeExpression(source)
}

const ast = MutiplicativeExpression(source)

console.log(JSON.stringify(ast))

