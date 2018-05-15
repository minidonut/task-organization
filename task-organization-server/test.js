const R = require('ramda');

console.log('test');

let a = [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3];
let b = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];


console.log(R.sum(a));
console.log(b.length);

let c = R.splitEvery(4, a).map(R.sum);

const splitByCounts = (count, arr) => R.reduce((acc, n) => {
    let temp = acc.concat([R.take(n, arr)]);
    arr = R.drop(n, arr);
    return temp;
}, [], count);

console.log(R.splitEvery(4, splitByCounts(a, b)));
