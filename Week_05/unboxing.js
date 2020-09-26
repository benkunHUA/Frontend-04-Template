var o = {
  toString() { return "2"},
  valueOf() { return 1 },
  //[Symbol.toPrimitive]() { return 3 }  // 如果对象中有Symbol.toPrimitive 就会选择它
}

var x = {};
x[o] = 1;  // 作为属性引用时会调用 toString() 获取值  x[2] = 1;
console.log("x" + o);  // 在加法中调用valueOf()获取值
console.log(1 + o);  // 在加法中调用valueOf()获取值
 