/**
 * Utility Types (유틸리티 타입)
 * TypeScript가 제공하는 내장 유틸리티 타입들의 실전 활용
 */

// ============================================
// 1. Partial<T> - 모든 속성을 optional로
// ============================================

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  address: string;
}

/**
 * 사용자 정보 업데이트 (일부 필드만)
 */
function updateUser(id: number, updates: Partial<User>): User {
  const currentUser: User = {
    id,
    name: "John Doe",
    email: "john@example.com",
    age: 30,
    address: "Seoul"
  };
  
  return { ...currentUser, ...updates };
}

// 사용 예제
const updatedUser = updateUser(1, { name: "Jane Doe", age: 25 });
console.log('Partial Example:', updatedUser);

// ============================================
// 2. Required<T> - 모든 속성을 required로
// ============================================

interface Config {
  apiUrl?: string;
  timeout?: number;
  retries?: number;
}

/**
 * 기본 설정과 사용자 설정 병합
 */
function mergeConfig(userConfig: Config): Required<Config> {
  const defaultConfig: Required<Config> = {
    apiUrl: "https://api.example.com",
    timeout: 5000,
    retries: 3
  };
  
  return { ...defaultConfig, ...userConfig };
}

// 사용 예제
const finalConfig = mergeConfig({ timeout: 10000 });
console.log('Required Example:', finalConfig);

// ============================================
// 3. Readonly<T> - 모든 속성을 읽기 전용으로
// ============================================

interface Point {
  x: number;
  y: number;
}

/**
 * 불변 포인트 생성
 */
function createImmutablePoint(x: number, y: number): Readonly<Point> {
  return Object.freeze({ x, y });
}

const point = createImmutablePoint(10, 20);
console.log('Readonly Example:', point);
// point.x = 30; // 에러! 읽기 전용

// ============================================
// 4. Pick<T, K> - 특정 속성만 선택
// ============================================

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
}

/**
 * 제품 요약 정보만 반환 (id, name, price만)
 */
type ProductSummary = Pick<Product, 'id' | 'name' | 'price'>;

function getProductSummary(product: Product): ProductSummary {
  return {
    id: product.id,
    name: product.name,
    price: product.price
  };
}

// 사용 예제
const product: Product = {
  id: "p1",
  name: "Laptop",
  description: "High-performance laptop",
  price: 999,
  stock: 10,
  category: "Electronics"
};

const summary = getProductSummary(product);
console.log('Pick Example:', summary);

// ============================================
// 5. Omit<T, K> - 특정 속성 제외
// ============================================

/**
 * 민감한 정보를 제외한 사용자 정보
 */
type PublicUser = Omit<User, 'id' | 'address'>;

function getUserPublicInfo(user: User): PublicUser {
  const { id, address, ...publicInfo } = user;
  return publicInfo;
}

// 사용 예제
const privateUser: User = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
  age: 28,
  address: "123 Secret St"
};

const publicUser = getUserPublicInfo(privateUser);
console.log('Omit Example:', publicUser);

// ============================================
// 6. Record<K, T> - 키-값 쌍의 타입 정의
// ============================================

/**
 * 상태별 색상 매핑
 */
type Status = 'pending' | 'approved' | 'rejected';
type StatusColors = Record<Status, string>;

const statusColors: StatusColors = {
  pending: 'yellow',
  approved: 'green',
  rejected: 'red'
};

console.log('Record Example:', statusColors);

/**
 * 사용자 역할별 권한
 */
type Role = 'admin' | 'user' | 'guest';
type Permissions = Record<Role, string[]>;

const rolePermissions: Permissions = {
  admin: ['read', 'write', 'delete'],
  user: ['read', 'write'],
  guest: ['read']
};

console.log('Record Example 2:', rolePermissions);

// ============================================
// 7. Exclude<T, U> - Union에서 특정 타입 제외
// ============================================

type AllStatus = 'pending' | 'approved' | 'rejected' | 'cancelled';
type ActiveStatus = Exclude<AllStatus, 'cancelled'>;

function processActiveStatus(status: ActiveStatus): void {
  console.log(`Processing status: ${status}`);
}

// processActiveStatus('cancelled'); // 에러!
processActiveStatus('pending'); // OK

// ============================================
// 8. Extract<T, U> - Union에서 특정 타입만 추출
// ============================================

type AllEvents = 'click' | 'scroll' | 'mousemove' | 'keydown';
type MouseEvents = Extract<AllEvents, 'click' | 'mousemove'>;

function handleMouseEvent(event: MouseEvents): void {
  console.log(`Handling mouse event: ${event}`);
}

handleMouseEvent('click'); // OK
// handleMouseEvent('keydown'); // 에러!

// ============================================
// 9. NonNullable<T> - null과 undefined 제거
// ============================================

type NullableString = string | null | undefined;
type NonNullableString = NonNullable<NullableString>; // string

function processString(str: NonNullableString): string {
  return str.toUpperCase();
}

// processString(null); // 에러!
console.log('NonNullable Example:', processString("hello"));

// ============================================
// 10. ReturnType<T> - 함수의 리턴 타입 추출
// ============================================

function createUser(name: string, age: number) {
  return {
    id: Math.random(),
    name,
    age,
    createdAt: new Date()
  };
}

type CreatedUser = ReturnType<typeof createUser>;

function logUser(user: CreatedUser): void {
  console.log(`User: ${user.name}, Age: ${user.age}`);
}

// ============================================
// 11. Parameters<T> - 함수의 파라미터 타입 추출
// ============================================

function sendEmail(to: string, subject: string, body: string) {
  console.log(`Sending email to ${to}: ${subject}`);
}

type EmailParams = Parameters<typeof sendEmail>;
// [string, string, string]

function scheduleSendEmail(...params: EmailParams): void {
  const [to, subject, body] = params;
  console.log(`Scheduling email to ${to}`);
}

// ============================================
// 12. 실전 복합 활용 예제
// ============================================

/**
 * API 응답 타입
 */
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
  timestamp: Date;
}

/**
 * API 요청 옵션
 */
interface RequestOptions {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: unknown;
  timeout?: number;
}

/**
 * 안전한 API 호출 함수
 */
async function fetchApi<T>(
  url: string,
  options: Partial<RequestOptions> = {}
): Promise<ApiResponse<T>> {
  const defaultOptions: Required<RequestOptions> = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    body: undefined,
    timeout: 5000
  };

  const finalOptions = { ...defaultOptions, ...options };
  
  // 실제 API 호출은 생략
  return {
    data: {} as T,
    status: 200,
    message: 'Success',
    timestamp: new Date()
  };
}

/**
 * 캐시 타입
 */
type Cache<T> = Record<string, T>;

/**
 * 캐시 매니저
 */
class CacheManager<T> {
  private cache: Cache<T> = {};

  set(key: string, value: T): void {
    this.cache[key] = value;
  }

  get(key: string): T | undefined {
    return this.cache[key];
  }

  has(key: string): boolean {
    return key in this.cache;
  }

  delete(key: string): void {
    delete this.cache[key];
  }

  clear(): void {
    this.cache = {};
  }

  keys(): string[] {
    return Object.keys(this.cache);
  }
}

// ============================================
// 13. 테스트 및 사용 예제
// ============================================

console.log('\n=== Utility Types Examples ===\n');

// Partial 사용
console.log('1. Partial - Update user with partial fields');
const user1 = updateUser(1, { name: "Updated Name" });
console.log(user1);

// Pick 사용
console.log('\n2. Pick - Product summary');
console.log(summary);

// Omit 사용
console.log('\n3. Omit - Public user info');
console.log(publicUser);

// Record 사용
console.log('\n4. Record - Status colors');
console.log(statusColors);

// Cache Manager 사용
console.log('\n5. Cache Manager');
const cache = new CacheManager<User>();
cache.set('user1', privateUser);
console.log('Cached user:', cache.get('user1'));

// API 호출 예제
console.log('\n6. API Call with Partial Options');
fetchApi<User>('/api/users/1', { method: 'GET' })
  .then(response => console.log('API Response:', response));

export {
  updateUser,
  mergeConfig,
  createImmutablePoint,
  getProductSummary,
  getUserPublicInfo,
  statusColors,
  rolePermissions,
  CacheManager
};
