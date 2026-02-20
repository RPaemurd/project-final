import styled, { keyframes } from 'styled-components';
import { theme } from '../styles/theme';

// ─── Animations ───────────────────────────────────────────────
export const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
`;

export const fadeLeft = keyframes`
  from { opacity: 0; transform: translateX(14px); }
  to   { opacity: 1; transform: translateX(0); }
`;

export const pulse = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.6; transform: scale(0.85); }
`;

export const growBar = keyframes`
  from { width: 0; }
`;

// ─── Page frame ───────────────────────────────────────────────
export const Frame = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  /* mobil: ingen padding, kortet fyller hela skärmen */
  padding: 0;
  background: ${theme.colors.dark};

  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

// ─── Main card ────────────────────────────────────────────────
export const Card = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
  background: ${theme.gradients.card};
  display: flex;
  flex-direction: column;

  /* mobil: inga rundade hörn, fyller hela skärmen */
  border-radius: 0;
  box-shadow: none;

  @media (min-width: 768px) {
    max-width: ${({ maxWidth }) => maxWidth || '1100px'};
    min-height: ${({ minHeight }) => minHeight || '620px'};
    border-radius: 24px;
    box-shadow: ${theme.shadow.card}, inset 0 1px 0 rgba(255,255,255,0.15);
  }

  /* dark overlay */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(8, 35, 40, 0.45);
    pointer-events: none;
    z-index: 2;
  }

  /* stripe texture */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: repeating-linear-gradient(
      90deg,
      transparent, transparent 3px,
      rgba(255,255,255,0.025) 3px, rgba(255,255,255,0.025) 4px
    );
    pointer-events: none;
    z-index: 1;
  }
`;

// ─── Corner labels — bara synliga på desktop ──────────────────
export const CornerLabel = styled.span`
  display: none;

  @media (min-width: 768px) {
    display: block;
    position: absolute;
    color: rgba(255,255,255,0.5);
    font-size: 0.62rem;
    letter-spacing: 0.05em;
    z-index: 15;

    ${({ pos }) => ({
      'tl': 'top: 1rem; left: 1.2rem;',
      'tr': 'top: 1rem; right: 1.2rem;',
      'bl': 'bottom: 1rem; left: 1.2rem;',
      'br': 'bottom: 1rem; right: 1.2rem;',
    }[pos])}
  }
`;

// ─── Shared buttons ───────────────────────────────────────────
export const BtnPrimary = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: rgba(255,255,255,0.92);
  color: ${theme.colors.tealDeep};
  border: none;
  border-radius: ${theme.radius.pill};
  padding: 0.9rem 2rem;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  letter-spacing: 0.01em;
  box-shadow: ${theme.shadow.btn};
  transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
  text-decoration: none;
  width: 100%;

  @media (min-width: 480px) {
    width: auto;
  }

  &:hover {
    background: #fff;
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(0,0,0,0.25);
  }
`;

export const BtnGhost = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: transparent;
  border: 1px solid rgba(255,255,255,0.25);
  border-radius: ${theme.radius.pill};
  padding: 0.9rem 2rem;
  font-size: 0.88rem;
  font-weight: 400;
  color: rgba(255,255,255,0.8);
  cursor: pointer;
  letter-spacing: 0.01em;
  transition: border-color 0.2s, color 0.2s;
  width: 100%;

  @media (min-width: 480px) {
    width: auto;
  }

  &:hover {
    border-color: rgba(255,255,255,0.5);
    color: #fff;
  }
`;
