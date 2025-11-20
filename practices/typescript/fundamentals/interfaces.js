// interfaces.ts - TypeScript 인터페이스 학습
var user1 = {
    id: 1,
    name: "Hwan",
    email: "hwan@example.com"
};
var user2 = {
    id: 2,
    name: "Kim",
    email: "kim@example.com",
    age: 30
};
console.log("사용자 1:", user1);
console.log("사용자 2:", user2);
var add = function (x, y) { return x + y; };
var subtract = function (x, y) { return x - y; };
console.log("덧셈:", add(10, 5));
console.log("뺄셈:", subtract(10, 5));
var employee = {
    name: "Hwan",
    age: 25,
    employeeId: 12345,
    department: "Development"
};
console.log("직원 정보:", employee);
var config = {
    apiKey: "abc123",
    baseUrl: "https://api.example.com"
};
console.log("설정:", config);
var fruits = ["사과", "바나나", "오렌지"];
console.log("첫 번째 과일:", fruits[0]);
var dictionary = {
    hello: "안녕하세요",
    bye: "안녕히가세요"
};
console.log("인사:", dictionary["hello"]);
var Dog = /** @class */ (function () {
    function Dog(name) {
        this.name = name;
    }
    Dog.prototype.makeSound = function () {
        console.log("".concat(this.name, ": \uBA4D\uBA4D!"));
    };
    return Dog;
}());
var myDog = new Dog("바둑이");
myDog.makeSound();
console.log("\n=== TypeScript 인터페이스 학습 완료! ===");
