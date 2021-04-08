import { Component } from './framework'
import { enableGesture } from '../gesture/gesture'
import { Timeline, Animation } from './animation'
import { ease } from './ease'


export default class Carousel extends Component {
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
            this.root.appendChild(child)
        }

        enableGesture(this.root)

        let timeline = new Timeline

        timeline.start()

        let handler = null

        let children = this.root.children

        let position = 0

        let t = 0

        let ax = 0

        this.root.addEventListener('start', event => {
            timeline.pause()
            clearInterval(handler)
            let progress = (Date.now() - t) / 500
            ax = ease(progress) * 500 - 500
        })

        this.root.addEventListener('pan', event => {
            const { clientX, startX } = event
            let x = clientX - startX - ax
            let current = position - Math.round((x - x % 500) / 500)
            for (const offset of [-1, 0, 1]) {
                let pos = current + offset
                pos = (pos % children.length + children.length) % children.length
                children[pos].style.transition = 'none'
                children[pos].style.transform = `translateX(${(offset - pos) * 500 + x % 500}px)`
            }

        })

        this.root.addEventListener('end', event => {

            timeline.reset()

            timeline.start()

            handler = setInterval(nextPicture, 3000);

            const { clientX, startX } = event
            let x = clientX - startX
            let current = position - ((x - x % 500) / 500)

            let direction = Math.round((x % 500) / 500)

            if (event.isFlick) {
                if (event.velocity < 0) {
                    direction = Math.ceil((x % 500) / 500)
                } else {
                    direction = Math.floor((x % 500) / 500)
                }
            }

            for (const offset of [-1, 0, 1]) {
                let pos = current + offset
                pos = (pos % children.length + children.length) % children.length

                children[pos].style.transition = 'none'
                timeline.add(new Animation(children[pos].style, 'transform',
                    - pos * 500 + offset * 500 + x % 500,
                    - pos * 500 + offset * 500 + direction * 500,
                    500, 0, ease, v => `translateX(${v}px)`))
            }
            position = position - ((x - x % 500) / 500) - direction
            position = (position % children.length + children.length) % children.length
        })

        let nextPicture = () => {
            let children = this.root.children;
            let nextPosition = (position + 1) % children.length
            let current = children[position]
            let next = children[nextPosition]
            t = Date.now()
            timeline.add(new Animation(current.style, 'transform', -position * 500, -500 - position * 500, 500, 0, ease, v => `translateX(${v}px)`))
            timeline.add(new Animation(next.style, 'transform', 500 - nextPosition * 500, - nextPosition * 500, 500, 0, ease, v => `translateX(${v}px)`))
            position = nextPosition
        }

        handler = setInterval(nextPicture, 3000);




        /* let startX = 0, children = this.root.children
         let move = event => {
             let x = event.clientX - startX
             let current = position - Math.round((x - x % 500) / 500)
             for (const offset of [-1, 0, 1]) {
                 let pos = current + offset
                 pos += children.length
                 pos %= children.length
 
                 children[pos].style.transform = `translateX(${(offset - pos) * 500 + x % 500}px)`
             }
             // for (const child of children) {
             //     child.style.transform = `translateX(${- position * 500 + x}px)`
             // }
         }
 
         let down = event => {
             startX = event.clientX
             for (const child of children) {
                 child.style.transition = 'none'
             }
             this.root.addEventListener('mousemove', move)
             this.root.addEventListener('mouseup', up)
         }
 
         let up = event => {
             let x = event.clientX - startX
             position -= Math.round(x / 500)
             position %= children.length
             for (const offset of [0, - Math.sign(Math.round(x / 500) - x + 250 * Math.sign(x))]) {
                 let pos = position + offset
                 pos += children.length
                 pos %= children.length
                 // pos = (pos + children.length) % children.length
                 children[pos].style.transition = ''
                 children[pos].style.transform = `translateX(${(offset - pos) * 500}px)`
             }
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
            */
        return this.root


    }
    mountTo(parent) {
        parent.appendChild(this.render());
    }
}