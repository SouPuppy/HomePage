import { useState } from 'react'
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  IconButton,
  Tooltip,
  CssBaseline,
} from '@mui/material'
import {
  ChevronRight,
  ChevronLeft,
} from '@mui/icons-material'
import { useNavigate, useLocation } from 'react-router-dom'

// Drawer configuration
const fullWidth = 220
const collapsedWidth = 12
const hoverExpandWidth = 24
const buttonSize = 24
const buttonTop = 95.5
const transitionTiming = '0.2s cubic-bezier(0.4, 0, 0.2, 1)'

type SideNavLayoutProps = {
  children: React.ReactNode
}

const SideNavLayout: React.FC<SideNavLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(true)
  const [hoveringButton, setHoveringButton] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const toggleCollapse = () => setCollapsed(!collapsed)

  // Layout width logic
  const drawerWidth = collapsed ? collapsedWidth : fullWidth
  const paperWidth = collapsed
    ? hoveringButton
      ? hoverExpandWidth
      : collapsedWidth
    : fullWidth

  // Button position logic
  const buttonLeft = paperWidth - buttonSize / 2

  // Navigation items
  const navItems = [
    { label: 'HOME', path: '/' },
    { label: 'PROJECTS', path: '/projects' },
    { label: 'APP', path: '/app' },
    { label: 'ABOUT ME', path: '/about' },
  ]

  return (
    <Box sx={{ display: 'block', minHeight: '100vh' }}>
      <CssBaseline />

      {/* Permanent Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          '& .MuiDrawer-paper': {
            width: paperWidth,
            transition: `width ${transitionTiming}, background-color ${transitionTiming}`,
            overflowX: 'hidden',
            boxSizing: 'border-box',
            backgroundColor: collapsed ? 'rgba(224, 224, 224, 0.5)' : 'rgba(224, 224, 224, 0.12)',
            backdropFilter: 'blur(1px)',
            borderRight: 'none',
            position: 'fixed',
            top: 0,
            left: 0,
            height: '100vh',
            boxShadow: collapsed ? 'none' : '2px 0 8px rgba(0, 0, 0, 0.05)',
          },
        }}
      >
        {/* Logo Area */}

        <List sx={{ mt: 6.5 }}>
          {navItems.map(({ label, path }) => {
            const selected = location.pathname === path
            return (
              <ListItemButton
                key={label}
                selected={selected}
                onClick={() => navigate(path)}
                sx={{
                  my: 0,
                  px: 2,
                  py: 0,
                  minHeight: 32,
                  justifyContent: 'center',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: '#f0f0f0ff',
                  },
                  '&.Mui-selected': {
                    backgroundColor: collapsed ? 'rgba(224,224,255,0)' : '#e5e5e5ff',
                    fontWeight: 'bold',
                    transition: `background-color ${transitionTiming}`,
                    '&:hover': {
                      backgroundColor: collapsed
                        ? 'rgba(243, 243, 243, 0.08)'
                        : '#e0e0e0ff',
                    },
                  },
                }}
              >
                <ListItemText
                  primary={label}
                  sx={{
                    textAlign: 'left',
                    transition: `opacity ${transitionTiming}, width ${transitionTiming}, margin ${transitionTiming}`,
                    opacity: collapsed ? 0 : 1,
                    width: collapsed ? 0 : 'auto',
                    marginLeft: collapsed ? 0 : 1,
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                  }}
                />
              </ListItemButton>
            )
          })}
        </List>

        {/* Footer Area */}
        <Box
        sx={{
          position: 'absolute',
          bottom: 16,
          left: 0,
          right: 0,
          px: 2,
          opacity: collapsed ? 0 : 1,
          transform: collapsed ? 'translateY(10px)' : 'translateY(0)',
          transition: `opacity ${transitionTiming}, transform ${transitionTiming}`,
          fontSize: '12px',
          color: '#888',
          textAlign: 'center',
          userSelect: 'none',
        }}
      >
        © {new Date().getFullYear()} Soupup <br/>
        All rights reserved
      </Box>

      </Drawer>

      {/* Transparent clickable hover area */}
      {collapsed && (
        <Box
          onMouseEnter={() => setHoveringButton(true)}
          onMouseLeave={() => setHoveringButton(false)}
          onClick={toggleCollapse}
          sx={{
            position: 'fixed',
            top: buttonTop,
            left: 0,
            width: paperWidth - buttonSize / 2,
            height: buttonSize,
            zIndex: 1299,
            cursor: 'pointer',
          }}
        />
      )}

      {/* Control button */}
      <Box
        onMouseEnter={() => setHoveringButton(true)}
        onMouseLeave={() => setHoveringButton(false)}
        onClick={toggleCollapse}
        sx={{
          position: 'fixed',
          top: buttonTop,
          left: buttonLeft,
          width: buttonSize,
          height: buttonSize,
          zIndex: 1300,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: `left ${transitionTiming}`,
        }}
      >
        <Tooltip title={collapsed ? 'Open navigation' : 'Close navigation'}>
          <IconButton
            sx={{
              width: buttonSize,
              height: buttonSize,
              borderRadius: '50%',
              backgroundColor: hoveringButton ? '#5581dfff' : '#fff',
              color: hoveringButton ? '#fff' : '#5581dfff',
              boxShadow: '0.5px 0.5px 2px rgba(0,0,0,0.1)',
              transition: `background-color 0.2s ease`,
              '&:hover': {
                backgroundColor: '#5581dfff',
              },
            }}
          >
            {collapsed ? <ChevronRight fontSize="small" /> : <ChevronLeft fontSize="small" />}
          </IconButton>
        </Tooltip>
      </Box>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          pl: `${drawerWidth}px`,
          pt: 4,
          transition: `padding-left ${transitionTiming}`,
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

export default SideNavLayout
