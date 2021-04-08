
import { Component, createElement } from './framework'
import Carousel from './carousel'
import { Timeline, Animation } from './animation'
let d = [
    'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhuafans.dbankcloud.com%2Fpic%2F2017%2F01%2F25%2F195116eebdd5aa2fdaebff832280a391_IMG_20170125_153017.jpg%3Fmode%3Ddownload&refer=http%3A%2F%2Fhuafans.dbankcloud.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1619109392&t=452ee8a4458a6788fff25d482c221e37',
    'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fdingyue.ws.126.net%2Fo7sRcC0mxpsmAOUq6uednKU7w2ooOdJrjVb806Q%3DvHFxF1555158971979compressflag.jpg&refer=http%3A%2F%2Fdingyue.ws.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1619109421&t=342e9cc2065e9c33b3ff9ab490fb3f9d',
    'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2865065027,1553475875&fm=26&gp=0.jpg',
    'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3535222276,3943130922&fm=26&gp=0.jpg'
]



let a = <Carousel src={d} />


//document.body.appendChild(a)

a.mountTo(document.body)

let tl = new Timeline()

window.tl = tl

window.animation = new Animation({ set a(v) { console.log(v) } }, 'a', 0, 100, 1000, null)

// tl.add(new Animation({ set a(v) { console.log(v) } }, 'a', 0, 100, 1000, null))

tl.start()