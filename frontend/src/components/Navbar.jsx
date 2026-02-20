import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';

// ─── Styles ───────────────────────────────────────────────────
const Nav = styled.nav`
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.2rem 1.4rem;

  @media (min-width: 768px) {
    padding: 1.8rem 2.5rem;
  }
`;

const LogoWrap = styled.a`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  text-decoration: none;
  z-index: 200;
`;

const LogoIcon = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: rgba(255,255,255,0.2);
  border: 1.5px solid rgba(255,255,255,0.35);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoText = styled.span`
  font-size: 0.88rem;
  font-weight: 500;
  color: rgba(255,255,255,0.9);
`;

// ─── Desktop nav links ────────────────────────────────────────
const NavLinks = styled.ul`
  display: none;

  @media (min-width: 768px) {
    display: flex;
    align-items: center;
    gap: 2.5rem;
    list-style: none;
  }
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
  display: none;

  @media (min-width: 768px) {
    display: inline-block;
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
  }
`;

// ─── Hamburger button (bara mobil) ────────────────────────────
const HamburgerBtn = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.4rem;
  position: fixed;
  top: 1.1rem;
  right: 1.2rem;
  z-index: 999;

  @media (min-width: 768px) {
    display: none;
  }
`;

const HamburgerLine = styled.span`
  display: block;
  width: 22px;
  height: 1.5px;
  background: rgba(255,255,255,0.9);
  border-radius: 2px;
  transition: transform 0.25s, opacity 0.25s;

  &:nth-child(1) {
    transform: ${({ $open }) => $open ? 'translateY(6.5px) rotate(45deg)' : 'none'};
  }
  &:nth-child(2) {
    opacity: ${({ $open }) => $open ? 0 : 1};
  }
  &:nth-child(3) {
    transform: ${({ $open }) => $open ? 'translateY(-6.5px) rotate(-45deg)' : 'none'};
  }
`;

// ─── Mobile menu drawer ───────────────────────────────────────
const MobileMenu = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(10,40,46,0.97);
  backdrop-filter: blur(16px);
  z-index: 500;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transform: ${({ $open }) => $open ? 'translateX(0)' : 'translateX(100%)'};
  transition: transform 0.3s ease;

  @media (min-width: 768px) {
    display: none;
  }
`;

const MobileLink = styled.a`
  font-family: ${theme.fonts.serif};
  font-size: 2rem;
  font-weight: 300;
  color: rgba(255,255,255,0.85);
  text-decoration: none;
  padding: 0.6rem 2rem;
  transition: color 0.2s;
  &:hover { color: #fff; }
`;

const MobileCta = styled.a`
  margin-top: 1.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: ${theme.colors.tealDeep};
  background: rgba(255,255,255,0.92);
  border-radius: 100px;
  padding: 0.8rem 2.5rem;
  text-decoration: none;
  transition: background 0.2s;
  &:hover { background: #fff; }
`;

// ─── User pill (app variant) ──────────────────────────────────
const UserPill = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(0,0,0,0.25);
  border: 1px solid rgba(255,255,255,0.25);
  border-radius: 100px;
  padding: 0.3rem 0.8rem;
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

// ─── Component ────────────────────────────────────────────────
const Navbar = ({ variant = 'default', user = null, logoHref = '/' }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Nav>
        <LogoWrap href={logoHref}>
          <LogoIcon>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 8h2l1.5-4L8 12l1.5-5L11 8h3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </LogoIcon>
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

      {/* Hamburgare på mobil — outside Nav to avoid its stacking context */}
      {variant === 'default' && (
        <HamburgerBtn onClick={() => setMenuOpen(o => !o)} aria-label="Meny">
          <HamburgerLine $open={menuOpen} />
          <HamburgerLine $open={menuOpen} />
          <HamburgerLine $open={menuOpen} />
        </HamburgerBtn>
      )}

      {/* Mobile drawer */}
      {variant === 'default' && (
        <MobileMenu $open={menuOpen}>
          <MobileLink href="#" onClick={() => setMenuOpen(false)}>Hem</MobileLink>
          <MobileLink href="#" onClick={() => setMenuOpen(false)}>Om oss</MobileLink>
          <MobileLink href="#" onClick={() => setMenuOpen(false)}>Hur det fungerar</MobileLink>
          <MobileLink href="#" onClick={() => setMenuOpen(false)}>FAQ</MobileLink>
          <MobileCta href="/login" onClick={() => setMenuOpen(false)}>Kom igång gratis</MobileCta>
        </MobileMenu>
      )}
    </>
  );
};

export default Navbar;
