import { Component, createElement } from './framework'

export class Button extends Component {
    constructor() {
        super()
    }
    render() {
        this.childCintainer = <span>111</span>
        this.root = (<div>
            {this.childCintainer}
        </div>).render()
        return this.root
    }
    appendChild(child) {
        if (!this.childCintainer) {
            this.render()
        }
        this.childCintainer.appendChild(child)
    }
}