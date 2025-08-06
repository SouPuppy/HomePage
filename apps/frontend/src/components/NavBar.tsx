import SearchBox from "./SearchBox"
import Logo from "./Logo"

const NavBar: React.FC = () => {
  return (
    <nav
      style={{
        width: "100%",
        height: "60px",
        backgroundColor: "rgba(219, 225, 230, 0.2)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 16px",
        boxShadow: "0 2px 2px rgba(0, 0, 0, 0.05)",
        position: "fixed",
        top: 0,
        zIndex: 1000,
        borderBottom: "1px solid rgba(0,0,0,0.05)",
      }}
    >
      {/* 左边 Logo */}
      <div style={{ width: 120, display: "flex", alignItems: "center", paddingLeft: 50 }}>
        <Logo />
      </div>

      {/* 中间 SearchBox，始终居中 */}
      <div style={{ flex: 1, display: "flex", justifyContent: "center", paddingLeft: 45 }}>
        <SearchBox />
      </div>

      {/* 右边空白占位，撑住平衡 */}
      <div style={{ width: 120 }} />
    </nav>
  )
}

export default NavBar
