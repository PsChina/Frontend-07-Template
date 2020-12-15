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

for (let token of tokenize('1024 + 33 * 100')) {
    console.log(token)
}