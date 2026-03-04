import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';

// react-toastify: toast = triggar en notis, ToastContainer = måste finnas i trädet
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Frame = yttersta wrapper, Card = gradient-kortet,
import { Frame, Card, CornerLabel, fadeUp } from '../components/Layout.jsx';
import Navbar from '../components/Navbar.jsx';
import { theme } from '../styles/theme';
import BottomNav from "../components/BottomNav.jsx"


// ─── ANIMATIONER ─────────────────────────────────────────────────────────────

// Glider upp från nedanför — används på medicin-korten och modal-sheeten
const slideUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

// Studs-animation när en medicin markeras som tagen
const checkPop = keyframes`
  0%   { transform: scale(0.8); }
  60%  { transform: scale(1.2); }
  100% { transform: scale(1); }
`;

// Enkel fade-in för modal-bakgrunden
const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;


// ─── SCROLL-AREA ─────────────────────────────────────────────────────────────
// Innehåller hela medicin-listan och kan scrollas.
// padding-bottom är stor (7rem) så innehållet inte döljs bakom den fasta knappen.
// Scrollbaren döljs visuellt för ett renare mobilutseende.
//
// MOBIL (bas):  full bredd, mindre sidpadding
// DESKTOP 768+: begränsad max-bredd och centreras med margin: auto
const ScrollArea = styled.div`
  /* MOBIL: full bredd, lite luft på sidorna */
  position: relative;
  z-index: 10;
  flex: 1;
  overflow-y: auto;
  padding: 0.5rem 1.4rem 7rem; /* stor bottom-padding pga den fasta knappen */

  /* Döljer scrollbaren i Firefox */
  scrollbar-width: none;
  /* Döljer scrollbaren i Chrome/Safari */
  &::-webkit-scrollbar { display: none; }

  /* DESKTOP 768+: begränsa bredden och centrera */
  @media (min-width: 768px) {
    padding: 0.5rem 2.5rem 5rem;
    max-width: 640px;
    margin: 0 auto;
    width: 100%;
  }
`;


// ─── DAGSSTATUS-SEKTION ───────────────────────────────────────────────────────
// Visar datum, veckodagsnamn och hur många mediciner som är kvar.
// Inga responsiva skillnader här — fungerar lika bra på alla skärmar.

// Wrapper för hela blocket, glider in vid sidladdning
const DayHeader = styled.div`
  margin-bottom: 1.5rem;
  animation: ${fadeUp} 0.6s ease both;
`;

// Liten etikett ovanför, t.ex. "26 februari"
const DayLabel = styled.div`
  font-size: 0.68rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.55);
  margin-bottom: 0.3rem;
`;

// Stor serif-rubrik, t.ex. "Måndag — 2 kvar"
// clamp() gör fontstorleken responsiv utan media queries:
//   minimum 1.6rem, ökar med 5% av viewportbredden, max 2.2rem
const DayTitle = styled.h2`
  font-family: ${theme.fonts.serif};
  font-size: clamp(1.6rem, 5vw, 2.2rem);
  font-weight: 300;
  color: #fff;
  line-height: 1.2;
  em { font-style: italic; color: rgba(255,255,255,0.65); }
`;

// Undertext, t.ex. "1 av 2 mediciner tagna idag"
const DaySubtext = styled.p`
  font-size: 0.82rem;
  color: rgba(255,255,255,0.6);
  margin-top: 0.4rem;
`;


// ─── SEKTION-RUBRIK ───────────────────────────────────────────────────────────
// Rubrikerna "Idag" och "Imorgon".
// ::after skapar den horisontella linjen till höger om texten.
// Inga responsiva skillnader.
const SectionTitle = styled.div`
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.45);
  margin: 1.4rem 0 0.7rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;

  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(255,255,255,0.1);
  }
`;


// ─── MEDICIN-KORT ─────────────────────────────────────────────────────────────
// $taken (boolean): styr grön eller neutral färgton
// $delay (sträng):  animationsfördröjning per kort för sekventiell inglid
//
// MOBIL (bas):  kompaktare padding
// DESKTOP 768+: lite mer luft
const MedCard = styled.div`
  /* MOBIL: kompakt padding */
  background: ${({ $taken }) => $taken ? 'rgba(125,255,212,0.08)' : 'rgba(0,0,0,0.25)'};
  border: 1px solid ${({ $taken }) => $taken ? 'rgba(125,255,212,0.3)' : 'rgba(255,255,255,0.15)'};
  border-radius: 14px;
  padding: 0.85rem 1rem;
  margin-bottom: 0.6rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transition: border-color 0.3s, background 0.3s;
  animation: ${slideUp} 0.5s ${({ $delay }) => $delay || '0s'} ease both;

  /* DESKTOP 768+: mer luft och rundare hörn */
  @media (min-width: 768px) {
    border-radius: 16px;
    padding: 1rem 1.2rem;
    gap: 0.9rem;
    margin-bottom: 0.7rem;
  }
`;

// Rund checkknapp till vänster.
// $taken styr färg. checkPop-animationen spelas bara när $taken är true.
// Storleken är 40px på mobil (lättare att trycka) och 36px på desktop.
const CheckBtn = styled.button`
  /* MOBIL: lite större för enklare touch-interaktion */
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1.5px solid ${({ $taken }) => $taken ? 'rgba(125,255,212,0.8)' : 'rgba(255,255,255,0.3)'};
  background: ${({ $taken }) => $taken ? 'rgba(125,255,212,0.2)' : 'transparent'};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.2s;

  ${({ $taken }) => $taken && css`animation: ${checkPop} 0.3s ease;`}

  &:active { transform: scale(0.92); }

  /* DESKTOP 768+: standard storlek */
  @media (min-width: 768px) {
    width: 36px;
    height: 36px;
  }
`;

// Mittencolumn med namn och dos — klickbar för att öppna redigera-modalen
const MedInfo = styled.div`
  flex: 1;
  min-width: 0; /* förhindrar text-overflow utanför kortet */
  cursor: pointer;
`;

// Medicinnamn med genomstrykning och tonad färg när tagen
const MedName = styled.div`
  /* MOBIL: standard storlek */
  font-size: 0.92rem;
  font-weight: 500;
  color: ${({ $taken }) => $taken ? 'rgba(255,255,255,0.45)' : '#fff'};
  text-decoration: ${({ $taken }) => $taken ? 'line-through' : 'none'};
  transition: color 0.3s;

  /* DESKTOP 768+: något större */
  @media (min-width: 768px) {
    font-size: 0.95rem;
  }
`;

// Dos-text, t.ex. "5 mg"
const MedDose = styled.div`
  font-size: 0.75rem;
  color: rgba(255,255,255,0.4);
  margin-top: 0.15rem;
`;

// Höger kolumn: tid, tagen-klockslag och åtgärdsknappar
const MedRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.3rem;
`;

// Tidtext, t.ex. "kl 20:00" (amber) eller "✓ Tagen" (grön)
const MedTime = styled.div`
  font-size: 0.72rem;
  font-weight: 500;
  color: ${({ $taken }) => $taken ? 'rgba(125,255,212,0.7)' : 'rgba(255,217,125,0.9)'};
  white-space: nowrap;
`;

// Klockslag för när medicinen faktiskt togs, t.ex. "08:14"
const TakenTime = styled.div`
  font-size: 0.68rem;
  color: rgba(125,255,212,0.55);
`;


// ─── ÅTGÄRDSKNAPPAR (REDIGERA / TA BORT) ─────────────────────────────────────
// $danger (boolean): false = neutral (penna), true = röd (papperskorg)
//
// MOBIL (bas):  lite större (44px) för touch
// DESKTOP 768+: standard (30px)

const ActionRow = styled.div`
  display: flex;
  gap: 0.35rem;
  flex-shrink: 0;
`;

const IconBtn = styled.button`
  /* MOBIL: touch-vänlig storlek (44px rekommenderas av Apple/Google) */
  width: 34px;
  height: 34px;
  border-radius: 8px;
  border: 1px solid ${({ $danger }) => $danger ? 'rgba(255,138,125,0.3)' : 'rgba(255,255,255,0.15)'};
  background: ${({ $danger }) => $danger ? 'rgba(255,138,125,0.1)' : 'rgba(255,255,255,0.06)'};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${({ $danger }) => $danger ? '#ff8a7d' : 'rgba(255,255,255,0.6)'};
  transition: all 0.2s;

  &:active { transform: scale(0.92); }

  /* DESKTOP 768+: kompaktare storlek + hover-effekter (hover finns inte på touch) */
  @media (min-width: 768px) {
    width: 30px;
    height: 30px;

    &:hover {
      background: ${({ $danger }) => $danger ? 'rgba(255,138,125,0.2)' : 'rgba(255,255,255,0.12)'};
      color: ${({ $danger }) => $danger ? '#ff8a7d' : '#fff'};
      border-color: ${({ $danger }) => $danger ? 'rgba(255,138,125,0.5)' : 'rgba(255,255,255,0.3)'};
    }
  }
`;


// ─── IMORGON-KORT ─────────────────────────────────────────────────────────────
// Nedtonade, informativa kort utan åtgärdsknappar.
// Inga responsiva skillnader behövs här.
const TomorrowCard = styled.div`
  background: rgba(0,0,0,0.15);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 14px;
  padding: 0.9rem 1.2rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  opacity: 0.6;
`;

const TomorrowDot = styled.div`
  width: 8px; height: 8px;
  border-radius: 50%;
  border: 1.5px solid rgba(255,255,255,0.35);
  flex-shrink: 0;
`;

const TomorrowName = styled.div`
  font-size: 0.88rem;
  color: rgba(255,255,255,0.65);
  flex: 1;
`;

const TomorrowTime = styled.div`
  font-size: 0.72rem;
  color: rgba(255,255,255,0.35);
`;


// ─── LÄGG TILL-KNAPP (FAST LÄNGST NER) ───────────────────────────────────────
// Knappen är fixed längst ner hela tiden.
// Gradienten bakom gör att listan tonas bort naturligt.
//
// MOBIL (bas):  sträcker sig full bredd
// DESKTOP 768+: centreras och begränsas till 640px (samma bredd som innehållet)
const AddBtnWrap = styled.div`
  /* MOBIL: full bredd */
  position: fixed;
  bottom: 7rem;
  left: 0; right: 0;
  z-index: 50;
  padding: 1rem 1.4rem 1.6rem;

  /* DESKTOP 768+: centrera med max-bredd */
  @media (min-width: 768px) {
    max-width: 640px;
    left: 50%;
    transform: translateX(-50%);
    padding: 1rem 2.5rem 1.4rem;
  }
`;

const AddBtn = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  background: rgba(255,255,255,0.92);
  color: ${theme.colors.tealDeep};
  border: none;
  border-radius: 100px;
  padding: 0.95rem;
  font-size: 0.92rem;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 8px 30px rgba(0,0,0,0.3);
  transition: background 0.2s, transform 0.15s;

  /* Hover finns bara på desktop — på mobil är det :active som gäller */
  @media (min-width: 768px) {
    &:hover { background: #fff; transform: translateY(-1px); }
  }
  &:active { transform: scale(0.98); }
`;


// ─── MODAL BACKDROP ───────────────────────────────────────────────────────────
// Täcker hela skärmen bakom modalen.
// Klick på backdropen (inte på Sheet) stänger modalen via e.target check i JSX.
//
// MOBIL (bas):  align-items: flex-end → Sheet kommer nerifrån (bottom sheet)
// DESKTOP 768+: align-items: center  → Sheet centreras på skärmen
const Backdrop = styled.div`
  /* MOBIL: modal glider upp nerifrån */
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.65);
  backdrop-filter: blur(6px);
  z-index: 200;
  display: flex;
  align-items: flex-end; /* bottom sheet på mobil */
  justify-content: center;
  animation: ${fadeIn} 0.2s ease both;

  /* DESKTOP 768+: centrerad modal */
  @media (min-width: 768px) {
    align-items: center;
  }
`;


// ─── BEKRÄFTELSE-DIALOG (TA BORT) ─────────────────────────────────────────────
// Visas när användaren trycker papperskorgen.
// Kräver ett extra klick för att bekräfta — förhindrar misstag.
//
// MOBIL (bas):  bottom sheet (inga rundade underhörn)
// DESKTOP 768+: centrerad dialog med rundade hörn runt om
const ConfirmSheet = styled.div`
  /* MOBIL: bottom sheet stil */
  background: #0d3d45;
  border: 1px solid rgba(255,138,125,0.25);
  border-radius: 20px 20px 0 0; /* rundade hörn bara uppåt */
  padding: 1.6rem 1.4rem 2.2rem;
  width: 100%;
  max-width: 400px;
  animation: ${slideUp} 0.3s ease both;
  text-align: center;

  /* DESKTOP 768+: dialog centreras med rundade hörn runt om */
  @media (min-width: 768px) {
    border-radius: 20px;
    margin: 1rem;
    padding: 2rem;
  }
`;

const ConfirmTitle = styled.h3`
  font-family: ${theme.fonts.serif};
  font-size: 1.4rem;
  font-weight: 300;
  color: #fff;
  margin-bottom: 0.5rem;
`;

const ConfirmSub = styled.p`
  font-size: 0.82rem;
  color: rgba(255,255,255,0.5);
  margin-bottom: 1.5rem;
`;

const DeleteConfirmBtn = styled.button`
  width: 100%;
  background: rgba(255,138,125,0.2);
  color: #ff8a7d;
  border: 1px solid rgba(255,138,125,0.4);
  border-radius: 100px;
  padding: 0.9rem;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 0.5rem;
  transition: background 0.2s;

  @media (min-width: 768px) {
    &:hover { background: rgba(255,138,125,0.3); }
  }
  &:active { transform: scale(0.98); }
`;


// ─── BOTTOM SHEET / MODAL (LÄGG TILL & REDIGERA) ─────────────────────────────
// Samma Sheet-komponent används för båda lägena.
// modalMode ('add' | 'edit') styr rubrik och knapp-text.
//
// MOBIL (bas):  bottom sheet, glider upp nerifrån
// DESKTOP 768+: centrerad dialog
const Sheet = styled.div`
  /* MOBIL: full bredd, bottom sheet */
  background: #0d3d45;
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 20px 20px 0 0;
  padding: 1.6rem 1.4rem 2.2rem;
  width: 100%;
  max-width: 500px;
  animation: ${slideUp} 0.3s ease both;

  /* DESKTOP 768+: centrerad modal */
  @media (min-width: 768px) {
    border-radius: 24px;
    margin: 1rem;
    padding: 2rem;
  }
`;

// Litet handtag längst upp — konvention för bottom sheets på mobil.
// Döljs på desktop eftersom det inte är ett bottom sheet där.
const SheetHandle = styled.div`
  /* MOBIL: synligt handtag */
  width: 36px;
  height: 3px;
  background: rgba(255,255,255,0.2);
  border-radius: 2px;
  margin: 0 auto 1.5rem;

  /* DESKTOP 768+: döljs */
  @media (min-width: 768px) {
    display: none;
  }
`;

const SheetTitle = styled.h3`
  font-family: ${theme.fonts.serif};
  font-size: 1.6rem;
  font-weight: 300;
  color: #fff;
  margin-bottom: 1.5rem;
`;

const FieldGroup = styled.div`
  margin-bottom: 1.1rem;
`;

const FieldLabel = styled.label`
  display: block;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.5);
  margin-bottom: 0.45rem;
`;

// Textfält och tidsfält i formuläret.
// automatiskt vid fokus — under 16px triggas auto-zoom.
// -webkit-appearance: none tar bort iOS standardstilar (border, shadow etc.)
const FieldInput = styled.input`
  /* MOBIL: stor nog för att undvika iOS auto-zoom */
  width: 100%;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 10px;
  padding: 0.85rem 1rem;  /* touch-vänlig höjd */
  font-size: 1rem;         /* 16px = iOS-gränsen för auto-zoom */
  color: #fff;
  outline: none;
  transition: border-color 0.2s;
  -webkit-appearance: none; /* tar bort iOS standardstilar */

  &::placeholder { color: rgba(255,255,255,0.22); }
  &:focus { border-color: rgba(125,255,212,0.5); }
`;

// Rad med dag-knappar (M T O T F L S)
// Inga responsiva skillnader — fungerar bra på alla skärmar
const DayRow = styled.div`
  display: flex;
  gap: 0.4rem;
`;

// Dag-knapp. $active styr grön (vald) eller grå (ej vald) stil.
// flex: 1 gör att alla sju knappar tar lika mycket plats.
// Lite större padding på mobil för enklare touch.
const DayToggle = styled.button`
  /* MOBIL: generös touch-yta */
  flex: 1;
  padding: 0.65rem 0;
  border-radius: 8px;
  font-size: 0.72rem;
  font-weight: 500;
  border: 1px solid ${({ $active }) => $active ? 'rgba(125,255,212,0.5)' : 'rgba(255,255,255,0.15)'};
  background: ${({ $active }) => $active ? 'rgba(125,255,212,0.15)' : 'transparent'};
  color: ${({ $active }) => $active ? 'rgba(125,255,212,0.95)' : 'rgba(255,255,255,0.45)'};
  cursor: pointer;
  transition: all 0.15s;

  &:active { transform: scale(0.95); }

  /* DESKTOP 768+: kompaktare padding */
  @media (min-width: 768px) {
    padding: 0.55rem 0;
  }
`;

// Spara-knapp längst ner i formuläret
const SaveBtn = styled.button`
  width: 100%;
  background: rgba(255,255,255,0.92);
  color: ${theme.colors.tealDeep};
  border: none;
  border-radius: 100px;
  padding: 0.95rem;
  font-size: 0.92rem;
  font-weight: 500;
  cursor: pointer;
  margin-top: 1.4rem;
  transition: background 0.2s;

  @media (min-width: 768px) {
    &:hover { background: #fff; }
  }
  &:active { transform: scale(0.98); }
`;

// Avbryt-knapp — diskret textstil
const CancelBtn = styled.button`
  width: 100%;
  background: transparent;
  color: rgba(255,255,255,0.45);
  border: none;
  padding: 0.75rem;
  font-size: 0.85rem;
  cursor: pointer;
  margin-top: 0.3rem;

  @media (min-width: 768px) {
    &:hover { color: rgba(255,255,255,0.75); }
  }
`;


// ─── TOM-STATE ────────────────────────────────────────────────────────────────
// Visas när medicines-listan är tom.
const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  animation: ${fadeUp} 0.6s 0.2s ease both;
`;

const EmptyIcon = styled.div`
  width: 56px; height: 56px;
  border-radius: 50%;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.1);
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 1rem;
`;

const EmptyText = styled.p`
  font-family: ${theme.fonts.serif};
  font-size: 1.3rem;
  font-weight: 300;
  color: rgba(255,255,255,0.55);
  margin-bottom: 0.4rem;
`;

const EmptySub = styled.p`
  font-size: 0.8rem;
  color: rgba(255,255,255,0.3);
`;


// ─── KONSTANTER OCH HJÄLPFUNKTIONER ──────────────────────────────────────────

// Svenska förkortningar för dag-toggle-knapparna
const DAY_NAMES = ['Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör', 'Sön'];

// Returnerar dagens namn på svenska. getDay() ger 0 (sön) – 6 (lör).
const getTodayName = () => {
  const names = ['Söndag', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag'];
  return names[new Date().getDay()];
};

// Returnerar datumet formaterat på svenska, t.ex. "26 februari"
const getDateString = () =>
  new Date().toLocaleDateString('sv-SE', { day: 'numeric', month: 'long' });

// Tomt formulär — används för att återställa vid öppna/stäng
const EMPTY_FORM = { name: '', dose: '', time: '08:00' };

// Återanvändbar hjälpfunktion för toast-stilar.
// Tar emot valfri border-färg och textfärg så varje typ ser olika ut.
const toastStyle = (
  border = 'rgba(255,255,255,0.15)',
  color  = 'rgba(255,255,255,0.9)'
) => ({
  position: 'top-center',
  autoClose: 3000,
  style: {
    background: '#0d3d45',
    color,
    border: `1px solid ${border}`,
    borderRadius: '12px',
    fontSize: '0.88rem',
  },
});


// ─── HUVUDKOMPONENT ───────────────────────────────────────────────────────────
const MedicinPage = () => {

  // ── STATE ────────────────────────────────────────────────────────────────
  // Listan med mediciner. Varje objekt:
  //   id, name, dose, time ("HH:MM"), days ([0-6]), taken (bool), takenAt (str|null)
  const [medicines, setMedicines] = useState([
    /* { id: 1, name: 'Waran',   dose: '5 mg',  time: '08:00', days: [0,1,2,3,4,5,6], taken: true,  takenAt: '08:14' },
    { id: 2, name: 'Xarelto', dose: '20 mg', time: '20:00', days: [0,1,2,3,4,5,6], taken: false, takenAt: null }, */
  ]);

  // null = stängd, 'add' = lägg till, 'edit' = redigera
  const [modalMode, setModalMode] = useState(null);

  // ID för medicinen som redigeras (null om ingen redigeras)
  const [editingId, setEditingId] = useState(null);

  // ID för medicinen vars ta bort-dialog visas (null om ingen)
  const [confirmId, setConfirmId] = useState(null);

  // Valda veckodagar i formuläret (array med index 0-6)
  const [activeDays, setActiveDays] = useState([0,1,2,3,4,5,6]);

  // Formulärdata
  const [form, setForm] = useState(EMPTY_FORM);

  // ── BERÄKNADE VÄRDEN ─────────────────────────────────────────────────────
  const takenCount     = medicines.filter(m => m.taken).length;
  const remainingCount = medicines.filter(m => !m.taken).length;


  // ── ÖPPNA "LÄGG TILL"-MODAL ───────────────────────────────────────────────
  const openAdd = () => {
    setForm(EMPTY_FORM);
    setActiveDays([0,1,2,3,4,5,6]);
    setEditingId(null);
    setModalMode('add');
  };

  // ── ÖPPNA "REDIGERA"-MODAL ────────────────────────────────────────────────
  // Fyller formuläret med befintliga värden och sätter editingId
  const openEdit = (med) => {
    setForm({ name: med.name, dose: med.dose, time: med.time });
    setActiveDays(med.days);
    setEditingId(med.id);
    setModalMode('edit');
  };

  // ── STÄNG MODAL ───────────────────────────────────────────────────────────
  const closeModal = () => {
    setModalMode(null);
    setEditingId(null);
  };


  // ── SPARA (NY ELLER UPPDATERING) ─────────────────────────────────────────
  const saveMedicine = () => {
    if (!form.name.trim()) return;

    if (modalMode === 'edit') {
      // map() returnerar ny array där bara rätt medicin är ändrad
      setMedicines(prev => prev.map(m =>
        m.id === editingId
          ? { ...m, name: form.name, dose: form.dose, time: form.time, days: activeDays }
          : m
      ));
      toast(`✏️ ${form.name} uppdaterad!`,
        toastStyle('rgba(125,255,212,0.3)', '#7dffd4'));

    } else {
      const newMed = {
        id: Date.now(), // unikt ID via tidsstämpel
        name: form.name, dose: form.dose, time: form.time,
        days: activeDays, taken: false, takenAt: null,
      };
      setMedicines(prev => [...prev, newMed]);

      // Schemalägg toast-påminnelse om vald tid är senare idag
      const [h, min] = form.time.split(':').map(Number);
      const triggerTime = new Date();
      triggerTime.setHours(h, min, 0, 0);
      const msUntil = triggerTime - Date.now();

      if (msUntil > 0 && msUntil < 24 * 60 * 60 * 1000) {
        setTimeout(() => {
          toast(`🔔 Dags att ta ${form.name}! (${form.dose})`,
            toastStyle('rgba(255,217,125,0.4)', '#fff'));
        }, msUntil);
      }

      toast(`💊 ${form.name} tillagd! Påminnelse kl ${form.time}.`, toastStyle());
    }

    closeModal();
  };


  // ── MARKERA SOM TAGEN / OTAGEN ────────────────────────────────────────────
  const toggleTaken = (id) => {
    setMedicines(prev => prev.map(m => {
      if (m.id !== id) return m;
      if (!m.taken) {
        const timeStr = new Date().toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' });
        toast(`✓ ${m.name} markerad som tagen!`,
          toastStyle('rgba(125,255,212,0.3)', '#7dffd4'));
        return { ...m, taken: true, takenAt: timeStr };
      }
      return { ...m, taken: false, takenAt: null };
    }));
  };


  // ── TA BORT ───────────────────────────────────────────────────────────────
  // filter() returnerar alla mediciner UTOM den med confirmId
  const deleteMedicine = () => {
    const med = medicines.find(m => m.id === confirmId);
    setMedicines(prev => prev.filter(m => m.id !== confirmId));
    setConfirmId(null);
    toast(`🗑 ${med?.name} borttagen.`,
      toastStyle('rgba(255,138,125,0.3)', '#ff8a7d'));
  };


  // ── TOGGA VECKODAG ────────────────────────────────────────────────────────
  const toggleDay = (i) =>
    setActiveDays(prev =>
      prev.includes(i) ? prev.filter(d => d !== i) : [...prev, i]
    );


  // ── JSX ──────────────────────────────────────────────────────────────────
  return (
    <Frame>
      <Card>
        {/* <CornerLabel pos="tl">Medicinlåda</CornerLabel> */}
        {/* <CornerLabel pos="tr">Stoppa Proppen</CornerLabel> */}

        <Navbar variant="default" user={{ name: 'Anna L.', initials: 'A' }} logoHref="/" />

        <ScrollArea>

          {/* Dagsstatus */}
          <DayHeader>
            <DayLabel>{getDateString()}</DayLabel>
            <DayTitle>
              {getTodayName()}{' '}
              <em>{remainingCount === 0 ? '— allt klart! 🎉' : `— ${remainingCount} kvar`}</em>
            </DayTitle>
            {medicines.length > 0 && (
              <DaySubtext>{takenCount} av {medicines.length} mediciner tagna idag</DaySubtext>
            )}
          </DayHeader>

          <SectionTitle>Idag</SectionTitle>

          {/* Tom-state eller medicin-lista */}
          {medicines.length === 0 ? (
            <EmptyState>
              <EmptyIcon><PillIcon /></EmptyIcon>
              <EmptyText>Inga mediciner tillagda</EmptyText>
              <EmptySub>Tryck på knappen nedan för att lägga till din första medicin</EmptySub>
            </EmptyState>
          ) : (
            // $delay förskjuter animationen per kort → sekventiell inglid
            medicines.map((med, i) => (
              <MedCard key={med.id} $taken={med.taken} $delay={`${i * 0.08}s`}>

                {/* Checkknapp — togglar tagen/otagen */}
                <CheckBtn $taken={med.taken} onClick={() => toggleTaken(med.id)}>
                  {med.taken
                    ? <CheckIcon color="rgba(125,255,212,0.9)" />
                    : <div style={{ width: 10, height: 10, borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.3)' }} />
                  }
                </CheckBtn>

                {/* Namn + dos — klick öppnar redigera-modalen */}
                <MedInfo onClick={() => openEdit(med)}>
                  <MedName $taken={med.taken}>{med.name}</MedName>
                  <MedDose>{med.dose}</MedDose>
                </MedInfo>

                {/* Höger kolumn */}
                <MedRight>
                  <MedTime $taken={med.taken}>
                    {med.taken ? '✓ Tagen' : `kl ${med.time}`}
                  </MedTime>
                  {med.takenAt && <TakenTime>{med.takenAt}</TakenTime>}

                  <ActionRow>
                    <IconBtn onClick={() => openEdit(med)} title="Redigera">
                      <EditIcon />
                    </IconBtn>
                    <IconBtn $danger onClick={() => setConfirmId(med.id)} title="Ta bort">
                      <TrashIcon />
                    </IconBtn>
                  </ActionRow>
                </MedRight>

              </MedCard>
            ))
          )}

          {/* Imorgon-sektion */}
          {medicines.length > 0 && (
            <>
              <SectionTitle>Imorgon</SectionTitle>
              {medicines.map(med => (
                <TomorrowCard key={med.id}>
                  <TomorrowDot />
                  <TomorrowName>{med.name} — {med.dose}</TomorrowName>
                  <TomorrowTime>kl {med.time}</TomorrowTime>
                </TomorrowCard>
              ))}
            </>
          )}

        </ScrollArea>

        {/* Fast Lägg till-knapp */}
        <AddBtnWrap>
          <AddBtn onClick={openAdd}>
            <PlusIcon />
            Lägg till medicin
          </AddBtn>
        </AddBtnWrap>

        <ToastContainer />
      </Card>


      {/* ── LÄGG TILL / REDIGERA MODAL ── */}
      {modalMode && (
        <Backdrop onClick={(e) => e.target === e.currentTarget && closeModal()}>
          <Sheet>
            <SheetHandle />
            <SheetTitle>
              {modalMode === 'edit' ? 'Redigera medicin' : 'Lägg till medicin'}
            </SheetTitle>

            <FieldGroup>
              <FieldLabel htmlFor="med-name">Namn på medicin</FieldLabel>
              <FieldInput
                id="med-name"
                placeholder="t.ex. Waran"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                autoFocus
              />
            </FieldGroup>

            <FieldGroup>
              <FieldLabel htmlFor="med-dose">Dos</FieldLabel>
              <FieldInput
                id="med-dose"
                placeholder="t.ex. 5 mg"
                value={form.dose}
                onChange={e => setForm(f => ({ ...f, dose: e.target.value }))}
              />
            </FieldGroup>

            <FieldGroup>
              <FieldLabel htmlFor="med-time">Påminnelsetid</FieldLabel>
              <FieldInput
                id="med-time"
                type="time"
                value={form.time}
                onChange={e => setForm(f => ({ ...f, time: e.target.value }))}
              />
            </FieldGroup>

            <FieldGroup>
              <FieldLabel>Dagar</FieldLabel>
              <DayRow>
                {DAY_NAMES.map((day, i) => (
                  <DayToggle
                    key={i}
                    $active={activeDays.includes(i)}
                    onClick={() => toggleDay(i)}
                  >
                    {day.charAt(0)}
                  </DayToggle>
                ))}
              </DayRow>
            </FieldGroup>

            <SaveBtn onClick={saveMedicine}>
              {modalMode === 'edit' ? 'Spara ändringar' : 'Spara medicin'}
            </SaveBtn>
            <CancelBtn onClick={closeModal}>Avbryt</CancelBtn>
          </Sheet>
        </Backdrop>
      )}


      {/* ── BEKRÄFTELSE-DIALOG (TA BORT) ── */}
      {confirmId && (
        <Backdrop onClick={(e) => e.target === e.currentTarget && setConfirmId(null)}>
          <ConfirmSheet>
            <SheetHandle />
            <ConfirmTitle>Ta bort medicin?</ConfirmTitle>
            <ConfirmSub>
              {medicines.find(m => m.id === confirmId)?.name} kommer att tas bort permanent.
            </ConfirmSub>
            <DeleteConfirmBtn onClick={deleteMedicine}>Ja, ta bort</DeleteConfirmBtn>
            <CancelBtn onClick={() => setConfirmId(null)}>Avbryt</CancelBtn>
          </ConfirmSheet>
        </Backdrop>
      )}
      <BottomNav active="medicin" />
    </Frame>
  );
};


// ─── SVG-IKONER ───────────────────────────────────────────────────────────────

const CheckIcon = ({ color = 'white' }) => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M3 7l3 3 5-5" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

const EditIcon = () => (
  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
    <path d="M9.5 2.5l2 2-7 7H2.5v-2l7-7Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
  </svg>
);

const TrashIcon = () => (
  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
    <path d="M2 4h10M5 4V2.5h4V4M5.5 6.5v4M8.5 6.5v4M3 4l.8 7.5h6.4L11 4"
      stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PillIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M10.5 3.5a5 5 0 0 0-7 7l10 10a5 5 0 0 0 7-7l-10-10Z"
      stroke="rgba(255,255,255,0.35)" strokeWidth="1.5"/>
    <path d="M8.5 11.5l4-4" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export default MedicinPage;
