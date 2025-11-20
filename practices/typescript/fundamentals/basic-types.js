// basic-types.ts - TypeScript 기본 타입 학습
// 1. 기본 타입 (Primitive Types)
var userName = "Hwan";
var age = 25;
var isStudent = true;
console.log("\uC774\uB984: ".concat(userName, ", \uB098\uC774: ").concat(age, ", \uD559\uC0DD: ").concat(isStudent));
// 2. 배열 (Array)
var numbers = [1, 2, 3, 4, 5];
var fruits = ["apple", "banana", "orange"];
console.log("숫자 배열:", numbers);
console.log("과일 배열:", fruits);
// 3. 튜플 (Tuple)
var user = ["Hwan", 25];
console.log("사용자 정보:", user);
// 4. 열거형 (Enum)
var Color;
(function (Color) {
    Color["Red"] = "RED";
    Color["Green"] = "GREEN";
    Color["Blue"] = "BLUE";
})(Color || (Color = {}));
var favoriteColor = Color.Blue;
console.log("좋아하는 색:", favoriteColor);
// 5. Any (가능하면 피하기)
var randomValue = "문자열";
randomValue = 123;
randomValue = true;
console.log("Any 타입:", randomValue);
// 6. Unknown (Any보다 안전)
var userInput;
userInput = "Hello";
userInput = 100;
// 타입 체크 후 사용
if (typeof userInput === "string") {
    console.log("문자열 길이:", userInput.length);
}
// 7. Void (반환값 없음)
function logMessage(message) {
    console.log("메시지:", message);
}
logMessage("TypeScript 학습 중!");
// 8. Null & Undefined
var nullValue = null;
var undefinedValue = undefined;
// 실행
console.log("\n=== TypeScript 기본 타입 학습 완료! ===");
