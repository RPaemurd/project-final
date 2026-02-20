import React, { useState } from 'react';
import styled from 'styled-components';
import { Frame, fadeUp, fadeLeft } from '../components/Layout.jsx';
import { theme } from '../styles/theme';

// ─── Split card ───────────────────────────────────────────────
const SplitCard = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;

  /* mobil: ren gradient, inget split */
  background: linear-gradient(160deg, #1a6b76 0%, #0d4a52 100%);

  @media (min-width: 700px) {
    min-height: 620px;
    border-radius: 24px;
    max-width: 1050px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    box-shadow: ${theme.shadow.card};
  }
`;

// ─── Vänster panel — bara desktop ────────────────────────────
const LeftPanel = styled.div`
  display: none;

  @media (min-width: 700px) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 2.5rem;
    background: linear-gradient(160deg, #1a6b76 0%, #1a6b76 20%, #4a9fa8 55%, #1a6b76 80%, #0d4a52 100%);
    position: relative;

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background: rgba(8,35,40,0.42);
      pointer-events: none;
      z-index: 1;
    }

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background-image: repeating-linear-gradient(
        90deg, transparent, transparent 3px,
        rgba(255,255,255,0.025) 3px, rgba(255,255,255,0.025) 4px
      );
      pointer-events: none;
      z-index: 0;
    }
  }
`;

const LeftInner = styled.div`
  position: relative;
  z-index: 5;
`;

const LogoWrap = styled.a`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  text-decoration: none;
  position: relative;
  z-index: 5;
`;

const LogoIcon = styled.div`
  width: 32px; height: 32px;
  border-radius: 50%;
  background: rgba(255,255,255,0.2);
  border: 1.5px solid rgba(255,255,255,0.35);
  display: flex; align-items: center; justify-content: center;
`;

const LogoText = styled.span`
  font-size: 0.9rem;
  font-weight: 500;
  color: rgba(255,255,255,0.9);
`;

const LeftHeading = styled.h2`
  font-family: ${theme.fonts.serif};
  font-size: 3rem;
  font-weight: 300;
  line-height: 1.15;
  color: #fff;
  margin-bottom: 1rem;
  animation: ${fadeUp} 0.8s ease both;

  em { font-style: italic; color: rgba(255,255,255,0.78); }
`;

const LeftSubtext = styled.p`
  font-size: 0.88rem;
  font-weight: 300;
  color: rgba(255,255,255,0.85);
  line-height: 1.7;
  max-width: 280px;
`;

const TrustBadges = styled.div`
  position: relative;
  z-index: 5;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const TrustItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7rem;
  font-size: 0.75rem;
  color: rgba(255,255,255,0.85);
`;

const TrustIcon = styled.div`
  width: 28px; height: 28px;
  border-radius: 50%;
  background: rgba(255,255,255,0.15);
  border: 1px solid rgba(255,255,255,0.28);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
`;

// ─── Höger formpanel ──────────────────────────────────────────
const RightPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2.5rem 1.4rem;

  @media (min-width: 700px) {
    background: rgba(10,40,46,0.88);
    backdrop-filter: blur(20px);
    border-left: 1px solid rgba(255,255,255,0.1);
    padding: 3rem;
    animation: ${fadeLeft} 0.8s 0.2s ease both;
  }
`;

// Mobil-logga — bara synlig på mobil ──────────────────────────
const MobileLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 2rem;
  z-index: 10;
  position: relative;

  @media (min-width: 700px) {
    display: none;
  }
`;

const FormHeading = styled.h3`
  font-family: ${theme.fonts.serif};
  font-size: 2rem;
  font-weight: 300;
  color: #fff;
  margin-bottom: 0.4rem;
`;

const FormSubtext = styled.p`
  font-size: 0.82rem;
  color: rgba(255,255,255,0.65);
  margin-bottom: 2rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.2rem;
`;

const Label = styled.label`
  display: block;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.65);
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 10px;
  padding: 0.9rem 1.1rem;
  font-size: 1rem; /* 16px — förhindrar zoom på iOS */
  font-weight: 400;
  color: #fff;
  outline: none;
  transition: border-color 0.2s, background 0.2s;
  -webkit-appearance: none;

  &::placeholder { color: rgba(255,255,255,0.35); }
  &:focus {
    border-color: rgba(125,255,212,0.5);
    background: rgba(255,255,255,0.14);
  }
`;

const ForgotRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: -0.5rem;
  margin-bottom: 1.5rem;
`;

const ForgotLink = styled.a`
  font-size: 0.75rem;
  color: rgba(255,255,255,0.6);
  text-decoration: none;
  transition: color 0.2s;
  &:hover { color: rgba(255,255,255,0.9); }
`;

const SubmitBtn = styled.button`
  width: 100%;
  background: rgba(255,255,255,0.92);
  color: ${theme.colors.tealDeep};
  border: none;
  border-radius: 100px;
  padding: 1rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s, transform 0.15s;
  box-shadow: 0 8px 24px rgba(0,0,0,0.2);

  &:hover { background: #fff; transform: translateY(-1px); }
  &:active { transform: scale(0.98); }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1.4rem 0;
`;

const DividerLine = styled.div`
  flex: 1;
  height: 1px;
  background: rgba(255,255,255,0.15);
`;

const DividerText = styled.span`
  font-size: 0.72rem;
  color: rgba(255,255,255,0.55);
  letter-spacing: 0.04em;
`;

const GhostBtn = styled.button`
  width: 100%;
  background: transparent;
  color: rgba(255,255,255,0.8);
  border: 1px solid rgba(255,255,255,0.25);
  border-radius: 100px;
  padding: 1rem;
  font-size: 0.9rem;
  font-weight: 400;
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s;
  &:hover { border-color: rgba(255,255,255,0.45); color: #fff; }
  &:active { transform: scale(0.98); }
`;

const RegisterLink = styled.p`
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.8rem;
  color: rgba(255,255,255,0.6);

  a {
    color: ${theme.colors.mint};
    text-decoration: none;
    &:hover { color: #fff; }
  }
`;

const CornerLabel = styled.span`
  display: none;

  @media (min-width: 700px) {
    display: block;
    position: absolute;
    color: rgba(255,255,255,0.45);
    font-size: 0.62rem;
    letter-spacing: 0.05em;
    z-index: 10;

    ${({ pos }) => ({
      'tl': 'top: 1rem; left: 1.2rem;',
      'tr': 'top: 1rem; right: 1.2rem;',
      'bl': 'bottom: 1rem; left: 1.2rem;',
      'br': 'bottom: 1rem; right: 1.2rem;',
    }[pos])}
  }
`;

// ─── Page ─────────────────────────────────────────────────────
const LoginPage = ({ onLogin }) => {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onLogin) onLogin({ email });
    window.location.href = '/symptomkoll';
  };

  return (
    <Frame>
      <SplitCard>
        <CornerLabel pos="tl">Inloggning</CornerLabel>
        <CornerLabel pos="tr">Stoppa Proppen</CornerLabel>
        <CornerLabel pos="bl">Säker anslutning</CornerLabel>
        <CornerLabel pos="br">v0.1</CornerLabel>

        {/* Vänster — bara desktop */}
        <LeftPanel>
          <LogoWrap href="/">
            <LogoIcon>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 8h2l1.5-4L8 12l1.5-5L11 8h3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </LogoIcon>
            <LogoText>Stoppa Proppen</LogoText>
          </LogoWrap>
          <LeftInner>
            <LeftHeading>Välkommen<br /><em>tillbaka</em></LeftHeading>
            <LeftSubtext>Din hälsojournal och symtomhistorik väntar. Logga in för att fortsätta din riskbedömning.</LeftSubtext>
          </LeftInner>
          <TrustBadges>
            <TrustItem><TrustIcon><StarIcon /></TrustIcon>Evidensbaserad medicinsk information</TrustItem>
            <TrustItem><TrustIcon><LockIcon /></TrustIcon>Krypterad och säker datahantering</TrustItem>
            <TrustItem><TrustIcon><CheckCircleIcon /></TrustIcon>GDPR-säker hantering av persondata</TrustItem>
          </TrustBadges>
        </LeftPanel>

        {/* Höger — formulär */}
        <RightPanel>
          {/* Logga bara synlig på mobil */}
          <MobileLogo>
            <LogoIcon>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 8h2l1.5-4L8 12l1.5-5L11 8h3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </LogoIcon>
            <LogoText>Stoppa Proppen</LogoText>
          </MobileLogo>

          <FormHeading>Logga in</FormHeading>
          <FormSubtext>Ange dina uppgifter för att fortsätta</FormSubtext>

          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="email">E-postadress</Label>
              <Input id="email" type="email" placeholder="namn@exempel.se"
                value={email} onChange={e => setEmail(e.target.value)} required />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="password">Lösenord</Label>
              <Input id="password" type="password" placeholder="••••••••"
                value={password} onChange={e => setPassword(e.target.value)} required />
            </FormGroup>
            <ForgotRow>
              <ForgotLink href="/glömt-lösenord">Glömt lösenordet?</ForgotLink>
            </ForgotRow>
            <SubmitBtn type="submit">Logga in</SubmitBtn>
          </form>

          <Divider>
            <DividerLine /><DividerText>ELLER</DividerText><DividerLine />
          </Divider>

          <GhostBtn onClick={() => window.location.href = '/symptomkoll'}>
            Fortsätt som gäst
          </GhostBtn>

          <RegisterLink>
            Inget konto? <a href="/registrera">Skapa ett här</a>
          </RegisterLink>
        </RightPanel>
      </SplitCard>
    </Frame>
  );
};

const StarIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M6 1L7.5 4.5H11L8.5 6.5L9.5 10L6 8L2.5 10L3.5 6.5L1 4.5H4.5L6 1Z" stroke="white" strokeWidth="1" strokeLinejoin="round"/>
  </svg>
);
const LockIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <rect x="2" y="5" width="8" height="6" rx="1.5" stroke="white" strokeWidth="1"/>
    <path d="M4 5V3.5a2 2 0 0 1 4 0V5" stroke="white" strokeWidth="1" strokeLinecap="round"/>
  </svg>
);
const CheckCircleIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <circle cx="6" cy="6" r="4.5" stroke="white" strokeWidth="1"/>
    <path d="M4 6l1.5 1.5L8 4.5" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default LoginPage;
