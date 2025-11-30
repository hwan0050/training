/**
 * 북마크 유효성 검사 유틸리티
 */

import { BookmarkCategory } from '../types/bookmark';

/**
 * URL 유효성 검사
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * URL에 프로토콜 추가 (없으면)
 */
export function normalizeUrl(url: string): string {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`;
  }
  return url;
}

/**
 * 카테고리 유효성 검사
 */
export function isValidCategory(category: string): category is BookmarkCategory {
  const validCategories: BookmarkCategory[] = [
    'Development',
    'Design',
    'Productivity',
    'Learning',
    'Entertainment',
    'Other'
  ];
  return validCategories.includes(category as BookmarkCategory);
}

/**
 * 태그 정규화 (공백 제거, 소문자 변환)
 */
export function normalizeTags(tags: string[]): string[] {
  return tags
    .map(tag => tag.trim().toLowerCase())
    .filter(tag => tag.length > 0);
}

/**
 * 북마크 제목 생성 (URL에서)
 */
export function generateTitleFromUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.replace('www.', '');
  } catch {
    return url;
  }
}

/**
 * 고유 ID 생성
 */
export function generateId(): string {
  return `bookmark_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
