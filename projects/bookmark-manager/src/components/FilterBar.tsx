import { FC } from 'react';
import { BookmarkCategory, FilterType, SortType } from '../types/bookmark';

interface FilterBarProps {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  sort: SortType;
  onSortChange: (sort: SortType) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const FilterBar: FC<FilterBarProps> = ({
  filter,
  onFilterChange,
  sort,
  onSortChange,
  searchTerm,
  onSearchChange
}) => {
  const categories: Array<{ value: FilterType; label: string }> = [
    { value: 'all', label: '전체' },
    { value: 'favorites', label: '⭐ 즐겨찾기' },
    { value: 'Development', label: '개발' },
    { value: 'Design', label: '디자인' },
    { value: 'Productivity', label: '생산성' },
    { value: 'Learning', label: '학습' },
    { value: 'Entertainment', label: '엔터테인먼트' },
    { value: 'Other', label: '기타' },
  ];

  const sortOptions: Array<{ value: SortType; label: string }> = [
    { value: 'newest', label: '최신순' },
    { value: 'oldest', label: '오래된순' },
    { value: 'title', label: '제목순' },
  ];

  return (
    <div style={styles.container}>
      {/* 검색바 */}
      <div style={styles.searchContainer}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="🔍 북마크 검색..."
          style={styles.searchInput}
        />
      </div>

      {/* 필터 버튼들 */}
      <div style={styles.filterContainer}>
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => onFilterChange(cat.value)}
            style={{
              ...styles.filterButton,
              ...(filter === cat.value ? styles.filterButtonActive : {}),
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* 정렬 */}
      <div style={styles.sortContainer}>
        <label style={styles.sortLabel}>정렬:</label>
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value as SortType)}
          style={styles.sortSelect}
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    backgroundColor: '#f8f9fa',
    padding: '20px',
    borderRadius: '12px',
    marginBottom: '24px',
  },
  searchContainer: {
    marginBottom: '16px',
  },
  searchInput: {
    width: '100%',
    padding: '12px 16px',
    fontSize: '16px',
    border: '2px solid #ddd',
    borderRadius: '8px',
    outline: 'none',
    boxSizing: 'border-box',
  },
  filterContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginBottom: '16px',
  },
  filterButton: {
    padding: '8px 16px',
    fontSize: '14px',
    backgroundColor: 'white',
    color: '#666',
    border: '2px solid #e0e0e0',
    borderRadius: '20px',
    cursor: 'pointer',
    transition: 'all 0.3s',
    fontWeight: '500',
  },
  filterButtonActive: {
    backgroundColor: '#2196F3',
    color: 'white',
    borderColor: '#2196F3',
  },
  sortContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  sortLabel: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#666',
  },
  sortSelect: {
    padding: '8px 12px',
    fontSize: '14px',
    border: '2px solid #ddd',
    borderRadius: '8px',
    outline: 'none',
    backgroundColor: 'white',
    cursor: 'pointer',
  },
};

export default FilterBar;
