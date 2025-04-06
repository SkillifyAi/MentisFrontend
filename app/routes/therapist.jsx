import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Chip,
  Box,
  Avatar,
  Divider
} from '@mui/material';
import { Psychology, Schedule, Email, Person, Phone, LocationOn, School, Work, Translate } from '@mui/icons-material';

import { useLocation, useNavigate} from 'react-router';

const TherapistRegistrationPage = () => {
  const [formData, setFormData] = useState({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
    yearsOfExperience: '',
    hourlyRate: '',
    languages: [],
    newLanguage: '',
    qualifications: '',
    licenseNumber: '',
    specialization: [],
    availability: {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false
    },
    timeSlots: []
  });

  const specializations = [
    'Anxiety',
    'Depression',
    'Trauma',
    'Relationship Issues',
    'Child Therapy',
    'Family Therapy',
    'Addiction',
    'OCD',
    'PTSD',
    'Eating Disorders',
    'LGBTQ+ Issues',
    'Stress Management'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSpecializationChange = (event) => {
    const {
      target: { value },
    } = event;
    setFormData(prev => ({
      ...prev,
      specialization: typeof value === 'string' ? value.split(',') : value,
    }));
  };

  const handleAvailabilityChange = (day) => (event) => {
    setFormData(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        [day]: event.target.checked,
      }
    }));
  };

  const handleLanguageAdd = () => {
    if (formData.newLanguage && !formData.languages.includes(formData.newLanguage)) {
      setFormData(prev => ({
        ...prev,
        languages: [...prev.languages, prev.newLanguage],
        newLanguage: ''
      }));
    }
  };

  const handleLanguageDelete = (languageToDelete) => () => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.filter(language => language !== languageToDelete),
    }));
  };


  const location = useLocation();
  const data = location.state;

  console.log();
  
  const navigate = useNavigate()

  
  useEffect(() => {
      // When data is received, set it to the local state
      if (data) {
      setFormData({
        id: data.id || "",
        firstName: data.name || data.username.split(" ")[0] || "", // First name, fallback to empty string if undefined
        lastName: data.surname || data.username.split(" ")[1] || "",  // Last name, fallback to empty string if undefined
        email: data.email || "",                       // Email, fallback to empty string if undefined
        phone: data.phone || "",                       // Phone, fallback to empty string if undefined
        location: data.location || "",                 // Location, fallback to empty string if undefined
        bio: data.bio || "",                           // Bio, fallback to empty string if undefined
        yearsOfExperience: data.yearsOfExperience || "", // Years of experience, fallback to empty string if undefined
        hourlyRate: data.hourlyRate || "",             // Hourly rate, fallback to empty string if undefined
        languages: data.languages || [],               // Languages, fallback to empty array if undefined
        newLanguage: data.newLanguage || "",           // New language, fallback to empty string if undefined
        qualifications: data.qualifications || "",     // Qualifications, fallback to empty string if undefined
        licenseNumber: data.licenseNumber || "",       // License number, fallback to empty string if undefined
        specialization: data.specialization || [],     // Specialization, fallback to empty array if undefined
        availability: {
          monday: data.availability?.monday || false,
          tuesday: data.availability?.tuesday || false,
          wednesday: data.availability?.wednesday || false,
          thursday: data.availability?.thursday || false,
          friday: data.availability?.friday || false,
          saturday: data.availability?.saturday || false,
          sunday: data.availability?.sunday || false,
        },
        timeSlots: data.timeSlots || []                 // Time slots, fallback to empty array if undefined
      });
    }
  }, [data]);

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("")
    setSuccess("")
  
    // Check that all required fields are not empty
    const requiredFields = [
      'firstName', 'lastName', 'email', 'phone', 'location', 'bio',
      'yearsOfExperience', 'hourlyRate', 'languages', 'qualifications', 'licenseNumber', 'specialization'
    ];
  
    for (let field of requiredFields) {
      if (!formData[field] || (Array.isArray(formData[field]) && formData[field].length === 0)) {
        setError(`Please fill out the ${field} field.`)
        return;
      }
    }
  
    // Check for empty availability (no day should be unchecked)
    if (!Object.values(formData.availability).includes(true)) {
      setError('Please select at least one day for availability.');
      return;
    }
  
    // Proceed with the fetch request if all validations pass
    try {
      const response = await fetch('http://localhost:5000/therapist/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const resp = await response.json();
        console.log('Registration successful:', resp);
        setSuccess('Registration submitted successfully!');
        
        if(data.plan === "Free")
          navigate("/pricing", {state: true})
        else 
          navigate("/profile")
        
        // Optionally, navigate to another page or reset the form here
      } else {
        const errorData = await response.json();
        setError(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setError('Something went wrong, please try again later.');
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Psychology color="primary" sx={{
            fontSize: 40, mr: 2,
            animation: 'pulse 2s infinite'
          }} />
          <Typography variant="h4" component="h1" color="primary">
            Therapist Registration
          </Typography>
        </Box>
        <Typography variant="subtitle1" gutterBottom sx={{ mb: 3 }}>
          Complete your profile to start connecting with clients who need your expertise
        </Typography>

        <form onSubmit={handleSubmit}>
          {/* Personal Information Section */}
          <Typography variant="h6" sx={{ mt: 3, mb: 2, display: 'flex', alignItems: 'center' }}>
            <Person sx={{ mr: 1 }} /> Personal Information
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                InputProps={{
                  startAdornment: <Email sx={{ color: 'action.active', mr: 1 }} />
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                InputProps={{
                  startAdornment: <Phone sx={{ color: 'action.active', mr: 1 }} />
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Location (City/State)"
                name="location"
                value={formData.location}
                onChange={handleChange}
                InputProps={{
                  startAdornment: <LocationOn sx={{ color: 'action.active', mr: 1 }} />
                }}
              />
            </Grid>
          </Grid>

          {/* Professional Information Section */}
          <Typography variant="h6" sx={{ mt: 4, mb: 2, display: 'flex', alignItems: 'center' }}>
            <Work sx={{ mr: 1 }} /> Professional Information
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Bio/Introduction"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                multiline
                rows={4}
                placeholder="Tell potential clients about your approach, experience, and how you can help them"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Years of Experience"
                name="yearsOfExperience"
                type="number"
                value={formData.yearsOfExperience}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Hourly Rate ($)"
                name="hourlyRate"
                type="number"
                value={formData.hourlyRate}
                onChange={handleChange}
                InputProps={{
                  startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Qualifications/Degrees"
                name="qualifications"
                value={formData.qualifications}
                onChange={handleChange}
                InputProps={{
                  startAdornment: <School sx={{ color: 'action.active', mr: 1 }} />
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="License Number"
                name="licenseNumber"
                value={formData.licenseNumber}
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          {/* Specialization Section */}
          <Typography variant="h6" sx={{ mt: 4, mb: 2, display: 'flex', alignItems: 'center' }}>
            <Psychology sx={{ mr: 1 }} /> Areas of Specialization
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <FormControl fullWidth sx={{ mb: 3, mt: 2 }}>
            <InputLabel id="specialization-label">Select your specializations</InputLabel>
            <Select
              labelId="specialization-label"
              id="specialization"
              multiple
              value={formData.specialization}
              onChange={handleSpecializationChange}
              label="Select your specializations"
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              {specializations.map((spec) => (
                <MenuItem key={spec} value={spec}>
                  {spec}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Languages Section */}
          <Typography variant="h6" sx={{ mt: 4, mb: 2, display: 'flex', alignItems: 'center' }}>
            <Translate sx={{ mr: 1 }} /> Languages Spoken
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <TextField
              label="Add Language"
              value={formData.newLanguage}
              onChange={(e) => setFormData({ ...formData, newLanguage: e.target.value })}
              sx={{ mr: 2 }}
            />
            <Button
              variant="outlined"
              onClick={handleLanguageAdd}
              disabled={!formData.newLanguage}
            >
              Add
            </Button>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
            {formData.languages.map((language) => (
              <Chip
                key={language}
                label={language}
                onDelete={handleLanguageDelete(language)}
                avatar={<Avatar>{language[0]}</Avatar>}
              />
            ))}
          </Box>

          {/* Availability Section */}
          <Typography variant="h6" sx={{ mt: 4, mb: 2, display: 'flex', alignItems: 'center' }}>
            <Schedule sx={{ mr: 1 }} /> Availability
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Typography variant="subtitle1" gutterBottom>
            Select days you're typically available:
          </Typography>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            {Object.keys(formData.availability).map((day) => (
              <Grid item xs={6} sm={4} md={3} key={day}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.availability[day]}
                      onChange={handleAvailabilityChange(day)}
                      name={day}
                    />
                  }
                  label={day.charAt(0).toUpperCase() + day.slice(1)}
                />
              </Grid>
            ))}
          </Grid>

          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', mt: 4 }}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{ px: 4, py: 1.5 }}
          >
            {data && data.registered ? "Edit profile" : "Complete Registration"}
          </Button>

          {/* Display error or success message under the button */}
          {error && <p className='error'>{error}</p>}
          {success && <p className='success' >{success}</p>}
        </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default TherapistRegistrationPage;