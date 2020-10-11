function findStr(src, tar) {
  for(let i = 0; i < src.length; i++) {
    if (src[i] === tar) {
      console.log(`find ${tar} in ${i}`);
      break;
    }
  }
}

findStr('hgfaf', 'a');

function match(src, tar) {
  const tarLen = tar.length;
  let tmp = '';
  let hasStr = false;
  for(let i = 0; i < src.length - tarLen; i++) {
    tmp = src.substr(i, tarLen);
    if (tmp === tar) {
      hasStr = true;
      console.log(`find ${tar} in ${i}`);
      break;
    }
  }
  if (!hasStr) {
    console.log('not found');
  }
}

match('dlabcdefagskd', 'abcdef');