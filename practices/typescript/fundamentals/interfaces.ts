// interfaces.ts - TypeScript 인터페이스 학습

// 1. 기본 인터페이스
interface User {
    id: number;
    name: string;
    email: string;
    age?: number;  // Optional 속성
}

const user1: User = {
    id: 1,
    name: "Hwan",
    email: "hwan@example.com"
};

const user2: User = {
    id: 2,
    name: "Kim",
    email: "kim@example.com",
    age: 30
};

console.log("사용자 1:", user1);
console.log("사용자 2:", user2);

// 2. 함수 타입 인터페이스
interface Calculate {
    (a: number, b: number): number;
}

const add: Calculate = (x, y) => x + y;
const subtract: Calculate = (x, y) => x - y;

console.log("덧셈:", add(10, 5));
console.log("뺄셈:", subtract(10, 5));

// 3. 인터페이스 확장
interface Person {
    name: string;
    age: number;
}

interface Employee extends Person {
    employeeId: number;
    department: string;
}

const employee: Employee = {
    name: "Hwan",
    age: 25,
    employeeId: 12345,
    department: "Development"
};

console.log("직원 정보:", employee);

// 4. Readonly 속성
interface Config {
    readonly apiKey: string;
    readonly baseUrl: string;
}

const config: Config = {
    apiKey: "abc123",
    baseUrl: "https://api.example.com"
};

console.log("설정:", config);
// config.apiKey = "new-key";  // 오류! readonly는 수정 불가

// 5. 인덱스 시그니처
interface StringArray {
    [index: number]: string;
}

const fruits: StringArray = ["사과", "바나나", "오렌지"];
console.log("첫 번째 과일:", fruits[0]);

interface StringDictionary {
    [key: string]: string;
}

const dictionary: StringDictionary = {
    hello: "안녕하세요",
    bye: "안녕히가세요"
};

console.log("인사:", dictionary["hello"]);

// 6. 클래스 인터페이스 구현
interface Animal {
    name: string;
    makeSound(): void;
}

class Dog implements Animal {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    makeSound(): void {
        console.log(`${this.name}: 멍멍!`);
    }
}

const myDog = new Dog("바둑이");
myDog.makeSound();

console.log("\n=== TypeScript 인터페이스 학습 완료! ===");