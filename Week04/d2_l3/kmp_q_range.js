function kmp(source, pattern, start = 0, end = source.length) {
    if (source === pattern) {
        return true
    }
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
                const res = [i - j, i - 1]
                if (table.length) {
                    res.lastIndex = i - table[table.length - 1]
                } else {
                    res.lastIndex = i + 1
                }
                return res
            }
        }
        return false
    }
}