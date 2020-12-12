class BinaryHeap {
    static defaultData = []
    static defaultCompare = ((a, b) => a - b)
    constructor(data = BinaryHeap.defaultData, compare = BinaryHeap.defaultCompare) {
        this.data = data
        this.compare = compare
        this.init()
    }
    init() {
        this.data.sort(this.compare)
    }
    take() {
        if (this.length === 1) {
            return this.data.pop()
        }
        const value = this.data[0]
        this.data[0] = this.data.pop()
        this.sink()
        return value
    }
    sink(index = 0) {
        if (index >= this.length) {
            return
        }
        let leftChild = 2 * index + 1, rightChild = 2 * index + 2
        if (rightChild < this.length && leftChild < this.length && this.compare(this.data[index], this.data[leftChild]) > 0 && this.compare(this.data[index], this.data[rightChild]) > 0) {
            let exChild
            if (this.compare(this.data[leftChild], this.data[rightChild]) > 0) {
                exChild = rightChild
            } else {
                exChild = leftChild
            }
            this.exChange(index, exChild)
            this.sink(exChild)
        } else if (leftChild < this.length && this.compare(this.data[index], this.data[leftChild]) > 0) {
            this.exChange(index, leftChild)
            this.sink(leftChild)
        } else if (rightChild < this.length && this.compare(this.data[index], this.data[rightChild]) > 0) {
            this.exChange(index, rightChild)
            this.sink(rightChild)
        }
    }
    rise(index = this.length - 1) {
        if (index === 0) {
            return
        }
        let parent = index % 2 === 0 ? index / 2 : (index - 1) / 2
        if (this.compare(this.data[parent], this.data[index]) > 0) {
            this.exChange(parent, index)
            this.rise(parent)
        }
    }
    exChange(indexA, indexB) {
        const temp = this.data[indexA]
        this.data[indexA] = this.data[indexB]
        this.data[indexB] = temp
    }
    give(v) {
        this.data.push(v)
        this.rise()
    }
    get length() {
        return this.data.length
    }
}