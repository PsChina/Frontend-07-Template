class Sorted {
    static defaultData = []
    static defaultCompare = ((a, b) => a - b)
    constructor(data = Sorted.defaultData, compare = Sorted.defaultCompare) {
        this.data = data
        this.compare = compare
    }
    take() {
        if (!this.data.length) {
            return
        }
        let min = this.data[0]
        let minIndex = 0
        const { length } = this.data
        for (let i = 1; i < length; i++) {
            if (this.compare(this.data[i], min) < 0) {
                min = this.data[i]
                minIndex = i
            }
        }
        if (minIndex === length - 1) {
            return this.data.pop()
        }
        this.data[minIndex] = this.data.pop()
        return min
    }
    give(v) {
        this.data.push(v)
    }
    get length() {
        return this.data.length
    }
}