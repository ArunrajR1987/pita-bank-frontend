import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface CardProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

const CardContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 1.5rem;
`;

const CardHeader = styled.div`
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e9ecef;
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 500;
  color: #333;
`;

const CardBody = styled.div`
  padding: 1.5rem;
`;

const Card: React.FC<CardProps> = ({ title, children, className }) => {
  return (
    <CardContainer className={className}>
      {title && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      )}
      <CardBody>{children}</CardBody>
    </CardContainer>
  );
};

export default Card;