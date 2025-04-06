import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  LinearProgress,
  Fade,
  Slide,
  useMediaQuery,
  Alert,
  Collapse,
  Grow
} from '@mui/material';
import {
  ArrowBack,
  ArrowForward,
  Send,
  CheckCircle,
  Psychology,
  Favorite
} from '@mui/icons-material';
import { keyframes } from '@emotion/react';
import { useNavigate } from 'react-router';

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const subtlePattern = keyframes`
  0% { background-position: 0% 0%; }
  100% { background-position: 100% 100%; }
`;

const Questionnaire = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:600px)');
  const questions = [
    "Do you frequently experience intense mood swings, extreme sadness, or prolonged feelings of emptiness?",
    "Do you often feel excessively worried, anxious, or panicked, even when there's no clear reason?",
    "Have you noticed a significant decrease in your motivation, energy levels, or interest in activities you once enjoyed?",
    "Have your sleep patterns changed significantly (e.g., trouble falling asleep, waking up too early, oversleeping)?",
    "Do you struggle with focusing, forgetfulness, or difficulty making decisions more than usual?",
    "Do you often feel like isolating yourself from friends, family, or social situations?",
    "Do you experience frequent feelings of worthlessness, hopelessness, or guilt?",
    "Do you often feel unusually angry, frustrated, or aggressive, even over small things?",
    "Do you feel compelled to repeat certain actions (e.g., handwashing, checking things) or have intrusive, uncontrollable thoughts?",
    "Have you been experiencing headaches, stomach issues, or body aches without a medical reason?",
    "Do you sometimes feel detached from reality, your body, or the world around you, as if you're watching yourself from the outside?",
    "Have your eating patterns changed significantly (e.g., loss of appetite, binge eating, or fear of weight gain)?",
    "Do you rely on alcohol, drugs, or other substances to manage your emotions or stress?",
    "Do you ever hear voices, see things that others don't, or believe people are out to get you?",
    "Have you had thoughts of harming yourself or ending your life? (If yes, please seek help immediately.)"
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(''));
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [fieldError, setFieldError] = useState(false);

  const validateCurrentAnswer = () => {
    
    if (answers[currentQuestion].trim() === '') {
      setFieldError(true);
      setError('This question is required');
      return false;
    }

    setFieldError(false);
    setError('');
    return true;
  };

  const handleNext = () => {
    if (!validateCurrentAnswer()) return;
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleAnswerChange = (e) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = e.target.value;
    setAnswers(newAnswers);
    if (e.target.value.trim() !== '') {
      setFieldError(false);
      setError('');
    }
  };

  const handleClear = () => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = '';
    setAnswers(newAnswers);
    setFieldError(false);
  };

  const handleSubmit = async () => {

    if (!validateCurrentAnswer()) return;  
      
    const unanswered = answers.some(answer => answer.trim() === "");

   
    if (unanswered) {
      setError('Please answer all questions before submitting');
      return;
    }
    
    setLoading(true);
    const combined = questions.map((question, index) => ({
      question,
      answer: answers[index]
    }));


    try {
      
      const response = await fetch("http://localhost:5000/users/question", {
        method: "POST",
        credentials: "include", // include cookies in request
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(combined)
      });
      
      if(response.status === 401)
      {
        setError("You need to be a member, not a therapist")
        return
      }
      setIsSubmitted(true);
    } catch (err) {
      setError('Failed to submit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (isSubmitted) {
    return (
      <Fade in={true} timeout={500}>
        <Box sx={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          px: isMobile ? 2 : 4,
          background: `
            radial-gradient(circle at 10% 20%, rgba(107, 179, 155, 0.1) 0%, rgba(107, 179, 155, 0) 20%),
            radial-gradient(circle at 90% 80%, rgba(255, 126, 95, 0.1) 0%, rgba(255, 126, 95, 0) 20%),
            linear-gradient(135deg, #f8f9fa 0%, #e2f3ee 100%)
          `,
          animation: `${subtlePattern} 60s infinite linear`,
        }}>
          <Slide direction="up" in={true} timeout={500}>
            <Paper elevation={6} sx={{
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-xl)',
              p: 6,
              maxWidth: '600px',
              width: '100%',
              textAlign: 'center',
              background: `
                linear-gradient(to bottom right, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.95)),
                url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2IiBoZWlnaHQ9IjYiPgo8cmVjdCB3aWR0aD0iNiIgaGVpZ2h0PSI2IiBmaWxsPSIjZjhmOWZhIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDBMNiA2TTYgMEwwIDYiIHN0cm9rZT0iI2UyZThmMCIgc3Ryb2tlLXdpZHRoPSIxIj48L3BhdGg+Cjwvc3ZnPg==')
              `,
              animation: `${fadeIn} 0.8s ease-out`,
              backdropFilter: 'blur(2px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
            }}>
              <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                mb: 3,
                animation: `${pulse} 2s infinite`,
              }}>
                <CheckCircle sx={{
                  fontSize: '4rem',
                  color: 'var(--secondary-color)',
                }} />
              </Box>
              <Typography variant="h4" sx={{
                fontWeight: 700,
                mb: 2,
                color: 'var(--primary-dark)',
                fontFamily: 'var(--font-heading)',
                background: 'linear-gradient(to right, var(--primary-dark), var(--secondary-color))',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
              }}>
                Thank You!
              </Typography>
              <Typography variant="body1" sx={{
                mb: 4,
                color: 'var(--dark-color)',
                fontFamily: 'var(--font-main)',
              }}>
                Your responses have been submitted successfully. Our team will review your assessment and provide personalized recommendations.
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  onClick={() => navigate('/resources')}
                  sx={{
                    background: 'linear-gradient(45deg, var(--secondary-color) 0%, var(--accent-color) 100%)',
                    color: 'var(--white)',
                    py: 1.5,
                    px: 4,
                    borderRadius: 'var(--radius-md)',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: 'var(--shadow-md)',
                    },
                    transition: 'var(--transition)',
                  }}
                >
                  View Dashboard
                </Button>
              </Box>
            </Paper>
          </Slide>
        </Box>
      </Fade>
    );
  }

  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: `
        radial-gradient(circle at 20% 30%, rgba(74, 111, 165, 0.08) 0%, transparent 25%),
        radial-gradient(circle at 80% 70%, rgba(107, 179, 155, 0.08) 0%, transparent 25%),
        linear-gradient(135deg, #f8f9fa 0%, #e6f0fa 100%)
      `,
      animation: `${subtlePattern} 120s infinite linear`,
      py: 4,
      px: isMobile ? 2 : 4,
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
          radial-gradient(circle at 75% 25%, rgba(255, 126, 95, 0.03) 0%, transparent 15%),
          radial-gradient(circle at 25% 75%, rgba(107, 179, 155, 0.03) 0%, transparent 15%)
        `,
        pointerEvents: 'none',
      }
    }}>
      <Box sx={{
        maxWidth: '800px',
        mx: 'auto',
        width: '100%',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        zIndex: 1,
      }}>
        <Grow in={true} timeout={800}>
          <Paper elevation={6} sx={{
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-xl)',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            background: `
              linear-gradient(to bottom right, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.98)),
              url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2IiBoZWlnaHQ9IjYiPgo8cmVjdCB3aWR0aD0iNiIgaGVpZ2h0PSI2IiBmaWxsPSIjZmZmZmZmIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDBMNiA2TTYgMEwwIDYiIHN0cm9rZT0iI2Y4ZjlmYSIgc3Ryb2tlLXdpZHRoPSIxIj48L3BhdGg+Cjwvc3ZnPg==')
            `,
            backdropFilter: 'blur(1px)',
            border: '1px solid rgba(255, 255, 255, 0.5)',
          }}>
            <Box sx={{
              background: `
                linear-gradient(135deg, var(--primary-color), var(--primary-dark)),
                url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2IiBoZWlnaHQ9IjYiPgo8cmVjdCB3aWR0aD0iNiIgaGVpZ2h0PSI2IiBmaWxsPSIjM2E1YTgwIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDBMNiA2TTYgMEwwIDYiIHN0cm9rZT0iIzRhNmZhNSIgc3Ryb2tlLXdpZHRoPSIxIj48L3BhdGg+Cjwvc3ZnPg==')
              `,
              p: 3,
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: '-50%',
                left: '-50%',
                right: '-50%',
                bottom: '-50%',
                background: `
                  radial-gradient(circle at 70% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 20%),
                  radial-gradient(circle at 30% 70%, rgba(255, 255, 255, 0.1) 0%, transparent 20%)
                `,
                animation: `${subtlePattern} 30s linear infinite`,
              }
            }}>
              <Psychology sx={{ 
                fontSize: '2.5rem', 
                color: 'var(--white)',
                animation: `${pulse} 3s infinite`,
                position: 'relative',
                zIndex: 1,
              }} />
              <Typography variant="h4" sx={{
                fontWeight: 700,
                color: 'var(--white)',
                fontFamily: 'var(--font-heading)',
                position: 'relative',
                zIndex: 1,
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
              }}>
                Mental Wellness Check
              </Typography>
            </Box>

            <Box sx={{
              p: isMobile ? 2 : 4,
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
            }}>
              <Box sx={{ mb: 4 }}>
                <LinearProgress
                  variant="determinate"
                  value={progress}
                  sx={{
                    height: 10,
                    borderRadius: 'var(--radius-full)',
                    mb: 1,
                    backgroundColor: 'var(--light-gray)',
                    '& .MuiLinearProgress-bar': {
                      background: 'linear-gradient(90deg, var(--primary-color), var(--secondary-color))',
                      borderRadius: 'var(--radius-full)',
                    }
                  }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="caption" sx={{
                    color: 'var(--gray-color)',
                    fontWeight: 500,
                  }}>
                    Question {currentQuestion + 1} of {questions.length}
                  </Typography>
                  <Typography variant="caption" sx={{
                    color: 'var(--primary-dark)',
                    fontWeight: 600,
                  }}>
                    {Math.round(progress)}% Complete
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ 
                mb: 3,
                minHeight: '6em',
                display: 'flex',
                alignItems: 'center',
                animation: `${fadeIn} 0.5s ease-out`
              }}>
                <Typography variant="h6" sx={{
                  fontWeight: 600,
                  color: 'var(--primary-dark)',
                  fontFamily: 'var(--font-main)',
                  lineHeight: 1.5,
                }}>
                  {questions[currentQuestion]}
                </Typography>
              </Box>

              <Box sx={{ 
                flex: 1,
                mb: 3,
                position: 'relative',
                animation: `${fadeIn} 0.6s ease-out`
              }}>
                <Box
                  component="textarea"
                  value={answers[currentQuestion]}
                  onChange={handleAnswerChange}
                  placeholder="Type your response here..."
                  sx={{
                    width: '100%',
                    minHeight: '200px',
                    p: 2,
                    border: fieldError ? '2px solid var(--error-color)' : '2px solid var(--light-gray)',
                    borderRadius: 'var(--radius-md)',
                    fontFamily: 'var(--font-main)',
                    fontSize: '1rem',
                    color: 'var(--dark-color)',
                    resize: 'vertical',
                    transition: 'var(--transition)',
                    background: 'rgba(255, 255, 255, 0.8)',
                    '&:focus': {
                      outline: 'none',
                      borderColor: fieldError ? 'var(--error-color)' : 'var(--secondary-color)',
                      boxShadow: fieldError ? '0 0 0 2px rgba(255, 51, 51, 0.2)' : '0 0 0 2px rgba(107, 179, 155, 0.2)',
                      background: 'rgba(255, 255, 255, 0.95)',
                    },
                    '&::placeholder': {
                      color: 'var(--gray-color)',
                    }
                  }}
                />
                {answers[currentQuestion] && (
                  <Button
                    onClick={handleClear}
                    size="small"
                    sx={{
                      position: 'absolute',
                      right: 8,
                      bottom: 8,
                      color: 'var(--gray-color)',
                      '&:hover': {
                        color: 'var(--error-color)',
                      }
                    }}
                  >
                    Clear
                  </Button>
                )}
              </Box>

              <Collapse in={fieldError}>
                <Alert severity="error" sx={{
                  mb: 2,
                  borderRadius: 'var(--radius-md)',
                  animation: `${pulse} 1s infinite`,
                  fontFamily: 'var(--font-main)',
                  background: 'rgba(255, 51, 51, 0.1)',
                }}>
                  {error}
                </Alert>
              </Collapse>

              <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mt: 'auto',
                gap: 2,
              }}>
                <Button
                  variant="outlined"
                  startIcon={<ArrowBack />}
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  sx={{
                    flex: 1,
                    borderColor: 'var(--light-gray)',
                    color: 'var(--dark-color)',
                    py: 1.5,
                    borderRadius: 'var(--radius-md)',
                    fontFamily: 'var(--font-main)',
                    fontWeight: 500,
                    '&:hover': {
                      backgroundColor: 'rgba(226, 232, 240, 0.5)',
                      borderColor: 'var(--primary-color)',
                    },
                    '&:disabled': {
                      borderColor: 'var(--light-gray)',
                      color: 'var(--gray-color)',
                    },
                    transition: 'var(--transition)',
                  }}
                >
                  Previous
                </Button>

                {currentQuestion < questions.length - 1 ? (
                  <Button
                    variant="contained"
                    endIcon={<ArrowForward />}
                    onClick={handleNext}
                    sx={{
                      flex: 1,
                      background: 'linear-gradient(45deg, var(--primary-color) 0%, var(--primary-dark) 100%)',
                      color: 'var(--white)',
                      py: 1.5,
                      borderRadius: 'var(--radius-md)',
                      fontFamily: 'var(--font-main)',
                      fontWeight: 600,
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: 'var(--shadow-md)',
                      },
                      transition: 'var(--transition)',
                    }}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    endIcon={loading ? null : <Send />}
                    onClick={handleSubmit}
                    disabled={loading}
                    sx={{
                      flex: 1,
                      background: 'linear-gradient(45deg, var(--secondary-color) 0%, var(--accent-color) 100%)',
                      color: 'var(--white)',
                      py: 1.5,
                      borderRadius: 'var(--radius-md)',
                      fontFamily: 'var(--font-main)',
                      fontWeight: 600,
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: 'var(--shadow-md)',
                        background: 'linear-gradient(45deg, var(--accent-color) 0%, var(--secondary-color) 100%)',
                      },
                      '&:disabled': {
                        background: 'var(--light-gray)',
                      },
                      transition: 'var(--transition)',
                    }}
                  >
                    {loading ? 'Submitting...' : 'Submit Assessment'}
                  </Button>
                )}
              </Box>
            </Box>
          </Paper>
        </Grow>

        <Box sx={{ 
          mt: 3, 
          textAlign: 'center',
          animation: `${fadeIn} 1s ease-out`,
          position: 'relative',
          zIndex: 1,
        }}>
          <Typography variant="body2" sx={{ 
            color: 'var(--gray-color)',
            fontFamily: 'var(--font-main)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
            p: 1,
            borderRadius: 'var(--radius-md)',
            background: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(2px)',
          }}>
            <Favorite sx={{ color: 'var(--accent-color)', fontSize: '1rem' }} />
            Your mental health matters. This assessment is completely confidential.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Questionnaire;