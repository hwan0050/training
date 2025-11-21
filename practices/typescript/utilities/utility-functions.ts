/**
 * Practical Utility Functions
 * 실전에서 자주 사용하는 유틸리티 함수 모음
 */

// ============================================
// 1. 배열 유틸리티
// ============================================

/**
 * 배열에서 중복 제거
 */
export function unique<T>(array: T[]): T[] {
  return [...new Set(array)];
}

/**
 * 배열을 특정 크기로 분할 (chunk)
 */
export function chunk<T>(array: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

/**
 * 배열 섞기 (shuffle)
 */
export function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * 배열에서 랜덤 요소 선택
 */
export function sample<T>(array: T[]): T | undefined {
  if (array.length === 0) return undefined;
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * 배열에서 여러 랜덤 요소 선택
 */
export function sampleSize<T>(array: T[], n: number): T[] {
  const shuffled = shuffle(array);
  return shuffled.slice(0, Math.min(n, array.length));
}

/**
 * 배열의 합계
 */
export function sum(numbers: number[]): number {
  return numbers.reduce((acc, num) => acc + num, 0);
}

/**
 * 배열의 평균
 */
export function average(numbers: number[]): number {
  if (numbers.length === 0) return 0;
  return sum(numbers) / numbers.length;
}

/**
 * 배열의 최댓값
 */
export function max(numbers: number[]): number | undefined {
  if (numbers.length === 0) return undefined;
  return Math.max(...numbers);
}

/**
 * 배열의 최솟값
 */
export function min(numbers: number[]): number | undefined {
  if (numbers.length === 0) return undefined;
  return Math.min(...numbers);
}

/**
 * 배열을 그룹화
 */
export function groupBy<T>(
  array: T[],
  keyFn: (item: T) => string | number
): Record<string, T[]> {
  return array.reduce((result, item) => {
    const key = String(keyFn(item));
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(item);
    return result;
  }, {} as Record<string, T[]>);
}

/**
 * 배열의 마지막 요소
 */
export function last<T>(array: T[]): T | undefined {
  return array[array.length - 1];
}

/**
 * 배열의 첫 요소
 */
export function first<T>(array: T[]): T | undefined {
  return array[0];
}

// ============================================
// 2. 객체 유틸리티
// ============================================

/**
 * 깊은 복사 (Deep Clone)
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as any;
  }

  if (obj instanceof Array) {
    return obj.map(item => deepClone(item)) as any;
  }

  const cloned = {} as T;
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloned[key] = deepClone(obj[key]);
    }
  }
  return cloned;
}

/**
 * 깊은 병합 (Deep Merge)
 */
export function deepMerge<T extends object>(target: T, source: Partial<T>): T {
  const result = { ...target };

  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      const sourceValue = source[key];
      const targetValue = result[key];

      if (
        typeof sourceValue === 'object' &&
        sourceValue !== null &&
        !Array.isArray(sourceValue) &&
        typeof targetValue === 'object' &&
        targetValue !== null &&
        !Array.isArray(targetValue)
      ) {
        result[key] = deepMerge(targetValue as any, sourceValue as any);
      } else {
        result[key] = sourceValue as any;
      }
    }
  }

  return result;
}

/**
 * 객체의 특정 키만 선택
 */
export function pick<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  const result = {} as Pick<T, K>;
  keys.forEach(key => {
    if (key in obj) {
      result[key] = obj[key];
    }
  });
  return result;
}

/**
 * 객체의 특정 키 제외
 */
export function omit<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  const result = { ...obj };
  keys.forEach(key => {
    delete result[key];
  });
  return result as Omit<T, K>;
}

/**
 * 객체가 비어있는지 확인
 */
export function isEmpty(obj: object): boolean {
  return Object.keys(obj).length === 0;
}

/**
 * 두 객체가 같은지 비교 (얕은 비교)
 */
export function isEqual<T extends object>(obj1: T, obj2: T): boolean {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  return keys1.every(key => obj1[key as keyof T] === obj2[key as keyof T]);
}

// ============================================
// 3. 문자열 유틸리티
// ============================================

/**
 * 첫 글자 대문자
 */
export function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * camelCase로 변환
 */
export function toCamelCase(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());
}

/**
 * kebab-case로 변환
 */
export function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

/**
 * snake_case로 변환
 */
export function toSnakeCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[\s-]+/g, '_')
    .toLowerCase();
}

/**
 * 문자열 자르기 (ellipsis 추가)
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + '...';
}

/**
 * 랜덤 문자열 생성
 */
export function randomString(length: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * 문자열에서 숫자만 추출
 */
export function extractNumbers(str: string): number[] {
  const matches = str.match(/\d+/g);
  return matches ? matches.map(Number) : [];
}

// ============================================
// 4. 날짜 유틸리티
// ============================================

/**
 * 날짜 포맷팅 (YYYY-MM-DD)
 */
export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * 날짜 포맷팅 (YYYY-MM-DD HH:mm:ss)
 */
export function formatDateTime(date: Date): string {
  const dateStr = formatDate(date);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${dateStr} ${hours}:${minutes}:${seconds}`;
}

/**
 * 상대 시간 표시 (예: "2시간 전")
 */
export function timeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  
  const intervals = {
    년: 31536000,
    개월: 2592000,
    주: 604800,
    일: 86400,
    시간: 3600,
    분: 60
  };

  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit);
    if (interval >= 1) {
      return `${interval}${unit} 전`;
    }
  }

  return '방금 전';
}

/**
 * 날짜 차이 (일 단위)
 */
export function daysBetween(date1: Date, date2: Date): number {
  const oneDay = 24 * 60 * 60 * 1000;
  return Math.round(Math.abs((date1.getTime() - date2.getTime()) / oneDay));
}

/**
 * 날짜에 일수 추가
 */
export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * 오늘인지 확인
 */
export function isToday(date: Date): boolean {
  const today = new Date();
  return formatDate(date) === formatDate(today);
}

// ============================================
// 5. 숫자 유틸리티
// ============================================

/**
 * 숫자를 천 단위 구분 기호로 포맷
 */
export function formatNumber(num: number): string {
  return num.toLocaleString('ko-KR');
}

/**
 * 통화 포맷 (원화)
 */
export function formatCurrency(amount: number): string {
  return `₩${formatNumber(amount)}`;
}

/**
 * 퍼센트 포맷
 */
export function formatPercent(value: number, decimals: number = 0): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * 특정 범위 내로 값 제한 (clamp)
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * 랜덤 정수 생성
 */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ============================================
// 6. 디바운스 & 쓰로틀
// ============================================

/**
 * 디바운스 함수
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null;

  return function(...args: Parameters<T>) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

/**
 * 쓰로틀 함수
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false;

  return function(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// ============================================
// 7. 테스트 예제
// ============================================

if (require.main === module) {
  console.log('=== Utility Functions Test ===\n');

  // 배열 유틸리티
  console.log('1. Array Utilities:');
  console.log('unique([1,2,2,3,3,3]):', unique([1, 2, 2, 3, 3, 3]));
  console.log('chunk([1,2,3,4,5], 2):', chunk([1, 2, 3, 4, 5], 2));
  console.log('sum([1,2,3,4,5]):', sum([1, 2, 3, 4, 5]));
  console.log('average([1,2,3,4,5]):', average([1, 2, 3, 4, 5]));
  console.log();

  // 문자열 유틸리티
  console.log('2. String Utilities:');
  console.log('capitalize("hello"):', capitalize("hello"));
  console.log('toCamelCase("hello world"):', toCamelCase("hello world"));
  console.log('toKebabCase("helloWorld"):', toKebabCase("helloWorld"));
  console.log('truncate("Hello World", 5):', truncate("Hello World", 5));
  console.log();

  // 날짜 유틸리티
  console.log('3. Date Utilities:');
  const now = new Date();
  console.log('formatDate(now):', formatDate(now));
  console.log('formatDateTime(now):', formatDateTime(now));
  const yesterday = addDays(now, -1);
  console.log('timeAgo(yesterday):', timeAgo(yesterday));
  console.log();

  // 숫자 유틸리티
  console.log('4. Number Utilities:');
  console.log('formatNumber(1234567):', formatNumber(1234567));
  console.log('formatCurrency(50000):', formatCurrency(50000));
  console.log('clamp(15, 0, 10):', clamp(15, 0, 10));
  console.log('randomInt(1, 10):', randomInt(1, 10));
}
