import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Frame, Card, CornerLabel, fadeUp } from '../components/Layout.jsx';
import Navbar from '../components/Navbar.jsx';
import { theme } from '../styles/theme';
import BottomNav from "../components/BottomNav.jsx"

// react-toastify: toast = triggers a notification, ToastContainer = must exist in the tree
// ─── ANIMATIONS ──────────────────────────────────────────────────────────────

// Slides up from below — used on the medicine cards and modal sheet
const slideUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

// Bounce animation when a medicine is marked as taken
const checkPop = keyframes`
  0%   { transform: scale(0.8); }
  60%  { transform: scale(1.2); }
  100% { transform: scale(1); }
`;

// Simple fade-in for the modal background
const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;


// ─── SCROLL AREA ─────────────────────────────────────────────────────────────
// Contains the entire medicine list and is scrollable.
// padding-bottom is large (7rem) so content is not hidden behind the fixed button.
// The scrollbar is hidden visually for a cleaner mobile appearance.
const ScrollArea = styled.div`
  /* MOBILE: full width, some padding on the sides */
  position: relative;
  z-index: 10;
  flex: 1;
  overflow-y: auto;
  padding: 0.5rem 1.4rem 7rem; /* large bottom padding due to the fixed button */

  /* Hides the scrollbar in Firefox */
  scrollbar-width: none;
  /* Hides the scrollbar in Chrome/Safari */
  &::-webkit-scrollbar { display: none; }

  /* DESKTOP 768+: limit width and center */
  @media (min-width: 768px) {
    padding: 0.5rem 2.5rem 5rem;
    max-width: 640px;
    margin: 0 auto;
    width: 100%;
  }
`;


// ─── DAY STATUS SECTION ───────────────────────────────────────────────────────
// Shows date, weekday name and how many medicines are left.
// No responsive differences here — works equally well on all screens.
const DayHeader = styled.div`
  margin-bottom: 1.5rem;
  animation: ${fadeUp} 0.6s ease both;
`;

// Small label above, e.g. "26 February"
const DayLabel = styled.div`
  font-size: 0.68rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.55);
  margin-bottom: 0.3rem;
`;

// Large serif heading, e.g. "Monday — 2 left"
// clamp() makes the font size responsive without media queries:
//   minimum 1.6rem, grows by 5% of the viewport width, max 2.2rem
const DayTitle = styled.h2`
  font-family: ${theme.fonts.serif};
  font-size: clamp(1.6rem, 5vw, 2.2rem);
  font-weight: 300;
  color: #fff;
  line-height: 1.2;
  em { font-style: italic; color: rgba(255,255,255,0.65); }
`;

// Subtext, e.g. "1 of 2 medicines taken today"
const DaySubtext = styled.p`
  font-size: 0.82rem;
  color: rgba(255,255,255,0.6);
  margin-top: 0.4rem;
`;


// ─── SECTION HEADING ───────────────────────────────────────────────────────────
// The headings "Today" and "Tomorrow".
// ::after creates the horizontal line to the right of the text.
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


// ─── MEDICINE CARD ─────────────────────────────────────────────────────────────
// $taken (boolean): controls green or neutral colour
// $delay (string):   animation delay per card for sequential slide-in

const MedCard = styled.div`
  /* MOBILE: compact padding */
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

  /* DESKTOP 768+: more space and rounder corners */
  @media (min-width: 768px) {
    border-radius: 16px;
    padding: 1rem 1.2rem;
    gap: 0.9rem;
    margin-bottom: 0.7rem;
  }
`;

// Round check button on the left.
// $taken controls colour. The checkPop animation only plays when $taken is true.
const CheckBtn = styled.button`
  /* MOBILE: slightly larger for easier touch interaction */
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

  /* DESKTOP 768+: standard size */
  @media (min-width: 768px) {
    width: 36px;
    height: 36px;
  }
`;

// Middle column with name and dose — clickable to open the edit modal
const MedInfo = styled.div`
  flex: 1;
  min-width: 0; /* prevents text overflow outside the card */
  cursor: pointer;
`;

// Medicine name with strikethrough and faded colour when taken
const MedName = styled.div`
  /* MOBILE: standard size */
  font-size: 0.92rem;
  font-weight: 500;
  color: ${({ $taken }) => $taken ? 'rgba(255,255,255,0.45)' : '#fff'};
  text-decoration: ${({ $taken }) => $taken ? 'line-through' : 'none'};
  transition: color 0.3s;

  /* DESKTOP 768+: slightly larger */
  @media (min-width: 768px) {
    font-size: 0.95rem;
  }
`;

// Dose text, e.g. "5 mg"
const MedDose = styled.div`
  font-size: 0.75rem;
  color: rgba(255,255,255,0.4);
  margin-top: 0.15rem;
`;

// Right column: time, taken-time and action buttons
const MedRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.3rem;
`;

// Time text, e.g. "kl 20:00" (amber) or "✓ Tagen" (green)
const MedTime = styled.div`
  font-size: 0.72rem;
  font-weight: 500;
  color: ${({ $taken }) => $taken ? 'rgba(125,255,212,0.7)' : 'rgba(255,217,125,0.9)'};
  white-space: nowrap;
`;

// Timestamp for when the medicine was actually taken, e.g. "08:14"
const TakenTime = styled.div`
  font-size: 0.68rem;
  color: rgba(125,255,212,0.55);
`;


// ─── ACTION BUTTONS (EDIT / DELETE) ─────────────────────────────────────────
// $danger (boolean): false = neutral (pencil), true = red (trash)
const ActionRow = styled.div`
  display: flex;
  gap: 0.35rem;
  flex-shrink: 0;
`;

const IconBtn = styled.button`
  /* MOBILE: touch-friendly size (44px recommended by Apple/Google) */
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

  /* DESKTOP 768+: more compact size + hover effects (hover does not exist on touch) */
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

// ─── TOMORROW CARD ─────────────────────────────────────────────────────────────
// Dimmed, informative cards without action buttons.
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

// The button is fixed at the bottom.
const AddBtnWrap = styled.div`
  position: fixed;
  bottom: 4rem;
  left: 0; right: 0;
  z-index: 50;
  padding: 1rem 1.4rem 1.6rem;

  @media (min-width: 768px) {
    bottom: 2rem;
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

  /* Hover only exists on desktop — on mobile :active is used instead */
  @media (min-width: 768px) {
    &:hover { background: #fff; transform: translateY(-1px); }
  }
  &:active { transform: scale(0.98); }
`;

// ─── MODAL BACKDROP ───────────────────────────────────────────────────────────
// Covers the entire screen behind the modal.

const Backdrop = styled.div`
  /* MOBILE: modal slides up from below */
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.65);
  backdrop-filter: blur(6px);
  z-index: 200;
  display: flex;
  align-items: flex-end; /* bottom sheet on mobile */
  justify-content: center;
  animation: ${fadeIn} 0.2s ease both;

  /* DESKTOP 768+: centered modal */
  @media (min-width: 768px) {
    align-items: center;
  }
`;

// ─── CONFIRM DIALOG (DELETE) ─────────────────────────────────────────────────
// Shown when the user presses the trash icon.
// Requires an extra click to confirm — prevents mistakes.
const ConfirmSheet = styled.div`
  /* MOBILE: bottom sheet style */
  background: #0d3d45;
  border: 1px solid rgba(255,138,125,0.25);
  border-radius: 20px 20px 0 0; /* rounded corners only at the top */
  padding: 1.6rem 1.4rem 2.2rem;
  width: 100%;
  max-width: 400px;
  animation: ${slideUp} 0.3s ease both;
  text-align: center;

  /* DESKTOP 768+: dialog centered with rounded corners all around */
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


// ─── BOTTOM SHEET / MODAL (ADD & EDIT) ───────────────────────────────────────
// The same Sheet component is used for both modes.
// modalMode ('add' | 'edit') controls heading and button text.

const Sheet = styled.div`
  /* MOBILE: full width, bottom sheet */
  background: #0d3d45;
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 20px 20px 0 0;
  padding: 1.6rem 1.4rem 2.2rem;
  width: 100%;
  max-width: 500px;
  animation: ${slideUp} 0.3s ease both;

  /* DESKTOP 768+: centered modal */
  @media (min-width: 768px) {
    border-radius: 24px;
    margin: 1rem;
    padding: 2rem;
  }
`;

// Small handle at the top — convention for bottom sheets on mobile.
// Hidden on desktop since it is not a bottom sheet there.
const SheetHandle = styled.div`
  /* MOBILE: visible handle */
  width: 36px;
  height: 3px;
  background: rgba(255,255,255,0.2);
  border-radius: 2px;
  margin: 0 auto 1.5rem;

  /* DESKTOP 768+: hidden */
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

// Text fields and time fields in the form.
// automatically on focus — below 16px auto-zoom is triggered.
// -webkit-appearance: none removes iOS default styles (border, shadow etc.)
const FieldInput = styled.input`
  /* MOBILE: large enough to avoid iOS auto-zoom */
  width: 100%;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 10px;
  padding: 0.85rem 1rem;  /* touch-friendly height */
  font-size: 1rem;         /* 16px = iOS threshold for auto-zoom */
  color: #fff;
  outline: none;
  transition: border-color 0.2s;
  -webkit-appearance: none; /* removes iOS default styles */

  &::placeholder { color: rgba(255,255,255,0.22); }
  &:focus { border-color: rgba(125,255,212,0.5); }
`;

// Row of day buttons (M T W T F S S)
const DayRow = styled.div`
  display: flex;
  gap: 0.4rem;
`;

// Day button. $active controls green (selected) or grey (unselected) style.
// flex: 1 makes all seven buttons take equal space.
// Slightly larger padding on mobile for easier touch.
const DayToggle = styled.button`
  /* MOBILE: generous touch area */
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

  /* DESKTOP 768+: more compact padding */
  @media (min-width: 768px) {
    padding: 0.55rem 0;
  }
`;

// Save button at the bottom of the form
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

// Cancel button — subtle text style
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

// ─── EMPTY STATE ──────────────────────────────────────────────────────────────
// Shown when the medicines list is empty.
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

// ─── CONSTANTS AND HELPER FUNCTIONS ──────────────────────────────────────────

// Swedish abbreviations for the day toggle buttons
const DAY_NAMES = ['Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör', 'Sön'];

// Returns today's name in Swedish. getDay() returns 0 (Sun) – 6 (Sat).
const getTodayName = () => {
  const names = ['Söndag', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag'];
  return names[new Date().getDay()];
};

// Returns the date formatted in Swedish, e.g. "26 februari"
const getDateString = () =>
  new Date().toLocaleDateString('sv-SE', { day: 'numeric', month: 'long' });

// Empty form — used to reset on open/close
const EMPTY_FORM = { name: '', dose: '', time: '08:00' };

// Reusable helper function for toast styles.
// Accepts an optional border colour and text colour so each type looks different.
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


// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
const MedicinPage = () => {

  // ── STATE ────────────────────────────────────────────────────────────────
  // The list of medicines. Each object:
  //   id, name, dose, time ("HH:MM"), days ([0-6]), taken (bool), takenAt (str|null)
  const [medicines, setMedicines] = useState([
    /* { id: 1, name: 'Waran',   dose: '5 mg',  time: '08:00', days: [0,1,2,3,4,5,6], taken: true,  takenAt: '08:14' },
    { id: 2, name: 'Xarelto', dose: '20 mg', time: '20:00', days: [0,1,2,3,4,5,6], taken: false, takenAt: null }, */
  ]);

  // null = closed, 'add' = add, 'edit' = edit
  const [modalMode, setModalMode] = useState(null);

  // ID of the medicine being edited (null if none being edited)
  const [editingId, setEditingId] = useState(null);

  // ID of the medicine whose delete dialog is shown (null if none)
  const [confirmId, setConfirmId] = useState(null);

  // Selected weekdays in the form (array with indices 0-6)
  const [activeDays, setActiveDays] = useState([0,1,2,3,4,5,6]);

  // Form data
  const [form, setForm] = useState(EMPTY_FORM);

  // ── COMPUTED VALUES ─────────────────────────────────────────────────────
  const takenCount     = medicines.filter(m => m.taken).length;
  const remainingCount = medicines.filter(m => !m.taken).length;


  // ── OPEN "ADD" MODAL ───────────────────────────────────────────────────
  const openAdd = () => {
    setForm(EMPTY_FORM);
    setActiveDays([0,1,2,3,4,5,6]);
    setEditingId(null);
    setModalMode('add');
  };

  // ── OPEN "EDIT" MODAL ──────────────────────────────────────────────────
  // Fills the form with existing values and sets editingId
  const openEdit = (med) => {
    setForm({ name: med.name, dose: med.dose, time: med.time });
    setActiveDays(med.days);
    setEditingId(med.id);
    setModalMode('edit');
  };

  // ── CLOSE MODAL ───────────────────────────────────────────────────────────
  const closeModal = () => {
    setModalMode(null);
    setEditingId(null);
  };


  // ── SAVE (NEW OR UPDATE) ─────────────────────────────────────────────────
  const saveMedicine = () => {
    if (!form.name.trim()) return;

    if (modalMode === 'edit') {
      // map() returns a new array where only the right medicine is changed
      setMedicines(prev => prev.map(m =>
        m.id === editingId
          ? { ...m, name: form.name, dose: form.dose, time: form.time, days: activeDays }
          : m
      ));
      toast(`✏️ ${form.name} uppdaterad!`,
        toastStyle('rgba(125,255,212,0.3)', '#7dffd4'));

    } else {
      const newMed = {
        id: Date.now(), // unique ID via timestamp
        name: form.name, dose: form.dose, time: form.time,
        days: activeDays, taken: false, takenAt: null,
      };
      setMedicines(prev => [...prev, newMed]);

      // Schedule toast reminder if selected time is later today
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


  // ── MARK AS TAKEN / UNTAKEN ──────────────────────────────────────────────
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


  // ── DELETE ───────────────────────────────────────────────────────────────
  // filter() returns all medicines EXCEPT the one with confirmId
  const deleteMedicine = () => {
    const med = medicines.find(m => m.id === confirmId);
    setMedicines(prev => prev.filter(m => m.id !== confirmId));
    setConfirmId(null);
    toast(`🗑 ${med?.name} borttagen.`,
      toastStyle('rgba(255,138,125,0.3)', '#ff8a7d'));
  };


  // ── TOGGLE WEEKDAY ────────────────────────────────────────────────────────
  const toggleDay = (i) =>
    setActiveDays(prev =>
      prev.includes(i) ? prev.filter(d => d !== i) : [...prev, i]
    );

  return (
    <Frame>
      <Card>
        {/* <CornerLabel pos="tl">Medicinlåda</CornerLabel> */}
        {/* <CornerLabel pos="tr">Stoppa Proppen</CornerLabel> */}

        <Navbar variant="default" user={{ name: 'Anna L.', initials: 'A' }} logoHref="/" />

        <ScrollArea>

          {/* Day status */}
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

          {/* Empty state or medicine list */}
          {medicines.length === 0 ? (
            <EmptyState>
              <EmptyIcon><PillIcon /></EmptyIcon>
              <EmptyText>Inga mediciner tillagda</EmptyText>
              <EmptySub>Tryck på knappen nedan för att lägga till din första medicin</EmptySub>
            </EmptyState>
          ) : (
            // $delay staggers the animation per card → sequential slide-in
            medicines.map((med, i) => (
              <MedCard key={med.id} $taken={med.taken} $delay={`${i * 0.08}s`}>

                {/* Check button — toggles taken/untaken */}
                <CheckBtn $taken={med.taken} onClick={() => toggleTaken(med.id)}>
                  {med.taken
                    ? <CheckIcon color="rgba(125,255,212,0.9)" />
                    : <div style={{ width: 10, height: 10, borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.3)' }} />
                  }
                </CheckBtn>

                {/* Name + dose — click opens the edit modal */}
                <MedInfo onClick={() => openEdit(med)}>
                  <MedName $taken={med.taken}>{med.name}</MedName>
                  <MedDose>{med.dose}</MedDose>
                </MedInfo>

                {/* Right column */}
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

          {/* Tomorrow section */}
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

        {/* Fixed Add button */}
        <AddBtnWrap>
          <AddBtn onClick={openAdd}>
            <PlusIcon />
            Lägg till medicin
          </AddBtn>
        </AddBtnWrap>

        <ToastContainer />
      </Card>

      {/* ── ADD / EDIT MODAL ── */}
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

      {/* ── CONFIRM DIALOG (DELETE) ── */}
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


// ─── SVG ICONS ───────────────────────────────────────────────────────────────

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
