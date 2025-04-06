import React, { useState } from 'react';
import { 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle, 
  Button,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Slide,
  IconButton,
  Divider,
  Typography,
  Box,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { Close, Favorite, Payment, AttachMoney } from '@mui/icons-material';
import { useNavigate } from 'react-router';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Donation({ open, handleClose }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccess(true);
      setTimeout(() => {
        handleClose();
        setSuccess(false);
      }, 2000);
    } catch (err) {
      setError('Payment failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const presetAmounts = [50, 100, 200, 500, 1000];

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      fullScreen={isMobile}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: '500px' },
          maxWidth: '100%',
          maxHeight: { xs: '100%', sm: '90vh' },
          backgroundColor: 'var(--white)',
          borderRadius: { xs: 0, sm: 'var(--radius-lg)' },
          boxShadow: { xs: 'none', sm: 'var(--shadow-lg)' },
          overflow: 'hidden',
          transition: 'var(--transition)',
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
        zIndex: 1
      }}>
        <Box display="flex" alignItems="center">
          <Favorite sx={{ mr: 1 }} />
          <Typography variant="h6" sx={{ fontFamily: 'var(--font-heading)' }}>
            Support Our Mission
          </Typography>
        </Box>
        <IconButton 
          onClick={handleClose}
          sx={{ color: 'var(--white)' }}
        >
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
            backgroundColor: 'var(--light-color)',
            minHeight: { xs: 'calc(100vh - 200px)', sm: '300px' }
          }}>
            <Favorite sx={{ 
              fontSize: 60, 
              color: 'var(--accent-color)',
              mb: 2,
              animation: 'pulse 1.5s infinite'
            }} />
            <Typography variant="h5" sx={{ 
              color: 'var(--primary-dark)',
              fontFamily: 'var(--font-heading)',
              mb: 2,
              textAlign: 'center'
            }}>
              Thank You!
            </Typography>
            <Typography sx={{ 
              color: 'var(--dark-color)', 
              textAlign: 'center',
              maxWidth: '300px'
            }}>
              Your donation will help us continue our important work.
            </Typography>
          </Box>
        ) : (
          <form onSubmit={handleSubmit}>
            <Typography variant="body1" sx={{ 
              mb: 3,
              color: 'var(--dark-color)',
              textAlign: { xs: 'center', sm: 'left' }
            }}>
              Your contribution makes a difference. Please enter your donation details.
            </Typography>

            <FormControl fullWidth sx={{ mb: 3 }}>
              <FormLabel sx={{ 
                color: 'var(--dark-color)',
                mb: 1,
                fontWeight: 600
              }}>
                Donation Amount
              </FormLabel>
              <Box display="flex" gap={1} flexWrap="wrap" mb={2}>
                {presetAmounts.map((amt) => (
                  <Button
                    key={amt}
                    variant={amount === amt.toString() ? 'contained' : 'outlined'}
                    onClick={() => setAmount(amt.toString())}
                    startIcon={<AttachMoney />}
                    size={isMobile ? 'small' : 'medium'}
                    sx={{
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: amount === amt.toString() ? 'var(--accent-color)' : 'transparent',
                      color: amount === amt.toString() ? 'var(--white)' : 'var(--dark-color)',
                      borderColor: 'var(--light-gray)',
                      '&:hover': {
                        borderColor: 'var(--accent-color)',
                        backgroundColor: amount === amt.toString() ? 'var(--accent-color)' : 'var(--light-blue)'
                      },
                      flex: isMobile ? '1 1 40%' : 'none',
                      minWidth: isMobile ? 'auto' : '80px'
                    }}
                  >
                    {amt}
                  </Button>
                ))}
              </Box>
              <TextField
                fullWidth
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Or enter custom amount"
                InputProps={{
                  startAdornment: <AttachMoney sx={{ color: 'var(--gray-color)', mr: 1 }} />,
                  sx: {
                    borderRadius: 'var(--radius-md)',
                    '& fieldset': {
                      borderColor: 'var(--light-gray)'
                    },
                    '&:hover fieldset': {
                      borderColor: 'var(--primary-color)'
                    }
                  }
                }}
              />
            </FormControl>

            <Divider sx={{ my: 3, borderColor: 'var(--light-gray)' }} />

            <TextField
              fullWidth
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ mb: 3 }}
              size={isMobile ? 'small' : 'medium'}
              InputProps={{
                sx: {
                  borderRadius: 'var(--radius-md)',
                  '& fieldset': {
                    borderColor: 'var(--light-gray)'
                  }
                }
              }}
            />

            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 3 }}
              size={isMobile ? 'small' : 'medium'}
              InputProps={{
                sx: {
                  borderRadius: 'var(--radius-md)',
                  '& fieldset': {
                    borderColor: 'var(--light-gray)'
                  }
                }
              }}
            />

            <FormControl component="fieldset" fullWidth>
              <FormLabel component="legend" sx={{ 
                color: 'var(--dark-color)',
                mb: 1,
                fontWeight: 600
              }}>
                Payment Method
              </FormLabel>
              <RadioGroup
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                sx={{ gap: 1 }}
              >
                <FormControlLabel
                  value="card"
                  control={
                    <Radio sx={{ 
                      color: 'var(--primary-color)',
                      '&.Mui-checked': {
                        color: 'var(--accent-color)'
                      }
                    }} />
                  }
                  label={
                    <Box display="flex" alignItems="center">
                      <Payment sx={{ color: 'var(--primary-color)', mr: 1 }} />
                      <Typography variant={isMobile ? 'body2' : 'body1'}>
                        Credit/Debit Card
                      </Typography>
                    </Box>
                  }
                  sx={{
                    backgroundColor: paymentMethod === 'card' ? 'var(--light-blue)' : 'transparent',
                    borderRadius: 'var(--radius-sm)',
                    px: 2,
                    py: 1,
                    m: 0
                  }}
                />
                <FormControlLabel
                  value="paypal"
                  control={
                    <Radio sx={{ 
                      color: 'var(--primary-color)',
                      '&.Mui-checked': {
                        color: 'var(--accent-color)'
                      }
                    }} />
                  }
                  label={<Typography variant={isMobile ? 'body2' : 'body1'}>PayPal</Typography>}
                  sx={{
                    backgroundColor: paymentMethod === 'paypal' ? 'var(--light-blue)' : 'transparent',
                    borderRadius: 'var(--radius-sm)',
                    px: 2,
                    py: 1,
                    m: 0
                  }}
                />
              </RadioGroup>
            </FormControl>

            {error && (
              <Typography color="error" sx={{ mt: 2, textAlign: 'center' }}>
                {error}
              </Typography>
            )}
          </form>
        )}
      </DialogContent>

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
              color: 'var(--dark-color)'
            }
          }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          disabled={!amount || isSubmitting}
          startIcon={<Favorite />}
          size={isMobile ? 'small' : 'medium'}
          onClick={handleSubmit}
          sx={{
            background: `linear-gradient(45deg, var(--primary-color) 0%, var(--accent-color) 100%)`,
            color: 'var(--white)',
            borderRadius: 'var(--radius-md)',
            px: 4,
            py: 1,
            '&:hover': {
              background: `linear-gradient(45deg, var(--primary-dark) 0%, var(--accent-color) 100%)`,
              transform: 'translateY(-2px)',
              boxShadow: 'var(--shadow-md)'
            },
            transition: 'var(--transition)',
            '&.Mui-disabled': {
              background: 'var(--light-gray)'
            }
          }}
        >
          {isSubmitting ? 'Processing...' : 'Donate Now'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}