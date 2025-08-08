import React, { useState } from 'react'
import FilterSelect from './FilterSelect'

const predefinedTags = ['React', 'Svelte', 'UI', 'Design', 'Animation', 'Search']

const TagSearchBox: React.FC = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const handleSelect = (tag: string) => {
    const trimmed = tag.trim()
    if (trimmed && !selectedTags.includes(trimmed)) {
      setSelectedTags([...selectedTags, trimmed])
    }
  }

  const handleDelete = (tagToDelete: string) => {
    setSelectedTags(selectedTags.filter((tag) => tag !== tagToDelete))
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: '100px',
        right: '40px',
        width: '320px',
        padding: '16px',
        backgroundColor: '#ffffff',
        borderRadius: '6px',
        border: '1px solid #ddd', // 替代 Paper 阴影
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '15px' }}>
        Search Tags
      </div>

      <FilterSelect
        options={predefinedTags}
        placeholder="e.g. React, UI"
        onSelect={handleSelect}
      />

      <div
        style={{
          marginTop: '8px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '6px',
        }}
      >
        {selectedTags.map((tag) => (
          <span
            key={tag}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              backgroundColor: '#f0f0f0',
              borderRadius: '16px',
              padding: '4px 10px',
              fontSize: '12px',
              cursor: 'default',
            }}
          >
            {tag}
            <span
              onClick={() => handleDelete(tag)}
              style={{
                marginLeft: '6px',
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
            >
              ×
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default TagSearchBox
