/**
 * Type Guards (타입 가드)
 * 런타임에 타입을 체크하고 TypeScript에게 타입 정보를 제공하는 함수
 */

// ============================================
// 1. 기본 타입 가드
// ============================================

/**
 * 값이 문자열인지 체크
 */
export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

/**
 * 값이 숫자인지 체크
 */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value);
}

/**
 * 값이 불린인지 체크
 */
export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}

/**
 * 값이 null인지 체크
 */
export function isNull(value: unknown): value is null {
  return value === null;
}

/**
 * 값이 undefined인지 체크
 */
export function isUndefined(value: unknown): value is undefined {
  return value === undefined;
}

/**
 * 값이 null 또는 undefined인지 체크
 */
export function isNullish(value: unknown): value is null | undefined {
  return value === null || value === undefined;
}

// ============================================
// 2. 배열 타입 가드
// ============================================

/**
 * 값이 배열인지 체크
 */
export function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value);
}

/**
 * 값이 문자열 배열인지 체크
 */
export function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(item => typeof item === 'string');
}

/**
 * 값이 숫자 배열인지 체크
 */
export function isNumberArray(value: unknown): value is number[] {
  return Array.isArray(value) && value.every(item => typeof item === 'number');
}

// ============================================
// 3. 객체 타입 가드
// ============================================

/**
 * 값이 객체인지 체크 (null 제외)
 */
export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * 값이 빈 객체인지 체크
 */
export function isEmptyObject(value: unknown): boolean {
  return isObject(value) && Object.keys(value).length === 0;
}

/**
 * 객체가 특정 키를 가지고 있는지 체크
 */
export function hasProperty<K extends string>(
  obj: unknown,
  key: K
): obj is Record<K, unknown> {
  return isObject(obj) && key in obj;
}

// ============================================
// 4. 커스텀 타입 가드
// ============================================

// User 인터페이스 정의
export interface User {
  id: number;
  name: string;
  email: string;
  age?: number;
}

/**
 * User 타입 가드
 */
export function isUser(value: unknown): value is User {
  if (!isObject(value)) return false;
  
  return (
    hasProperty(value, 'id') && isNumber(value.id) &&
    hasProperty(value, 'name') && isString(value.name) &&
    hasProperty(value, 'email') && isString(value.email) &&
    (!hasProperty(value, 'age') || isNumber(value.age) || isUndefined(value.age))
  );
}

// Product 인터페이스 정의
export interface Product {
  id: string;
  name: string;
  price: number;
  inStock: boolean;
}

/**
 * Product 타입 가드
 */
export function isProduct(value: unknown): value is Product {
  if (!isObject(value)) return false;
  
  return (
    hasProperty(value, 'id') && isString(value.id) &&
    hasProperty(value, 'name') && isString(value.name) &&
    hasProperty(value, 'price') && isNumber(value.price) &&
    hasProperty(value, 'inStock') && isBoolean(value.inStock)
  );
}

// ============================================
// 5. Union 타입 가드
// ============================================

export type Result<T> = 
  | { success: true; data: T }
  | { success: false; error: string };

/**
 * Success Result 타입 가드
 */
export function isSuccess<T>(result: Result<T>): result is { success: true; data: T } {
  return result.success === true;
}

/**
 * Error Result 타입 가드
 */
export function isError<T>(result: Result<T>): result is { success: false; error: string } {
  return result.success === false;
}

// ============================================
// 6. 실전 사용 예제
// ============================================

/**
 * API 응답 처리 예제
 */
export function processApiResponse(response: unknown): string {
  if (isUser(response)) {
    return `User: ${response.name} (${response.email})`;
  }
  
  if (isProduct(response)) {
    return `Product: ${response.name} - $${response.price}`;
  }
  
  return 'Unknown response type';
}

/**
 * 배열 필터링 예제
 */
export function filterStrings(arr: unknown[]): string[] {
  return arr.filter(isString);
}

export function filterNumbers(arr: unknown[]): number[] {
  return arr.filter(isNumber);
}

/**
 * 안전한 JSON 파싱
 */
export function safeJsonParse(json: string): Result<unknown> {
  try {
    const data = JSON.parse(json);
    return { success: true, data };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

/**
 * Result 타입 처리 예제
 */
export function handleResult<T>(result: Result<T>): void {
  if (isSuccess(result)) {
    console.log('Success:', result.data);
  } else if (isError(result)) {
    console.error('Error:', result.error);
  }
}

// ============================================
// 7. 테스트 케이스
// ============================================

if (require.main === module) {
  console.log('=== Type Guards Test ===\n');

  // 1. 기본 타입 가드 테스트
  console.log('1. Basic Type Guards:');
  console.log('isString("hello"):', isString("hello")); // true
  console.log('isNumber(42):', isNumber(42)); // true
  console.log('isBoolean(true):', isBoolean(true)); // true
  console.log('isNull(null):', isNull(null)); // true
  console.log('isNullish(undefined):', isNullish(undefined)); // true
  console.log();

  // 2. 배열 타입 가드 테스트
  console.log('2. Array Type Guards:');
  console.log('isStringArray(["a", "b"]):', isStringArray(["a", "b"])); // true
  console.log('isStringArray(["a", 1]):', isStringArray(["a", 1])); // false
  console.log('isNumberArray([1, 2, 3]):', isNumberArray([1, 2, 3])); // true
  console.log();

  // 3. 객체 타입 가드 테스트
  console.log('3. Object Type Guards:');
  const obj = { name: "John", age: 30 };
  console.log('isObject({}):', isObject(obj)); // true
  console.log('hasProperty(obj, "name"):', hasProperty(obj, "name")); // true
  console.log('isEmptyObject({}):', isEmptyObject({})); // true
  console.log();

  // 4. 커스텀 타입 가드 테스트
  console.log('4. Custom Type Guards:');
  const user = { id: 1, name: "Alice", email: "alice@example.com" };
  const product = { id: "p1", name: "Laptop", price: 999, inStock: true };
  console.log('isUser(user):', isUser(user)); // true
  console.log('isProduct(product):', isProduct(product)); // true
  console.log('isUser(product):', isUser(product)); // false
  console.log();

  // 5. Result 타입 테스트
  console.log('5. Result Type:');
  const successResult: Result<number> = { success: true, data: 42 };
  const errorResult: Result<number> = { success: false, error: "Not found" };
  console.log('isSuccess(successResult):', isSuccess(successResult)); // true
  console.log('isError(errorResult):', isError(errorResult)); // true
  console.log();

  // 6. 실전 예제 테스트
  console.log('6. Practical Examples:');
  const mixedArray = ["hello", 42, true, "world", 3.14];
  console.log('filterStrings(mixedArray):', filterStrings(mixedArray));
  console.log('filterNumbers(mixedArray):', filterNumbers(mixedArray));
  console.log();

  // 7. JSON 파싱 테스트
  console.log('7. Safe JSON Parse:');
  const validJson = '{"name": "John"}';
  const invalidJson = '{invalid json}';
  console.log('safeJsonParse(validJson):', safeJsonParse(validJson));
  console.log('safeJsonParse(invalidJson):', safeJsonParse(invalidJson));
}
