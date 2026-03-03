import React from 'react';
import styled from 'styled-components';
import { Frame, Card, CornerLabel, fadeUp } from '../components/Layout.jsx';
import Navbar from '../components/Navbar.jsx';
import { theme } from '../styles/theme';

// ─── SCROLL-AREA ──────────────────────────────────────────────
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

// ─── HERO-SEKTION ─────────────────────────────────────────────
const Hero = styled.div`
  margin-bottom: 3rem;
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
  font-size: clamp(2.2rem, 7vw, 3.8rem);
  font-weight: 300;
  line-height: 1.15;
  color: #fff;
  margin-bottom: 1.2rem;

  em {
    font-style: italic;
    color: rgba(255,255,255,0.65);
  }
`;

const HeroText = styled.p`
  font-size: 0.95rem;
  font-weight: 300;
  color: rgba(255,255,255,0.75);
  line-height: 1.8;
  max-width: 520px;
`;

// ─── AVDELARE ─────────────────────────────────────────────────
const Divider = styled.div`
  height: 1px;
  background: rgba(255,255,255,0.1);
  margin: 2.5rem 0;
`;

// ─── SEKTION-RUBRIK ───────────────────────────────────────────
const SectionLabel = styled.div`
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.4);
  margin-bottom: 1rem;
`;

// ─── VÄRDE-KORT (de tre kort-kolumnerna) ─────────────────────
const CardGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-bottom: 2.5rem;

  @media (min-width: 600px) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem;
  }
`;

const ValueCard = styled.div`
  background: rgba(0,0,0,0.25);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 16px;
  padding: 1.4rem;
  animation: ${fadeUp} 0.6s ${({ $delay }) => $delay || '0s'} ease both;
`;

const ValueIcon = styled.div`
  width: 36px; height: 36px;
  border-radius: 10px;
  background: rgba(125,255,212,0.12);
  border: 1px solid rgba(125,255,212,0.25);
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 0.9rem;
  color: ${theme.colors.mint};
`;

const ValueTitle = styled.div`
  font-family: ${theme.fonts.serif};
  font-size: 1.1rem;
  font-weight: 400;
  color: #fff;
  margin-bottom: 0.4rem;
`;

const ValueText = styled.div`
  font-size: 0.78rem;
  color: rgba(255,255,255,0.55);
  line-height: 1.65;
`;

// ─── LÖPTEXT-SEKTION ──────────────────────────────────────────
const TextSection = styled.div`
  margin-bottom: 2.5rem;
  animation: ${fadeUp} 0.6s 0.2s ease both;
`;

const SectionTitle = styled.h2`
  font-family: ${theme.fonts.serif};
  font-size: clamp(1.5rem, 4vw, 2rem);
  font-weight: 300;
  color: #fff;
  line-height: 1.2;
  margin-bottom: 0.9rem;

  em { font-style: italic; color: rgba(255,255,255,0.6); }
`;

const BodyText = styled.p`
  font-size: 0.88rem;
  font-weight: 300;
  color: rgba(255,255,255,0.7);
  line-height: 1.85;
  margin-bottom: 0.9rem;
`;

// ─── TEAM-SEKTION ─────────────────────────────────────────────
const TeamGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-bottom: 2.5rem;

  @media (min-width: 480px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
`;

const TeamCard = styled.div`
  background: rgba(0,0,0,0.2);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 14px;
  padding: 1.2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  animation: ${fadeUp} 0.6s ${({ $delay }) => $delay || '0s'} ease both;
`;

const TeamAvatar = styled.div`
  width: 44px; height: 44px;
  border-radius: 50%;
  background: ${({ $color }) => $color || 'rgba(125,255,212,0.15)'};
  border: 1px solid rgba(255,255,255,0.2);
  display: flex; align-items: center; justify-content: center;
  font-family: ${theme.fonts.serif};
  font-size: 1.1rem;
  font-weight: 300;
  color: #fff;
  flex-shrink: 0;
`;

const TeamInfo = styled.div``;

const TeamName = styled.div`
  font-size: 0.9rem;
  font-weight: 500;
  color: #fff;
  margin-bottom: 0.15rem;
`;

const TeamRole = styled.div`
  font-size: 0.72rem;
  color: rgba(255,255,255,0.45);
`;

// ─── STATISTIK-RAD ────────────────────────────────────────────
const StatsRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.8rem;
  margin-bottom: 2.5rem;

  @media (min-width: 600px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const StatBox = styled.div`
  background: rgba(0,0,0,0.2);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 14px;
  padding: 1.2rem 1rem;
  text-align: center;
  animation: ${fadeUp} 0.6s ${({ $delay }) => $delay || '0s'} ease both;
`;

const StatNum = styled.div`
  font-family: ${theme.fonts.serif};
  font-size: 1.8rem;
  font-weight: 300;
  color: ${theme.colors.mint};
  line-height: 1;
  margin-bottom: 0.3rem;
`;

const StatLabel = styled.div`
  font-size: 0.68rem;
  color: rgba(255,255,255,0.45);
  letter-spacing: 0.04em;
`;

// ─── CTA-KORT ─────────────────────────────────────────────────
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

  &:hover { background: #fff; transform: translateY(-1px); }
  &:active { transform: scale(0.98); }
`;

// ─── PAGE ─────────────────────────────────────────────────────
const OmOssPage = () => (
  <Frame>
    <Card>
      <CornerLabel pos="tl">Om oss</CornerLabel>
      <CornerLabel pos="bl">© 2025</CornerLabel>

      <Navbar variant="default" logoHref="/" />

      <ScrollArea>

        {/* Hero */}
        <Hero>
          <Badge><BadgeDot />Vårt uppdrag</Badge>
          <H1>
            Medicinsk trygghet<br />
            <em>för alla — alltid</em>
          </H1>
          <HeroText>
            Stoppa Proppen är en svensk hälsoapp skapad för att hjälpa
            människor förstå, förebygga och hantera blodpropp. Vi kombinerar
            evidensbaserad medicinsk information med ett varmt community
            där ingen behöver känna sig ensam.
          </HeroText>
        </Hero>

        {/* Statistik */}
    {/*     <SectionLabel>Appen i siffror</SectionLabel>
        <StatsRow>
          <StatBox $delay="0s">
            <StatNum>1 247</StatNum>
            <StatLabel>Aktiva användare</StatLabel>
          </StatBox>
          <StatBox $delay="0.08s">
            <StatNum>4.8</StatNum>
            <StatLabel>Snittbetyg</StatLabel>
          </StatBox>
          <StatBox $delay="0.16s">
            <StatNum>98%</StatNum>
            <StatLabel>Nöjda användare</StatLabel>
          </StatBox>
          <StatBox $delay="0.24s">
            <StatNum>0 kr</StatNum>
            <StatLabel>Alltid gratis</StatLabel>
          </StatBox>
        </StatsRow> */}

        <Divider />

        {/* Vad vi erbjuder */}
        <TextSection>
          <SectionLabel>Vad vi erbjuder</SectionLabel>
          <SectionTitle>Tre <em>pelare</em></SectionTitle>
        </TextSection>
        <CardGrid>
          <ValueCard $delay="0s">
            <ValueIcon>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M2 9h2.5l2-5L9 14l2-6 1.5 1H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </ValueIcon>
            <ValueTitle>Symtomkoll</ValueTitle>
            <ValueText>Svara på några frågor och få en preliminär riskbedömning baserad på kliniska riktlinjer.</ValueText>
          </ValueCard>
          <ValueCard $delay="0.1s">
            <ValueIcon>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M8 2.5a4.5 4.5 0 0 0-6.364 6.364l7.864 7.864 7.864-7.864A4.5 4.5 0 0 0 10.864 2.5L9 4.364 8 2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
              </svg>
            </ValueIcon>
            <ValueTitle>Community</ValueTitle>
            <ValueText>Möt andra med liknande erfarenheter. Dela, stödja och lära av varandra i en trygg miljö.</ValueText>
          </ValueCard>
          <ValueCard $delay="0.2s">
            <ValueIcon>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M9 5v4l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </ValueIcon>
            <ValueTitle>Påminnelser</ValueTitle>
            <ValueText>Håll koll på dina mediciner med dagliga påminnelser direkt i appen — enkelt och pålitligt.</ValueText>
          </ValueCard>
        </CardGrid>

        <Divider />

        {/* Vår historia */}
        <TextSection>
          <SectionLabel>Bakgrund</SectionLabel>
          <SectionTitle>Varför vi <em>byggde detta</em></SectionTitle>
          <BodyText>
            Blodpropp drabbar varje år tusentals svenskar — och många av dem
            beskriver känslan av att stå ensam med sin oro och sina frågor.
            Sjukvården gör ett fantastiskt jobb, men det finns ett gap mellan
            läkarbesöken som Stoppa Proppen vill fylla.
          </BodyText>
          <BodyText>
            Appen startade som ett examensarbete på Technigo bootcamp
            och har växt till ett riktigt projekt med målet att bli ett
            komplement till den svenska vården — aldrig en ersättning.
          </BodyText>
          <BodyText>
            {/* All medicinsk information är granskad och baseras på Socialstyrelsens
            och 1177:s riktlinjer. */} Vi är alltid transparenta med vad appen kan
            och inte kan — den ställer inga diagnoser.
          </BodyText>
        </TextSection>

        <Divider />

        {/* Teamet */}
        <SectionLabel>Teamet</SectionLabel>
        <SectionTitle style={{ marginBottom: '1.2rem' }}>
          Människorna <em>bakom</em>
        </SectionTitle>
        <TeamGrid>
          <TeamCard $delay="0s">
            <TeamAvatar $color="rgba(125,255,212,0.15)">R</TeamAvatar>
            <TeamInfo>
              <TeamName>Rebecca</TeamName>
              <TeamRole>Grundare & utvecklare</TeamRole>
            </TeamInfo>
          </TeamCard>
          <TeamCard $delay="0.08s">
            <TeamAvatar $color="rgba(255,217,125,0.15)">M</TeamAvatar>
            <TeamInfo>
              <TeamName>Medicinsk rådgivare</TeamName>
             {/*  <TeamRole>Legitimerad sjuksköterska</TeamRole> */}
            </TeamInfo>
          </TeamCard>
          <TeamCard $delay="0.16s">
            <TeamAvatar $color="rgba(255,138,125,0.15)">UX</TeamAvatar>
            <TeamInfo>
              <TeamName>Design & tillgänglighet</TeamName>
              <TeamRole>UX-specialist</TeamRole>
            </TeamInfo>
          </TeamCard>
          <TeamCard $delay="0.24s">
            <TeamAvatar $color="rgba(74,159,168,0.25)">LTU</TeamAvatar>
            <TeamInfo>
              <TeamName>Luleå tekniska univ.</TeamName>
              <TeamRole>Akademisk handledning</TeamRole>
            </TeamInfo>
          </TeamCard>
        </TeamGrid>

        <Divider />

        {/* CTA */}
        <CtaCard>
          <CtaTitle>Redo att komma igång?</CtaTitle>
          <CtaText>
            Skapa ett gratis konto och få tillgång till symtomkoll,
            medicinpåminnelser och vårt community idag.
          </CtaText>
          <CtaBtn href="/login">Kom igång gratis →</CtaBtn>
        </CtaCard>

      </ScrollArea>
    </Card>
  </Frame>
);

export default OmOssPage;