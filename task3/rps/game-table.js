export function tableGen(arr) {
  let l = arr.length;
  var arr2D = new Array(l + 1).fill(new Array(l + 1));
  for (let i = 0; i < arr2D.length; i++) {
    if (i === 0) arr2D[i] = new Array(l + 1).fill('var');
    if (i > 0) arr2D[i] = new Array(l + 1).fill('0');
    for (let j = 0; j < arr2D.length; j++) {
      if (arr2D[i][j] === 'var') arr2D[i][j] = arr[j - 1];
      if (j === 0) arr2D[i][j] = arr[i - 1];
      if (j === 0 && i === 0) arr2D[i][j] = 'computer/vs/user';
    }
  }
  for (let i = 0; i < arr2D.length; i++) {
    for (let j = 0; j < arr2D.length; j++) {
      if (i === j && i !== 0 && j !== 0) {
        arr2D[i][j] = 'draw';
        let k = 1;
        while (k < (arr2D.length - 1) / 2) {
          if (j - k < 1) {
            let t = arr2D.length + j - k - 1;
            while (t < arr2D.length) {
              arr2D[i][t] = 'lose';
              t++;
            }
          } else {
            if (arr2D[i][k] !== 'draw') {
              arr2D[i][j - k] = 'lose';
            }
          }
          k++;
        }
      }
    }
  }
  arr2D.forEach((el, i, arrI) => {
    arrI.forEach((el, j, arrJ) => {
      if (arr2D[i][j] === '0') arrJ[i][j] = 'win';
    });
  });
  return arr2D;
}
