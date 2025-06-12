import React, { ReactNode } from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';

interface LayoutProps {
  children: ReactNode;
}

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
  padding: 2rem;
  background-color: #f8f9fa;
`;

const Footer = styled.footer`
  padding: 1rem;
  background-color: #343a40;
  color: #fff;
  text-align: center;
`;

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Container>
      <Navbar />
      <Main>{children}</Main>
      <Footer>
        <p>&copy; {new Date().getFullYear()} Pita Banking. All rights reserved.</p>
      </Footer>
    </Container>
  );
};

export default Layout;