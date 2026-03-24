// ─────────────────────────────────────────────────────────────────────────────
// BottomNav.jsx
//
// Bottom navigation for app pages on mobile.
// Shows three large buttons with icon + text at the bottom of the screen.
// Hidden on desktop (768px+) since navigation is done via the top menu/back button.
// Props:
//   active = string with active page: 'hem' | 'medicin' | 'symptomkoll'
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { theme } from '../styles/theme';

// ─── Wrapper ──────────────────────────────────────────────────────────────────
// Fixed at the bottom of the screen (position: fixed).
// Hidden entirely on desktop — navigation is done via the navbar instead.
const Bar = styled.nav`
  /* MOBIL: synlig, fast längst ner */
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;

  display: flex;
  align-items: stretch;

  background: rgba(8, 35, 40, 0.97);
  backdrop-filter: blur(16px);
  border-top: 1px solid rgba(255,255,255,0.1);

  /* Extra padding at the bottom for iPhone notch/home indicator */
  padding-bottom: env(safe-area-inset-bottom, 0px);

  /* DESKTOP 768+: döljs */
  @media (min-width: 768px) {
    display: none;
  }
`;

// ─── Individual nav button ────────────────────────────────────────────────────
// $active controls whether the button is highlighted (light green) or not (grey).
const NavItem = styled(Link)`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  padding: 0.75rem 0.5rem;
  text-decoration: none;
  color: ${({ $active }) => $active ? theme.colors.mint : 'rgba(255,255,255,0.45)'};
  transition: color 0.2s;

  /* Small highlight line at the top of the active button */
  border-top: 2px solid ${({ $active }) => $active ? theme.colors.mint : 'transparent'};

  &:active { opacity: 0.7; }
`;

// Icon wrapper
const Icon = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Text below the icon
const Label = styled.span`
  font-size: 0.68rem;
  font-weight: ${({ $active }) => $active ? '500' : '400'};
  letter-spacing: 0.02em;
`;

// ─── Component ────────────────────────────────────────────────────────────────
const BottomNav = ({ active = '' }) => (
  <Bar>

    {/* Hem */}
    <NavItem to="/" $active={active === 'hem'}>
      <Icon>
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M3 9.5L11 3l8 6.5V19a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5Z"
            stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
          <path d="M8 20v-7h6v7" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        </svg>
      </Icon>
      <Label $active={active === 'hem'}>Hem</Label>
    </NavItem>

    {/* Medicinlåda */}
    <NavItem to="/medicin" $active={active === 'medicin'}>
      <Icon>
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M9 3.5a4.5 4.5 0 0 0-6.364 6.364l9 9A4.5 4.5 0 0 0 18 12.636L9 3.5Z"
            stroke="currentColor" strokeWidth="1.5"/>
          <path d="M7.5 10.5l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </Icon>
      <Label $active={active === 'medicin'}>Medicinlåda</Label>
    </NavItem>

    {/* Symtomkoll */}
    <NavItem to="/symptomkoll" $active={active === 'symptomkoll'}>
      <Icon>
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M2 11h3l2-7 4 14 3-9 2 2h4"
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </Icon>
      <Label $active={active === 'symptomkoll'}>Symtomkoll</Label>
    </NavItem>

  </Bar>
);

export default BottomNav;