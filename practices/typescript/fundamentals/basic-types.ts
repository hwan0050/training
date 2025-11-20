// basic-types.ts - TypeScript 기본 타입 학습

// 1. 기본 타입 (Primitive Types)
const userName: string = "Hwan";
const age: number = 25;
const isStudent: boolean = true;

console.log(`이름: ${userName}, 나이: ${age}, 학생: ${isStudent}`);

// 2. 배열 (Array)
const numbers: number[] = [1, 2, 3, 4, 5];
const fruits: Array<string> = ["apple", "banana", "orange"];

console.log("숫자 배열:", numbers);
console.log("과일 배열:", fruits);

// 3. 튜플 (Tuple)
const user: [string, number] = ["Hwan", 25];
console.log("사용자 정보:", user);

// 4. 열거형 (Enum)
enum Color {
    Red = "RED",
    Green = "GREEN",
    Blue = "BLUE"
}

const favoriteColor: Color = Color.Blue;
console.log("좋아하는 색:", favoriteColor);

// 5. Any (가능하면 피하기)
let randomValue: any = "문자열";
randomValue = 123;
randomValue = true;
console.log("Any 타입:", randomValue);

// 6. Unknown (Any보다 안전)
let userInput: unknown;
userInput = "Hello";
userInput = 100;

// 타입 체크 후 사용
if (typeof userInput === "string") {
    console.log("문자열 길이:", userInput.length);
}

// 7. Void (반환값 없음)
function logMessage(message: string): void {
    console.log("메시지:", message);
}

logMessage("TypeScript 학습 중!");

// 8. Null & Undefined
let nullValue: null = null;
let undefinedValue: undefined = undefined;

// 실행
console.log("\n=== TypeScript 기본 타입 학습 완료! ===");