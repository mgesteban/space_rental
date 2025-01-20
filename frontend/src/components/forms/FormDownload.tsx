import React from 'react';
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Box,
  Alert
} from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { FormType, FORM_INFO } from '../../types/form';
import { useAuth } from '../auth/AuthContext';

interface FormDownloadProps {
  formType: FormType;
}

const FormDownload: React.FC<FormDownloadProps> = ({ formType }) => {
  const { user } = useAuth();
  const formInfo = FORM_INFO[formType];

  const handleDownload = () => {
    // Create a link element
    const link = document.createElement('a');
    link.href = `/${formInfo.filename}`;
    link.download = formInfo.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom>
        {formInfo.title}
      </Typography>
      
      <Typography variant="body1" color="text.secondary" paragraph>
        {formInfo.description}
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        This form must be submitted {formInfo.submissionDays} working days prior to the date of facility use.
      </Alert>

      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        Requirements:
      </Typography>
      
      <List>
        {formInfo.requirements.map((requirement, index) => (
          <ListItem key={index}>
            <ListItemIcon>
              <CheckCircleIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary={requirement} />
          </ListItem>
        ))}
      </List>

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          startIcon={<FileDownloadIcon />}
          onClick={handleDownload}
          size="large"
        >
          Download Form
        </Button>
      </Box>
    </Paper>
  );
};

export default FormDownload;
