import React, { useState } from 'react';
import { Box, Typography, Button, Avatar, Stack } from '@mui/material';
import { Phone, Email, LocationOn } from '@mui/icons-material';
import BookSessionForm from './Mui/Form';

const TherapistCard = ({ therapist, userData }) => {


  console.log(therapist);
  
  const [open, setOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setTimeout(() => setIsHovered(false), 100)}
      sx={{
        justifySelf: 'center',
        width: '100%',
        maxWidth: 380,
        backgroundColor: 'var(--white)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: isHovered ? 'var(--shadow-lg)' : 'var(--shadow-md)',
        overflow: 'hidden',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        transform: isHovered ? 'translateY(-5px)' : 'translateY(0)',
        position: 'relative',
        zIndex: isHovered ? 2 : 0,
        '&::before': {
          content: '""',
          position: 'absolute',
          bottom: '-6px',
          left: 0,
          right: 0,
          height: '6px',
          backgroundColor: 'transparent',
          zIndex: -1
        }
      }}
    >
      {/* Header */}
      <Box sx={{
        display: 'flex',
        padding: 'var(--padding)',
        backgroundColor: 'var(--light-blue)',
        gap: '1rem',
        alignItems: 'center'
      }}>
        <Avatar
          sx={{
            width: 120,
            height: 120,
            color: 'var(--white)',
            fontSize: '3rem',
            border: '4px solid var(--white)',
            boxShadow: 'var(--shadow-md)',
            mb: 2,
          }}
        >
          {therapist.name?.charAt(0)}
        </Avatar>
        <Box>
          <Typography
            variant="h5"
            component="h3"
            sx={{
              fontFamily: 'var(--font-heading)',
              color: 'var(--dark-color)',
              fontWeight: 700
            }}
          >
            {therapist.name}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              color: 'var(--primary-dark)',
              fontFamily: 'var(--font-main)',
              fontWeight: 600
            }}
          >
            {therapist.specialty}
          </Typography>

          <Typography variant="body2" sx={{ mb: 1 }}>
            <strong>Price:</strong> ${therapist.rate}/session
          </Typography>
        </Box>
      </Box>

      {/* Contact info */}
      <Box sx={{
        padding: 'var(--padding)',
        borderBottom: '1px solid var(--light-gray)'
      }}>
        <Stack spacing={1.5}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Phone sx={{ color: 'var(--primary-color)', fontSize: 20 }} />
            <Typography variant="body1" color="var(--dark-color)">
              {therapist.phone}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Email sx={{ color: 'var(--primary-color)', fontSize: 20 }} />
            <Typography variant="body1" color="var(--dark-color)">
              {therapist.email}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
            <LocationOn sx={{ color: 'var(--primary-color)', fontSize: 20, mt: 0.5 }} />
            <Typography variant="body1" color="var(--dark-color)">
              {therapist.location}
            </Typography>
          </Box>
        </Stack>
      </Box>

      {/* Description and availability */}
      <Box sx={{
        padding: 'var(--padding)',
        borderBottom: '1px solid var(--light-gray)'
      }}>
        <Typography variant="body2" sx={{ color: 'var(--dark-color)', mb: 1 }}>
          <strong>Description:</strong>
        </Typography>
        <Typography variant="body2" color="var(--gray-color)">
          {therapist.description || 'No description available.'}
        </Typography>
      </Box>
      <Box sx={{
  padding: 'var(--padding)',
  borderBottom: '1px solid var(--light-gray)'
}}>

    <Box sx={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 1
    }}>
          {Object.entries(therapist.freeDays || {}).map(([day, isFree]) => (
            <Box
              key={day}
              sx={{
                backgroundColor: isFree ? 'var(--success-light)' : 'var(--gray-light)',
                color: isFree ? 'var(--success-dark)' : 'var(--gray-color)',
                opacity: isFree ? '1' : '0.5',
                textAlign: 'center',
                padding: '6px 10px',
                borderRadius: 'var(--radius-sm)',
                fontWeight: 500,
                fontSize: '0.9rem',
                textTransform: 'capitalize'
              }}
            >
              {day}
            </Box>
          ))}
        </Box>
      </Box>
      {/* Bottom section */}
      <Box sx={{
        padding: 'var(--padding)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Typography variant="body2" color="var(--gray-color)">
          {therapist.experience} years experience
        </Typography>
        <Button
          onClick={handleOpen}
          variant="contained"
          sx={{
            backgroundColor: 'var(--primary-color)',
            '&:hover': {
              backgroundColor: 'var(--primary-dark)'
            },
            borderRadius: 'var(--radius-md)',
            textTransform: 'none',
            fontWeight: 600,
            padding: '8px 16px'
          }}
        >
          Book Session
        </Button>
        <BookSessionForm
          open={open}
          handleClose={handleClose}
          therapistEmail={therapist.email}
          userData={userData}
        />
      </Box>
    </Box>
  );
};

export default TherapistCard;
