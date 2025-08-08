import React from 'react'

type Props = {
  children: React.ReactNode
  maxWidth?: number
}

const CenterInPaddedLayout: React.FC<Props> = ({ children, maxWidth = '100%' }) => {
  return (
    <div
      style={{
        paddingTop: '30px',
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
