import { FC } from 'react';
import { Bookmark } from '../types/bookmark';

interface BookmarkItemProps {
  bookmark: Bookmark;
  onEdit: (bookmark: Bookmark) => void;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

const BookmarkItem: FC<BookmarkItemProps> = ({
  bookmark,
  onEdit,
  onDelete,
  onToggleFavorite
}) => {
  const handleClick = () => {
    window.open(bookmark.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button
          onClick={() => onToggleFavorite(bookmark.id)}
          style={styles.favoriteButton}
          title={bookmark.favorite ? 'Unfavorite' : 'Favorite'}
        >
          {bookmark.favorite ? '⭐' : '☆'}
        </button>
        <span style={styles.category}>{bookmark.category}</span>
      </div>

      <div style={styles.content} onClick={handleClick}>
        <h3 style={styles.title}>{bookmark.title}</h3>
        <p style={styles.url}>{bookmark.url}</p>
        {bookmark.description && (
          <p style={styles.description}>{bookmark.description}</p>
        )}
      </div>

      {bookmark.tags.length > 0 && (
        <div style={styles.tags}>
          {bookmark.tags.map((tag, index) => (
            <span key={index} style={styles.tag}>
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div style={styles.footer}>
        <span style={styles.date}>
          {new Date(bookmark.createdAt).toLocaleDateString('ko-KR')}
        </span>
        <div style={styles.actions}>
          <button
            onClick={() => onEdit(bookmark)}
            style={styles.editButton}
          >
            ✏️ 수정
          </button>
          <button
            onClick={() => onDelete(bookmark.id)}
            style={styles.deleteButton}
          >
            🗑️ 삭제
          </button>
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    backgroundColor: '#fff',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '12px',
    transition: 'all 0.3s',
    cursor: 'pointer',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
  },
  favoriteButton: {
    fontSize: '20px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
  },
  category: {
    fontSize: '12px',
    padding: '4px 12px',
    backgroundColor: '#e3f2fd',
    color: '#1976d2',
    borderRadius: '12px',
    fontWeight: 'bold',
  },
  content: {
    marginBottom: '12px',
  },
  title: {
    margin: '0 0 8px 0',
    fontSize: '18px',
    color: '#333',
    fontWeight: 'bold',
  },
  url: {
    margin: '0 0 8px 0',
    fontSize: '14px',
    color: '#1976d2',
    wordBreak: 'break-all',
  },
  description: {
    margin: 0,
    fontSize: '14px',
    color: '#666',
    lineHeight: '1.5',
  },
  tags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginBottom: '12px',
  },
  tag: {
    fontSize: '12px',
    padding: '2px 8px',
    backgroundColor: '#f5f5f5',
    color: '#666',
    borderRadius: '4px',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '12px',
    borderTop: '1px solid #f0f0f0',
  },
  date: {
    fontSize: '12px',
    color: '#999',
  },
  actions: {
    display: 'flex',
    gap: '8px',
  },
  editButton: {
    padding: '6px 12px',
    fontSize: '14px',
    backgroundColor: '#FFC107',
    color: '#333',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  deleteButton: {
    padding: '6px 12px',
    fontSize: '14px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default BookmarkItem;
