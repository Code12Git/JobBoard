import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField, Stack, Divider, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: '500px' },
  bgcolor: 'background.paper',
  borderRadius: '8px',
  boxShadow: 24,
  p: 3,
  maxHeight: '90vh',
  overflowY: 'auto',
};

export default function ExperienceModal() {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    companyName: '',
    position: '',
    duration: '',
    responsibilities: '',
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setFormData({
      companyName: '',
      position: '',
      duration: '',
      responsibilities: '',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted work experience:', formData);
    handleClose();
  };

  return (
    <div>
      <Button 
        variant="contained" 
        onClick={handleOpen}
        sx={{
          backgroundColor: '#1976d2',
          '&:hover': {
            backgroundColor: '#1565c0',
          }
        }}
      >
        Add Work Experience
      </Button>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="work-experience-modal"
      >
        <Box sx={modalStyle}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" component="h2" fontWeight={600}>
              Add Work Experience
            </Typography>
            <IconButton onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Stack>
          
          <Divider sx={{ my: 2 }} />
          
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Company Name"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
                variant="outlined"
              />
              
              <TextField
                fullWidth
                label="Position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                required
                variant="outlined"
              />
              
              <TextField
                fullWidth
                label="Duration (e.g. Jan 2020 - Dec 2022)"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                required
                variant="outlined"
              />
              
              <TextField
                fullWidth
                label="Responsibilities"
                name="responsibilities"
                value={formData.responsibilities}
                onChange={handleChange}
                multiline
                rows={4}
                variant="outlined"
                placeholder="Describe your key responsibilities and achievements..."
              />
              
              <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button 
                  variant="outlined" 
                  onClick={handleClose}
                  sx={{
                    color: 'text.primary',
                    borderColor: 'text.secondary',
                  }}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  variant="contained"
                  sx={{
                    backgroundColor: '#1976d2',
                    '&:hover': {
                      backgroundColor: '#1565c0',
                    }
                  }}
                >
                  Save Experience
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}