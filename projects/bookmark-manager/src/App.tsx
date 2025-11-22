import { useState } from 'react';
import {
  Bookmark,
  CreateBookmarkRequest,
  FilterType,
  SortType,
  BookmarkStats
} from './types/bookmark';
import useLocalStorage from './hooks/useLocalStorage';
import { generateId } from './utils/validators';
import BookmarkItem from './components/BookmarkItem';
import BookmarkForm from './components/BookmarkForm';
import FilterBar from './components/FilterBar';
import './App.css';

function App() {
  // 상태 관리
  const [bookmarks, setBookmarks] = useLocalStorage<Bookmark[]>('bookmarks', []);
  const [filter, setFilter] = useState<FilterType>('all');
  const [sort, setSort] = useState<SortType>('newest');
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBookmark, setEditingBookmark] = useState<Bookmark | null>(null);

  // 북마크 추가
  const handleAddBookmark = (data: CreateBookmarkRequest) => {
    const newBookmark: Bookmark = {
      ...data,
      id: generateId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setBookmarks([newBookmark, ...bookmarks]);
    setIsFormOpen(false);
  };

  // 북마크 수정
  const handleUpdateBookmark = (data: CreateBookmarkRequest) => {
    if (!editingBookmark) return;

    const updatedBookmarks = bookmarks.map((bookmark) =>
      bookmark.id === editingBookmark.id
        ? {
            ...bookmark,
            ...data,
            updatedAt: new Date(),
          }
        : bookmark
    );

    setBookmarks(updatedBookmarks);
    setEditingBookmark(null);
    setIsFormOpen(false);
  };

  // 북마크 삭제
  const handleDeleteBookmark = (id: string) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      setBookmarks(bookmarks.filter((bookmark) => bookmark.id !== id));
    }
  };

  // 즐겨찾기 토글
  const handleToggleFavorite = (id: string) => {
    const updatedBookmarks = bookmarks.map((bookmark) =>
      bookmark.id === id
        ? { ...bookmark, favorite: !bookmark.favorite, updatedAt: new Date() }
        : bookmark
    );
    setBookmarks(updatedBookmarks);
  };

  // 수정 시작
  const handleEditStart = (bookmark: Bookmark) => {
    setEditingBookmark(bookmark);
    setIsFormOpen(true);
  };

  // 폼 닫기
  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingBookmark(null);
  };

  // 필터링된 북마크
  const filteredBookmarks = bookmarks.filter((bookmark) => {
    // 카테고리 필터
    if (filter === 'favorites') {
      if (!bookmark.favorite) return false;
    } else if (filter !== 'all') {
      if (bookmark.category !== filter) return false;
    }

    // 검색
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return (
        bookmark.title.toLowerCase().includes(term) ||
        bookmark.url.toLowerCase().includes(term) ||
        bookmark.description?.toLowerCase().includes(term) ||
        bookmark.tags.some((tag) => tag.toLowerCase().includes(term))
      );
    }

    return true;
  });

  // 정렬된 북마크
  const sortedBookmarks = [...filteredBookmarks].sort((a, b) => {
    if (sort === 'newest') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else if (sort === 'oldest') {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    } else {
      return a.title.localeCompare(b.title);
    }
  });

  // 통계 계산
  const stats: BookmarkStats = {
    total: bookmarks.length,
    byCategory: {
      Development: bookmarks.filter((b) => b.category === 'Development').length,
      Design: bookmarks.filter((b) => b.category === 'Design').length,
      Productivity: bookmarks.filter((b) => b.category === 'Productivity').length,
      Learning: bookmarks.filter((b) => b.category === 'Learning').length,
      Entertainment: bookmarks.filter((b) => b.category === 'Entertainment').length,
      Other: bookmarks.filter((b) => b.category === 'Other').length,
    },
    favorites: bookmarks.filter((b) => b.favorite).length,
  };

  return (
    <div className="App" style={styles.app}>
      {/* 헤더 */}
      <header style={styles.header}>
        <h1 style={styles.title}>🔖 북마크 관리</h1>
        <button onClick={() => setIsFormOpen(true)} style={styles.addButton}>
          ➕ 새 북마크 추가
        </button>
      </header>

      {/* 통계 */}
      <div style={styles.stats}>
        <div style={styles.statItem}>
          <span style={styles.statLabel}>전체</span>
          <span style={styles.statValue}>{stats.total}</span>
        </div>
        <div style={styles.statItem}>
          <span style={styles.statLabel}>즐겨찾기</span>
          <span style={styles.statValue}>{stats.favorites}</span>
        </div>
        <div style={styles.statItem}>
          <span style={styles.statLabel}>개발</span>
          <span style={styles.statValue}>{stats.byCategory.Development}</span>
        </div>
        <div style={styles.statItem}>
          <span style={styles.statLabel}>학습</span>
          <span style={styles.statValue}>{stats.byCategory.Learning}</span>
        </div>
      </div>

      {/* 필터바 */}
      <FilterBar
        filter={filter}
        onFilterChange={setFilter}
        sort={sort}
        onSortChange={setSort}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      {/* 북마크 리스트 */}
      <div style={styles.content}>
        {sortedBookmarks.length === 0 ? (
          <div style={styles.empty}>
            <p style={styles.emptyIcon}>📭</p>
            <p style={styles.emptyText}>
              {searchTerm
                ? '검색 결과가 없습니다.'
                : filter === 'all'
                ? '북마크가 없습니다. 새로운 북마크를 추가해보세요!'
                : `${filter === 'favorites' ? '즐겨찾기' : filter} 북마크가 없습니다.`}
            </p>
          </div>
        ) : (
          <div>
            <p style={styles.resultCount}>
              {sortedBookmarks.length}개의 북마크
            </p>
            {sortedBookmarks.map((bookmark) => (
              <BookmarkItem
                key={bookmark.id}
                bookmark={bookmark}
                onEdit={handleEditStart}
                onDelete={handleDeleteBookmark}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        )}
      </div>

      {/* 북마크 폼 모달 */}
      {isFormOpen && (
        <BookmarkForm
          bookmark={editingBookmark || undefined}
          onSave={editingBookmark ? handleUpdateBookmark : handleAddBookmark}
          onCancel={handleCloseForm}
        />
      )}

      {/* 푸터 */}
      <footer style={styles.footer}>
        <p>
          Made with ❤️ by Hwan Lee | Git Factory 통합 프로젝트
        </p>
      </footer>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  app: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#2196F3',
    color: 'white',
    padding: '24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  title: {
    margin: 0,
    fontSize: '28px',
    fontWeight: 'bold',
  },
  addButton: {
    padding: '12px 24px',
    fontSize: '16px',
    backgroundColor: 'white',
    color: '#2196F3',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  stats: {
    display: 'flex',
    gap: '16px',
    padding: '24px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  statItem: {
    flex: 1,
    backgroundColor: 'white',
    padding: '16px',
    borderRadius: '8px',
    textAlign: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  },
  statLabel: {
    display: 'block',
    fontSize: '14px',
    color: '#666',
    marginBottom: '8px',
  },
  statValue: {
    display: 'block',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#2196F3',
  },
  content: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 24px 24px',
  },
  resultCount: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '16px',
  },
  empty: {
    textAlign: 'center',
    padding: '80px 20px',
  },
  emptyIcon: {
    fontSize: '64px',
    margin: '0 0 16px 0',
  },
  emptyText: {
    fontSize: '18px',
    color: '#999',
    margin: 0,
  },
  footer: {
    backgroundColor: '#333',
    color: 'white',
    textAlign: 'center',
    padding: '20px',
    marginTop: '40px',
  },
};

export default App;
