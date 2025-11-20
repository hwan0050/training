// generics.ts - TypeScript 제네릭 학습
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// 1. 기본 제네릭 함수
function identity(arg) {
    return arg;
}
var stringResult = identity("Hello");
var numberResult = identity(123);
var booleanResult = identity(true);
console.log("문자열:", stringResult);
console.log("숫자:", numberResult);
console.log("불린:", booleanResult);
// 2. 제네릭 배열
function getFirstElement(arr) {
    return arr[0];
}
var firstNumber = getFirstElement([1, 2, 3]);
var firstString = getFirstElement(["a", "b", "c"]);
console.log("첫 번째 숫자:", firstNumber);
console.log("첫 번째 문자:", firstString);
var stringBox = { value: "Hello" };
var numberBox = { value: 123 };
console.log("문자열 박스:", stringBox.value);
console.log("숫자 박스:", numberBox.value);
// 4. 제네릭 클래스
var DataStorage = /** @class */ (function () {
    function DataStorage() {
        this.data = [];
    }
    DataStorage.prototype.addItem = function (item) {
        this.data.push(item);
    };
    DataStorage.prototype.removeItem = function (item) {
        this.data = this.data.filter(function (i) { return i !== item; });
    };
    DataStorage.prototype.getItems = function () {
        return __spreadArray([], this.data, true);
    };
    return DataStorage;
}());
var textStorage = new DataStorage();
textStorage.addItem("Apple");
textStorage.addItem("Banana");
textStorage.addItem("Orange");
console.log("텍스트 저장소:", textStorage.getItems());
var numberStorage = new DataStorage();
numberStorage.addItem(1);
numberStorage.addItem(2);
numberStorage.addItem(3);
console.log("숫자 저장소:", numberStorage.getItems());
function getLength(arg) {
    return arg.length;
}
console.log("문자열 길이:", getLength("Hello"));
console.log("배열 길이:", getLength([1, 2, 3, 4, 5]));
// console.log(getLength(123));  // 오류! number에는 length가 없음
// 6. keyof 사용
function getProperty(obj, key) {
    return obj[key];
}
var person = {
    name: "Hwan",
    age: 25,
    email: "hwan@example.com"
};
console.log("이름:", getProperty(person, "name"));
console.log("나이:", getProperty(person, "age"));
var partialUser = { name: "Kim" };
var preview = { id: 1, name: "Lee" };
var safeUser = { id: 2, name: "Park", email: "park@example.com" };
console.log("부분 사용자:", partialUser);
console.log("사용자 미리보기:", preview);
console.log("안전한 사용자:", safeUser);
console.log("\n=== TypeScript 제네릭 학습 완료! ===");
