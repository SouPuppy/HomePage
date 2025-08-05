import React from 'react'

type Props = {
  children: React.ReactNode
  maxWidth?: number
}

const CenterInPaddedLayout: React.FC<Props> = ({ children, maxWidth = 1000 }) => {
  return (
    <div
      style={{
        paddingTop: '20px',
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          maxWidth: `${maxWidth}px`,
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        {children}
      </div>
    </div>
  )
}

export default CenterInPaddedLayout
