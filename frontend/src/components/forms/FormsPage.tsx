import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Tabs,
  Tab,
  Alert,
  Paper
} from '@mui/material';
import { FormType } from '../../types/form';
import FormDownload from './FormDownload';
import { useAuth } from '../auth/AuthContext';

const FormsPage: React.FC = () => {
  const { user } = useAuth();
  const [selectedForm, setSelectedForm] = useState<FormType>(
    user?.role === 'admin' ? 'internal' : 'external'
  );

  const handleChange = (event: React.SyntheticEvent, newValue: FormType) => {
    setSelectedForm(newValue);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Facility Use Forms
        </Typography>

        <Typography variant="body1" color="text.secondary" paragraph>
          Please download and complete the appropriate form for your facility use request.
          Forms must be submitted within the specified timeframe and with all required documentation.
        </Typography>

        <Paper sx={{ mb: 3 }}>
          <Tabs
            value={selectedForm}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab 
              label="Internal Use" 
              value="internal"
              sx={{ py: 2 }}
            />
            <Tab 
              label="External Groups" 
              value="external"
              sx={{ py: 2 }}
            />
          </Tabs>
        </Paper>

        {selectedForm === 'internal' && !['admin', 'user'].includes(user?.role || '') && (
          <Alert severity="warning" sx={{ mb: 3 }}>
            The internal use form is only for CCSF employees, faculty, and students.
            If you are an external organization, please use the external groups form.
          </Alert>
        )}

        <FormDownload formType={selectedForm} />

        <Paper sx={{ p: 3, mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Submission Instructions
          </Typography>
          <Typography variant="body1" paragraph>
            1. Download and fill out the appropriate form completely
          </Typography>
          <Typography variant="body1" paragraph>
            2. Gather all required documentation (insurance certificates, etc.)
          </Typography>
          <Typography variant="body1" paragraph>
            3. Submit the completed form and documentation to:
          </Typography>
          <Typography variant="body1" sx={{ pl: 3 }} paragraph>
            City College of San Francisco<br />
            Buildings & Grounds<br />
            50 Friday Kahlo Way<br />
            San Francisco, CA 94112<br />
            Email: facilities-events-committee@ccsf.edu
          </Typography>
          <Typography variant="body1">
            4. You will be contacted regarding the status of your application and any additional requirements.
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default FormsPage;
