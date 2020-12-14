const regexp = /([0-9]+)|([ \t]+)|([\n\r]+)|(\*)|(\/)|(\+)|(\-)/g

const dictinary = ['Number', 'Whitespace', 'LineTerminator', '*', '/', '+', '-']

function tokenize(source) {
    let result = null
    while (true) {
        result = regexp.exec(source)
        if (!result) break
        const { length } = result
        for (let i = 1; i < length; i++) {
            if (result[i]) console.log(dictinary[i - 1])
        }
        console.log(result)
    }
}

tokenize('1024 + 33 * 100')