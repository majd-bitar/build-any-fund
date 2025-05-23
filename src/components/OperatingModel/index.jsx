// File: src/pages/OperatingModel.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Globe,
  DollarSign,
  Shield,
  UserCheck,
  Zap,
  FileText,
  CreditCard,
  TrendingUp,
  BarChart2,
} from 'lucide-react';
import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';
import styles from './styles.module.css';

// Non-Tech feature definitions
const nonTechFeatures = [
  {
    title: 'Platform Overview',
    Icon: Globe,
    items: [
      'Objective: Seamless, AI-driven, regulatory-compliant fund formation',
      'Hosting: Dubai (ADGM/DIFC) for regulatory advantages',
      'Users: Fund managers, HNWIs, VC/PE firms, corporate investors',
    ],
  },
  {
    title: 'Business Model & Monetization',
    Icon: DollarSign,
    items: [
      'Basic – Document automation only',
      'Pro – Full fund setup + regulatory filing',
      'Enterprise – White-label SaaS for banks/family offices',
      '% of AUM transaction fees & licensing revenue',
    ],
  },
  {
    title: 'Legal & Regulatory Considerations',
    Icon: Shield,
    items: [
      'Licenses: DIFC/ADGM FinTech Sandbox, UAE CSP',
      'Data Privacy: UAE PDPL compliance',
      'Fund rules aligned to DFSA/ADGM/SCA',
    ],
  },
];

// Tech feature definitions
const techFeatures = [
  {
    title: 'User Onboarding & KYC/AML',
    Icon: UserCheck,
    items: [
      'Digital identity verification (DIFC KYC, Verify, AML tools)',
      'AI-driven PEP/sanctions screening',
      'eSignatures via DocuSign & UAE Pass',
    ],
  },
  {
    title: 'Fund Structuring Wizard',
    Icon: Zap,
    items: [
      'Jurisdiction selection (UAE vs Cayman/Lux/Mauritius)',
      'Fund types: Hedge, PE, VC, SPV, REIT',
      'Auto-filing APIs (DFSA/ADGM/CIMA) + OM/LPA/PPM generation',
    ],
  },
  {
    title: 'Smart Legal Document Automation',
    Icon: FileText,
    items: [
      'AI-generated docs (GPT4 + LexisNexis/LawGeex)',
      'Templates: LPA, PPM, Subscription Agreement',
    ],
  },
  {
    title: 'Banking & Custody Integration',
    Icon: CreditCard,
    items: [
      'APIs: Emirates NBD, ADCB, Mashreq Neo, Cayman National, SEBA',
      'Multicurrency accounts via Railsr, Stripe Treasury, Swan',
    ],
  },
  {
    title: 'Tax & Compliance Engine',
    Icon: TrendingUp,
    items: [
      'Real-time tax optimization: 0% UAE vs offshore',
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

function FeatureTimelineItem({ Icon, title, items, index }) {
  return (
    <motion.div
      className={styles.timelineItem}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
    >
      <motion.div
        className={styles.timelineIcon}
        initial={{ backgroundColor: '#1f1f1f', borderColor: '#6b21a8' }}
        whileInView={{ backgroundColor: '#6b21a8', borderColor: '#a855f7' }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
      >
        <Icon size={20} />
      </motion.div>
      <div className={styles.timelineContent}>
        <h3 className={styles.itemTitle}>{title}</h3>
        <ul className={styles.itemList}>
          {items.map((text, i) => (
            <li key={i}>{text}</li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default function OperatingModel() {
  const nav = useNavigate();
  return (
    <div className={styles.pageWrapper}>
      {/* Background Spline Scene */}
      <div className={styles.background}>
        <Spline scene="/operating-model-scene.splinecode" />
      </div>

      {/* Foreground Content */}
      <div className={styles.content}>
        <button className={styles.back} onClick={() => nav('/proposal')}>
          <ArrowLeft className={styles.backIcon} /> Go Back
        </button>

        <h1 className={styles.title}>Operating Model</h1>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Overview & Business</h2>
          <div className={styles.timelineWrapper}>
            {nonTechFeatures.map((feat, i) => (
              <FeatureTimelineItem
                key={feat.title}
                Icon={feat.Icon}
                title={feat.title}
                items={feat.items}
                index={i}
              />
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Core Tech Features</h2>
          <div className={styles.timelineWrapper}>
            {techFeatures.map((feat, i) => (
              <FeatureTimelineItem
                key={feat.title}
                Icon={feat.Icon}
                title={feat.title}
                items={feat.items}
                index={i}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}