import React from 'react';
import emailService from '../services/emailService';

const EmailTest = () => {
  const testEmail = async () => {
    console.log('Testing email service...');
    
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      subject: 'Test Email',
      message: 'This is a test message'
    };
    
    try {
      const result = await emailService.sendContactEmail(testData);
      console.log('Email test result:', result);
      alert(result.success ? 'Email sent successfully!' : `Failed: ${result.message}`);
    } catch (error) {
      console.error('Email test error:', error);
      alert(`Error: ${error.message}`);
    }
  };

  const checkConfig = () => {
    const config = emailService.getConfigStatus();
    console.log('Email Configuration:', config);
    alert(`Configuration Status: ${JSON.stringify(config, null, 2)}`);
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '20px' }}>
      <h3>Email Service Test</h3>
      <button onClick={checkConfig} style={{ margin: '10px', padding: '10px' }}>
        Check Configuration
      </button>
      <button onClick={testEmail} style={{ margin: '10px', padding: '10px' }}>
        Test Send Email
      </button>
    </div>
  );
};

export default EmailTest;