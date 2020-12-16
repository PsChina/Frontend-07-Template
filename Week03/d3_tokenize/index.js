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

for (let token of tokenize('10 * 25 / 2 + 33')) {
    if (token.type !== 'Whitespace' && token.type !== 'LineTerminator') {
        source.push(token)
    }
}

function Expression(tokens) {
    const [firstToken, seconedToken] = tokens
    if (firstToken.type === 'AdditiveExpression' && seconedToken && seconedToken.type === 'EOF') {
        let node = {
            type: 'Expression',
            children: [firstToken]
        }
        source.unshift()
        return node
    }
    AdditiveExpression(source)
    return Expression(source)
}

function AdditiveExpression(source) {
    const [firstToken, seconedToken] = source
    if (firstToken.type === 'MutipcativeExpression') {
        let node = {
            type: 'AdditiveExpression',
            children: [firstToken],
        }
        source[0] = node
        return AdditiveExpression(source)
    }

    if (firstToken.type === 'AdditiveExpression' && seconedToken && (seconedToken.type === '+' || seconedToken.type === '-')) {
        let node = {
            type: 'AdditiveExpression',
            operator: seconedToken.type,
            children: []
        }
        node.children.push(source.shift())
        node.children.push(source.shift())
        MutiplicativeExpression(source)
        node.children.push(source.shift())
        source.unshift(node)
        return AdditiveExpression(source)
    }

    if (firstToken.type === 'AdditiveExpression') {
        return source[0]
    }
    MutiplicativeExpression(source)
    return AdditiveExpression(source)
}

function MutiplicativeExpression(source) {
    const [firstToken, seconedToken] = source

    if (firstToken.type === 'Number') {
        let node = {
            type: 'MutipcativeExpression',
            children: [firstToken],
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

const ast = Expression(source)

console.log(ast)


function computed(ast) {
    if (ast.value) {
        return Number(ast.value)
    }
    if (ast.operator) {
        switch (ast.operator) {
            case '+':
                return computed(ast.children[0]) + computed(ast.children[2])
            case '-':
                return computed(ast.children[0]) - computed(ast.children[2])
            case '*':
                return computed(ast.children[0]) * computed(ast.children[2])
            case '/':
                return computed(ast.children[0]) / computed(ast.children[2])
            default:
                return 0
        }
    }
    return computed(ast.children[0])
}
