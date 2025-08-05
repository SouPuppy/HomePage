import React, { useState } from 'react'
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Tooltip,
  CssBaseline,
} from '@mui/material'
import {
  Home,
  Work,
  ChevronRight,
  ChevronLeft,
} from '@mui/icons-material'

// Drawer configuration
const fullWidth = 240
const collapsedWidth = 14
const hoverExpandWidth = 24
const buttonSize = 24
const buttonTop = 39
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
            backgroundColor: collapsed ? '#e0e0e0ff' : '#fff',
            borderRight: 'none',
            position: 'fixed',
            top: 0,
            left: 0,
            height: '100vh',
            boxShadow: collapsed ? 'none' : '2px 0 8px rgba(0, 0, 0, 0.05)',
          },
        }}
      >
        {/* Right edge indicator line */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            width: 2,
            backgroundColor: hoveringButton ? '#4C64E2' : 'transparent',
            transition: 'background-color 0.2s',
            zIndex: 1200,
          }}
        />

        {/* Drawer menu items */}
        <List sx={{ mt: 2 }}>
          {[
            { icon: <Home />, label: 'My Apps', selected: true },
            { icon: <Work />, label: 'Work', selected: false },
          ].map(({ icon, label, selected }) => (
            <ListItemButton
              key={label}
              selected={selected}
              sx={{
                borderRadius: 2,
                mx: 1,
                my: 0.5,
                px: 2,
                py: 1,
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                },
                '&.Mui-selected': {
                  backgroundColor: collapsed ? 'rgba(224,224,255,0)' : '#e0e0ff',
                  fontWeight: 'bold',
                  transition: `background-color ${transitionTiming}`,
                  '&:hover': {
                    backgroundColor: collapsed
                      ? 'rgba(208,208,255,0.08)'
                      : '#d0d0ff',
                  },
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: selected ? '#4C64E2' : 'inherit',
                  transition: `color ${transitionTiming}`,
                }}
              >
                {icon}
              </ListItemIcon>
              <ListItemText
                primary={label}
                sx={{
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
              backgroundColor: hoveringButton ? '#4C64E2' : '#fff',
              color: hoveringButton ? '#fff' : '#4C64E2',
              boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
              transition: `background-color 0.2s ease`,
              '&:hover': {
                backgroundColor: '#4C64E2',
              },
            }}
          >
            {collapsed ? <ChevronRight fontSize="small" /> : <ChevronLeft fontSize="small" />}
          </IconButton>
        </Tooltip>
      </Box>

      {/* Main content area (animated width + margin) */}
      <Box
        component="main"
        sx={{
          p: 3,
          ml: `${drawerWidth}px`,
          width: `calc(100% - ${drawerWidth}px)`,
          transition: `width ${transitionTiming}, margin-left ${transitionTiming}`,
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

export default SideNavLayout
