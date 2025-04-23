import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Globe, DollarSign, Shield, UserCheck, Zap, FileText, CreditCard, TrendingUp, BarChart2 } from 'lucide-react';
import Spline from '@splinetool/react-spline';
import AnimatedCard from '../../components/AnimatedCard';
import styles from './styles.module.css';

// Non‑Tech features with icons
const nonTechFeatures = [
  {
    title: 'Platform Overview',
    Icon: Globe,
    items: [
      'Objective: Seamless, AI‑driven, regulatory‑compliant fund formation',
      'Hosting: Dubai (ADGM/DIFC) for regulatory advantages',
      'Users: Fund managers, HNWIs, VC/PE firms, corporate investors',
    ],
  },
  {
    title: 'Business Model & Monetization',
    Icon: DollarSign,
    items: [
      'Basic – Document automation only',
      'Pro – Full fund setup + regulatory filing',
      'Enterprise – White‑label SaaS for banks/family offices',
      '% of AUM transaction fees & licensing revenue',
    ],
  },
  {
    title: 'Legal & Regulatory Considerations',
    Icon: Shield,
    items: [
      'Licenses: DIFC/ADGM FinTech Sandbox, UAE CSP',
      'Data Privacy: UAE PDPL compliance',
      'Fund rules aligned to DFSA/ADGM/SCA',
    ],
  },
];

// Tech features with icons
const techFeatures = [
  {
    title: 'User Onboarding & KYC/AML',
    Icon: UserCheck,
    items: [
      'Digital identity verification (DIFC KYC, Verify, AML tools)',
      'AI‑driven PEP/sanctions screening',
      'eSignatures via DocuSign & UAE Pass',
    ],
  },
  {
    title: 'Fund Structuring Wizard',
    Icon: Zap,
    items: [
      'Jurisdiction selection (UAE vs Cayman/Lux/Mauritius)',
      'Fund types: Hedge, PE, VC, SPV, REIT',
      'Auto‑filing APIs (DFSA/ADGM/CIMA) + OM/LPA/PPM generation',
    ],
  },
  {
    title: 'Smart Legal Document Automation',
    Icon: FileText,
    items: [
      'AI‑generated docs (GPT4 + LexisNexis/LawGeex)',
      'Templates: LPA, PPM, Subscription Agreement',
      
    ],
  },
  {
    title: 'Banking & Custody Integration',
    Icon: CreditCard,
    items: [
      'APIs: Emirates NBD, ADCB, Mashreq Neo, Cayman National, SEBA',
      'Multicurrency accounts via Railsr, Stripe Treasury, Swan',
      
    ],
  },
  {
    title: 'Tax & Compliance Engine',
    Icon: TrendingUp,
    items: [
      'Real‑time tax optimization: 0% UAE vs offshore',
      'Automatic FATCA/CRS reporting',
      'Continuous AML (Chainalysis, Refinitiv)',
    ],
  },
  {
    title: 'Investor Dashboard & Capital Raising',
    Icon: BarChart2,
    items: [
      'Secure deal room',
      'Optional blockchain tokenization',
      'Automated capital calls & distributions',
      
    ],
  },
];

export default function OperatingModel() {
  const nav = useNavigate();

  return (
    <div className={styles.pageWrapper}>
      {/* Background */}
      <div className={styles.background}>
        <Spline scene="/operating-model-scene.splinecode" />
      </div>

      {/* Content */}
      <div className={styles.page}>
        <button className={styles.back} onClick={() => nav('/proposal')}>
          <ArrowLeft className={styles.backIcon} /> Go Back
        </button>

        <h1 className={styles.title}>Operating Model</h1>

        {/* Overview & Business */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Overview & Business</h2>
          <div className={styles.cardList}>
            {nonTechFeatures.map((f, i) => (
              <AnimatedCard
                key={i}
                Icon={f.Icon}
                title={f.title}
                items={f.items}
              />
            ))}
          </div>
        </section>

        {/* Core Tech */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Core Tech Features</h2>
          <div className={styles.cardList}>
            {techFeatures.map((f, i) => (
              <AnimatedCard
                key={i}
                Icon={f.Icon}
                title={f.title}
                items={f.items}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
