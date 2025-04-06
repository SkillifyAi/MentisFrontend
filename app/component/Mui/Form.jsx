//company email: mentispolihack@gmail.com
//password: mentis1234
import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Box,
  Slide,
  IconButton,
  useMediaQuery,
  useTheme,
  Divider,
  Chip
} from '@mui/material';
import { Close, CalendarToday, Schedule, Person, Notes } from '@mui/icons-material';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const availableTimeSlots = [
  '9:00 AM', '10:00 AM', '11:00 AM', 
  '12:00 PM', '1:00 PM', '2:00 PM',
  '3:00 PM', '4:00 PM', '5:00 PM'
];

const sessionTypes = [
  { value: 'individual', label: 'Individual Therapy' },
  { value: 'couples', label: 'Couples Therapy' },
  { value: 'family', label: 'Family Therapy' },
  { value: 'group', label: 'Group Session' }
];

export default function BookSessionForm({ open, handleClose, therapistEmail, userData}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [sessionType, setSessionType] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);
    
  //   // Simulate API call
  //   setTimeout(() => {
  //     setSuccess(true);
  //     setTimeout(() => {
  //       handleClose();
  //       setSuccess(false);
  //       resetForm();
  //     }, 2000);
  //   }, 1500);
  // };

  const handleSubmit = async (e) => {

    

    e.preventDefault();
    // setIsSubmitting(true);
    
    console.log(userData);
    
    const username = userData.username
    const email = userData.email
    const diagnoses = userData.diagnoses
    try {
      const response = await fetch('http://localhost:5000/booking/email ', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          therapistEmail,
          date,
          time,
          sessionType: sessionTypes.find(st => st.value === sessionType)?.label || sessionType,
          notes,
          username, 
          email, 
          diagnoses
          
        })
      });
  
      // Check if the response is OK (status in the range 200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
  
      if (data.success) {
        setSuccess(true);
        setTimeout(() => {
          handleClose();
          setSuccess(false);
          resetForm();
        }, 2000);
      }
    } catch (error) {
      console.error('Booking error:', error);
      // Add error notification to user
      alert('Failed to book session. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setDate('');
    setTime('');
    setSessionType('');
    setNotes('');
    setIsSubmitting(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      fullScreen={isMobile}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: '600px' },
          maxWidth: '100%',
          maxHeight: { xs: '100%', sm: '90vh' },
          backgroundColor: 'var(--white)',
          borderRadius: { xs: 0, sm: 'var(--radius-lg)' },
          boxShadow: { xs: 'none', sm: 'var(--shadow-lg)' },
          overflow: 'hidden',
          transition: 'all 0.3s ease'
        }
      }}
    >
      <DialogTitle sx={{
        backgroundColor: 'var(--primary-color)',
        color: 'var(--white)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 1,
        boxShadow: 'var(--shadow-sm)'
      }}>
        <Box display="flex" alignItems="center">
          <CalendarToday sx={{ mr: 1, color: 'var(--accent-color)' }} />
          <Typography variant="h6" sx={{ fontFamily: 'var(--font-heading)' }}>
            Book a Session
          </Typography>
        </Box>
        <IconButton onClick={handleClose} sx={{ color: 'var(--white)' }}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{
        overflowY: 'auto',
        padding: { xs: 2, sm: 3 },
        '&::-webkit-scrollbar': {
          width: '6px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'var(--light-gray)',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'var(--primary-color)',
          borderRadius: '3px',
        }
      }}>
        {success ? (
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            py: 8,
            px: 4,
            minHeight: { xs: 'calc(100vh - 200px)', sm: '300px' },
            textAlign: 'center',
            background: 'linear-gradient(135deg, var(--light-blue) 0%, var(--white) 100%)',
            borderRadius: 'var(--radius-md)'
          }}>
            <Box sx={{
              backgroundColor: 'var(--accent-color)',
              width: 80,
              height: 80,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 3,
              animation: 'scaleIn 0.5s ease-out'
            }}>
              <CalendarToday sx={{ fontSize: 40, color: 'var(--white)' }} />
            </Box>
            <Typography variant="h5" sx={{
              color: 'var(--primary-dark)',
              fontFamily: 'var(--font-heading)',
              mb: 2
            }}>
              Appointment Booked!
            </Typography>
            <Typography sx={{ color: 'var(--dark-color)', maxWidth: '300px' }}>
              Your session has been scheduled successfully. We'll send you a confirmation shortly.
            </Typography>
          </Box>
        ) : (
          <form onSubmit={handleSubmit}>
            <Typography variant="body1" sx={{
              mb: 3,
              color: 'var(--dark-color)',
              textAlign: { xs: 'center', sm: 'left' }
            }}>
              Schedule your therapy session with one of our professionals.
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3, mb: 3 }}>
              <FormControl fullWidth sx={{ flex: 1 }}>
                <InputLabel id="session-type-label" sx={{ color: 'var(--dark-color)' }}>
                  Session Type
                </InputLabel>
                <Select
                  labelId="session-type-label"
                  value={sessionType}
                  onChange={(e) => setSessionType(e.target.value)}
                  label="Session Type"
                  sx={{
                    borderRadius: 'var(--radius-md)',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'var(--light-gray)'
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'var(--primary-color)'
                    }
                  }}
                  startAdornment={<Person sx={{ color: 'var(--gray-color)', mr: 1 }} />}
                >
                  {sessionTypes.map((type) => (
                    <MenuItem 
                      key={type.value} 
                      value={type.value}
                      sx={{
                        '&:hover': {
                          backgroundColor: 'var(--light-blue)'
                        },
                        '&.Mui-selected': {
                          backgroundColor: 'var(--light-blue)'
                        }
                      }}
                    >
                      {type.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                fullWidth
                type="date"
                label="Date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: <CalendarToday sx={{ color: 'var(--gray-color)', mr: 1 }} />,
                  sx: {
                    borderRadius: 'var(--radius-md)',
                    '& fieldset': {
                      borderColor: 'var(--light-gray)'
                    }
                  }
                }}
                sx={{ flex: 1 }}
              />
            </Box>

            <Typography variant="subtitle2" sx={{ 
              color: 'var(--dark-color)',
              mb: 1,
              fontWeight: 600
            }}>
              Available Time Slots
            </Typography>
            <Box sx={{ 
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1,
              mb: 3
            }}>
              {availableTimeSlots.map((slot) => (
                <Chip
                  key={slot}
                  label={slot}
                  clickable
                  variant={time === slot ? 'filled' : 'outlined'}
                  onClick={() => setTime(slot)}
                  icon={<Schedule sx={{ 
                    fontSize: 16,
                    color: time === slot ? 'var(--white)' : 'var(--primary-color)' 
                  }} />}
                  sx={{
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: time === slot ? 'var(--primary-color)' : 'transparent',
                    color: time === slot ? 'var(--white)' : 'var(--dark-color)',
                    borderColor: 'var(--light-gray)',
                    '&:hover': {
                      backgroundColor: time === slot ? 'var(--primary-dark)' : 'var(--light-blue)'
                    },
                    transition: 'var(--transition)'
                  }}
                />
              ))}
            </Box>

            <TextField
              fullWidth
              multiline
              rows={4}
              label="Additional Notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              InputProps={{
                startAdornment: <Notes sx={{ 
                  color: 'var(--gray-color)', 
                  mr: 1,
                  alignSelf: 'flex-start',
                  mt: 1
                }} />,
                sx: {
                  borderRadius: 'var(--radius-md)',
                  '& fieldset': {
                    borderColor: 'var(--light-gray)'
                  }
                }
              }}
              sx={{ mb: 3 }}
            />
          </form>
        )}
      </DialogContent>

      {!success && (
        <DialogActions sx={{
          px: 3,
          pb: 3,
          justifyContent: 'space-between',
          position: 'sticky',
          bottom: 0,
          backgroundColor: 'var(--white)',
          borderTop: '1px solid var(--light-gray)'
        }}>
          <Button
            onClick={handleClose}
            size={isMobile ? 'small' : 'medium'}
            sx={{
              color: 'var(--gray-color)',
              '&:hover': {
                color: 'var(--dark-color)',
                backgroundColor: 'var(--light-gray)'
              }
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={!date || !time || !sessionType || isSubmitting}
            size={isMobile ? 'small' : 'medium'}
            onClick={handleSubmit}
            sx={{
              background: `linear-gradient(45deg, var(--primary-color) 0%, var(--secondary-color) 100%)`,
              color: 'var(--white)',
              borderRadius: 'var(--radius-md)',
              px: 4,
              '&:hover': {
                background: `linear-gradient(45deg, var(--primary-dark) 0%, var(--secondary-color) 100%)`,
                transform: 'translateY(-2px)',
                boxShadow: 'var(--shadow-md)'
              },
              transition: 'var(--transition)',
              '&.Mui-disabled': {
                background: 'var(--light-gray)'
              }
            }}
          >
            {isSubmitting ? 'Booking...' : 'Confirm Booking'}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
}