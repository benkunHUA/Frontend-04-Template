function kmp(source, pattern) {
  let table = new Array(pattern.length).fill(0);

  {
    let i = 1; // 当前匹配的位置
    let j = 0; // 当前匹配的数量
    while(i < pattern.length) {
      if (pattern[i] === pattern[j]) {
        i++;
        j++;
        table[i] = j;
      } else {
        if (j > 0) {
          j = table[j];
        } else {
          i++;
        }
      }
    }
  }

  {
    let i = 1;
    let j = 0;
    while(i < source.length) {
      if (source[i] === pattern[j]) {
        i++;
        j++;
      } else {
        if (j > 0) {
          j = table[j];
        } else {
          i++;
        }
      }
      if(j === pattern.length) {
        return true;
      }
    }
    return false;
  }
}

console.log(kmp('aaaabcdabcex', 'abcdabce'));