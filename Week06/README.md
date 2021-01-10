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



