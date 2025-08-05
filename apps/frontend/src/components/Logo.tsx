// components/Logo.tsx

type LogoProps = {
  fontSize?: number
  color?: string
}

const Logo: React.FC<LogoProps> = ({ fontSize = 20, color = '#333' }) => {
  return (
    <span
      style={{
        fontFamily: `'Inter', 'Helvetica Neue', sans-serif`,
        fontWeight: 500,
        fontSize,
        letterSpacing: '0.05em',
        color,
        userSelect: 'none',
      }}
    >
      SOUPUP
    </span>
  )
}

export default Logo
