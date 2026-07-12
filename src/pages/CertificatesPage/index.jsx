import React from 'react';
import Certificates from '../../components/Certificates/Certificates';
import './CertificatesPage.scss';
import Prizes from '../../components/Prizes/Prizes';

const CertificatesPage = () => {
  return (
    <div className="certificatespage-container">
      <Certificates />
      <Prizes />
    </div>
  );
};

export default CertificatesPage;
