import * as React from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

export default function CustomSelect({value, handleChange, handleRole}) {
  
  return (
    <FormControl sx={{ m: 1, width: '95%'}}>
      <InputLabel 
        id="custom-select-label" 
        sx={{ color: 'var(--text-color)' }}
      >
        Role
      </InputLabel>
      <Select
      
        labelId="custom-select-label"
        value={value}
        label="Role"
        onChange={handleChange}
        sx={{
          width: '100%',
          backgroundColor: 'var(--card-bg)',
          color: 'var(--text-color)',
          borderRadius: 'var(--border-radius)',
          padding: 'calc(var(--padding) / 2)',
          boxShadow: 'var(--card-shadow)',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'var(--button-bg)',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'var(--button-bg)',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'var(--button-bg)',
          },
          '& .MuiSvgIcon-root': {
            color: 'var(--text-color)',
          },
        }}
      >
        <MenuItem value="member">Member</MenuItem>
        <MenuItem value="therapist">Therapist</MenuItem>
      </Select>
    </FormControl>
  );
} 