import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Frame, Card, CornerLabel, BtnPrimary, fadeUp, fadeLeft, pulse } from '../components/Layout.jsx';
import Navbar from '../components/Navbar.jsx';
import { theme } from '../styles/theme';

// ─── Styles ───────────────────────────────────────────────────
const growBar = keyframes`from { width: 0; }`;

const Hero = styled.div`
  position: relative;
  z-index: 10;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 3rem 3rem 5rem;
  gap: 1.8rem;

  @media (max-width: 768px) {
    padding: 2rem 1.8rem 6rem;
  }
`;

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(0,0,0,0.3);
  border: 1px solid rgba(255,255,255,0.25);
  backdrop-filter: blur(10px);
  border-radius: 100px;
  padding: 0.35rem 1rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: rgba(255,255,255,0.9);
  letter-spacing: 0.03em;
  animation: ${fadeUp} 0.8s ease both;
`;

const BadgeDot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${theme.colors.mint};
  box-shadow: 0 0 8px ${theme.colors.mint};
  animation: ${pulse} 2s infinite;
`;

const H1 = styled.h1`
  font-family: ${theme.fonts.serif};
  font-size: clamp(3rem, 6vw, 5.2rem);
  font-weight: 300;
  line-height: 1.1;
  letter-spacing: -0.01em;
  color: #fff;
  max-width: 700px;
  animation: ${fadeUp} 0.8s 0.1s ease both;
  text-shadow: 0 2px 12px rgba(0,0,0,0.3);

  em {
    font-style: italic;
    color: rgba(255,255,255,0.75);
  }
`;

const HeroSub = styled.p`
  font-size: 1rem;
  font-weight: 300;
  color: rgba(255,255,255,0.88);
  max-width: 440px;
  line-height: 1.7;
  animation: ${fadeUp} 0.8s 0.2s ease both;
  text-shadow: 0 1px 4px rgba(0,0,0,0.3);
`;

const HeroActions = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  animation: ${fadeUp} 0.8s 0.3s ease both;
  flex-wrap: wrap;
  justify-content: center;
`;

const BtnGhostLink = styled.a`
  font-size: 0.85rem;
  font-weight: 400;
  color: rgba(255,255,255,0.88);
  cursor: pointer;
  letter-spacing: 0.01em;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  transition: color 0.2s;
  text-shadow: 0 1px 3px rgba(0,0,0,0.3);
  &:hover { color: #fff; }
`;

const Stats = styled.div`
  position: absolute;
  bottom: 2.5rem;
  left: 0;
  right: 0;
  z-index: 10;
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 0 3rem;
  animation: ${fadeUp} 0.8s 0.4s ease both;
  flex-wrap: wrap;
`;

const StatPill = styled.div`
  background: rgba(0,0,0,0.3);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 100px;
  padding: 0.5rem 1.2rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.78rem;
  color: rgba(255,255,255,0.9);

  strong { font-weight: 500; color: #fff; }
`;

const StatSep = styled.span`
  width: 1px;
  height: 14px;
  background: rgba(255,255,255,0.25);
`;

const FloatCard = styled.div`
  position: absolute;
  top: 50%;
  right: 3.5rem;
  transform: translateY(-60%);
  z-index: 20;
  background: rgba(10,40,46,0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 18px;
  padding: 1.4rem 1.6rem;
  min-width: 220px;
  box-shadow: ${theme.shadow.float};
  animation: ${fadeLeft} 0.8s 0.5s ease both;

  @media (max-width: 900px) { display: none; }
`;

const FloatLabel = styled.div`
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.65);
  margin-bottom: 0.6rem;
`;

const FloatTitle = styled.div`
  font-family: ${theme.fonts.serif};
  font-size: 1.3rem;
  font-weight: 400;
  color: #fff;
  line-height: 1.3;
  margin-bottom: 0.5rem;
`;

const FloatStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.75rem;
  color: rgba(255,255,255,0.75);
`;

const StatusDot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${theme.colors.mint};
`;

const ProgressTrack = styled.div`
  margin-top: 1rem;
  height: 4px;
  background: rgba(255,255,255,0.15);
  border-radius: 2px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  width: 68%;
  background: linear-gradient(90deg, rgba(255,255,255,0.5), rgba(255,255,255,0.9));
  border-radius: 2px;
  animation: ${growBar} 1.5s 1s ease both;
`;

const FloatMeta = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
  font-size: 0.7rem;
  color: rgba(255,255,255,0.65);
`;

// ─── Page ─────────────────────────────────────────────────────
const LandingPage = () => (
  <Frame>
    <Card>
      {/* <CornerLabel pos="tl">Beta v0.1</CornerLabel> */}
      {/* <CornerLabel pos="tr">Medicinsk App</CornerLabel> */}
      <CornerLabel pos="bl">Stoppa Proppen ©</CornerLabel>
      <CornerLabel pos="br">2025</CornerLabel>

      <Navbar variant="default" />

      <Hero>
        {/* <Badge>
          <BadgeDot />
          Beta — Nu tillgänglig
        </Badge> */}

        <H1>
          Skydda dig mot<br />
          <em>blodproppar</em>
        </H1>

        <HeroSub>
          Enkel, medicinsk vägledning för att förstå, förebygga och
          agera vid tecken på blodpropp — alltid i din ficka.
        </HeroSub>

        <HeroActions>
          {/* <BtnPrimary as="a" href="/login">
            <CheckIcon />
            Kom igång gratis
          </BtnPrimary> */}
          <BtnGhostLink href="#hur-det-fungerar">
            Läs mer <ArrowIcon />
          </BtnGhostLink>
        </HeroActions>
      </Hero>

      <Stats>
        <StatPill><strong>Medicinsk vägledning</strong><StatSep />Gratis</StatPill>
        <StatPill><strong>Community & stöd</strong><StatSep />Alltid tillgänglig</StatPill>
        <StatPill><strong>Snabb hjälp</strong><StatSep />Symtomkoll på under 60 sek</StatPill>
      </Stats>

      <FloatCard>
        <FloatLabel>Din riskbedömning</FloatLabel>
        <FloatTitle>Symtomanalys<br />pågår…</FloatTitle>
        <FloatStatus><StatusDot />3 av 5 steg klara</FloatStatus>
        <ProgressTrack><ProgressFill /></ProgressTrack>
        <FloatMeta><span>Genomfört</span><span>68%</span></FloatMeta>
      </FloatCard>
    </Card>
  </Frame>
);

// Inline SVG icons 
const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M5.5 7l1.5 1.5L9 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M3 7h8M8 4.5l2.5 2.5L8 9.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default LandingPage;
