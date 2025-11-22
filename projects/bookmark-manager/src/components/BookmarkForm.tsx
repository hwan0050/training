import { FC, useState, FormEvent, useEffect } from 'react';
import { Bookmark, BookmarkCategory, CreateBookmarkRequest } from '../types/bookmark';
import { isValidUrl, normalizeUrl, normalizeTags } from '../utils/validators';

interface BookmarkFormProps {
  bookmark?: Bookmark; // 수정 시 전달
  onSave: (bookmark: CreateBookmarkRequest) => void;
  onCancel: () => void;
}

const BookmarkForm: FC<BookmarkFormProps> = ({ bookmark, onSave, onCancel }) => {
  const [url, setUrl] = useState(bookmark?.url || '');
  const [title, setTitle] = useState(bookmark?.title || '');
  const [description, setDescription] = useState(bookmark?.description || '');
  const [category, setCategory] = useState<BookmarkCategory>(bookmark?.category || 'Development');
  const [tags, setTags] = useState(bookmark?.tags.join(', ') || '');
  const [favorite, setFavorite] = useState(bookmark?.favorite || false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const categories: BookmarkCategory[] = [
    'Development',
    'Design',
    'Productivity',
    'Learning',
    'Entertainment',
    'Other'
  ];

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!url.trim()) {
      newErrors.url = 'URL을 입력해주세요.';
    } else if (!isValidUrl(normalizeUrl(url))) {
      newErrors.url = '올바른 URL을 입력해주세요.';
    }

    if (!title.trim()) {
      newErrors.title = '제목을 입력해주세요.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const bookmarkData: CreateBookmarkRequest = {
      url: normalizeUrl(url.trim()),
      title: title.trim(),
      description: description.trim() || undefined,
      category,
      tags: normalizeTags(tags.split(',').map(t => t.trim())),
      favorite
    };

    onSave(bookmarkData);
  };

  return (
    <div style={styles.overlay} onClick={onCancel}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 style={styles.title}>
          {bookmark ? '북마크 수정' : '새 북마크 추가'}
        </h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          {/* URL */}
          <div style={styles.field}>
            <label style={styles.label}>
              URL <span style={styles.required}>*</span>
            </label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              style={errors.url ? styles.inputError : styles.input}
            />
            {errors.url && <span style={styles.error}>{errors.url}</span>}
          </div>

          {/* 제목 */}
          <div style={styles.field}>
            <label style={styles.label}>
              제목 <span style={styles.required}>*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="북마크 제목"
              style={errors.title ? styles.inputError : styles.input}
            />
            {errors.title && <span style={styles.error}>{errors.title}</span>}
          </div>

          {/* 설명 */}
          <div style={styles.field}>
            <label style={styles.label}>설명</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="북마크에 대한 설명 (선택사항)"
              style={styles.textarea}
              rows={3}
            />
          </div>

          {/* 카테고리 */}
          <div style={styles.field}>
            <label style={styles.label}>카테고리</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as BookmarkCategory)}
              style={styles.select}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* 태그 */}
          <div style={styles.field}>
            <label style={styles.label}>태그</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="태그1, 태그2, 태그3"
              style={styles.input}
            />
            <span style={styles.hint}>쉼표(,)로 구분해주세요</span>
          </div>

          {/* 즐겨찾기 */}
          <div style={styles.checkboxField}>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={favorite}
                onChange={(e) => setFavorite(e.target.checked)}
                style={styles.checkbox}
              />
              즐겨찾기에 추가
            </label>
          </div>

          {/* 버튼 */}
          <div style={styles.buttons}>
            <button type="button" onClick={onCancel} style={styles.cancelButton}>
              취소
            </button>
            <button type="submit" style={styles.submitButton}>
              {bookmark ? '수정' : '추가'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '32px',
    maxWidth: '600px',
    width: '90%',
    maxHeight: '90vh',
    overflow: 'auto',
  },
  title: {
    margin: '0 0 24px 0',
    fontSize: '24px',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#333',
  },
  required: {
    color: '#f44336',
  },
  input: {
    padding: '12px',
    fontSize: '16px',
    border: '2px solid #ddd',
    borderRadius: '8px',
    outline: 'none',
  },
  inputError: {
    padding: '12px',
    fontSize: '16px',
    border: '2px solid #f44336',
    borderRadius: '8px',
    outline: 'none',
  },
  textarea: {
    padding: '12px',
    fontSize: '16px',
    border: '2px solid #ddd',
    borderRadius: '8px',
    outline: 'none',
    fontFamily: 'inherit',
    resize: 'vertical',
  },
  select: {
    padding: '12px',
    fontSize: '16px',
    border: '2px solid #ddd',
    borderRadius: '8px',
    outline: 'none',
    backgroundColor: 'white',
    cursor: 'pointer',
  },
  hint: {
    fontSize: '12px',
    color: '#999',
  },
  error: {
    fontSize: '12px',
    color: '#f44336',
  },
  checkboxField: {
    display: 'flex',
    alignItems: 'center',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  checkbox: {
    width: '18px',
    height: '18px',
    cursor: 'pointer',
  },
  buttons: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'flex-end',
    marginTop: '8px',
  },
  cancelButton: {
    padding: '12px 24px',
    fontSize: '16px',
    backgroundColor: '#f5f5f5',
    color: '#333',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  submitButton: {
    padding: '12px 24px',
    fontSize: '16px',
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};

export default BookmarkForm;
