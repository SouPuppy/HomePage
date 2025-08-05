import React from 'react';
import { Card, CardContent, CardMedia, Typography, IconButton, Box } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface AppCardProps {
  title: string;
  subtitle?: string;
  iconUrl: string;
  href?: string;
}

const AppCard: React.FC<AppCardProps> = ({ title, subtitle, iconUrl, href }) => {
  return (
    <Card
      component="a"
      href={href}
      target="_blank"
      sx={{
        width: 160,
        textDecoration: 'none',
        borderRadius: 3,
        boxShadow: 1,
        transition: 'transform 0.2s ease',
        '&:hover': { transform: 'translateY(-4px)', boxShadow: 3 },
        position: 'relative',
      }}
    >
      <CardMedia
        component="img"
        image={iconUrl}
        alt={title}
        sx={{ height: 80, objectFit: 'contain', p: 2 }}
      />
      <CardContent sx={{ pt: 0 }}>
        <Typography variant="subtitle1" fontWeight={500} noWrap>{title}</Typography>
        {subtitle && (
          <Typography variant="caption" color="text.secondary" noWrap>
            {subtitle}
          </Typography>
        )}
      </CardContent>
      <Box sx={{ position: 'absolute', top: 4, right: 4 }}>
        <IconButton size="small"><MoreVertIcon fontSize="small" /></IconButton>
      </Box>
    </Card>
  );
};

export default AppCard;
