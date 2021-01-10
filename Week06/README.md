学习笔记

## 泛语言分类

### 非形式语言 

    例如 英文 中文 啥的

### 形式语言

   例如 乔姆斯基 谱系

    0 无限制文法
    1 上下文相关文法
    2 上下文无关文法
    3 正则文法

上下文相关文法 隶属于 无限制文法 反过来不一定成立

上下文无关文法 隶属于 上下文相关文法 隶属于 无限制文法

正则文法 隶属于 上下文无关文法 隶属于 上下文相关文法 隶属于 无限制文法


## 什么是产生式

产生式有很多中描述方法

其中最经典和最常用的是 巴斯克-诺尔范式简称（BNF）

BNF 用尖括号 阔起来的名称来表示语法结构名称

不同的结构有 基础结构 和 复合结构 

基础结构称为终结符

复合结构称为非终结符

其中 引号和中间的字符表示终结符

可以有多个括号

`*` 表示重复多次

`|` 表示或

`+` 表示至少一次

举例 四则运算


`<PrimaryExpression>`::= `<Number>` | "("`<AdditiveExpression>`")"

`<MultipcativeExpression>`::= `<PrimaryExpression>`|
                              `<MultipcativeExpression>`"*"`<Number>`|
                              `<MultipcativeExpression>`"/"`<Number>`

`<AdditiveExpression>`::=`<MultipcativeExpression>`|
                         `<AdditiveExpression>`"+"`<MultipcativeExpression>`|
                         `<AdditiveExpression>`"-"`<MultipcativeExpression>`

    
## 深入理解产生式

通过产生式理解乔姆斯基谱系

0形无限制文法

    ?::=?

1形上下文相关文法

    ?<A>?::=?<B>?

2形上下文无关文法

    <A>::=?

3形正则文法

    <A>::=<A>?✅
    
    <A>::=?<A>❌


### 其他产生式

EBNF AENF Customized

## 现代语言的分类

### 特例

`C++` * 号既可以是乘号也可以是指针，具体指哪个取决于*号前面的标识符是否被生命为类型 属于非形式语言

但是大部分是符合形式语言的结构的。

`VB` 和 `JSX` 属于上下文相关文法 其中 `<` (既可以是小于号也可以是 xml直接量) 取决于当前的位置是不是可以接受xml直接量

`Python` 非形式语言 无法定义上一行行首 但是 大部分是符合形式语言的结构的。

`JavaScript` / 可能是除号 也可能是 正则表达式的开头，处理方式类似与`VB`, 字符串模版也要特殊处理`}`，还有自动插入分号规则 所以也不是严格的形式语言

### 语言的分类

根据用途分类

  数据描述语言

  例如 json css

  编程语言

  例如 C / C++ JavaScript

根据表达方式分类

  声明式语言 （声明式语言只告诉你结果）

  例如 json html css

  命令式语言 （命令式语言会告诉你达成这个结果的步骤是怎样的）
 
  C C++ JAVA Python JavaScript


## 变成语言的性质

### 图灵完美性

图灵完备性：在可计算性理论里，如果一系列操作数据的规则（如指令集、编程语言、细胞自动机）可以用来模拟单带图灵机，那么它是图灵完全的。这个词源于引入图灵机概念的数学家艾伦·图灵。虽然图灵机会受到储存能力的物理限制，图灵完全性通常指“具有无限存储能力的通用物理机器或编程语言”。

图灵机（Turing machine）：又称确定型图灵机，是英国数学家艾伦·图灵于 1936 年提出的一种将人的计算行为抽象掉的数学逻辑机，其更抽象的意义为一种计算模型，可以看作等价于任何有限逻辑数学过程的终极强大逻辑机器。

简而言之就是 `所有可计算的问题都可用来描述`

### 动态与静态

动态:

1. 在用户的设备上运行
1. 产品实际运行时
1. Runtime

静态

1. 在程序员设备上
1. 产品开发时
1. Compiletime

### 类型系统

1. 动态类型 和 静态类型
1. 强类型 与 弱类型 （强类型： 无隐式转换； 弱类型： 有隐式转换）
1. 复合类型（结构体 函数签名）
1. 子类型 
1. 泛型（逆变协变）


## 一般语言的设计方式

5 层结构

Atom （原子级） 

    Identifier 标识符 （关键字 变量）
    Literal 直接量
    
Expression （表达式）

    Atom 原子级对象
    Operator 操作符
    Punctuator 标点符号

Statement（语句）

    Expression 表达式
    Keyword 关键字
    Punctuator 标点符号

到这一层就能达到图灵完备了

Structure （结构）

    Function 函数
    Class 类
    Process 过程
    Namespace 命名空间

Program (组织代码层)

    Program
    Module
    Package
    Library

## JS Number 类型

IEEE 754 Double Float

1. Sign(1) 符号位 1位
    0表示正 1表示负
1. Exponent(11) 指数位 11位
   指数位存在偏移 由于存在负的指数
   大于 10000000000（基准值） 的表述正指数 否则是负指数
1. Frction(52) 有效数字位 52位
   存在隐藏位 1


Exponent * Frction 表示 Number 的值


## JS String 类型

1. Character 字符
    字符集：
        ASCII
        Uniode
        UCS
        GB （GB321 GBK GB18030）
        ISO-ISO-8859
        BIG5
1. Code Point 码点
1. Encoding 编码
        UTF-8 （UTF-8 采用 8 位表示一个字符 所以当表示中文等字符集的时候不够用需要 采用多个字节来表示 例如 11100110 1011100 10000000 第一个字节中表示将要采用几个字节表示这个字符（前四位） 有几个1就是用几个字符这里是3 后面的每个字节都会以10开头 所以有效位数为 4 + 6 + 6 === 2 个 8位）
        UTF-16
        


```javascript
function UTF8_Encoding(string){
    const buffer = []
    for(const char of string){
        const code = char.codePointAt(0)
        // 1 Byte 块的访问概率最大应该放在前面一下写法方便理解
        if(code >= 0x00010000){ // 4 Byte
            buffer.push(
                code >> 18 & 0b0000111 | 0b11110000,
                code >> 12 & 0b0011111 | 0b10000000,
                code >> 6  & 0b0011111 | 0b10000000,
                code       & 0b0011111 | 0b10000000
            )
        } else if(code >= 0x00000800){// 3 Byte
            buffer.push(
                code >> 12 & 0b0011111 | 0b10000000,
                code >> 6  & 0b0011111 | 0b10000000,
                code       & 0b0011111 | 0b10000000
            )
        } else if(code >= 0x00000080){// 2 Byte
            buffer.push(
                code >> 6  & 0b0011111 | 0b10000000,
                code       & 0b0011111 | 0b10000000
            )
        } else {// 1 Byte ASCII
            buffer.push(code)
        }
    }
}
```

### 字符串的表示

1. "abc" 双引号
    不可以加 换行符和回车 可以用 \n  和 \t 来代替
1. 'abc' 单引号
1. \`abc\` 反引号


字符串 语法分析

反引号 在编译的时候并不是一个整体而是分开的

4 种token

1. \` 开头 `${` 结尾
1. `}` 开头 `${` 结尾
1. `}` 开头 \` 结尾
1. \` 开头 \` 结尾

包裹的字符会被当作一个整体


## 其他类型

1. Boolean 

    true （关键字）

    false（关键字）

1. Null 

    Null 表示有值但是是 Null

    Null 是关键字

1. Undefined

    Undefined 表示从未被定义过

    Undefined 不是关键字

    获取 Undefined 最保险的方式是 `void 0;`


