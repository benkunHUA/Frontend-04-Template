学习笔记

### 非形式语言
- 中文，英文
  
### 形式语言 （乔姆斯基谱系）
- 0型 无限制文法
- 1型 上下文相关文法
- 2型 上下文无关文法
- 3型 正则文法

上下包含关系，3属于2属于1属于0

### 产生式（BNF）
- 用尖括号扩起来的名称表示语法结构名
- 语法结构分成基础结构和需要其他语法结构定义的复合结构
  - 基础结构称终结符
  - 复合结构称非终结符

- 引号和中间的字符表示终结符
- 可以有括号
- *表示重复很多次
- |表示或
- +表示至少一次

### 通过产生式理解乔姆斯基谱系
- 0型 无限制文法
    - ?::=?

- 1型 上下文相关文法
    - ?&lt;A&gt;?::=?&lt;B&gt;?

- 2型 上下文无关文法
    - &lt;A&gt;::=?

- 3型 正则文法
    - &lt;A&gt;::=&lt;A&gt;?
    - &lt;A&gt;::=?&lt;A&gt;(这样是错误的)


#### JavaScript属于上下文无关语法，在一些特例上属于上下文相关语法（get）

### 语言的分类
- 形式语言——用途
  - 数据描述语言
  - 编程语言

- 形式语言
  - 声明式语言
  - 命令式语言


### 图灵完备性
- 命令式——图灵机
  - goto
  - if和while

- 声明式——Lambda
  - 递归

### 动态与静态
- 动态
  - 在用户的设备/在线服务器上
  - 产品实际运行时
  - runtime

- 静态
  - 在程序员的设备上
  - 在产品开发时
  - compiletimr

### 类型系统
- 动态类型系统和静态类型系统
- 强类型与弱类型
  - String + Number = String
  - String == Boolean    Boolean🧵转成number在跟String做对比

- 复合类型
  - 结构体
  - 函数签名

- 子类型
- 泛型
  - 协变  凡是能用Array&lt;Parent&gt;的地方，都能用Array&lt;Child&gt;
  - 逆变  凡是能用Function&lt;Child&gt;的地方，都能用Function&lt;Parent&gt;


### 一般命令式编程语言
| Atom       | Expression | Statement  | Structure | Program   |
| ----       | ---------- | ---------  | --------- | -------   |
| Identifier | Atom       | Expression | Function  | Program   |
| Literal    | Operator   | Keyword    | Class     | Module    |
|            | punctuator | Punctuator | Process   | Package   |
|            |            |            | Namespace | Library   |


