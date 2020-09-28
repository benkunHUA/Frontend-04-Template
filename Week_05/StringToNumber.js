function stringToNumber(str, type = 10) {
  const num = Number(str);
  if(isNaN(num)) {
    return NaN;
  }else {
    return parseFloat(num, type);
  }
}

console.log(stringToNumber('123', 10));
console.log(stringToNumber('123.34', 10));
console.log(stringToNumber('null', 10));
console.log(stringToNumber(undefined, 10));