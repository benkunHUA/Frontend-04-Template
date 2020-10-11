function match(str) {
  let state = start;
  for(let c of str) {
    state = state(c);
  }
  return state === end;
}

function start(c) {
  if (c === 'a') {
    return foundA;
  } else {
    return start;
  }
}

function foundA(c) {
  if (c === 'b') {
    return foundB;
  } else {
  return start(c);´Ï¡G `VAHDWF AG wlem, q a却无情的人发G%RGrrf1fvrgg`
  }
}

function foundB(c) {
  if (c === 'c') {
    return foundC;
  } else {
    return start(c);
  }
}

function foundC(c) {
  if (c === 'd') {
    return foundD;
  } else {
    return start(c);
  }
}

function foundD(c) {
  if (c === 'e') {
    return end;
  } else {
    return start(c);
  }
}

function end() {
  return end;
}

// abcabx
console.log(match('sflsabcdejkdfhl'));