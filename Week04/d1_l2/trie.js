class Trie {
    $ = Symbol('$')
    constructor() {
        this.root = Object.create(null)
    }
    insert(word) {
        let node = this.root
        for (const letter of word) {
            if (!node[letter]) node[letter] = Object.create(null)
            node = node[letter]
        }
        if (!node[this.$]) node[this.$] = 0
        node[this.$]++
    }
    most() {
        let max = 0, maxWord = null
        for (const letter in this.root) {
            visit.call(this, this.root, letter)
        }
        function visit(node, word) {
            if (node[this.$] && node[this.$] > max) {
                max = node[this.$]
                maxWord = word
            }
            for (const nextLetter in node) {
                visit.call(this, node[nextLetter], word + nextLetter)
            }
        }
        return [maxWord, max]
    }
}

function randomWord(length) {
    let s = ''
    for (let i = 0; i < length; i++) {
        s += String.fromCharCode(Math.random() * 26 + 'a'.charCodeAt(0))
    }
    return s
}
window.trie = new Trie()
for (let i = 0; i < 100000; i++) {
    window.trie.insert(randomWord(4))
}