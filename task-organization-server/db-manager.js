console.log("import db-manager...");
const fs = require('fs');
const R = require('ramda');
let db = {};
let update;
let getData;

/*
 *     server side
 */

//loadDB:: string -> obj
const loadDB = (path) => JSON.parse(fs.readFileSync(path, 'utf-8', (err, data) => (
    err ? handleErr(err) : data
)));

//toEntity :: (Entity a) => Object -> a
const toEntity = ({ name, grade, index }) => ({
    index,
    name,
    grade,
    action: '대기',
    location: '생활관',
    detail: '--'
});


//pickOne :: String -> Int ->  Object
const pickOne = (v, i) => ({ index: i, name: v.substring(1), grade: v[0] });

//API
//initDB :: obj => [obj]
const initDB = ({ people }) =>
    people.map(R.pipe(
        pickOne,
        toEntity
    ));


//updateEntity :: (Entity a, b) => Entity => entity
const updateEntity = modified => original => ({ ...original, ...modified });

//:: (a=>a') => [a], Int -> [a]
//:: not pure
const modifyTarget = fn => (arr, i) => {
    if (arr[i]) { arr[i] = fn(arr[i]) };
    return arr;
};

//handleErr :: Err -> SideEffects 
const handleErr = (err) => { throw err };

//API
//update :: [Object] -> [[Int], Object] -> [Object]
const updateSomething = x => t => t.targets.reduce(modifyTarget(updateEntity(t.modified)), x);

const getSomething = x => () => x;

/*
 *      client side
 */

//transactionJSON :: Object => Object => Object
const transactionJSON = targets => modified => ({ targets, modified });


//actionOrder :: Object
const actionOrder = () => ({ '작업': {}, '교육': {}, '훈련': {}, '대기': {}, '식기': {}, '배식': {}, '휴가': {}, '정비': {}, '외진': {}, '기타': {} });


//summary :: [Object] -> [[ *]]
const summary = R.reduce((acc, n) => {
        if (!acc[n.action].hasOwnProperty(n.location)) {
            acc[n.action][n.location] = [];
        }
        acc[n.action][n.location].push(n.name);
        return acc;
    },
    actionOrder());








console.log("initiationg database..");

let data = loadDB('db.json');
db.data = initDB(data);
db.counts = data.counts;
update = updateSomething(db.data);
getData = getSomething(db);


// 여기에서 loop 제거 
let mod1 = transactionJSON([1, 2, 3, 4, 5, 6])({ action: "작업", location: "방어2", detail: "벌목" });
let mod2 = transactionJSON([10, 11, 12, 13, 14, 15, 16, 17])({ action: "교육", location: "공격1", detail: "학사3교육대" });
let mod3 = transactionJSON([35, 37, 39, 40, 21, 22, 23, 24])({ action: "교육", location: "공격1", detail: "학사2교육대" });
let mod4 = transactionJSON([51, 52, 53, 54, 55, 56, 57, 58, 59, 60])({ action: "교육", location: "연병장", detail: "제식" });
let mod5 = transactionJSON([44, 45, 46, 32, 33, 34, 61, 62, 63])({ action: "작업", location: "독도법4", detail: "예초" });
let mod6 = transactionJSON([101, 102, 103, 104, 105, 106, 98, 99, 97])({ action: "훈련", location: "개인화기2", detail: "병기본 사격" });
let mod7 = transactionJSON([70, 71, 72, 73, 74])({ action: "교육", location: "연병장", detail: "제식" });
let mod8 = transactionJSON([88, 89, 90, 91])({ action: "배식", location: "생활관", detail: "식사추진 56명" });
let mod9 = transactionJSON([8, 35, 46, 12, 43, 25, 86, 57, 45, 63, 89])({ action: "휴가", location: "영외", detail: "--" });

update(mod1);
update(mod2);
update(mod3);
update(mod4);
update(mod5);
update(mod6);
update(mod7);
update(mod8);
update(mod9);


// let start = new Date();
// let asd = summary(db);
// let finish = new Date();
// // // R.map((v,i) => console.log(v), asd);
// console.log(db);
// // console.log(asd);
// console.log("Operation took " + (finish.getTime() - start.getTime()) + " ms");




module.exports = {
    update: update,
    getData: getData
};

console.log("import db-manager...DONE");
