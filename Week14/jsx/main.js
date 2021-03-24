
import { Component, createElement } from './framework'

let d = [
    'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhuafans.dbankcloud.com%2Fpic%2F2017%2F01%2F25%2F195116eebdd5aa2fdaebff832280a391_IMG_20170125_153017.jpg%3Fmode%3Ddownload&refer=http%3A%2F%2Fhuafans.dbankcloud.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1619109392&t=452ee8a4458a6788fff25d482c221e37',
    'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fdingyue.ws.126.net%2Fo7sRcC0mxpsmAOUq6uednKU7w2ooOdJrjVb806Q%3DvHFxF1555158971979compressflag.jpg&refer=http%3A%2F%2Fdingyue.ws.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1619109421&t=342e9cc2065e9c33b3ff9ab490fb3f9d',
    'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2865065027,1553475875&fm=26&gp=0.jpg',
    'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3535222276,3943130922&fm=26&gp=0.jpg'
]

class Carousel extends Component {
    constructor() {
        super()
        this.attributes = Object.create(null)
    }
    setAttribute(name, value) {
        this.attributes[name] = value
    }
    render() {
        this.root = document.createElement('div')
        this.root.classList.add('carousel')
        for (let record of this.attributes.src) {
            let child = document.createElement('div')
            child.style.backgroundImage = `url(${record})`
            // child.style.backgroundSize = '100% 100%'
            this.root.appendChild(child)
        }

        let move = even => {
            console.log('mousemove')
        }

        let down = even => {
            console.log('mousedown')
            this.root.addEventListener('mousemove', move)
            this.root.addEventListener('mouseup', up)
        }

        let up = even => {
            console.log('mouseup')
            this.root.removeEventListener('mousemove', move)
            this.root.removeEventListener('mouseup', up)
        }

        this.root.addEventListener('mousedown', down)

        let currentIndex = 0
        // setInterval(() => {
        //     let children = this.root.children;
        //     let nextIndex = (currentIndex + 1) % children.length
        //     let current = children[currentIndex]
        //     let next = children[nextIndex]
        //     next.style.tansition = 'none'
        //     next.style.transform = `translateX(${100 - nextIndex * 100}%)`
        //     setTimeout(() => {
        //         next.style.tansition = ''
        //         current.style.transform = `translateX(${-100 - currentIndex * 100}%)`
        //         next.style.transform = `translateX(${- nextIndex * 100}%)`
        //         currentIndex = nextIndex
        //     }, 16);

        // }, 3000);
        return this.root
    }
    mountTo(parent) {
        parent.appendChild(this.render());
    }
}

let a = <Carousel src={d} />


//document.body.appendChild(a)

a.mountTo(document.body)