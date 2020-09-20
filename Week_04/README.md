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


### Types
- Number
- String
- Boolean
- Object
- Null         有值但是为空， typeof为Object
- Undefined    
- Symbol       专用于Object的属性名

#### Number
- IEE 754 Double Float
  - Sign(1)    1个符号位
  - Exponent   11个指数位
  - Fraction   52个精读位

0 .toStrig();

#### String
- Character字符
- Code Point 码点 a === 97
- Encoding 编码方式

#### 编码方式
- ASCLL
- Unicode
- UCS  0000 ~ FFFF
- GB
  - GB2312
  - GBK(GBK13000)
  - GB18030
- ISO-8859 无中文版本，一定国家的特定编码方式
- BIG5

#### String——Enciding
- UTF
  - UTF8  用一个字节表示一个字符，三个字节表示一个中文  01100001 = ‘a’            
  - UTF16 用两个字节表示一个字符，两个字节表示一个中文  00000000 01100001 = ‘a'


#### Null & Undefined
- Null 是关键字，不能被赋值
- undefined 不是关键字，可以被赋值
- void 0 === undedined

#### Object
- 任何一个对象都是唯一的，这与它本身的状态无关
- 即使状态完全一致的两个对象，也并不相等
- 我们用状态描述对象
- 我们状态的改变即是行为

#### Object——Class

#### Object——prototype
- 原型是一种更接近人类原始认知的描述对象的方法
- 我们不试图做严谨的分类，而是用“相似”这样的方式描述对象
- 任何对象仅仅需要描述它自己与原型的区别即可

狗咬人
```javascript
class Human {    // 在设计对象的状态和行为时，我们总是遵循“行为改变状态”的原则
  hurt(damage) {

  }
}
```

#### Object in JavaScript
- 属性
  - JavaScript用属性来统一描述对象的状态和行为
  - 一般来说，数据属性用来描述状态，访问器属性用来描述行为
  - 数据属性如果存储函数，也可以用来描述行为

- Data Property数据属性
  - [[value]]
  - writable
  - enumerable  影响Object.keys
  - configurable

- accessor Property访问器属性
  - get
  - set
  - enumerable
  - configurable

#### 原型机制
- 当我们访问属性时，如果当前对象没有，则会沿着原型找原型对象是否有该名称的属性，而原型对象还可能有原型，因此，会有“原型链”这一说法
- 这一算法保证了，每个对象只需要描述自己和原型的区别即可

#### Object API
- 基本的面向对象能力
  - {}
  - []
  - Object.defineProperty
- 基于原型的对象API
  - Object.create   在指定原型的前提下创建对象
  - Object.setPrototypeOf   修改对象的原型
  - Object.getPrototypeOf   获取对象的原型

- 基于分类的方式描述对象
  - new
  - class
  - extends

#### Function Object
- 除了一般对象的属性和原型，函数对象还有一个行为[[call]]
- 我们用JavaScript中的function关键字、箭头运算符或者Function构造器创建的对象，会有[[call]]这个行为
- 我们用类型f()这样的语法把对象当作函数调用时，会访问到[[call]]这个行为
- 如果对应的对象没有[[call]]行为，会报错

#### 特殊对象
- argument 在函数中，无需指定参数名就可以访问参数
- this  函数在执行时所处的作用域