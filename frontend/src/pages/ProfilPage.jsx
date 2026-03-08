import React from 'react';
import styled from 'styled-components';
import { Frame, Card, CornerLabel, fadeUp } from '../components/Layout.jsx';
import Navbar from '../components/Navbar.jsx';
import { theme } from '../styles/theme';
import { Link } from 'react-router-dom';
import useUserStore from '../store/userStore.js';
import { useNavigate } from "react-router-dom";


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
  margin-bottom: 2rem;
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
  margin-bottom: 0.4rem;
  em { font-style: italic; color: rgba(255,255,255,0.6); }
`;

const HeroSub = styled.p`
  font-size: 0.88rem;
  color: rgba(255,255,255,0.55);
`;


const Divider = styled.div`
  height: 1px;
  background: rgba(255,255,255,0.1);
  margin: 2rem 0;
`;


const SectionLabel = styled.div`
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.35);
  margin-bottom: 0.8rem;
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

const QuickGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.8rem;
  margin-bottom: 2rem;
`;

const QuickCard = styled(Link)`
  background: rgba(0,0,0,0.22);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 16px;
  padding: 1.2rem;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  transition: border-color 0.2s, background 0.2s;
  animation: ${fadeUp} 0.6s ${({ $delay }) => $delay || '0s'} ease both;

  &:hover {
    border-color: rgba(255,255,255,0.2);
    background: rgba(0,0,0,0.3);
  }
  &:active { transform: scale(0.98); }
`;

const QuickIcon = styled.div`
  width: 36px; height: 36px;
  border-radius: 10px;
  background: rgba(125,255,212,0.1);
  border: 1px solid rgba(125,255,212,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.mint};
`;

const QuickTitle = styled.div`
  font-size: 0.9rem;
  font-weight: 500;
  color: #fff;
`;

const QuickSub = styled.div`
  font-size: 0.72rem;
  color: rgba(255,255,255,0.45);
`;


const AccountCard = styled.div`
  background: rgba(0,0,0,0.22);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 16px;
  padding: 1.2rem 1.4rem;
  margin-bottom: 0.8rem;
  animation: ${fadeUp} 0.6s 0.1s ease both;
`;

const AccountRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

const AccountLabel = styled.div`
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.4);
  margin-bottom: 0.3rem;
`;

const AccountValue = styled.div`
  font-size: 0.92rem;
  color: #fff;
`;

const ActionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin-bottom: 2rem;
`;

const ActionBtn = styled.button`
  width: 100%;
  background: rgba(0,0,0,0.22);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 14px;
  padding: 1rem 1.4rem;
  display: flex;
  align-items: center;
  gap: 0.9rem;
  cursor: pointer;
  text-align: left;
  transition: background 0.2s, border-color 0.2s;
  animation: ${fadeUp} 0.6s ${({ $delay }) => $delay || '0s'} ease both;

  &:hover {
    background: rgba(0,0,0,0.3);
    border-color: rgba(255,255,255,0.2);
  }
  &:active { transform: scale(0.98); }
`;

const ActionIcon = styled.div`
  width: 34px; height: 34px;
  border-radius: 9px;
  background: ${({ $color }) => $color || 'rgba(255,255,255,0.08)'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ $iconColor }) => $iconColor || 'rgba(255,255,255,0.6)'};
  flex-shrink: 0;
`;

const ActionText = styled.div`
  flex: 1;
`;

const ActionTitle = styled.div`
  font-size: 0.88rem;
  font-weight: 500;
  color: #fff;
`;

const ActionSub = styled.div`
  font-size: 0.72rem;
  color: rgba(255,255,255,0.4);
  margin-top: 0.1rem;
`;

const ActionArrow = styled.div`
  color: rgba(255,255,255,0.25);
  font-size: 0.8rem;
`;


const DeleteBtn = styled.button`
  width: 100%;
  background: rgba(255,80,80,0.06);
  border: 1px solid rgba(255,80,80,0.2);
  border-radius: 14px;
  padding: 1rem 1.4rem;
  display: flex;
  align-items: center;
  gap: 0.9rem;
  cursor: pointer;
  text-align: left;
  transition: background 0.2s, border-color 0.2s;
  animation: ${fadeUp} 0.6s 0.3s ease both;

  &:hover {
    background: rgba(255,80,80,0.1);
    border-color: rgba(255,80,80,0.35);
  }
  &:active { transform: scale(0.98); }
`;

const DeleteTitle = styled.div`
  font-size: 0.88rem;
  font-weight: 500;
  color: rgba(255,120,120,0.9);
`;

const DeleteSub = styled.div`
  font-size: 0.72rem;
  color: rgba(255,100,100,0.5);
  margin-top: 0.1rem;
`;


// ─── PAGE ─────────────────────────────────────────────────────────────────────
const ProfilPage = () => { 
    const user = useUserStore(state => state.user);
    const logout = useUserStore(state => state.logout);
    const navigate = useNavigate();

    return ( 
  <Frame>
    <Card>
      <CornerLabel pos="tl">Profil</CornerLabel>
{/*       <CornerLabel pos="tr">Stoppa Proppen</CornerLabel>
 */}      <CornerLabel pos="bl">© 2025</CornerLabel>

      <Navbar variant="default" logoHref="/" />

      <ScrollArea>

        {/* Hero */}
        <Hero>
          <Badge><BadgeDot />Inloggad</Badge>
          <H1>
            Mitt <em>konto</em>
          </H1>
          <HeroSub>Hantera ditt konto och dina inställningar</HeroSub>
        </Hero>


        <SectionLabel>Genvägar</SectionLabel>
        <QuickGrid>
          <QuickCard to="/medicin" $delay="0s">
            <QuickIcon>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M7.5 2.5a4 4 0 0 0-5.657 5.657l8 8a4 4 0 0 0 5.657-5.657l-8-8Z"
                  stroke="currentColor" strokeWidth="1.5"/>
                <path d="M5.5 8.5l3.5-3.5" stroke="currentColor"
                  strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </QuickIcon>
            <QuickTitle>Medicinlådan</QuickTitle>
            <QuickSub>Dina dagliga mediciner</QuickSub>
          </QuickCard>

          <QuickCard to="/symptomkoll" $delay="0.08s">
            <QuickIcon>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M2 9h2.5l2-5L9 14l2-6 1.5 1H16"
                  stroke="currentColor" strokeWidth="1.5"
                  strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </QuickIcon>
            <QuickTitle>Symtomkoll</QuickTitle>
            <QuickSub>Gör en ny bedömning</QuickSub>
          </QuickCard>
        </QuickGrid>

        <Divider />

        <SectionLabel>Kontoinformation</SectionLabel>
        <AccountCard>
          <AccountRow>
            <div>
              <AccountLabel>E-postadress</AccountLabel>
              {/*  email from Zustand-store */}
              <AccountValue>{user?.email}</AccountValue>
            </div>
          </AccountRow>
        </AccountCard>

        <Divider />

        <SectionLabel>Inställningar</SectionLabel>
        <ActionList>

          <ActionBtn $delay="0s" onClick={() => {logout(); navigate("/login")}}>
            <ActionIcon $color="rgba(255,255,255,0.08)" $iconColor="rgba(255,255,255,0.6)">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 2H3a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M11 11l3-3-3-3M14 8H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </ActionIcon>
            <ActionText>
              <ActionTitle>Logga ut</ActionTitle>
              <ActionSub>Avslutar din session</ActionSub>
            </ActionText>
            <ActionArrow>›</ActionArrow>
          </ActionBtn>

          <ActionBtn $delay="0.08s" onClick={() => {}}> {/* //will do later */}
            <ActionIcon $color="rgba(125,255,212,0.08)" $iconColor={theme.colors.mint}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="3" y="7" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M5 7V5a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </ActionIcon>
            <ActionText>
              <ActionTitle>Byt lösenord</ActionTitle>
              <ActionSub>Uppdatera ditt lösenord</ActionSub>
            </ActionText>
            <ActionArrow>›</ActionArrow>
          </ActionBtn>

        </ActionList>

        <SectionLabel>Farlig zon</SectionLabel>
        <DeleteBtn onClick={() => {}}> {/* will do later */}
          <ActionIcon $color="rgba(255,80,80,0.1)" $iconColor="rgba(255,120,120,0.9)">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 4h12M5 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1M6 7v5M10 7v5M3 4l1 9a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1l1-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </ActionIcon>
          <ActionText>
            <DeleteTitle>Radera konto</DeleteTitle>
            <DeleteSub>Tar bort all din data permanent</DeleteSub>
          </ActionText>
          <ActionArrow style={{ color: 'rgba(255,100,100,0.4)' }}>›</ActionArrow>
        </DeleteBtn>

      </ScrollArea>
    </Card>
  </Frame>
)};

export default ProfilPage;