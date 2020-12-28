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
        let subPattrn = ''
        while (pattern[i] !== '*') {
            subPattrn += pattern[i]
            i++
        }
        const res = kmp(source, subPattrn, lastIndex)
        if (res) {
            lastIndex = res[1]
        } else {
            return false
        }
    }

    for (let j = 0; i <= source.length - lastIndex && pattern[pattern.length - j] !== '*'; j++) {
        if (source[source.length - j] !== pattern[pattern.length - j] && pattern[pattern.length - j] !== '?') {
            return false
        }
    }

    return true
}

function kmp(source, pattern, start = 0, end = source.length) {
    const { length } = pattern
    const table = Array(length).fill(0)
    {
        let i = 1, j = 0
        while (i < length) {
            if (pattern[i] === pattern[j] || pattern[j] === '?') {
                ++i, ++j
                table[i] = j
            } else {
                if (j > 0) {
                    j = table[j]
                } else {
                    i++
                }
            }
        }
    }
    {
        let i = start, j = 0
        const length = end
        while (i < length) {
            if (source[i] === pattern[j] || pattern[j] === '?') {
                i++, j++
            } else {
                if (j > 0) {
                    j = table[j]
                } else {
                    i++
                }
            }
            if (j === pattern.length) {
                return [i - j, i - 1]
            }
        }
        return false
    }
}


console.log(wildCard('helloaabbcc', 'h*o?a*c*'))