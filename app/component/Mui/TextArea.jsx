import React from 'react';
import { 
  TextField,
  Box,
  Typography,
  InputAdornment,
  IconButton
} from '@mui/material';
import { Clear } from '@mui/icons-material';

const EnhancedTextArea = ({ value, handleChange, handleClear }) => {
  const maxLength = 500;

  return (
    <Box sx={{ width: '100%', maxWidth: 600 }}>
      <Typography variant="h6" gutterBottom>
        Comments
      </Typography>
      <TextField
        label="Share your thoughts"
        multiline
        rows={4}
        value={value}
        onChange={handleChange}
        fullWidth
        variant="outlined"
        helperText={`${value.length}/${maxLength} characters`}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {value && (
                <IconButton onClick={handleClear} size="small">
                  <Clear fontSize="small" />
                </IconButton>
              )}
            </InputAdornment>
          ),
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'primary.main',
            },
            '&:hover fieldset': {
              borderColor: 'primary.dark',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'primary.main',
              borderWidth: 2,
            },
          },
          marginBottom: 2,
        }}
      />
    </Box>
  );
};

export default EnhancedTextArea;
