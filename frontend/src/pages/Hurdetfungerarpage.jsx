import React from 'react';
import styled from 'styled-components';
import { Frame, Card, CornerLabel, fadeUp } from '../components/Layout.jsx';
import Navbar from '../components/Navbar.jsx';
import { theme } from '../styles/theme';


// ─── SCROLL-AREA ──────────────────────────────────────────────────────────────
const ScrollArea = styled.div`
  position: relative;
  z-index: 10;
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem 1.4rem 4rem;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }

  @media (min-width: 768px) {
    padding: 2rem 2.5rem 4rem;
    max-width: 720px;
    margin: 0 auto;
    width: 100%;
  }
`;


// ─── HERO ─────────────────────────────────────────────────────────────────────
const Hero = styled.div`
  margin-bottom: 2.5rem;
  animation: ${fadeUp} 0.7s ease both;
`;

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(0,0,0,0.25);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 100px;
  padding: 0.3rem 0.9rem;
  font-size: 0.68rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.75);
  margin-bottom: 1rem;
`;

const BadgeDot = styled.span`
  width: 5px; height: 5px;
  border-radius: 50%;
  background: ${theme.colors.mint};
`;

const H1 = styled.h1`
  font-family: ${theme.fonts.serif};
  font-size: clamp(2rem, 6vw, 3.2rem);
  font-weight: 300;
  color: #fff;
  line-height: 1.2;
  margin-bottom: 0.9rem;
  em { font-style: italic; color: rgba(255,255,255,0.6); }
`;

const HeroText = styled.p`
  font-size: 0.9rem;
  color: rgba(255,255,255,0.65);
  line-height: 1.75;
  max-width: 480px;
`;


// ─── AVDELARE ─────────────────────────────────────────────────────────────────
const Divider = styled.div`
  height: 1px;
  background: rgba(255,255,255,0.1);
  margin: 2.5rem 0;
`;


// ─── SEKTION-ETIKETT ──────────────────────────────────────────────────────────
const SectionLabel = styled.div`
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.35);
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;

  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(255,255,255,0.08);
  }
`;

const SectionTitle = styled.h2`
  font-family: ${theme.fonts.serif};
  font-size: clamp(1.5rem, 4vw, 2rem);
  font-weight: 300;
  color: #fff;
  line-height: 1.2;
  margin-bottom: 1.2rem;
  em { font-style: italic; color: rgba(255,255,255,0.6); }
`;


// ─── STEG-KORT ────────────────────────────────────────────────────────────────
const StepList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-bottom: 2rem;
`;

const StepCard = styled.div`
  background: rgba(0,0,0,0.22);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 16px;
  padding: 1.2rem 1.4rem;
  display: flex;
  gap: 1.1rem;
  align-items: flex-start;
  animation: ${fadeUp} 0.6s ${({ $delay }) => $delay || '0s'} ease both;
`;

const StepNumber = styled.div`
  font-family: ${theme.fonts.serif};
  font-size: 1.6rem;
  font-weight: 300;
  color: ${theme.colors.mint};
  line-height: 1;
  flex-shrink: 0;
  width: 28px;
  margin-top: 0.1rem;
`;

const StepContent = styled.div``;

const StepTitle = styled.div`
  font-size: 0.95rem;
  font-weight: 500;
  color: #fff;
  margin-bottom: 0.3rem;
`;

const StepText = styled.div`
  font-size: 0.82rem;
  font-weight: 300;
  color: rgba(255,255,255,0.6);
  line-height: 1.7;
`;


// ─── FUNKTIONS-KORT ───────────────────────────────────────────────────────────
const FeatureGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-bottom: 2rem;

  @media (min-width: 600px) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem;
  }
`;

const FeatureCard = styled.div`
  background: rgba(0,0,0,0.22);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 16px;
  padding: 1.4rem;
  animation: ${fadeUp} 0.6s ${({ $delay }) => $delay || '0s'} ease both;
`;

const FeatureIcon = styled.div`
  width: 38px; height: 38px;
  border-radius: 10px;
  background: rgba(125,255,212,0.1);
  border: 1px solid rgba(125,255,212,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.mint};
  margin-bottom: 0.9rem;
`;

const FeatureTitle = styled.div`
  font-family: ${theme.fonts.serif};
  font-size: 1.05rem;
  font-weight: 400;
  color: #fff;
  margin-bottom: 0.4rem;
`;

const FeatureText = styled.div`
  font-size: 0.78rem;
  color: rgba(255,255,255,0.55);
  line-height: 1.65;
`;


// ─── INFO-RUTA ────────────────────────────────────────────────────────────────
const InfoBox = styled.div`
  background: rgba(255,217,125,0.07);
  border: 1px solid rgba(255,217,125,0.25);
  border-radius: 14px;
  padding: 1.2rem 1.4rem;
  display: flex;
  gap: 0.9rem;
  align-items: flex-start;
  margin-bottom: 2rem;
  animation: ${fadeUp} 0.6s 0.2s ease both;
`;

const InfoIcon = styled.div`
  font-size: 1.1rem;
  flex-shrink: 0;
  margin-top: 0.1rem;
`;

const InfoText = styled.div`
  font-size: 0.82rem;
  color: rgba(255,217,125,0.85);
  line-height: 1.7;

  strong {
    color: rgba(255,217,125,1);
    font-weight: 500;
  }
`;


// ─── CTA-KORT ─────────────────────────────────────────────────────────────────
const CtaCard = styled.div`
  background: rgba(125,255,212,0.07);
  border: 1px solid rgba(125,255,212,0.2);
  border-radius: 18px;
  padding: 1.8rem 1.4rem;
  text-align: center;
  animation: ${fadeUp} 0.6s 0.3s ease both;

  @media (min-width: 768px) {
    padding: 2.5rem 2rem;
  }
`;

const CtaTitle = styled.h3`
  font-family: ${theme.fonts.serif};
  font-size: 1.6rem;
  font-weight: 300;
  color: #fff;
  margin-bottom: 0.6rem;
`;

const CtaText = styled.p`
  font-size: 0.82rem;
  color: rgba(255,255,255,0.6);
  margin-bottom: 1.4rem;
  line-height: 1.7;
`;

const CtaBtn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255,255,255,0.92);
  color: ${theme.colors.tealDeep};
  border-radius: 100px;
  padding: 0.85rem 2rem;
  font-size: 0.88rem;
  font-weight: 500;
  text-decoration: none;
  transition: background 0.2s, transform 0.15s;

  @media (min-width: 768px) {
    &:hover { background: #fff; transform: translateY(-1px); }
  }
  &:active { transform: scale(0.98); }
`;


// ─── PAGE ─────────────────────────────────────────────────────────────────────
const HurDetFungerarPage = () => (
  <Frame>
    <Card>
      {/* <CornerLabel pos="tl">Hur det fungerar</CornerLabel>
      <CornerLabel pos="tr">Stoppa Proppen</CornerLabel> */}
      <CornerLabel pos="bl">© 2025</CornerLabel>

      <Navbar variant="default" logoHref="/" />

      <ScrollArea>

        {/* Hero */}
        <Hero>
          <Badge><BadgeDot />Guide</Badge>
          <H1>
            Kom igång på<br />
            <em>tre minuter</em>
          </H1>
          <HeroText>
            Stoppa Proppen är byggt för att vara enkelt att använda —
            oavsett om du är van vid appar eller inte. Här går vi igenom
            hur allt fungerar, steg för steg.
          </HeroText>
        </Hero>


        {/* Steg-för-steg */}
        <SectionLabel>Steg-för-steg</SectionLabel>
        <SectionTitle>Så här <em>börjar du</em></SectionTitle>

        <StepList>
          <StepCard $delay="0s">
            <StepNumber>1</StepNumber>
            <StepContent>
              <StepTitle>Skapa ett gratis konto</StepTitle>
              <StepText>
                Tryck på "Kom igång gratis" på startsidan. Ange din
                e-postadress och välj ett lösenord. Det tar mindre än en minut.
              </StepText>
            </StepContent>
          </StepCard>

          <StepCard $delay="0.08s">
            <StepNumber>2</StepNumber>
            <StepContent>
              <StepTitle>Gör en symtomkoll</StepTitle>
              <StepText>
                Svara på några enkla frågor om hur du mår. Appen ger dig
                en preliminär riskbedömning och råd om vad du bör göra härnäst.
              </StepText>
            </StepContent>
          </StepCard>

          <StepCard $delay="0.16s">
            <StepNumber>3</StepNumber>
            <StepContent>
              <StepTitle>Lägg till dina mediciner</StepTitle>
              <StepText>
                Gå till Medicinlådan och lägg till dina mediciner med namn,
                dos och tid. Appen påminner dig varje dag när det är dags.
              </StepText>
            </StepContent>
          </StepCard>

          <StepCard $delay="0.24s">
            <StepNumber>4</StepNumber>
            <StepContent>
              <StepTitle>Följ din hälsa över tid</StepTitle>
              <StepText>
                Markera mediciner som tagna, gör nya symtomkollar och håll
                koll på ditt välmående — allt på ett och samma ställe.
              </StepText>
            </StepContent>
          </StepCard>
        </StepList>


        <Divider />


        {/* Funktioner */}
        <SectionLabel>Funktioner</SectionLabel>
        <SectionTitle>Vad du <em>kan göra</em></SectionTitle>

        <FeatureGrid>
          <FeatureCard $delay="0s">
            <FeatureIcon>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M2 9h2.5l2-5L9 14l2-6 1.5 1H16"
                  stroke="currentColor" strokeWidth="1.5"
                  strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </FeatureIcon>
            <FeatureTitle>Symtomkoll</FeatureTitle>
            <FeatureText>
              Besvara frågor om dina symtom och få en riskbedömning
              baserad på medicinska riktlinjer.
            </FeatureText>
          </FeatureCard>

          <FeatureCard $delay="0.1s">
            <FeatureIcon>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M7.5 2.5a4 4 0 0 0-5.657 5.657l8 8a4 4 0 0 0 5.657-5.657l-8-8Z"
                  stroke="currentColor" strokeWidth="1.5"/>
                <path d="M5.5 8.5l3.5-3.5" stroke="currentColor"
                  strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </FeatureIcon>
            <FeatureTitle>Medicinlådan</FeatureTitle>
            <FeatureText>
              Håll koll på dina dagliga mediciner med påminnelser
              och en tydlig checklista.
            </FeatureText>
          </FeatureCard>

          <FeatureCard $delay="0.2s">
            <FeatureIcon>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="7" cy="6" r="3" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M2 16c0-3 2-5 5-5s5 2 5 5" stroke="currentColor"
                  strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M13 8c1.5 0 3 1 3 3" stroke="currentColor"
                  strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="13" cy="5" r="2" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </FeatureIcon>
            <FeatureTitle>Community</FeatureTitle>
            <FeatureText>
              Möt andra med liknande erfarenheter och dela tips
              i en trygg och stöttande miljö.
            </FeatureText>
          </FeatureCard>
        </FeatureGrid>


        <Divider />


        {/* Viktig info-ruta */}
        <InfoBox>
          <InfoIcon>⚠️</InfoIcon>
          <InfoText>
            <strong>Viktigt att veta: </strong>
            Stoppa Proppen ersätter inte sjukvård och ställer inga diagnoser.
            Vid akuta symtom som plötslig andnöd, bröstsmärta eller kraftig
            svullnad i ett ben — ring <strong>112</strong> omedelbart.
          </InfoText>
        </InfoBox>


        {/* CTA */}
        <CtaCard>
          <CtaTitle>Redo att testa?</CtaTitle>
          <CtaText>
            Skapa ett gratis konto och kom igång direkt.
            Det tar mindre än en minut.
          </CtaText>
          <CtaBtn href="/login">Kom igång gratis →</CtaBtn>
        </CtaCard>

      </ScrollArea>
    </Card>
  </Frame>
);

export default HurDetFungerarPage;
