import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { keyframes, css } from '@emotion/react';
import styled from '@emotion/styled';
import heroImage from '../assets/hero-image.jpg';
import therapyImage from '../assets/therapy.jpg';
import meditationImage from '../assets/meditation.jpg';

import team1 from '../assets/team1.jpg';
import team2 from '../assets/team2.jpg';
import team3 from '../assets/team3.jpg';
import team4 from '../assets/team4.jpg';
import team5 from '../assets/team5.jpg';
import testimonial1 from '../assets/testimonial1.jpg';
import testimonial2 from '../assets/testimonial2.jpg';
import ResponsiveHeader from './ResponsiveHeader';
// Keyframe animations
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from { transform: translateY(30px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const gradientBG = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Styled components with animations
const AnimatedSection = styled.section`
  opacity: 0;
  animation: ${fadeIn} 0.8s ease-out forwards;
  animation-delay: ${props => props.delay || '0s'};
`;

const SlideUpDiv = styled.div`
  opacity: 0;
  transform: translateY(30px);
  animation: ${slideUp} 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  animation-delay: ${props => props.delay || '0s'};
`;

const FloatingCard = styled.div`
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 35px rgba(0,0,0,0.1);
  }
`;

const GradientButton = styled.button`
  background: linear-gradient(45deg, var(--primary-color), var(--accent-color));
  background-size: 200% 200%;
  transition: all 0.5s ease;
  &:hover {
    background-position: 100% 50%;
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  }
`;

// Main component with animations
const Main = () => {
  const [logged, setLogged] = useState(false);
  const [question, setQuestion] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch('http://localhost:5000/users/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (response.status !== 200) {
          setLogged(false);
          throw new Error('Failed to fetch profile data');
        }
        
        const data = await response.json();
        console.log(data.user);
        setLogged(true);
        setQuestion(data.question);
      } catch (err) {
        setLogged(false);
      }
    };

    getData();
    setIsVisible(true);
  }, []);

  return (
    <div className="mentis-app">
      {/* Header with animation */}
      {/* <AnimatedSection as="header" className="main-header" delay="0.2s">
        <div className="container">
          <Link to="/" className="logo" css={css`
            animation: ${fadeIn} 0.8s ease-out, ${pulse} 3s ease-in-out infinite;
            animation-delay: 0.3s;
          `}>Mentis</Link>
          <nav className="main-nav">
            <ul>
              {['Home', 'About', 'Services', 'Team', 'Testimonials'].map((item, index) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase()}`}
                    css={css`
                      animation: ${slideUp} 0.6s ease-out forwards;
                      animation-delay: ${0.4 + index * 0.1}s;
                      opacity: 0;
                    `}
                  >
                    {item}
                  </a>
                </li>
              ))}
              <li>
                <Link 
                  to={logged ? "/dashboard" : "/sign-up"} 
                  className="nav-cta"
                  css={css`
                    animation: ${slideUp} 0.6s ease-out forwards;
                    animation-delay: 0.9s;
                    opacity: 0;
                  `}
                >
                  {logged ? "Dashboard" : "Register"}
                </Link>
              </li>
            </ul>
          </nav>
          <button className="mobile-menu-button">☰</button>
        </div>
      </AnimatedSection> */}
      <ResponsiveHeader logged={logged}/>
      {/* Hero Section with animations */}
      <section className="hero" id="home">
        <div className="container">
          <SlideUpDiv className="hero-content" delay="0.5s">
            <h1>Your Journey to Mental Wellness Starts Here</h1>
            <p className="subtitle">
              Professional support tailored to your unique needs
            </p>
            <div className="cta-buttons">
              <a href="#services" className="btn btn-primary">Our Services</a>
              <Link to={logged ? "/dashboard" : "/sign-up"} className="btn btn-secondary">Get Help</Link>
            </div>
          </SlideUpDiv>
        </div>
        <img 
          src={heroImage} 
          alt="Peaceful meditation" 
          className="hero-image" 
        />
      </section>

      {/* About Section */}
      <AnimatedSection className="about-section" id="about" delay="0.3s">
        <div className="container">
          <SlideUpDiv className="section-header" delay="0.4s">
            <h2>About Mentis</h2>
            <p className="subtitle">Compassionate care for your mental health</p>
          </SlideUpDiv>
          <div className="about-content">
            <SlideUpDiv className="about-text" delay="0.5s">
              <p>At Mentis, we believe mental health care should be accessible, compassionate, and effective.</p>
              <p>We specialize in treating anxiety, depression, trauma, and relationship issues.</p>
              <ul className="feature-list">
                {['Confidential & secure sessions', 'Licensed professionals', 'Personalized treatment plans', 'Flexible appointment times'].map((item, index) => (
                  <li key={item}>
                    {item}
                  </li>
                ))}
              </ul>
            </SlideUpDiv>
            <SlideUpDiv className="about-image" delay="0.6s">
              <img 
                src={therapyImage} 
                alt="Therapy session" 
        
              />
            </SlideUpDiv>
          </div>
        </div>
      </AnimatedSection>

      {/* Services Section */}
      <AnimatedSection className="services-section" id="services" delay="0.4s">
        <div className="container">
          <SlideUpDiv className="section-header" delay="0.5s">
            <h2>Our Services</h2>
            <p className="subtitle">Comprehensive mental health support</p>
          </SlideUpDiv>
          <div className="services-grid">
            {[
              { icon: '🧠', title: 'Individual Therapy', desc: 'One-on-one sessions tailored to your specific needs' },
              { icon: '👨‍👩‍👧‍👦', title: 'Family Counseling', desc: 'Improve communication and resolve conflicts' },
              { icon: '🧘‍♀️', title: 'Mindfulness Training', desc: 'Learn techniques to reduce stress' },
              { icon: '📞', title: 'Crisis Support', desc: 'Immediate help for urgent situations' }
            ].map((service, index) => (
              <FloatingCard 
                key={service.title}
                className="service-card"
                css={css`
                  animation: ${slideUp} 0.6s ease-out forwards;
                  animation-delay: ${0.6 + index * 0.1}s;
                  opacity: 0;
                `}
              >
                <div className="service-icon" >
                  {service.icon}
                </div>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
              </FloatingCard>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Team Section */}
      <AnimatedSection className="team-section" id="team" delay="0.5s">
        <div className="container">
          <SlideUpDiv className="section-header" delay="0.6s">
            <h2>Our Best Rated Therapists</h2>
            <p className="subtitle">Licensed professionals dedicated to your wellness</p>
          </SlideUpDiv>
          <div className="team-grid">
            {[
              { img: team1, name: 'Andrei Popescu', specialty: 'Clinical Psychologist', bio: '15+ years experience in trauma therapy' },
              { img: team2, name: 'Elena Ionescu', specialty: 'Licensed Counselor', bio: 'Specializes in adolescent mental health' },
              { img: team3, name: 'Maria Dobre', specialty: 'Art Therapist', bio: 'Uses creative modalities for healing' },
              { img: team4, name: 'Vlad Marinescu', specialty: 'Psychiatric Nurse', bio: 'Focuses on medication management' },
              { img: team5, name: 'Ioana Radu', specialty: 'Mindfulness Coach', bio: 'Teaches meditation techniques' }
            ].map((member, index) => (
              <FloatingCard 
                key={member.name}
                className="team-member"
    
              >
                <img 
                  src={member.img} 
                  alt={member.name} 
          
                />
                <h3>{member.name}</h3>
                <p className="specialty">{member.specialty}</p>
                <p className="bio">{member.bio}</p>
              </FloatingCard>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Testimonials */}
      <AnimatedSection className="testimonials-section" id="testimonials" delay="0.6s">
        <div className="container">
          <SlideUpDiv className="section-header" delay="0.7s">
            <h2>Client Stories</h2>
            <p className="subtitle">Hear from those who've walked this path</p>
          </SlideUpDiv>
          <div className="testimonials-grid">
            {[
              { img: testimonial1, name: 'Sarah J.', service: 'Anxiety Management', quote: 'After just a few months with Mentis, my anxiety is manageable for the first time in years.' },
              { img: testimonial2, name: 'Michael T.', service: 'Family Counseling', quote: 'The family counseling helped us communicate in ways we never could before.' }
            ].map((testimonial, index) => (
              <FloatingCard 
                key={testimonial.name}
                className="testimonial-card"
               
              >
                <div className="testimonial-content">
                  <img 
                    src={testimonial.img} 
                    alt={testimonial.name} 
                    className="client-photo" 
                   
                  />
                  <p>{testimonial.quote}</p>
                  <div className="client-info">
                    <h4>{testimonial.name}</h4>
                    <p>{testimonial.service}</p>
                  </div>
                </div>
              </FloatingCard>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection className="cta-section" delay="0.7s">
        <div className="container">
          <SlideUpDiv className="cta-content" delay="0.8s">
            <h2 >Ready to Begin Your Healing Journey?</h2>
            <p>Take the first step toward better mental health today.</p>
            <Link to={logged ? "/dashboard" : "/sign-up"} >
            <GradientButton 
              className="btn btn-primary"
            >
              Schedule your appointment
            </GradientButton>
            
            </Link>
          </SlideUpDiv>
        </div>
      </AnimatedSection>

      {/* Footer */}
      <AnimatedSection as="footer" className="main-footer" delay="0.8s">
        <div className="container">
          <div className="footer-content">
            <SlideUpDiv className="footer-about" delay="0.9s">
              <Link to="/" className="footer-logo">Mentis</Link>
              <p>Compassionate mental health care for individuals and families.</p>
              <div className="social-links">
                {['f', 't', 'i', 'in'].map((icon, index) => (
                  <a 
                    key={icon} 
                    href="#" 
                    aria-label={['Facebook', 'Twitter', 'Instagram', 'LinkedIn'][index]}
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </SlideUpDiv>
            
            <SlideUpDiv className="footer-links" delay="1.0s">
              <h4>Quick Links</h4>
              <ul>
                {['Home', 'About', 'Services', 'Team', 'Contact'].map((link, index) => (
                  <li key={link}>
                    <a 
                      href={`#${link.toLowerCase()}`}
                   
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </SlideUpDiv>
          </div>
          
          <SlideUpDiv className="footer-bottom" delay="1.1s">
            <p>&copy; {new Date().getFullYear()} Mentis Wellness. All rights reserved.</p>
            <div className="legal-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </SlideUpDiv>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default Main;