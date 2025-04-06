import React, { useState } from 'react';
import { 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle, 
  Button,
  CircularProgress,
  Slide,
  useMediaQuery,
  useTheme
} from '@mui/material';
import CustomSelect from './Select';
import { useNavigate } from 'react-router';
import { styled } from '@mui/material/styles';
import { keyframes } from '@emotion/react';

// Animation for background gradient
const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    width: '500px',
    maxWidth: '95vw',
    backgroundColor: 'var(--white)',
    borderRadius: 'var(--radius-lg)',
    boxShadow: 'var(--shadow-lg)',
    overflow: 'hidden',
    transition: 'var(--transition)',
    fontFamily: 'var(--font-main)',
    [theme.breakpoints.down('sm')]: {
      margin: '8px',
      maxWidth: 'calc(100vw - 16px)',
    },
  },
  '& .MuiBackdrop-root': {
    backgroundColor: 'rgba(74, 111, 165, 0.5)',
    backdropFilter: 'blur(4px)',
  },
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  background: `linear-gradient(135deg, var(--primary-color), var(--primary-dark))`,
  color: 'var(--white)',
  padding: 'var(--padding)',
  fontSize: '1.4rem',
  fontWeight: '600',
  fontFamily: 'var(--font-heading)',
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `linear-gradient(135deg, 
      rgba(255, 255, 255, 0.1) 0%, 
      rgba(255, 255, 255, 0.05) 50%, 
      rgba(255, 255, 255, 0.1) 100%)`,
    animation: `${gradientAnimation} 8s ease infinite`,
    backgroundSize: '400% 400%',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.2rem',
    padding: '0.8rem',
  },
}));

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: 'var(--padding)',
  color: 'var(--dark-color)',
  transition: 'var(--transition)',
  '& .error': {
    color: 'var(--error-color)',
    marginTop: '12px',
    fontSize: '0.9rem', 
    fontWeight: '500',
    animation: '$fadeIn 0.3s ease-out',
  },
  '& p': {
    marginBottom: '1.5rem',
    color: 'var(--gray-color)',
    fontFamily: 'var(--font-main)',
    lineHeight: '1.6',
    transition: 'var(--transition)',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '0.8rem',
  },
}));

const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  padding: 'var(--padding)',
  background: 'var(--light-color)',
  borderTop: '1px solid var(--light-gray)',
  justifyContent: 'center',
  [theme.breakpoints.down('sm')]: {
    padding: '0.8rem',
    flexDirection: 'column',
    gap: '8px',
  },
}));

const ConfirmButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(135deg, var(--primary-color), var(--primary-dark))`,
  color: 'var(--white)',
  borderRadius: 'var(--radius-md)',
  padding: '12px 28px',
  fontWeight: '600',
  textTransform: 'none',
  boxShadow: 'none',
  transition: 'var(--transition)',
  fontFamily: 'var(--font-main)',
  position: 'relative',
  overflow: 'hidden',
  minWidth: '160px',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: 'var(--shadow-md)',
    '&::before': {
      opacity: 1,
    },
  },
  '&:active': {
    transform: 'translateY(0)',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `linear-gradient(135deg, 
      rgba(255, 255, 255, 0.2) 0%, 
      rgba(255, 255, 255, 0.1) 50%, 
      rgba(255, 255, 255, 0.2) 100%)`,
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  '&.Mui-disabled': {
    background: 'var(--light-gray)',
    color: 'var(--gray-color)',
    transform: 'none',
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    padding: '10px 16px',
  },
}));

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

export default function SimpleDialog({ open, handleClose }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (event) => {
    setValue(event.target.value);
    if (error) setError("");
  };

  const handleRole = async () => {
    if (!value) {
      setError("Please select a role to continue");
      return;
    }
    
    setIsLoading(true);
    setError("");
    
    try {
      const response = await fetch("http://localhost:5000/users/change-role", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({ value }),
      });
  
      if (!response.ok) {
        throw new Error("Server responded with an error");
      }
  
      const data = await response.json();
      handleClose();
            
      if (value === " therapist") {
        navigate("/therapist", {state: data.user});
      } else {
        navigate("/questionnaire");
      }
      
    } catch (error) {
      setError(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <StyledDialog
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      aria-labelledby="role-selection-dialog"
      fullScreen={isMobile}
    >
      <StyledDialogTitle id="role-selection-dialog">
        Welcome to Your Dashboard
      </StyledDialogTitle>

      <StyledDialogContent>
        <p style={{ animation: `${fadeIn} 0.4s ease-out` }}>
          Please select your role to continue. This will determine your dashboard experience.
        </p>
        <div style={{ animation: `${fadeIn} 0.5s ease-out` }}>
          <CustomSelect value={value} handleChange={handleChange} />
        </div>
        {error && <p className='error' style={{ animation: `${fadeIn} 0.3s ease-out` }}>{error}</p>}
      </StyledDialogContent>

      <StyledDialogActions>
        <ConfirmButton
          onClick={handleRole}
          disabled={isLoading || !value}
          autoFocus
          style={{ animation: `${fadeIn} 0.6s ease-out` }}
        >
          {isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            'Confirm Role'
          )}
        </ConfirmButton>
      </StyledDialogActions>
    </StyledDialog>
  );
}