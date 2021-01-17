学习笔记

## 运算符和表达式

### 语法树和优先级的关系

优先级更高的运算符会形成更小一级的语法结构也就是子语法树。 （也就是较末一级的结构）

（1） `Member`

__最高优先级__

运算符优先级最高的是 `Member` 运算（类似 `a.b` 这样发的结构）。

1. `a.b`
1. `a[b]`
1. `foo`\`string\`
1. `super.b`
1. `super['b']`
1. `new.target`
1. `new Foo()`


次一级的运算符

1. `new Foo`


（2） Refrence

1. `Object` 
1. `Key` 
1. `delete`
1. `assign`


（3） Call Expressions

1. `foo()`
1. `super()`
1. `foo()[b]` (`Merber` 运算降级为 `Call Expression`)
1. `foo().b` (`Merber` 运算降级为 `Call Expression`)
1. `foo()`\`abc\` (`Merber` 运算降级为 `Call Expression`)

使用产生式来描述优先级更为严谨。

（4） Left Handside & Right Handside Expressions

1. `a.b = c` 其中的 `a.b` 是 `Left Handside Expression` `c` 是 `Right Handside Expressions`

`Right Handside Expressions` 属于 `Left Handside Expression`  反过来不一定成立

只有 `Right Handside Expressions` 能放在等号的左边

（5） Unary Expressions

1. `delete` a.b
1. `void` foo() 可以起到改变语法结构的作用
1. `typeof` a
1. `+` a
1. `-` a
1. `~` a
1. `!` a
1. `await` a

（6） Exponenal

1. `**` 一个右结合的运算符

（7） Multiplitcative 、Addtive 、Shift 、Relationship Expressions

1. Multiplitcative `*` 、 `/` 、 `%`
1. Addtive `+` 、 `-`
1. Shift `<<` 、`>>` 、`>>>`
1. Relationship `<`、`>`、`<=`、`>=` 、`instanceof`、`in`

（8） Equality & Bitwise Expressions

Equality

1. `==`
1. `!=`
1. `===`
1. `!==`

Bitwise

1. `&`、`^`、`|`
















