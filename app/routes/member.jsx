import React, { useEffect, useState } from 'react';
import { Button, FormControl, InputLabel, Select, MenuItem, AppBar, Toolbar, Typography, Box, Slide, Fade, Pagination, CircularProgress, Chip } from '@mui/material';
import { Home, Psychology, Favorite, ContactSupport, AccountCircle, Paid } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router';
import TherapistCard from '../component/PacientQuestionsPage'
import Donation from '../component/Mui/Donation';
import SimpleDialog from '../component/Mui/Dialog';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const DashboardHeader = ({ profileData, category, handleChangeCategory }) => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // screens < 600px
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'lg')); // 600px - 1199px
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg')); // screens ≥ 1200px

  const categories = [
    { value: 'All Categories', label: 'All Categories' },
    { value: 'Anxiety', label: 'Anxiety' },
    { value: 'Depression', label: 'Depression' },
    { value: 'Trauma', label: 'Trauma' },
    { value: 'Relationship Issues', label: 'Relationship Issues' },
    { value: 'Child Therapy', label: 'Child Therapy' },
    { value: 'Family Therapy', label: 'Family Therapy' },
    { value: 'Addiction', label: 'Addiction' },
    { value: 'OCD', label: 'OCD' },
    { value: 'PTSD', label: 'PTSD' },
    { value: 'Eating Disorders', label: 'Eating Disorders' },
    { value: 'LGBTQ+ Issues', label: 'LGBTQ+ Issues' },
    { value: 'Stress Therapy', label: 'Stress Therapy' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Slide direction="down" in={true}>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'var(--white)',
          color: 'var(--dark-color)',
          boxShadow: scrolled ? 'var(--shadow-md)' : 'var(--shadow-sm)',
          mb: 4,
          transition: 'var(--transition)',
          backdropFilter: scrolled ? 'blur(8px)' : 'none',
          px: isMobile ? 1 : 3,
        }}
      >
        <Toolbar sx={{
          justifyContent: 'space-between',
          maxWidth: 'xl',
          mx: 'auto',
          width: '100%',
          flexWrap: isMobile ? 'wrap' : 'nowrap',
          py: isMobile ? 1 : 0,
        }}>
          {/* Logo Section */}
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            flex: isMobile ? '1 1 100%' : '0 1 auto',
            justifyContent: isMobile ? 'center' : 'flex-start',
            mb: isMobile ? 1 : 0,
          }}>
            <Link style={{ display: 'flex', alignItems: 'center' }} to="/">
              <Psychology sx={{
                color: 'var(--primary-color)',
                fontSize: isMobile ? 28 : 32,
                mr: 1,
                animation: 'pulse 2s infinite'
              }} />
              <Typography
                variant={isMobile ? "h5" : "h4"}
                component="h1"
                sx={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                  color: 'var(--primary-color)',
                  mr: isMobile ? 0 : 4,
                  background: 'linear-gradient(to right, var(--primary-color), var(--accent-color))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Mentis
              </Typography>
            </Link>
          </Box>

          {/* Category Selector - Hidden on mobile */}
          {!isMobile && (
            <Box sx={{
              flex: '1 1 auto',
              mx: 2,
              minWidth: 200,
              maxWidth: 400,
            }}>
              <FormControl fullWidth>
                <InputLabel id="specialization-label">Select categories</InputLabel>
                <Select
                  labelId="specialization-label"
                  id="specialization"
                  multiple
                  value={category}
                  onChange={handleChangeCategory}
                  label="Select categories"
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} size="small" />
                      ))}
                    </Box>
                  )}
                >
                  {categories.map((cat) => (
                    <MenuItem
                      key={cat.value}
                      value={cat.value}
                      sx={{
                        '&:hover': {
                          backgroundColor: 'var(--light-blue)',
                        },
                        '&.Mui-selected': {
                          backgroundColor: 'var(--light-blue)',
                          color: 'var(--primary-dark)',
                        },
                      }}
                    >
                      {cat.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          )}

          {/* Button Group */}
          <Box sx={{
            display: 'flex',
            gap: 1,
            flex: isMobile ? '1 1 100%' : '0 1 auto',
            justifyContent: isMobile ? 'center' : 'flex-end',
          }}>
            {profileData && profileData.user.role == "therapist" && (
              <Button
                variant="outlined"
                onClick={() => navigate('/pricing')}
                size={isMobile ? "small" : "medium"}
                sx={{
                  color: 'var(--primary-color)',
                  borderColor: 'var(--primary-color)',
                  '&:hover': {
                    backgroundColor: 'var(--light-blue)',
                    borderColor: 'var(--primary-dark)',
                    transform: 'translateY(-2px)',
                    boxShadow: 'var(--shadow-sm)'
                  },
                  fontFamily: 'var(--font-main)',
                  textTransform: 'none',
                  borderRadius: 'var(--radius-md)',
                  px: isMobile ? 2 : 3,
                  py: isMobile ? 0.5 : 1,
                  transition: 'var(--transition)',
                }}
              >
                <Paid />
                Pricing
              </Button>
            )}
            <Button
              variant="contained"
              startIcon={!isMobile && <AccountCircle />}
              size={isMobile ? "small" : "medium"}
              onClick={() => navigate('/profile', { state: profileData })}
              sx={{
                background: 'linear-gradient(45deg, var(--primary-color) 0%, var(--accent-color) 100%)',
                color: 'var(--white)',
                '&:hover': {
                  background: 'linear-gradient(45deg, var(--primary-dark) 0%, var(--accent-color) 100%)',
                  transform: 'translateY(-2px)',
                  boxShadow: 'var(--shadow-lg)'
                },
                fontFamily: 'var(--font-main)',
                textTransform: 'none',
                borderRadius: 'var(--radius-md)',
                px: isMobile ? 2 : 3,
                py: isMobile ? 0.5 : 1,
                transition: 'var(--transition)',
              }}
            >
              {isMobile ? 'Profile' : 'Profile'}
            </Button>
          </Box>

          {/* Mobile Category Selector - Only shown on mobile */}
          {isMobile && (
            <Box sx={{
              width: '100%',
              mt: 2,
              mb: 1,
            }}>
              <FormControl fullWidth size="small">
                <InputLabel id="mobile-specialization-label">Categories</InputLabel>
                <Select
                  labelId="mobile-specialization-label"
                  id="mobile-specialization"
                  multiple
                  value={category}
                  onChange={handleChangeCategory}
                  label="Categories"
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} size="small" />
                      ))}
                    </Box>
                  )}
                >
                  {categories.map((cat) => (
                    <MenuItem
                      key={cat.value}
                      value={cat.value}
                      sx={{
                        '&:hover': {
                          backgroundColor: 'var(--light-blue)',
                        },
                        '&.Mui-selected': {
                          backgroundColor: 'var(--light-blue)',
                          color: 'var(--primary-dark)',
                        },
                      }}
                    >
                      {cat.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Slide>
  );
};

const Footer = () => {

  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Fade in timeout={1000}>
      <Box component="footer" sx={{
        backgroundColor: 'var(--primary-dark)',
        color: 'var(--white)',
        py: 4,
        mt: 8,
        textAlign: 'center',
      }}>
        <Typography variant="h6" sx={{ mb: 2, fontFamily: 'var(--font-heading)', color: "white" }}>
          <Psychology sx={{ verticalAlign: 'middle', mr: 1, color: "white" }} />
          Mentis Wellness
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mb: 2 }}>
          <Button
            color="inherit"
            startIcon={<ContactSupport />}
            sx={{ textTransform: 'none' }}
          >
            Contact Us
          </Button>
          <Button
            color="inherit"
            startIcon={<Favorite />}
            sx={{ textTransform: 'none' }}
            onClick={handleOpen}
          >
            Support Our Mission
          </Button>

        </Box>
        <Donation open={open} handleClose={handleClose} handleOpen={handleOpen} />
        <Typography variant="body2">
          © {new Date().getFullYear()} Mentis. All rights reserved.
        </Typography>
      </Box>
    </Fade>
  );
};

const DashboardPage = () => {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // screens < 600px
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'lg')); // 600px - 1199px
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg')); // screens ≥ 1200px

  const navigate = useNavigate()

  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [therapists, setTherapists] = useState()
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [loading, setLoading] = useState(false)
  const [category, setCategory] = useState([])

  const handleChangeCategory = (event) => {
    const {
      target: { value },
    } = event;

    setCategory(value);
  };

  const fetchTherapists = async (page) => {
    setLoading(true);
    const diagnoses = profileData.user.diagnoses
    try {
      const response = await fetch(`http://localhost:5000/therapist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ category, diagnoses, page })
      });

      const data = await response.json();
      setTherapists(data.therapists);
      setTotalPages(data.totalPages);  // Assuming the API returns total pages info
    } catch (error) {
      console.error("Error fetching therapists:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getData = async () => {

      setLoading(true)
      try {
        // Fetch user profile data first
        const response = await fetch('http://localhost:5000/users/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (!response.ok)
          navigate("/unauthorized")

        if (response.status !== 200) {
          navigate("/unauthorized");
          throw new Error('Failed to fetch profile data');
        }

        const data = await response.json();

        if (!data.user.role) handleOpen(); // If no role, open modal

        setProfileData(data); // Save profile data to state

        const diagnoses = data.user.diagnoses

        // Fetch therapists based on a user property (e.g., diagnoses)
        const therapistsResponse = await fetch('http://localhost:5000/therapist', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ category, diagnoses, page: currentPage })
        });

        if (therapistsResponse.status !== 200) {
          throw new Error('Failed to fetch therapists');
        }

        const therapistsData = await therapistsResponse.json();


        setTherapists(therapistsData.therapists); // Save therapists data to state
        setTotalPages(therapistsData.totalPages)
        setLoading(false)
      } catch (err) {
        console.log(err);

      }
    };

    getData(); // Fetch profile data and therapists when component mounts
  }, [category]);


  const therapist = {
    name: "Dr. Sarah Johnson",
    specialty: "Clinical Psychologist",
    rate: 120,
    rating: 4.7,
    reviews: 128,
    phone: "(555) 123-4567",
    email: "mihainemes423@gmail.com",
    location: "123 Therapy Lane, Suite 200\nSan Francisco, CA 94107",
    experience: 12,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  };


  return (
    <>
      <SimpleDialog open={open} handleClose={handleClose} />
      <Box sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: `
        radial-gradient(circle at 10% 20%, var(--light-blue) 0%, transparent 20%),
        radial-gradient(circle at 90% 80%, var(--secondary-color) 0%, transparent 20%),
        linear-gradient(to bottom, var(--white), var(--light-color))
      `,
        backgroundAttachment: 'fixed',
      }}>
        <DashboardHeader profileData={profileData} category={category} handleChangeCategory={handleChangeCategory} />

        <Box component="main" sx={{
          flexGrow: 1,
          py: 4,
          px: { xs: 2, sm: 4, md: 6 },
          maxWidth: 'xl',
          mx: 'auto',
          width: '100%',
        }}>

          <Fade in={loading} timeout={200}>
            <Box sx={{
              position: 'absolute', // Ensure the spinner doesn't take up any space in the document flow
              top: '50%',           // Position it vertically in the center
              left: '50%',          // Position it horizontally in the center
              transform: 'translate(-50%, -50%)', // Center it exactly
              textAlign: 'center',
              zIndex: 1000,         // Make sure the spinner appears above other content
            }}>
              <CircularProgress size={60} sx={{ color: 'primary.main', marginBottom: 2 }} />
              <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
                Loading, please wait...
              </Typography>
            </Box>
          </Fade>

          <Box sx={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : isDesktop ? 'repeat(3, 1fr)' : 'repeat(2, 1fr)',
            gap: isMobile ? 2 : 3,
            width: '100%'
          }}>
            {!loading && therapists && therapists.map((t, index) => {
              const simplifiedTherapist = {
                name: `${t.firstName} ${t.lastName}`,
                specialty: t.specialization?.length ? t.specialization.join(", ") : "General Therapist",
                rate: t.hourlyRate || 0,
                rating: Math.floor(Math.random() * 2) + 4 + Math.random().toFixed(1), // Mock rating between 4.0 - 5.9
                reviews: Math.floor(Math.random() * 100) + 20, // Mock reviews between 20 - 120
                phone: t.phone || "N/A",
                email: t.email,
                location: t.location || "Not provided",
                description: t.bio,
                freeDays: t.availability,
                experience: t.yearsOfExperience || 0,
              }
              return <Fade in timeout={500 + (index * 100)} key={index}>
                <Box>
                  <TherapistCard therapist={simplifiedTherapist} userData={profileData} />
                </Box>
              </Fade>
            })}
            {/* {[...Array(14)].map((_, i) => (
            <Fade in timeout={500 + (i * 100)} key={i}>
              <Box>
                <TherapistCard therapist = {therapist} userData = {profileData &&profileData.user} />
              </Box>
            </Fade>
          ))} */}
          </Box>

          <Fade in={!loading} timeout={500}>
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                disabled={totalPages === 1}
                onChange={(event, value) => {

                  if (value > totalPages)
                    return
                  setCurrentPage(value)
                  fetchTherapists(value)
                }}
                color="primary"
                size="large"
              />
            </Box>
          </Fade>
        </Box>


        <Footer />
      </Box>
    </>
  );
};

export default DashboardPage;