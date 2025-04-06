import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Paper, 
  Divider, 
  Slide, 
  Fade, 
  Grow,
  useMediaQuery,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import { 
  Star, 
  StarBorder, 
  WorkspacePremium, 
  CheckCircle,
  ArrowUpward,
  ArrowDownward
} from '@mui/icons-material';
import { keyframes } from '@emotion/react';
import { useNavigate } from 'react-router';


const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0px); }
`;

const highlight = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(255, 126, 95, 0.4); }
  100% { box-shadow: 0 0 0 10px rgba(255, 126, 95, 0); }
`;



const PromotionPage = ({registered}) => {

  const navigate = useNavigate()
  
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');

  const plans = [
    {
      name: 'Free',
      price: '$0',
      position: 'Random placement',
      description: 'Basic visibility on our platform',
      features: ['Standard listing', 'Community access', 'Basic analytics'],
      color: 'var(--secondary-color)',
      icon: <StarBorder sx={{ color: 'var(--gray-color)' }} />
    },
    {
      name: 'Silver',
      price: '$9.99',
      position: 'Top 10 placement',
      description: 'Enhanced visibility for more clients',
      features: ['Priority in search results', 'Silver badge', 'Enhanced analytics', 'Email support'],
      color: 'var(--primary-color)',
      icon: <Star sx={{ color: 'var(--primary-color)' }} />,
      popular: false
    },
    {
      name: 'Gold',
      price: '$13.99',
      position: 'Top 3 placement',
      description: 'Maximum visibility and premium features',
      features: ['Top placement', 'Gold badge', 'Advanced analytics', '24/7 priority support', 'Profile highlighting'],
      color: 'var(--accent-color)',
      icon: <WorkspacePremium sx={{ color: 'var(--accent-color)' }} />,
      popular: true
    }
  ];

  const [error, setError] = useState("")

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    setError("")
    // Simulate payment processing
    setTimeout(async () => {
      try {
        // After delay, send request to update the plan
        const response = await fetch('http://localhost:5000/therapist/plan', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // If you're using cookies for auth
          body: JSON.stringify({
            plan: selectedPlan.name
          }),
        });
  
        if (response.ok) {
          setPaymentSuccess(true);
        } else {
          if (response.status === 404) {
            setError("You need to register as a therapist first");
          
            // Clear the error after 2 seconds
            setTimeout(() => {
              navigate("/therapist")
            }, 2000);
          }
          const errorData = await response.json();
          console.error('Failed to update plan:', errorData);
        }
      } catch (error) {
        console.error('Error during plan update:', error);
      } finally {
        setIsProcessing(false);
      }
    }, 2000);
  };

  const handleContinue = () => {

    window.location.href = '/dashboard';
  };

  if (paymentSuccess) {
    return (
      <Fade in timeout={500}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          textAlign: 'center',
          p: 4,
        }}>
          <CheckCircle sx={{
            fontSize: 80,
            color: 'var(--secondary-color)',
            mb: 3,
            animation: `${pulse} 2s infinite`,
          }} />
          <Typography variant="h4" sx={{ 
            fontWeight: 700,
            mb: 2,
            color: 'var(--primary-dark)',
          }}>
            Payment Successful!
          </Typography>
          <Typography variant="body1" sx={{ 
            mb: 4,
            color: 'var(--gray-color)',
            maxWidth: '500px',
          }}>
            Your {selectedPlan.name} membership has been activated. You now have {selectedPlan.position.toLowerCase()} on our platform.
          </Typography>
          <Button
            variant="contained"
            onClick={handleContinue}
            sx={{
              background: 'linear-gradient(45deg, var(--primary-color) 0%, var(--primary-dark) 100%)',
              color: 'var(--primary-colour)',
              px: 4,
              borderRadius: 'var(--radius-md)',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: 'var(--shadow-md)',
              },
              transition: 'var(--transition)',
            }}
          >
            Continue to Dashboard
          </Button>
        </Box>
      </Fade>
    );
  }

  return (
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
      <Box sx={{
        maxWidth: '1200px',
        mx: 'auto',
        width: '100%',
      }}>
        <Slide direction="down" in timeout={500}>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h3" sx={{ 
              fontWeight: 700,
              mb: 2,
              color: 'var(--primary-dark)',
              fontFamily: 'var(--font-heading)',
              background: 'linear-gradient(to right, var(--primary-color), var(--accent-color))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Boost Your Visibility
            </Typography>
            <Typography variant="body1" sx={{ 
              color: 'var(--gray-color)',
              maxWidth: '700px',
              mx: 'auto',
            }}>
              Choose a promotion plan that fits your needs and get more clients today.
            </Typography>
          </Box>
        </Slide>

        <Box sx={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: 4,
          mb: 6,
        }}>
          {plans.map((plan, index) => (
            <Grow in timeout={(index + 1) * 300} key={plan.name}>
              <Paper elevation={3} sx={{
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                position: 'relative',
                border: selectedPlan?.name === plan.name ? 
                  `2px solid ${plan.color}` : 
                  '2px solid transparent',
                transition: 'var(--transition)',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 'var(--shadow-lg)',
                },
                ...(plan.popular && {
                  animation: `${highlight} 2s infinite alternate`,
                })
              }}>
                {plan.popular && (
                  <Box sx={{
                    position: 'absolute',
                    top: 0,
                    right: 20,
                    backgroundColor: 'var(--accent-color)',
                    color: 'var(--white)',
                    px: 2,
                    py: 0.5,
                    borderRadius: '0 0 var(--radius-sm) var(--radius-sm)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                  }}>
                    Most Popular
                  </Box>
                )}
                <Box sx={{
                  p: 4,
                  textAlign: 'center',
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  backdropFilter: 'blur(5px)',
                }}>
                  <Box sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    backgroundColor: `${plan.color}20`,
                    mb: 2,
                  }}>
                    {React.cloneElement(plan.icon, { sx: { fontSize: 30 } })}
                  </Box>
                  <Typography variant="h5" sx={{ 
                    fontWeight: 700,
                    mb: 1,
                    color: 'var(--dark-color)',
                  }}>
                    {plan.name}
                  </Typography>
                  <Typography variant="h3" sx={{ 
                    fontWeight: 700,
                    mb: 2,
                    color: plan.color,
                  }}>
                    {plan.price}
                    {plan.price !== '$0' && <Typography component="span" variant="body2" sx={{ 
                      color: 'var(--gray-color)',
                      ml: 0.5,
                    }}>/mo</Typography>}
                  </Typography>
                  <Typography variant="body1" sx={{ 
                    fontWeight: 600,
                    mb: 2,
                    color: 'var(--dark-color)',
                  }}>
                    {plan.position}
                  </Typography>
                  <Typography variant="body2" sx={{ 
                    mb: 3,
                    color: 'var(--gray-color)',
                    minHeight: '40px',
                  }}>
                    {plan.description}
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <List sx={{ textAlign: 'left', mb: 3 }}>
                    {plan.features.map((feature, i) => (
                      <ListItem key={i} sx={{ 
                        px: 0,
                        py: 0.5,
                        '&:before': {
                          content: '"•"',
                          color: plan.color,
                          fontWeight: 'bold',
                          display: 'inline-block',
                          width: '1em',
                          ml: '-1em',
                        }
                      }}>
                        <ListItemText primary={feature} primaryTypographyProps={{ 
                          variant: 'body2',
                          color: 'var(--dark-color)',
                        }} />
                      </ListItem>
                    ))}
                  </List>
                  <Button
                    variant={selectedPlan?.name === plan.name ? 'contained' : 'outlined'}
                    onClick={() => handleSelectPlan(plan)}
                    sx={{
                      width: '100%',
                      py: 1.5,
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: selectedPlan?.name === plan.name ? plan.color : 'transparent',
                      color: selectedPlan?.name === plan.name ? 'var(--primary-colour)' : plan.color,
                      borderColor: plan.color,
                      '&:hover': {
                        backgroundColor: selectedPlan?.name === plan.name ? plan.color : `${plan.color}10`,
                      },
                      transition: 'var(--transition)',
                    }}
                  >
                    {selectedPlan?.name === plan.name ? 'Selected' : 'Select Plan'}
                  </Button>
                </Box>
              </Paper>
            </Grow>
          ))}
        </Box>

        {selectedPlan && (
        <Fade in timeout={500}>
          <Paper
            elevation={4}
            sx={{
              borderRadius: 'var(--radius-lg)',
              p: 4,
              mb: 4,
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(5px)',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 2,
              }}
            >
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: 'var(--dark-color)',
                    mb: 1,
                  }}
                >
                  You selected:{' '}
                  <Box component="span" sx={{ color: selectedPlan.color }}>
                    {selectedPlan.name} Plan
                  </Box>
                </Typography>
                <Typography variant="body1" sx={{ color: 'var(--gray-color)' }}>
                  {selectedPlan.position} • {selectedPlan.description}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Button
                  variant="contained"
                  onClick={handlePayment}
                  disabled={isProcessing}
                  startIcon={isProcessing ? null : <ArrowUpward />}
                  sx={{
                    background: `linear-gradient(45deg, ${selectedPlan.color} 0%, ${selectedPlan.color}80 100%)`,
                    color: `${selectedPlan.color}`,
                    py: 1.5,
                    px: 4,
                    borderRadius: 'var(--radius-md)',
                    minWidth: '200px',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: 'var(--shadow-md)',
                    },
                    '&:disabled': {
                      background: 'var(--light-gray)',
                      color: 'var(--gray-color)',
                    },
                    transition: 'var(--transition)',
                  }}
                >
                  {isProcessing ? 'Processing...' : `Upgrade for ${selectedPlan.price}`}
                </Button>

                {/* Error Message Below Button */}
                {error && <p className="error" style={{ marginTop: '8px' }}>{error}</p>}
              </Box>
            </Box>
          </Paper>
        </Fade>
      )}


        <Slide direction="up" in timeout={700}>
          <Paper elevation={4} sx={{
            borderRadius: 'var(--radius-lg)',
            p: 4,
            backgroundColor: 'rgba(74, 111, 165, 0.1)',
          }}>
            <Typography variant="h6" sx={{ 
              fontWeight: 600,
              mb: 2,
              color: 'var(--primary-dark)',
              display: 'flex',
              alignItems: 'center',
            }}>
              How Promotion Works
            </Typography>
            <Box sx={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
              gap: 3,
            }}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Box sx={{
                  flexShrink: 0,
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  backgroundColor: 'var(--light-blue)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--primary-color)',
                  fontWeight: 700,
                }}>
                  1
                </Box>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'var(--dark-color)' }}>
                    Choose Your Plan
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'var(--gray-color)' }}>
                    Select between Free, Silver, or Gold promotion levels
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Box sx={{
                  flexShrink: 0,
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  backgroundColor: 'var(--light-blue)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--primary-color)',
                  fontWeight: 700,
                }}>
                  2
                </Box>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'var(--dark-color)' }}>
                    Make Payment
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'var(--gray-color)' }}>
                    Securely pay for your selected promotion plan
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Box sx={{
                  flexShrink: 0,
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  backgroundColor: 'var(--light-blue)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--primary-color)',
                  fontWeight: 700,
                }}>
                  3
                </Box>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'var(--dark-color)' }}>
                    Get More Clients
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'var(--gray-color)' }}>
                    Enjoy increased visibility and more client requests
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Slide>
      </Box>
    </Box>
  );
};

export default PromotionPage;