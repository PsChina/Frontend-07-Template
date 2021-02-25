function kmp(source, pattern) {
    if (source === pattern) {
        return true
    }
    const { length } = pattern
    const table = Array(length).fill(0)
    {
        let i = 1, j = 0
        while (i < length) {
            if (pattern[i] === pattern[j]) {
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
        let i = 0, j = 0
        const { length } = source
        while (i < length) {
            if (source[i] === pattern[j]) {
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
