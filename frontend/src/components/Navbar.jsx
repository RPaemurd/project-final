import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';

// ─── Styles ───────────────────────────────────────────────────
const Nav = styled.nav`
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.8rem 2.5rem;
`;

const LogoWrap = styled.a`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  text-decoration: none;
`;

const LogoIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255,255,255,0.2);
  border: 1.5px solid rgba(255,255,255,0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(8px);
`;

const LogoText = styled.span`
  font-size: 0.9rem;
  font-weight: 500;
  color: rgba(255,255,255,0.9);
`;

const NavLinks = styled.ul`
  display: flex;
  align-items: center;
  gap: 2.5rem;
  list-style: none;

  @media (max-width: 768px) { display: none; }
`;

const NavLink = styled.a`
  font-size: 0.85rem;
  font-weight: 400;
  color: rgba(255,255,255,0.88);
  text-decoration: none;
  transition: color 0.2s;
  &:hover { color: #fff; }
`;

const NavCta = styled.a`
  font-size: 0.82rem;
  font-weight: 500;
  color: ${theme.colors.tealDeep};
  background: rgba(255,255,255,0.92);
  border: none;
  border-radius: 100px;
  padding: 0.55rem 1.3rem;
  cursor: pointer;
  letter-spacing: 0.01em;
  transition: background 0.2s, transform 0.15s;
  text-decoration: none;

  &:hover { background: #fff; transform: translateY(-1px); }
`;

const UserPill = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(0,0,0,0.25);
  border: 1px solid rgba(255,255,255,0.25);
  border-radius: 100px;
  padding: 0.35rem 0.9rem;
  font-size: 0.78rem;
  color: rgba(255,255,255,0.9);
`;

const Avatar = styled.div`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: rgba(125,255,212,0.25);
  border: 1px solid rgba(125,255,212,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.62rem;
  color: ${theme.colors.mint};
  font-weight: 500;
`;

// ─── Pulse icon ───────────────────────────────────────────────
const PulseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M2 8h2l1.5-4L8 12l1.5-5L11 8h3"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ─── Component ───────────────────────────────────────────────
const Navbar = ({ variant = 'default', user = null, logoHref = '/' }) => {
  return (
    <Nav>
      <LogoWrap href={logoHref}>
        <LogoIcon><PulseIcon /></LogoIcon>
        <LogoText>Stoppa Proppen</LogoText>
      </LogoWrap>

      {variant === 'default' && (
        <>
          <NavLinks>
            <li><NavLink href="#">Hem</NavLink></li>
            <li><NavLink href="#">Om oss</NavLink></li>
            <li><NavLink href="#">Hur det fungerar</NavLink></li>
            <li><NavLink href="#">FAQ</NavLink></li>
          </NavLinks>
          <NavCta href="/login">Kom igång</NavCta>
        </>
      )}

      {variant === 'app' && user && (
        <UserPill>
          <Avatar>{user.initials}</Avatar>
          {user.name}
        </UserPill>
      )}
    </Nav>
  );
};

export default Navbar;
