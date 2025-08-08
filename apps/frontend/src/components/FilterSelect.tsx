// FilterSelect.tsx
import React, { useState, useEffect, useRef } from 'react';

interface FilterSelectProps {
  options: string[];
  placeholder?: string;
  defaultValue?: string;
  onSelect?: (value: string) => void;
  clearable?: boolean;
}

const styles = {
  container: {
    position: 'relative' as const,
    width: '16rem',
  },
  form: {
    position: 'relative' as const,
    width: '12rem',
  },
  input: {
    width: '100%',
    padding: '0.25rem 1.75rem 0.25rem 0.25rem',
    border: '1px solid #d1d5db',
    outline: 'none',
    fontSize: '1rem',
    transition: 'border-color 0.2s',
  },
  inputFocus: {
    borderColor: '#2563eb',
  },
  clear: {
    position: 'absolute' as const,
    right: '0.25rem',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    padding: '0.25rem',
    color: '#6b7280',
    cursor: 'pointer',
  },
  dropdown: {
    position: 'absolute' as const,
    zIndex: 10,
    marginTop: '0.25rem',
    width: '12rem',
    maxHeight: '15rem',
    overflowY: 'auto' as const,
    backgroundColor: 'white',
    border: '1px solid #e5e7eb',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)',
    listStyleType: 'none',
    paddingLeft: 0,
    margin: 0,
  },
  item: {
    padding: '0.5rem 0.75rem',
    cursor: 'pointer',
  },
  itemHover: {
    backgroundColor: '#f3f4f6',
  },
  itemActive: {
    backgroundColor: '#f3f4f6',
    color: '#2563eb',
  },
  empty: {
    padding: '0.5rem 0.75rem',
    color: '#9ca3af',
  },
};

const FilterSelect: React.FC<FilterSelectProps> = ({
  options = [],
  placeholder = 'Type to filter...',
  defaultValue = '',
  onSelect = () => {},
  clearable = true,
}) => {
  const [query, setQuery] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const filtered = options.filter((opt) =>
    opt.toLowerCase().includes(query.toLowerCase())
  );

  const openDropdown = () => {
    setIsOpen(true);
    setActiveIndex(0);
  };

  const clearInput = () => {
    setQuery('');
    openDropdown();
  };

  const selectOption = (value: string) => {
    setQuery('');
    setIsOpen(false);
    onSelect(value);
  };

  const scrollToActiveItem = () => {
    if (!listRef.current || activeIndex < 0) return;
    const item = listRef.current.children[activeIndex] as HTMLElement;
    if (!item) return;

    const listRect = listRef.current.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();

    if (itemRect.top < listRect.top) {
      listRef.current.scrollTop -= listRect.top - itemRect.top;
    } else if (itemRect.bottom > listRect.bottom) {
      listRef.current.scrollTop += itemRect.bottom - listRect.bottom;
    }
  };

  const handleKeydown = (event: KeyboardEvent) => {
    if (!isOpen) return;

    switch (event.key) {
      case 'ArrowDown':
        setActiveIndex((prev) => Math.min(prev + 1, filtered.length - 1));
        event.preventDefault();
        break;
      case 'ArrowUp':
        setActiveIndex((prev) => Math.max(prev - 1, 0));
        event.preventDefault();
        break;
      case 'Enter':
        event.preventDefault();
        if (filtered.length > 0 && activeIndex >= 0 && activeIndex < filtered.length) {
          selectOption(filtered[activeIndex]);
        } else if (query.trim()) {
          selectOption(query.trim());
        }
        break;
      case 'Escape':
        setIsOpen(false);
        break;
    }
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (!containerRef.current?.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeydown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [filtered, activeIndex, isOpen, query]);

  return (
    <div style={styles.container} ref={containerRef}>
      <form onSubmit={(e) => e.preventDefault()} style={styles.form}>
        <input
          type="text"
          value={query}
          placeholder={placeholder}
          onChange={(e) => {
            setQuery(e.target.value);
            openDropdown();
          }}
          onFocus={() => setIsOpen(true)}
          autoComplete="off"
          spellCheck={false}
          style={styles.input}
        />
        {clearable && query && (
          <button
            type="button"
            onClick={clearInput}
            style={styles.clear}
          >
            ✕
          </button>
        )}
      </form>

      {isOpen && (
        <ul style={styles.dropdown} ref={listRef}>
          {filtered.length === 0 ? (
            <li style={styles.empty}>Create a new tag</li>
          ) : (
            filtered.map((option, i) => (
              <li
                key={option}
                style={{
                  ...styles.item,
                  ...(i === activeIndex ? styles.itemActive : {}),
                }}
                onMouseDown={() => selectOption(option)}
                onMouseEnter={() => setActiveIndex(i)}
              >
                {option}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default FilterSelect;
