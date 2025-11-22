/**
 * 북마크 관리 앱 타입 정의
 */

// 북마크 카테고리
export type BookmarkCategory = 
  | 'Development'
  | 'Design'
  | 'Productivity'
  | 'Learning'
  | 'Entertainment'
  | 'Other';

// 북마크 인터페이스
export interface Bookmark {
  id: string;
  url: string;
  title: string;
  description?: string;
  category: BookmarkCategory;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  favorite: boolean;
}

// 북마크 생성 요청 (id, 날짜 제외)
export type CreateBookmarkRequest = Omit<Bookmark, 'id' | 'createdAt' | 'updatedAt'>;

// 북마크 업데이트 요청 (일부 필드만)
export type UpdateBookmarkRequest = Partial<Omit<Bookmark, 'id' | 'createdAt'>>;

// 필터 타입
export type FilterType = 'all' | 'favorites' | BookmarkCategory;

// 정렬 타입
export type SortType = 'newest' | 'oldest' | 'title';

// 통계 인터페이스
export interface BookmarkStats {
  total: number;
  byCategory: Record<BookmarkCategory, number>;
  favorites: number;
}
