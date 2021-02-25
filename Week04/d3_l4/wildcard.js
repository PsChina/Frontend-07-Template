function wildCard(source, pattern) {
    let startCount = 0
    const { length } = pattern
    for (let i = 0; i < length; i++) {
        if (pattern[i] === '*') {
            startCount++
        }
    }
    if (startCount === 0) {
        for (let i = 0; i < length; i++) {
            if (source[i] !== pattern[i] && pattern[i] !== '?') {
                return false
            }
        }
        return true
    }

    let i = 0, lastIndex = 0
    for (; pattern[i] !== '*'; i++) {
        if (source[i] !== pattern[i] && pattern[i] !== '?') {
            return false
        }
    }
    lastIndex = i

    for (let p = 0; p < startCount - 1; p++) {
        i++
        let subPattern = ''
        while (pattern[i] !== '*') {
            subPattern += pattern[i]
            i++
        }
        const reg = new RegExp(subPattern.replace(/\?/g, '[\s\S]'), 'g')
        reg.lastIndex = lastIndex

        const res = reg.exec(source)

        if (!res) {
            return false
        }
        lastIndex = reg.lastIndex
    }

    for (let j = 0; j <= source.length - lastIndex && pattern[pattern.length - j] !== '*'; j++) {
        if (source[source.length - j] !== pattern[pattern.length - j] && pattern[pattern.length - j] !== '?') {
            return false
        }
    }

    return true
}

console.log(wildCard('hello', 'h*le*o'))