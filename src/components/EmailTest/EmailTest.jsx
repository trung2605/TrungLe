import React from 'react';
import emailService from '../../services/emailService';
import './EmailTest.scss';

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
    <div className="email-test">
      <h3 className="email-test__title">Email Service Test</h3>
      <div className="email-test__buttons">
        <button onClick={checkConfig} className="email-test__button email-test__button--config">
          Check Configuration
        </button>
        <button onClick={testEmail} className="email-test__button email-test__button--test">
          Test Send Email
        </button>
      </div>
    </div>
  );
};

export default EmailTest;