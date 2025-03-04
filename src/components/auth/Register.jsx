import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Registration attempt:', formData);
    navigate('/login');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        width: '100vw',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0079bf 0%, #5067c5 100%)',
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            padding: { xs: 3, md: 4 },
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(10px)',
            textAlign: 'center',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
            }
          }}
        >
          <Typography 
            component="h1" 
            variant="h4" 
            sx={{ 
              color: '#0079bf',
              fontWeight: 700,
              mb: 4,
              letterSpacing: '-0.5px'
            }}
          >
            Create your account
          </Typography>
          <Box 
            component="form" 
            onSubmit={handleSubmit} 
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Full Name"
              name="name"
              autoFocus
              value={formData.name}
              onChange={handleChange}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#0079bf',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#0079bf',
                  }
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#0079bf',
                }
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#0079bf',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#0079bf',
                  }
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#0079bf',
                }
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#0079bf',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#0079bf',
                  }
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#0079bf',
                }
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#0079bf',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#0079bf',
                  }
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#0079bf',
                }
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 4,
                mb: 3,
                py: 1.5,
                backgroundColor: '#0079bf',
                borderRadius: '8px',
                textTransform: 'none',
                fontSize: '1.1rem',
                fontWeight: 600,
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: '#026aa7',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 5px 15px rgba(0, 121, 191, 0.4)',
                }
              }}
            >
              Create Account
            </Button>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              gap: 1
            }}>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: '#5E6C84'
                }}
              >
                Already have an account?
              </Typography>
              <Button 
                onClick={() => navigate('/login')}
                sx={{ 
                  textTransform: 'none',
                  fontWeight: 600,
                  color: '#0079bf',
                  '&:hover': {
                    backgroundColor: 'transparent',
                    color: '#026aa7',
                  }
                }}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Register; 