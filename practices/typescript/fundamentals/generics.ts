// generics.ts - TypeScript 제네릭 학습

// 1. 기본 제네릭 함수
function identity<T>(arg: T): T {
    return arg;
}

const stringResult = identity<string>("Hello");
const numberResult = identity<number>(123);
const booleanResult = identity<boolean>(true);

console.log("문자열:", stringResult);
console.log("숫자:", numberResult);
console.log("불린:", booleanResult);

// 2. 제네릭 배열
function getFirstElement<T>(arr: T[]): T | undefined {
    return arr[0];
}

const firstNumber = getFirstElement([1, 2, 3]);
const firstString = getFirstElement(["a", "b", "c"]);

console.log("첫 번째 숫자:", firstNumber);
console.log("첫 번째 문자:", firstString);

// 3. 제네릭 인터페이스
interface Box<T> {
    value: T;
}

const stringBox: Box<string> = { value: "Hello" };
const numberBox: Box<number> = { value: 123 };

console.log("문자열 박스:", stringBox.value);
console.log("숫자 박스:", numberBox.value);

// 4. 제네릭 클래스
class DataStorage<T> {
    private data: T[] = [];

    addItem(item: T): void {
        this.data.push(item);
    }

    removeItem(item: T): void {
        this.data = this.data.filter(i => i !== item);
    }

    getItems(): T[] {
        return [...this.data];
    }
}

const textStorage = new DataStorage<string>();
textStorage.addItem("Apple");
textStorage.addItem("Banana");
textStorage.addItem("Orange");

console.log("텍스트 저장소:", textStorage.getItems());

const numberStorage = new DataStorage<number>();
numberStorage.addItem(1);
numberStorage.addItem(2);
numberStorage.addItem(3);

console.log("숫자 저장소:", numberStorage.getItems());

// 5. 제네릭 제약조건
interface Lengthwise {
    length: number;
}

function getLength<T extends Lengthwise>(arg: T): number {
    return arg.length;
}

console.log("문자열 길이:", getLength("Hello"));
console.log("배열 길이:", getLength([1, 2, 3, 4, 5]));
// console.log(getLength(123));  // 오류! number에는 length가 없음

// 6. keyof 사용
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

const person = {
    name: "Hwan",
    age: 25,
    email: "hwan@example.com"
};

console.log("이름:", getProperty(person, "name"));
console.log("나이:", getProperty(person, "age"));

// 7. 유틸리티 타입
interface User {
    id: number;
    name: string;
    email: string;
    password: string;
}

// Partial: 모든 속성을 optional로
type PartialUser = Partial<User>;

// Pick: 특정 속성만 선택
type UserPreview = Pick<User, "id" | "name">;

// Omit: 특정 속성 제외
type UserWithoutPassword = Omit<User, "password">;

const partialUser: PartialUser = { name: "Kim" };
const preview: UserPreview = { id: 1, name: "Lee" };
const safeUser: UserWithoutPassword = { id: 2, name: "Park", email: "park@example.com" };

console.log("부분 사용자:", partialUser);
console.log("사용자 미리보기:", preview);
console.log("안전한 사용자:", safeUser);

console.log("\n=== TypeScript 제네릭 학습 완료! ===");