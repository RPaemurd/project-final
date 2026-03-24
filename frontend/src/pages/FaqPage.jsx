import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Frame, Card, CornerLabel, fadeUp } from '../components/Layout.jsx';
import Navbar from '../components/Navbar.jsx';
import { theme } from '../styles/theme.js';

// ─── ANIMATIONS ──────────────────────────────────────────────
const slideDown = keyframes`
  from { opacity: 0; transform: translateY(-6px); }
  to   { opacity: 1; transform: translateY(0); }
`;

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

// ─── HERO ─────────────────────────────────────────────────────
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
  background: ${theme.colors.amber};
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

// ─── CATEGORY LABEL ────────────────────────────────────────────
const CategoryLabel = styled.div`
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.35);
  margin: 2rem 0 0.8rem;
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

// ─── FAQ ACCORDION CARD ───────────────────────────────────────
// $open controls whether the answer is visible or not.
const FaqCard = styled.div`
  background: rgba(0,0,0,0.22);
  border: 1px solid ${({ $open }) => $open ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)'};
  border-radius: 14px;
  margin-bottom: 0.6rem;
  overflow: hidden;
  transition: border-color 0.2s;
  animation: ${fadeUp} 0.5s ${({ $delay }) => $delay || '0s'} ease both;
`;

// Clickable header row
const FaqQuestion = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.1rem 1.2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
`;

const QuestionText = styled.span`
  font-size: 0.9rem;
  font-weight: 500;
  color: #fff;
  line-height: 1.4;

  @media (min-width: 768px) {
    font-size: 0.95rem;
  }
`;

// Rotating arrow icon
const Chevron = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 24px; height: 24px;
  color: rgba(255,255,255,0.4);
  transform: ${({ $open }) => $open ? 'rotate(180deg)' : 'rotate(0deg)'};
  transition: transform 0.25s ease;
`;

// Answer text — hidden/shown with a height animation via max-height
const FaqAnswer = styled.div`
  /* max-height trick: 0 = hidden, large value = visible */
  max-height: ${({ $open }) => $open ? '400px' : '0'};
  overflow: hidden;
  transition: max-height 0.35s ease;
`;

const AnswerInner = styled.div`
  padding: 0 1.2rem 1.2rem;
  font-size: 0.84rem;
  font-weight: 300;
  color: rgba(255,255,255,0.65);
  line-height: 1.8;
  border-top: 1px solid rgba(255,255,255,0.08);
  padding-top: 0.9rem;
  animation: ${({ $open }) => $open ? slideDown : 'none'} 0.3s ease both;
`;

// ─── CONTACT CARD ─────────────────────────────────────────────
const ContactCard = styled.div`
  background: rgba(255,217,125,0.07);
  border: 1px solid rgba(255,217,125,0.2);
  border-radius: 16px;
  padding: 1.6rem 1.4rem;
  margin-top: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  animation: ${fadeUp} 0.6s 0.3s ease both;

  @media (min-width: 600px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const ContactText = styled.div``;

const ContactTitle = styled.div`
  font-family: ${theme.fonts.serif};
  font-size: 1.2rem;
  font-weight: 300;
  color: #fff;
  margin-bottom: 0.25rem;
`;

const ContactSub = styled.div`
  font-size: 0.78rem;
  color: rgba(255,255,255,0.5);
`;

const ContactBtn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: rgba(255,217,125,0.15);
  border: 1px solid rgba(255,217,125,0.35);
  color: ${theme.colors.amber};
  border-radius: 100px;
  padding: 0.6rem 1.3rem;
  font-size: 0.82rem;
  font-weight: 500;
  text-decoration: none;
  white-space: nowrap;
  transition: background 0.2s;

  &:hover { background: rgba(255,217,125,0.25); }
  &:active { transform: scale(0.97); }
`;

// ─── FAQ DATA ─────────────────────────────────────────────────
// Categories with questions and answers.
// No data is fetched from an API — everything is hardcoded in this file.
const FAQ_DATA = [
  {
    category: 'Om appen',
    items: [
      {
        q: 'Vad är Stoppa Proppen?',
        a: 'Stoppa Proppen är en gratis hälsoapp som hjälper dig förstå, förebygga och hantera blodpropp. Appen erbjuder en symtomkoll, medicinpåminnelser och ett community där du kan möta andra med liknande erfarenheter.',
      },
      {
        q: 'Kostar det något att använda appen?',
        a: 'Nej, Stoppa Proppen är helt gratis att använda. Vi tar inget betalt för grundfunktionerna och visar inga annonser.',
      },
      {
        q: 'Är appen godkänd av sjukvården?',
        a: 'Appen är inte ett medicintekniskt hjälpmedel och ersätter inte sjukvård. All medicinsk information är baserad på Socialstyrelsens och 1177:s riktlinjer. Vid akuta symtom ska du alltid ringa 112 eller kontakta sjukvården.',
      },
    ],
  },
  {
    category: 'Symtomkollen',
    items: [
      {
        q: 'Hur fungerar symtomkollen?',
        a: 'Du svarar på ett antal frågor om dina symtom och riskfaktorer. Baserat på dina svar ger appen en preliminär riskbedömning. Det är viktigt att förstå att detta inte är en medicinsk diagnos — kontakta alltid sjukvården om du är orolig.',
      },
      {
        q: 'Vilka symtom på blodpropp bör jag känna till?',
        a: 'Vanliga symtom på djup ventrombos (DVT) inkluderar svullnad, värme och ömhet i ett ben. Lungembolism kan ge plötslig andnöd, bröstsmärta och hosta. Vid dessa symtom — ring 112 omedelbart.',
      },
      {
        q: 'Sparas mina svar från symtomkollen?',
        a: 'Just nu sparas inga svar permanet mellan sessioner. I kommande versioner av appen planerar vi att låta inloggade användare se sin historik.',
      },
    ],
  },
  {
    category: 'Medicinpåminnelser',
    items: [
      {
        q: 'Hur lägger jag till en medicin?',
        a: 'Gå till Medicinlådan via menyn och tryck på "Lägg till medicin". Fyll i namn, dos, tid och vilka dagar du tar medicinen. Appen påminner dig när det är dags.',
      },
      {
        q: 'Vad händer om jag missar en påminnelse?',
        a: 'Påminnelsen visas som en notis om appen är öppen. I en framtida version planerar vi push-notiser som fungerar även när appen är stängd. Kontakta alltid din läkare vid frågor om missade doser.',
      },
      {
        q: 'Kan jag lägga till flera mediciner?',
        a: 'Ja, du kan lägga till hur många mediciner som helst. Varje medicin kan ha sin egen tid och sina egna veckodagar.',
      },
    ],
  },
  {
    category: 'Integritet & säkerhet',
    items: [
      {
        q: 'Hur hanteras mina personuppgifter?',
        a: 'Vi samlar bara in den information som krävs för att appen ska fungera. Vi säljer aldrig dina uppgifter till tredje part. Läs vår integritetspolicy för fullständig information.',
      },
      {
        q: 'Kan jag ta bort mitt konto?',
        a: 'Ja, du kan när som helst begära att ditt konto och alla dina uppgifter raderas. Kontakta oss via e-post så hanterar vi det inom 30 dagar.',
      },
    ],
  },
];

// ─── ACCORDION COMPONENT ──────────────────────────────────────
// A simple accordion component that manages its own open/closed state.
// Separated from FaqPage to keep the code clean.
const FaqItem = ({ question, answer, delay }) => {
  // open state: controls whether the answer is visible
  const [open, setOpen] = useState(false);

  return (
    <FaqCard $open={open} $delay={delay}>
      <FaqQuestion onClick={() => setOpen(o => !o)}>
        <QuestionText>{question}</QuestionText>
        <Chevron $open={open}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Chevron>
      </FaqQuestion>
      <FaqAnswer $open={open}>
        <AnswerInner $open={open}>{answer}</AnswerInner>
      </FaqAnswer>
    </FaqCard>
  );
};

// ─── PAGE ─────────────────────────────────────────────────────
const FaqPage = () => (
  <Frame>
    <Card>
      <CornerLabel pos="bl">© 2025</CornerLabel>

      <Navbar variant="default" logoHref="/" />

      <ScrollArea>

        {/* Hero */}
        <Hero>
          <Badge><BadgeDot />Vanliga frågor</Badge>
          <H1>
            Svar på dina<br />
            <em>frågor</em>
          </H1>
          <HeroText>
            Här hittar du svar på de vanligaste frågorna om appen,
            symtomkollen och medicinpåminnelser. Hittar du inte svar?
            Hör gärna av dig till oss.
          </HeroText>
        </Hero>

        {/* Accordion per category */}
        {FAQ_DATA.map((cat, ci) => (
          <div key={ci}>
            <CategoryLabel>{cat.category}</CategoryLabel>
            {cat.items.map((item, ii) => (
              <FaqItem
                key={ii}
                question={item.q}
                answer={item.a}
                delay={`${ii * 0.07}s`}
              />
            ))}
          </div>
        ))}

        <ContactCard>
          <ContactText>
            <ContactTitle>Hittade du inte svar?</ContactTitle>
            <ContactSub>Vi svarar vanligtvis inom ett par dagar.</ContactSub>
          </ContactText>
          <ContactBtn href="mailto:hej@stoppaproppen.se">
            Kontakta oss →
          </ContactBtn>
        </ContactCard>

      </ScrollArea>
    </Card>
  </Frame>
);

export default FaqPage;