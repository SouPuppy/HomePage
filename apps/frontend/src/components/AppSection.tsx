import React from 'react';
import { Box, Typography } from '@mui/material';
import AppCard from './AppCard';

interface App {
  title: string;
  iconUrl: string;
  subtitle?: string;
  href?: string;
}

interface AppSectionProps {
  title: string;
  apps: App[];
}

const AppSection: React.FC<AppSectionProps> = ({ title, apps }) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>{title}</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {apps.map((app) => (
          <AppCard key={app.title} {...app} />
        ))}
      </Box>
    </Box>
  );
};

export default AppSection;
