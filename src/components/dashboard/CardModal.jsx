<Modal>
  <Box
    sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 600,
      bgcolor: '#282E33', // Dark background
      color: '#B6C2CF',
      borderRadius: 1,
      boxShadow: 24,
      p: 4,
    }}
  >
    {/* Modal content with updated colors */}
    <TextField
      sx={{
        '& .MuiInputBase-input': {
          color: '#B6C2CF',
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'rgba(255,255,255,0.2)',
          },
          '&:hover fieldset': {
            borderColor: 'rgba(255,255,255,0.3)',
          },
        },
      }}
    />
  </Box>
</Modal> 