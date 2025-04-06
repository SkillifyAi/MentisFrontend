import React, { useEffect, useState } from 'react';
// import Button from '@mui/material/Button';
import { 
  Box, 
  Typography, 
  Avatar, 
  Paper, 
  Divider, 
  Button, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  Slide,
  Fade,
  useMediaQuery
} from '@mui/material';
import { 
  AccountCircle, 
  Email, 
  Category, 
  WorkspacePremium, 
  Star, 
  StarBorder,
  Settings,
  ExitToApp,
  Edit,
  Psychology,
  Home,
} from '@mui/icons-material';

import AssignmentIcon from '@mui/icons-material/Assignment';
import { useNavigate } from 'react-router';
import { keyframes } from '@emotion/react';

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
  100% { transform: translateY(0px); }
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(74, 111, 165, 0.4); }
  70% { box-shadow: 0 0 0 15px rgba(74, 111, 165, 0); }
  100% { box-shadow: 0 0 0 0 rgba(74, 111, 165, 0); }
`;

const ProfilePage = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:600px)');
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState()

  // Default user data if none provided
  

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => setLoading(false), 800);
      const getData = async () => {
        try {
          const response = await fetch('http://localhost:5000/users/profile', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              // Include credentials if needed (for cookies, etc.)
            },
            credentials: 'include',
          });
  
          if (response.status !== 200) {
            navigate("/unauthorized")
            throw new Error('Failed to fetch profile data');
            
          }
  
          const data = await response.json();

          setUser(data.user)


        } catch (err) {
          navigate("/unauthorized")
          setError(err.message); // Set error if request fails
        }
      };
      getData(); 
    return () => clearTimeout(timer);
  }, []);

  const handleEditProfile = () => {
    navigate('/therapist', {state: user});
  };

  const handleQuestion = () => {
    navigate("/questionnaire")
  }
  const handleHome = () => {
    navigate('/dashboard');
  };

  const handleLogout = async () => {
    try {
      // Send a request to the server to log out the user
      const response = await fetch('http://localhost:5000/users/logout', {
        method: 'POST', // or 'GET', depending on how your server handles the logout request
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Optional, if you're using cookies for sessions
      });
  
      // Check if the response is successful
      if (response.ok) {
        // Handle the success (optional: maybe clear user data from local state or localStorage)
        console.log('Logged out successfully');
      } else {
        // Handle error if logout failed
        console.error('Logout failed');
      }
    } catch (error) {
      // Handle any network errors or issues
      console.error('Error during logout:', error);
    }
  
    // Navigate to the home page or desired route after logout
    navigate('/');
  };
  

  return (
    <Fade in={!loading} timeout={500}>
      <Box sx={{
        minHeight: '100vh',
        background: `
          radial-gradient(circle at 10% 20%, var(--light-blue) 0%, transparent 20%),
          radial-gradient(circle at 90% 80%, var(--secondary-color) 0%, transparent 20%),
          linear-gradient(to bottom, var(--white), var(--light-color))
        `,
        backgroundAttachment: 'fixed',
        py: 8,
        px: isMobile ? 2 : 4,
      }}>
        <Slide direction="up" in={!loading} timeout={500}>
          <Box sx={{
            maxWidth: '800px',
            mx: 'auto',
            width: '100%',
          }}>
            <Paper elevation={6} sx={{
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-xl)',
              mb: 4,
            }}>
              {/* Profile Header */}
              <Box sx={{
                background: 'linear-gradient(135deg, var(--primary-color), var(--primary-dark))',
                p: 4,
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
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
                }
              }}>
                <Box sx={{
                  position: 'relative',
                  display: 'inline-block',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    borderRadius: '50%',
                    animation: 'pulse 2s infinite',
                    pointerEvents: 'none',
                  }
                }}>
                  {user && <Avatar
                    sx={{
                      width: 120,
                      height: 120,
                      bgcolor: user.role === 'therapist' ? 
                        (user.isPremium ? 'var(--accent-color)' : 'var(--primary-color)') : 
                        'var(--secondary-color)',
                      color: 'var(--white)',
                      fontSize: '3rem',
                      border: '4px solid var(--white)',
                      boxShadow: 'var(--shadow-md)',
                      animation: `${float} 6s infinite ease-in-out`,
                      mb: 2,
                    }}
                  >
                    {user && user.username?.charAt(0) || <AccountCircle sx={{ fontSize: '3.5rem' }} />}
                  </Avatar>}
                </Box> 

                {user && <Typography variant="h4" sx={{
                  fontWeight: 700,
                  color: 'var(--white)',
                  mb: 1,
                  fontFamily: 'var(--font-heading)',
                  position: 'relative',
                }}>
                  {user.username}
                </Typography>}

                <Box sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  px: 3,
                  py: 1,
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(5px)',
                  mb: 2,
                }}>
                  {user && user.role === 'therapist' && (
                    user.isPremium ? (
                      <Star sx={{ 
                        fontSize: '1.2rem',
                        mr: 1,
                        color: 'var(--accent-color)'
                      }} />
                    ) : (
                      <StarBorder sx={{ 
                        fontSize: '1.2rem',
                        mr: 1,
                        color: 'var(--white)'
                      }} />
                    )
                  )}
                  <Typography variant="body1" sx={{ 
                    fontWeight: 600,
                    color: 'var(--white)',
                    textTransform: 'capitalize',
                  }}>
                    {user && user.role} {user && user.role === 'therapist' && user.isPremium && 'Premium'}
                  </Typography>
                </Box>
              </Box>

              {/* Profile Content */}
              <Box sx={{ p: isMobile ? 2 : 4 }}>
                <Typography variant="h6" sx={{ 
                  fontWeight: 600,
                  mb: 3,
                  color: 'var(--primary-dark)',
                  display: 'flex',
                  alignItems: 'center',
                }}>
                  <Psychology sx={{ mr: 1, color: 'var(--primary-color)' , animation: 'pulse 2s infinite'}} />
                  Account Information
                </Typography>

                <List sx={{ mb: 3 }}>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <Email sx={{ color: 'var(--primary-color)' }} />
                    </ListItemIcon>
                    {user && <ListItemText 
                      primary="Email Address" 
                      secondary={user.email}
                      secondaryTypographyProps={{ 
                        sx: { 
                          color: 'var(--dark-color)',
                          wordBreak: 'break-all'
                        } 
                      }}
                    />}
                  </ListItem>

                  <Divider component="li" sx={{ my: 1 }} />

                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <Category sx={{ color: 'var(--primary-color)' }} />
                    </ListItemIcon>
                  {user &&  <ListItemText 
                      primary="Account Type" 
                      secondary={
                        <Box component="span" sx={{
                          color: user.role === 'therapist' ? 
                            (user.isPremium ? 'var(--accent-color)' : 'var(--primary-color)') : 
                            'var(--secondary-color)',
                          fontWeight: 500,
                        }}>
                          {user.role} {user.role === 'therapist' && user.isPremium && '(Premium)'}
                        </Box>
                      }
                    /> }
                  </ListItem>

                  {user && user.role === 'therapist' && (
                    <>
                      <Divider component="li" sx={{ my: 1 }} />
                      <ListItem sx={{ px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <WorkspacePremium sx={{ color: 'var(--primary-color)' }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary="Membership Status" 
                          secondary={
                            <Box component="span" sx={{
                              color: user.isPremium ? 'var(--accent-color)' : 'var(--gray-color)',
                              fontWeight: 500,
                            }}>
                              {user.isPremium ? 'Premium Member' : 'Standard Member'}
                            </Box>
                          }
                        />
                      </ListItem>
                    </>
                  )}
                </List>

                <Box sx={{ 
                  display: 'flex',
                  flexDirection: isMobile ? 'column' : 'row',
                  gap: 2,
                  mt: 4,
                }}>
                  {user && user.role === "therapist" && <Button
                    variant="contained"
                    startIcon={<Edit />}
                    onClick={handleEditProfile}
                    sx={{
                      flex: 1,
                      background: 'linear-gradient(45deg, var(--primary-color) 0%, var(--primary-dark) 100%)',
                      color: 'var(--white)',
                      py: 1.5,
                      borderRadius: 'var(--radius-md)',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: 'var(--shadow-md)',
                      },
                      transition: 'var(--transition)',
                    }}
                  >
                    {!user.registered ? "Register Profile" : "Edit profle"}
                  </Button>}
                  {user && user.role === "member" && user.diagnoses && user.diagnoses.length === 0 && <Button
                    variant="contained"
                    startIcon={<AssignmentIcon/>}
                    onClick={handleQuestion}
                    sx={{
                      flex: 1,
                      background: 'linear-gradient(45deg, var(--primary-color) 0%, var(--primary-dark) 100%)',
                      color: 'var(--white)',
                      py: 1.5,
                      borderRadius: 'var(--radius-md)',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: 'var(--shadow-md)',
                      },
                      transition: 'var(--transition)',
                    }}
                  >
                   {user.diagnoses.length === 0 ? "Get diagnosed" : "New diagnostic"}  
                  </Button>}
                  <Button
                    variant="outlined"
                    startIcon={<Home />}
                    onClick={handleHome}
                    sx={{
                      flex: 1,
                      borderColor: 'var(--light-gray)',
                      color: 'var(--dark-color)',
                      py: 1.5,
                      borderRadius: 'var(--radius-md)',
                      '&:hover': {
                        backgroundColor: 'var(--light-color)',
                        borderColor: 'var(--primary-color)',
                      },
                      transition: 'var(--transition)',
                    }}
                  >
                    Dashboard
                  </Button>

                  <Button
                    variant="outlined"
                    startIcon={<ExitToApp />}
                    onClick={handleLogout}
                    sx={{
                      flex: 1,
                      borderColor: 'var(--light-gray)',
                      color: 'var(--error-color)',
                      py: 1.5,
                      borderRadius: 'var(--radius-md)',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 51, 51, 0.05)',
                        borderColor: 'var(--error-color)',
                      },
                      transition: 'var(--transition)',
                    }}
                  >
                    Logout
                  </Button>
                </Box>
              </Box>
              {user && user.role === 'member' && user.diagnoses && user.diagnoses.length > 0 && (
  <Box sx={{ mt: 4 }}>
    <Typography variant="h6" sx={{ 
      fontWeight: 600,
      mb: 3,
      color: 'var(--primary-dark)',
      display: 'flex',
      alignItems: 'center',
    }}>
      <AssignmentIcon sx={{ mr: 1, color: 'var(--primary-color)' }} />
      Your Diagnoses
    </Typography>
    <Box sx={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
      gap: 2 
    }}>
      {user.diagnoses.map((diagnosis, index) => (
        <Paper key={index} sx={{
          p: 3,
          borderRadius: 'var(--radius-md)',
          backgroundColor: 'rgba(74, 111, 165, 0.1)',
          boxShadow: 'var(--shadow-lg)',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            boxShadow: 'var(--shadow-xl)',
            transform: 'translateY(-5px)',
          },
        }}>
          <Typography variant="h6" sx={{
            fontWeight: 600,
            color: 'var(--primary-dark)',
            mb: 1,
          }}>
            Diagnosis {index + 1}
          </Typography>
          <Typography variant="body2" sx={{
            color: 'var(--dark-color)',
            lineHeight: 1.5,
            fontWeight: 500,
            whiteSpace: 'pre-line', // allows for multiline diagnosis descriptions
          }}>
            {diagnosis}
          </Typography>
        </Paper>
      ))}
    </Box>
  </Box>
)}

            </Paper>

            {/* Additional Stats Section */}
            {/* {user && user.role === 'therapist' && (
              <Slide direction="up" in={!loading} timeout={700}>
                <Paper elevation={4} sx={{
                  borderRadius: 'var(--radius-lg)',
                  p: 4,
                  mb: 4,
                  background: 'linear-gradient(to right, rgba(74, 111, 165, 0.05), rgba(107, 179, 155, 0.05))',
                }}>
                  <Typography variant="h6" sx={{ 
                    fontWeight: 600,
                    mb: 3,
                    color: 'var(--primary-dark)',
                    display: 'flex',
                    alignItems: 'center',
                  }}>
                    <WorkspacePremium sx={{ mr: 1, color: 'var(--primary-color)' }} />
                    Therapist Statistics
                  </Typography>

                  <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                    gap: 3,
                  }}>
                    <Box sx={{
                      p: 3,
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'rgba(74, 111, 165, 0.1)',
                      textAlign: 'center',
                    }}>
                      <Typography variant="h4" sx={{ 
                        fontWeight: 700,
                        color: 'var(--primary-color)',
                        mb: 1,
                      }}>
                        42
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'var(--gray-color)' }}>
                        Active Clients
                      </Typography>
                    </Box>

                    <Box sx={{
                      p: 3,
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'rgba(107, 179, 155, 0.1)',
                      textAlign: 'center',
                    }}>
                      <Typography variant="h4" sx={{ 
                        fontWeight: 700,
                        color: 'var(--secondary-color)',
                        mb: 1,
                      }}>
                        128
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'var(--gray-color)' }}>
                        Total Sessions
                      </Typography>
                    </Box>

                    <Box sx={{
                      p: 3,
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'rgba(255, 126, 95, 0.1)',
                      textAlign: 'center',
                    }}>
                      <Typography variant="h4" sx={{ 
                        fontWeight: 700,
                        color: 'var(--accent-color)',
                        mb: 1,
                      }}>
                        {user && user.isPremium ? '4.9' : '4.7'}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'var(--gray-color)' }}>
                        Average Rating
                      </Typography>
                    </Box> */}
                  {/* </Box> */}
                {/* </Paper> */}
              {/* </Slide> */}
            {/* )} */}
          </Box>
        </Slide>
      </Box>
    </Fade>
  );
};

export default ProfilePage;