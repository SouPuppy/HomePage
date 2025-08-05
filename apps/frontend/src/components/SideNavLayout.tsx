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

// Drawer configuration
const fullWidth = 220
const collapsedWidth = 10
const hoverExpandWidth = 24
const buttonSize = 24
const buttonTop = 69
const transitionTiming = '0.2s cubic-bezier(0.4, 0, 0.2, 1)'

type SideNavLayoutProps = {
  children: React.ReactNode
}

const SideNavLayout: React.FC<SideNavLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(true)
  const [hoveringButton, setHoveringButton] = useState(false)

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

  return (
    <Box sx={{ display: 'block', minHeight: '100vh', backgroundColor: '#f4f4f4' }}>
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

        <List sx={{ mt: 7 }}>
          {[
            { label: 'HOME', selected: true },
            { label: 'WORK', selected: false },
          ].map(({ label, selected }) => (
            <ListItemButton
              key={label}
              selected={selected}
              sx={{
                my: 0.1,
                px: 2,
                py: 0,
                minHeight: 32,
                justifyContent: 'center',
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: '#e9e9e9ff',
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
    ))}
        </List>

      </Drawer>

      {/* Transparent clickable hover area (extends button area) */}
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

      {/* Control button (visually shown) */}
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

      {/* Main content area (animated width + margin) */}
{/* Main content area */}
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
