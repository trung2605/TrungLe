import React from 'react';
import { Container, Typography, Box, Grid, Paper, Chip } from '@mui/material';
import { EmojiEvents, CalendarToday } from '@mui/icons-material';
import Section from '../../common/Section';
import { useCustomTheme } from '../../contexts/ThemeContext';
import { prizes } from '../../data';
import './Prizes.scss';

function Prizes() {
  const { theme } = useCustomTheme();

  return (
    <Section id="prizes" className={`prizes ${theme === 'darkCoder' ? 'prizes--coder' : ''}`}>
      <Container maxWidth="lg" className="prizes__container">
        <Typography variant="h2" component="h2" className="prizes__title">
          Giải Thưởng
        </Typography>
        
        <Grid container spacing={4} className="prizes__grid">
          {prizes.map((prize, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <Paper className="prizes__card">
                <Box className="prizes__card-header">
                  <EmojiEvents className="prizes__icon" />
                  <Typography variant="h5" component="h3" className="prizes__card-title">
                    {prize.title}
                  </Typography>
                </Box>

                <Typography variant="body1" className="prizes__description">
                  {prize.description}
                </Typography>

                <Box className="prizes__date">
                  <CalendarToday className="prizes__date-icon" />
                  <Typography variant="body2" className="prizes__date-text">
                    {prize.date}
                  </Typography>
                </Box>

                <Chip
                  label={prize.category}
                  size="small"
                  className="prizes__category"
                />
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}

export default Prizes;