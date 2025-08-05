import React from 'react';
import { Typography, Container } from '@mui/material';
import AppSection from './AppSection';

const AppWorkspacePage: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        My Apps
      </Typography>

      <AppSection
        title="Email"
        apps={[
          {
            title: 'Microsoft 365',
            subtitle: '@my.cityu.edu.hk',
            iconUrl: '/icons/outlook.png',
            href: 'https://outlook.office.com',
          },
          {
            title: 'Google Workspace',
            subtitle: '@gapps.cityu.edu.hk',
            iconUrl: '/icons/gmail.png',
            href: 'https://mail.google.com',
          },
        ]}
      />

      <AppSection
        title="Work"
        apps={[
          { title: 'Zoom', iconUrl: '/icons/zoom.png', href: 'https://zoom.us' },
          { title: 'Canvas', iconUrl: '/icons/canvas.png', href: 'https://canvas.cityu.edu.hk' },
          { title: 'ServiceNow', iconUrl: '/icons/servicenow.png' },
        ]}
      />
    </Container>
  );
};

export default AppWorkspacePage;
