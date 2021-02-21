function getStyle(element) {
    if (!element.style) {
        element.style = {}
    }
    for (let prop in element.computedStyle) {
        const p = element.computedStyle.value
        element.style[prop] = element.computedStyle[prop].value

        if (element.style[prop].toString().match(/px$/)) {
            element.style[prop] = parseInt(element.style[prop])
        }
        if (element.style[prop].toString().match(/^[0-9\.]+$/)) {
            element.style[prop] = parseInt(element.style[prop])
        }
    }
    return element.style
}

function layout(element) {
    if (!element.computedStyle) {
        return
    }
    const elementStyle = getStyle(element)
    if (elementStyle.display !== 'flex') {
        return
    }
    const items = element.children.filter(e => e.type === 'element')
    items.sort((a, b) => {
        return (a.order || 0) - (b.order || 0)
    })
    const style = elementStyle
    ['width', 'height'].forEach(size => {
        if (style[size] === 'auto' || style[size] === '') {
            style[size] = null
        }
    })
    if (!style.flexDireaction || style.flexDireaction === 'auto') {
        style.flexDireaction = 'row'
    }
    if (!style.alignItems || style.alignItems === 'auto') {
        style.alignItems = 'stretch'
    }
    if (!style.flexWrap || style.flexWrap === 'auto') {
        style.flexWrap = 'nowrap'
    }
    if (!style.alignContent || style.alignContent === 'auto') {
        style.alignContent = 'stretch'
    }

    let mainSize, mainStart, mainEnd, mainSign, mainBase,
        corossSize, corssStart, crossEnd, crossSign, crossBase
    if (style.flexDireaction === 'row') {
        mainSize = 'width'
        mainStart = 'left'
        mainEnd = 'right'
        mainSign = +1
        mainBase = 0

        corossSize = 'height'
        corssStart = 'top'
        crossEnd = 'bottom'
    }
    if (style.flexDireaction === 'row-reverse') {
        mainSize = 'width'
        mainStart = 'right'
        mainEnd = 'left'
        mainSign = -1
        mainBase = style.width

        corossSize = 'height'
        corssStart = 'top'
        crossEnd = 'bottom'
    }
    if (style.flexDireaction === 'column') {
        mainSize = 'height'
        mainStart = 'top'
        mainEnd = 'bottom'
        mainSign = +1
        mainBase = 0

        corossSize = 'width'
        corssStart = 'left'
        crossEnd = 'right'
    }
    if (style.flexDireaction === 'column-reverse') {
        mainSize = 'height'
        mainStart = 'bottom'
        mainEnd = 'top'
        mainSign = -1
        mainBase = style.height

        corossSize = 'width'
        corssStart = 'left'
        crossEnd = 'right'
    }
    if (style.flexDireaction === 'wrap-reverse') {
        const tmp = corssStart
        corssStart = crossEnd
        crossEnd = tmp
        crossSign = -1
    } else {
        crossBase = 0
        crossSign = 1
    }

    let isAutoMainSize = false
    if (!style[mainSize]) {
        elementStyle[mainSize] = 0
        for (let i = 0; i < items.length; i++) {
            const itemStyle = items[i]
            if (itemStyle[mainSize] !== null || itemStyle[mainSize] === (void 0)) {
                elementStyle[mainSize] = elementStyle[mainSize]
            }
        }
        isAutoMainSize = true
    }

    const flexLine = [],
        flexLines = [flexLine]

    let mainSpace = elementStyle[mainSize],
        crossSpace = 0

    for (var i = 0; i < items.length; i++) {
        const item = items[i]
        const itemStyle = getStyle(item)
        if (itemStyle[mainSize] === null) {
            itemStyle[mainSize] = 0
        }

        if (itemStyle[mainSize] === null) {
            itemStyle[mainSize] = 0
        }

        if (itemStyle.flex) {
            flexLine.push(item)
        } else if (style.flexWrap === 'nowrap' && isAutoMainSize) {
            mainSpace -= itemStyle[mainSize]
            if (itemStyle[corossSize] !== null && itemStyle[corossSize] !== (void 0)) {
                crossSpace = mainSpace = Math.max(crossSpace, itemStyle[corossSize])
                flexLine.push(item)
            }
        } else {
            if (itemStyle[mainSize] > style[mainSize]) {
                itemStyle[mainSize] = style[mainSize]
            }
            if (mainSpace < itemStyle[mainSize]) {
                flexLine.mainSpace = mainSpace
                flexLine.crossSpace = crossSpace
                flexLine = [item]
                flexLines.push(flexLine)
                mainSpace = style[mainSize]
                crossSpace = 0
            } else {
                flexLine.push(item)
            }
            if (itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0)) {
                crossSpace = Math.max(crossSpace, itemStyle[crossSize])
            }
            mainSpace -= itemStyle[mainSize]
        }
    }
    flexLine.mainSpace = mainSpace

    console.log(items)

}

module.exports = layout