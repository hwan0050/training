import { useState, useEffect } from 'react';

/**
 * LocalStorage와 동기화되는 상태를 관리하는 Custom Hook
 * @param key - LocalStorage에 저장될 키
 * @param initialValue - 초기값
 * @returns [storedValue, setValue] - 상태와 setter 함수
 */
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  // LocalStorage에서 값을 가져오는 함수
  const readValue = (): T => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  };

  // 상태 초기화
  const [storedValue, setStoredValue] = useState<T>(readValue);

  // LocalStorage에 값을 저장하는 함수
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // 함수형 업데이트 지원
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // 상태 업데이트
      setStoredValue(valueToStore);
      
      // LocalStorage에 저장
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  // 컴포넌트 마운트 시 LocalStorage에서 값 읽기
  useEffect(() => {
    setStoredValue(readValue());
  }, []);

  return [storedValue, setValue];
}

export default useLocalStorage;
