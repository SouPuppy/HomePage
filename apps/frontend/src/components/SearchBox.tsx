import { useState, useRef, useEffect } from 'react'

type Props = {
  placeholder?: string
  categoryOptions?: string[]
  defaultCategory?: string
}

const SearchBox: React.FC<Props> = ({
  categoryOptions = ['All', 'Movies', 'Shows', 'Users'],
  defaultCategory = 'All',
}) => {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState(defaultCategory)
  const [hoverCategory, setHoverCategory] = useState<string | null>(null)
  const [showPopover, setShowPopover] = useState(false)
  const [hoverClear, setHoverClear] = useState(false)
  const [activeClear, setActiveClear] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const popoverRef = useRef<HTMLDivElement>(null)

useEffect(() => {
  const handleClickOutside = (e: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(e.target as Node) &&
      popoverRef.current &&
      !popoverRef.current.contains(e.target as Node)
    ) {
      setShowPopover(false)
    }
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setShowPopover(false)
    }
  }

  document.addEventListener('mousedown', handleClickOutside)
  document.addEventListener('keydown', handleKeyDown)

  return () => {
    document.removeEventListener('mousedown', handleClickOutside)
    document.removeEventListener('keydown', handleKeyDown)
  }
}, [])


  const handleClear = () => setQuery('')
  const handleSelect = (cat: string) => {
    setCategory(cat)
    setShowPopover(true)
  }

  return (
    <div
      ref={containerRef}
      style={{
        maxWidth: '640px',
        margin: '0 auto',
        width: '100%',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#fff',
          border: 'none',
          borderRadius: '9999px',
          padding: '6px 16px',
          boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
          transition: 'box-shadow 0.2s ease-in-out',
        }}
      >
        <input
          type="text"
          value={query}
          onFocus={() => setShowPopover(true)}
          onChange={(e) => {
            setQuery(e.target.value)
            setShowPopover(true)
          }}
          placeholder={`Search in ${category.toLowerCase()}...`}
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            fontSize: '16px',
            padding: '6px 6px',
            background: 'transparent',
          }}
        />
        {query && (
          <button
            onClick={handleClear}
            aria-label="Clear"
            onMouseEnter={() => setHoverClear(true)}
            onMouseLeave={() => {
              setHoverClear(false)
              setActiveClear(false)
            }}
            onMouseDown={() => setActiveClear(true)}
            onMouseUp={() => setActiveClear(false)}
            style={{
              backgroundColor: activeClear
                ? '#cbd5e1'
                : hoverClear
                ? '#d1d5db'
                : '#e5e7eb',
              border: 'none',
              width: '24px',
              height: '24px',
              borderRadius: '9999px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              marginLeft: '6px',
              flexShrink: 0,
              boxShadow: '0 1px 4px rgba(0,0,0,0.12)',
              transition: 'all 0.15s ease-in-out',
            }}
          >
            <svg
              viewBox="0 0 24 24"
              width="14"
              height="14"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>

      {showPopover && (
        <div
          ref={popoverRef}
          role="listbox"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            width: '100%',
            marginTop: '8px',
            backgroundColor: '#fff',
            border: '1px solid #F3F4F6',
            borderRadius: '12px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
          }}
        >
          <div style={{ display: 'flex', borderBottom: '1px solid #eee' }}>
            {categoryOptions.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(cat)}
                onMouseEnter={() => setHoverCategory(cat)}
                onMouseLeave={() => setHoverCategory(null)}
                style={{
                  flex: 1,
                  padding: '10px 0',
                  fontSize: '14px',
                  fontWeight: cat === category ? 600 : 500,
                  color: cat === category ? '#5581dfff' : '#374151',
                  backgroundColor:
                    cat === category
                      ? '#ffffff'
                      : hoverCategory === cat
                      ? '#f9fafb'
                      : '#ffffff',
                  border: 'none',
                  borderBottom:
                    cat === category
                      ? '2px solid #5581dfff'
                      : '2px solid transparent',
                  cursor: 'pointer',
                  position: 'relative',
                  borderTopLeftRadius: idx === 0 ? '12px' : undefined,
                  borderTopRightRadius:
                    idx === categoryOptions.length - 1 ? '12px' : undefined,
                  transition: 'background-color 0.2s ease-in-out',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
          <div
            style={{
              padding: '16px',
              fontSize: '14px',
              color: '#6b7280',
            }}
          >
            Search results or suggestions for <strong>{category}</strong>
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchBox
