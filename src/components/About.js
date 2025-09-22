import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import Section from '../common/Section';

const About = () => {
  return (
    <Section id="about">
      <Container maxWidth="lg">
        <Box textAlign="center" py={8}>
          <Typography variant="h2" component="h2" fontWeight="bold" mb={4}>
            About <Box component="span" color="primary.main">Me</Box>
          </Typography>
          <Typography variant="h6" color="text.secondary" maxWidth="600px" mx="auto">
            I'm a passionate Computer Science student at FPT University with a strong focus on 
            Java development and modern web technologies.
          </Typography>
        </Box>
      </Container>
    </Section>
  );
};

export default About;
