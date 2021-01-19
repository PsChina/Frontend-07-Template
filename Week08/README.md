学习笔记

## 浏览器总论 ｜ 浏览器工作原理总论

### 浏览器渲染流程

输入 `url` ->  通过 `http` 协议 -> 得到 `html` -> 解析 `html` -> 得到 `dom` 树 -> `css` computing -> 带css 属性的 `dom` -> `layout` -> `dom with position` -> render -> `bitmap`

### 状态机 ｜ 有限状态机

#### 有限状态机

1. 每一个状态机都是一个机器 
    1. 在每一个机器里，我们可以做计算、存储、输出......
    1. 所有的这些机器接受的输入是一致的
    1. 状态机的每一个机器本身没有状态，如果我们用函数来表示的话，它应该是纯函数(无副作用)
1. 每一个机器知道下一个状态
   1. 每个机器都有确定的下一个状态(Moore)
   1. 每个机器根据输入决定下一个状态(Mealy)

#### JS中的有限状态机(Mealy)


1. 每个函数表示一个状态
1. 函数的参数就是输入
1. 在函数中，可以自由地编写代码
1. 函数的返回值作为下一个状态

```js
function satte(input){
    // 
    return next
}

while(input){
    state = state(input)
}
```



### 使用有限状态机处理字符串

#### 状态机 ｜ 不使用状态机处理字符串（一）

在一个字符串中，找到`a`

```js
function findA(string){
    const {length} = string
    for(let i=0; i<length; i++){
        if(string.charAt(i) === 'a'){
            return i
        }
    }
    return -1
}

function match(string){
  for(let char of string){
    if(char === 'a'){
      reutrn true
    }
  }
  return false
}
```
#### 状态机 ｜ 不使用状态机处理字符串（二）

在一个字符串中找到字符串`ab`

```js
function findAB(string){
    const {length} = string
    for(let i = 0; i < length; i++){
        if(string.charAt(i) === 'a'){
            if(i < length - 1 && string.charAt(i+1) === 'b'){
                return i
            }
        } 
    }
    return -1
}

function match(string){
  let foundA = false
  for(let char of string){
    if(char === 'a'){
      foundA = true
    } else if(foundA && char === 'b'){
      return true
    } else {
      foundA = false
    }
  }
  return false
}
```

#### 状态机 ｜ 不使用状态机处理字符串（三）

在一个字符串中找到字符串`abcdef`


```js
function match(string){
    const { length } = string
  for(let i = 0; i < length; i++){
      if(string.charAt(i) === 'a'){
          if(i < length - 5 && string.charAt(i + 1) === 'b'
          &&
          string.charAt(i + 2) === 'c'
          &&
          string.charAt(i + 3) === 'd'
          &&
          string.charAt(i + 4) === 'e'
          &&
          string.charAt(i + 5) === 'f'
          ){
              return true
          }
      }
  }
  return false
}

function match2(string){
    let foundA = false,
        foundB = false,
        foundC = false,
        foundD = false,
        foundE = false
    for(let char of string){
        if(char === 'a'){
            foundA = true
        } else if (foundA && char === 'b'){
            foundB = true
        } else if (foundB && char === 'c'){
            foundC = true
        } else if(foundC&& char === 'd'){
            foundD = true
        } else if(foundD && char === 'e'){
            foundE = true
        } else if(foundE && char === 'f'){
            return true
        } else {
        foundA = foundB = foundC = foundD = foundE = false
        }
    }
  return false
}
```

#### 状态机 ｜ 使用状态机处理字符串（一）

```js
function match(string){
    let state = start
    for(let c of string){
        state = state(c)
    }
    return state === end
}

function start(c){
    if(c === 'a'){
        return foundA
    } else {
        return start
    }
}

function foundA(c){
    if(c === 'b'){
        return foundB
    } else {
        return start(c)
    }
}

function foundB(c){
    if(c === 'c'){
        return foundC
    } else {
        return start(c)
    }
}

function foundC(c){
    if(c === 'd'){
        return foundD
    } else {
        return start(c)
    }
}

function foundD(c){
    if(c === 'e'){
        return foundE
    } else {
        return start(c)
    }
}

function foundE(c){
    if(c === 'f'){
        return end
    } else {
        return start(c)
    }
}

function end(){
    return end
}

```
