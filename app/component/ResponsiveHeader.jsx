import React, { useState } from 'react';
import { Link } from 'react-router';
import { keyframes, css } from '@emotion/react';
import styled from '@emotion/styled';
import { 
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  useMediaQuery,
  useTheme,
  Typography,
  Box
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

// Keyframe animations (keep your existing animations)
const fadeIn = keyframes`...`;
const slideUp = keyframes`...`;
const pulse = keyframes`...`;

// Styled components (keep your existing styled components)
const AnimatedSection = styled.section`...`;
const SlideUpDiv = styled.div`...`;

const ResponsiveHeader = ({ logged }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = ['Home', 'About', 'Services', 'Team', 'Testimonials'];

  const drawer = (
    <div style={{padding: '1rem'}}> 
      <List>
        {navItems.map((item) => (
          <ListItem 
            key={item}
            component="a"
            href={`#${item.toLowerCase()}`}
            onClick={handleDrawerToggle}
          >
            <ListItemText primary={item} />
          </ListItem>
        ))}
        <ListItem
            component={Link}
            to={logged ? "/dashboard" : "/sign-up"}
            onClick={handleDrawerToggle}
            sx={{
                background: 'var(--primary-color)',
                color: 'white',
                borderRadius: '8px',
                marginTop: '1rem',
                fontWeight: 600,
                padding: '0.75rem 1.25rem',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',

                '&:hover': {
                background: 'var(--primary-dark)',
                color: 'white',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                transform: 'translateY(-1px)',
                },

                '&:active': {
                transform: 'translateY(0)',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.08)',
                },
            }}
            >
                {logged ? 'Dashboard' : 'Register'}
            </ListItem>

      </List>
    </div>
  );

  return (
    <>
      
      <AnimatedSection as="header" className="main-header" delay="0.2s" >
        <div className="container">
          <Link to="/" className="logo" >
            Mentis
          </Link>

          {isMobile ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
  
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <nav className="main-nav">
                <Box
                    component="ul"
                    sx={{
                    display: 'flex',
                    listStyle: 'none',
                    margin: 0,
                    padding: 0,
                    alignItems: 'center',
                    gap: '1.5rem',
                    }}
                >
                  {navItems.map((item, index) => (
                    <Box
                      component="li"
                      key={item}
                      sx={{
                        animation: `${slideUp} 0.6s ease-out forwards`,
                        animationDelay: `${0.4 + index * 0.1}s`,
                        opacity: 1,
                        color: 'black', // Ensure visibility on light background
                      }}
                    >
                      <Box
                        component="a"
                        className='link'
                        href={`#${item.toLowerCase()}`}
                        sx={{
                          textDecoration: 'none',
                          color: 'var(--primary-color)', // Color reference
                          fontWeight: 500,
                          transition: 'color 0.3s ease',

                          '&:hover': {
                            color: 'var(--primary-dark)', // Darker on hover
                          },
                        }}
                      >
                        {item}
                      </Box>
                    </Box>
                  ))}

                  <Box component="li">
                    <Link to={logged ? "/dashboard" : "/sign-up"} style={{ textDecoration: 'none'}}>
                      <Typography
                        sx={{
                          background: 'var(--primary-color)',  // Make sure this variable is defined
                          color: 'white',
                          borderRadius: '8px',
                          fontWeight: 600,
                          padding: '0.75rem 1.25rem',
                          transition: 'all 0.3s ease',
                          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
                          whiteSpace: 'nowrap',

                          '&:hover': {
                            background: 'var(--primary-dark)',  // Darken on hover
                            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                            transform: 'translateY(-1px)',
                      
                          },

                          '&:active': {
                            transform: 'translateY(0)',
                            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.08)',
                          },
                        }}
                      >
                        {logged ? "Dashboard" : "Register"}
                      </Typography>
                    </Link>
                  </Box>
                </Box>
            </nav>
          )}
        </div>
      </AnimatedSection>    

      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile
          }}
          css={css`
            .MuiDrawer-paper {
              box-sizing: border-box;
              width: 250px;
            }
          `}
        >
          {drawer}
        </Drawer>
      </nav>

      {/* Add padding to content to account for fixed header */}
      
    </>
  );
};

export default ResponsiveHeader