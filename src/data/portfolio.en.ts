import type { Locale } from '@/lib/i18n';
import type { PortfolioData } from '@/types/portfolio';
import { portfolioData } from './portfolio';

const EN_PROJECT_OVERRIDES: Record<
  number,
  Partial<PortfolioData['projects'][number]>
> = {
  19: {
    title: 'Personal Portfolio Website',
    shortDescription:
      'A personal portfolio platform designed to present profile, experience, education, skills, and project case studies in a structured digital experience.',
    fullDescription:
      '<h2>Personal Portfolio Website</h2><p>This personal portfolio web application serves as a digital platform to introduce my background, showcase my academic and engineering journey, and document real-world projects.</p><p>Designed with a clean, responsive, and intuitive layout so visitors, recruiters, and collaborators can explore my profile, capabilities, and works effortlessly.</p>',
    problemSolved:
      '<p>Information across profiles, work experience, technical skills, and built projects is often scattered across platforms. This portfolio brings everything together into one cohesive, accessible showcase.</p>',
    role: 'Full-Stack Web Developer: Designed the interface, engineered interactive features, and structured the CMS content model for responsive, reliable presentation.',
  },
  2: {
    title: 'Gold Sales Management System',
    shortDescription:
      'Dedicated gold retail sales web application for daily selling prices per karat, inventory tracking, cashier checkout, and transaction analytics.',
    fullDescription:
      'A structured retail sales web application for gold stores focused on jewelry inventory management, daily selling price calibration by gold purity (karat), point-of-sale checkout, and retail revenue analytics charts.',
    problemSolved:
      '<p>Gold jewelry retail requires precise decimal weight calculations and daily selling price rates per karat purity so cashier transactions remain accurate and well-documented.</p>',
    keyFeatures: [
      {
        title: 'Daily Selling Price Matrix',
        description:
          'Configures daily gold selling prices per gram mapped cleanly to purity grades (18K, 22K, 24K).',
      },
      {
        title: 'Sales Price Calculator',
        description:
          'Automatically calculates total selling prices based on gram weight, karat grade, and daily selling rates.',
      },
      {
        title: 'Jewelry SKU & Inventory',
        description:
          'Tracks jewelry stock items along with exact weight, karat grade, and showcase availability.',
      },
      {
        title: 'Sales Analytics & Receipts',
        description:
          'Visualizes retail sales revenue charts alongside structured digital sales invoices.',
      },
    ],
    role: 'Full-Stack Developer: Built with Laravel, Inertia.js, React.js, Shadcn UI, Tailwind CSS, Chart.js sales visualizations, and decimal-safe MySQL transactions.',
  },
  3: {
    title: 'Event Organizer Management System',
    shortDescription:
      'Web-based management system to coordinate event logistics, vendor contracts, and live rundown scheduling.',
    fullDescription:
      'Centralized event operations platform managing multi-stage event logistics, field team rundowns, equipment check-out tracking, client communications, and vendor budget planning.',
    problemSolved:
      'Fragmented coordination across venue teams, decor vendors, audio crews, and clients frequently causes scheduling conflicts and misplaced event assets.',
    keyFeatures: [
      {
        title: 'Vendor Coordination Hub',
        description:
          'Centralizes vendor agreements, delivery deadlines, and operational contact directories.',
      },
      {
        title: 'Rundown Timeline',
        description: 'Interactive schedule timeline tracking live event execution milestones.',
      },
      {
        title: 'Asset Checkout Tracking',
        description:
          'Item-code based equipment issuance and return logging to prevent asset loss.',
      },
      {
        title: 'Budget Monitor',
        description: 'Compares estimated client budgets against actual vendor expenses.',
      },
    ],
    role: 'Backend & System Architect: Designed the relational database schema, role permissions, and event rundown builder.',
  },
  4: {
    title: 'Multiliteracy Assessment & Grading System',
    shortDescription:
      'Web application for evaluating and monitoring student science literacy competencies using structured grading rubrics and charts.',
    fullDescription:
      'Academic evaluation platform measuring reading comprehension, contextual reasoning, and digital information synthesis with configurable multi-criteria rubrics, progress charts, and PDF report exports.',
    problemSolved:
      '<p>Conventional single-choice tests fail to capture multi-dimensional contextual understanding and science literacy across cohorts.</p>',
    keyFeatures: [
      {
        title: 'Multi-Criteria Rubrics',
        description:
          'Configurable grading matrix to evaluate critical thinking and reading comprehension.',
      },
      {
        title: 'Cohort Analytics',
        description: 'Comparative charts tracking individual student scores against class averages.',
      },
      {
        title: 'Diagnostic Feedback',
        description:
          'Automated summaries highlighting literacy areas that require targeted mentoring.',
      },
      {
        title: 'PDF Report Export',
        description: 'Printable evaluation reports for educators and academic supervisors.',
      },
    ],
    role: 'Full-Stack Developer: Built responsive assessment interfaces with Laravel, Inertia.js, React.js, Shadcn UI, Tailwind CSS, Chart.js analytics, and MySQL.',
  },
  5: {
    title: 'Event Ticket Booking System',
    shortDescription:
      'Web ticket booking application featuring event catalogs, attendee registration, payment simulation, and QR check-in.',
    fullDescription:
      'Interactive event ticketing platform offering public event discovery, real-time ticket quota tracking, unique cryptographic QR tickets, fast entry scanning, and automatic e-ticket issuance.',
    problemSolved:
      '<p>Manual event registration without real-time quota checks causes double bookings and slow physical check-in queues.</p>',
    keyFeatures: [
      {
        title: 'Dynamic Quota Catalog',
        description:
          'Real-time remaining ticket counts preventing overselling across ticket tiers.',
      },
      {
        title: 'Unique QR Passes',
        description:
          'Generates signed unique QR codes for every registered event attendee.',
      },
      {
        title: 'Fast Check-In Scanner',
        description: 'Browser-ready QR verification view for rapid venue gate validation.',
      },
      {
        title: 'Transaction Simulation',
        description: 'End-to-end payment status workflow and automated e-ticket generation.',
      },
    ],
    role: 'Frontend & API Developer: Built the interactive React booking flow and integrated RESTful APIs backed by Laravel & MySQL.',
  },
  6: {
    title: 'Company Profile Website & Dynamic CMS',
    shortDescription:
      'Full-stack corporate website powered by a dynamic Admin CMS to customize navbar links, pages, sections, and content freely.',
    fullDescription:
      '<p>A full-stack company profile platform with a built-in Admin CMS enabling administrators to create and manage pages flexibly, customize navigation menu links, organize section layouts, and update page content without touching source code.</p>',
    problemSolved:
      '<p>Static company profiles slow down internal teams whenever new service pages, content edits, or navigation menu updates are needed.</p>',
    keyFeatures: [
      {
        title: 'Dynamic Content CMS',
        description:
          'Structured admin panel to add, edit, and publish website pages independently.',
      },
      {
        title: 'Customizable Navbar & Pages',
        description:
          'Administrators can configure top navigation links, order, and custom page layouts dynamically.',
      },
      {
        title: 'Service Catalog & Insights',
        description:
          'Clean company overview, service showcase, and interactive admin overview charts.',
      },
      {
        title: 'Client Inquiry Forms',
        description: 'Validated prospective client inquiry forms persisted cleanly to MySQL.',
      },
    ],
    role: 'Full-Stack Web Developer: Architected the Laravel + Inertia.js & React.js CMS with Shadcn UI, Tailwind CSS, Chart.js, and MySQL for customizable navbars, pages, and content.',
  },
  7: {
    title: 'IoT Automated Home Gate System with ESP8266',
    shortDescription:
      'Automated residential gate driven by a DC motor connected to ESP8266, operable via web control panel and infrared (IR) remote.',
    fullDescription:
      '<p>Home gate automation system driving an electric motor actuator through an ESP8266 microcontroller, paired with a web application for open/close gate control and direct infrared (IR) remote operation.</p>',
    problemSolved:
      '<p>Opening and closing a residential gate manually takes time and effort while driving or in heavy rain, calling for convenient dual control via web and IR remote.</p>',
    keyFeatures: [
      {
        title: 'Motorized Gate & ESP8266',
        description:
          'ESP8266 drives the residential gate motor reliably over local Wi-Fi connectivity.',
      },
      {
        title: 'Web Open & Close Control',
        description:
          'Responsive web interface allowing residents to open and close the gate directly from any browser.',
      },
      {
        title: 'Infrared (IR) Remote Control',
        description:
          'Physical IR remote support for instant gate operation around the residence.',
      },
      {
        title: 'PHP API & MySQL Sync',
        description:
          'Lightweight API communication between ESP8266 and the PHP/MySQL web server for gate command synchronization.',
      },
    ],
    role: 'IoT & Full-Stack Web Programmer: Programmed ESP8266 in Arduino IDE for motor actuator and IR sensor control alongside a PHP, API, HTML, CSS, and MySQL web controller.',
  },
};

const EN_TECH_DESC: Record<number, string> = {
  1: 'Semantic Structure',
  2: 'Modern Styling',
  3: 'ES6+ Standard',
  4: 'Type-Safe Code',
  20: 'SPA Monolith Adapter',
  5: 'Utility-First CSS',
  6: 'Component Architecture',
  7: 'App Router & SSR',
  8: 'Rapid UI Grid',
  9: 'Object-Oriented PHP',
  10: 'Eloquent, Routing & MVC',
  11: 'Server Runtime',
  12: 'REST API Framework',
  13: 'JSON Payload Contracts',
  14: 'Relational Queries & Indexing',
  15: 'Schema Migrations & ORM',
  16: 'Version Control & Collaboration',
  17: 'Development Environment',
  18: 'API Endpoint Testing',
  19: 'Embedded Firmware & IoT',
  21: 'Data Visualization & Charts',
  22: 'Accessible UI Components',
};

export function getPortfolioData(locale: Locale): PortfolioData {
  if (locale === 'id') {
    return portfolioData;
  }

  return {
    ...portfolioData,
    profile: {
      ...portfolioData.profile,
      headline: 'Building Structured Digital Solutions Through Code.',
      shortBio:
        'I am a programmer and web developer focused on building functional, efficient, and user-friendly web applications across both frontend and backend technologies.',
      aboutSummary:
        "I'm Muchammad Iqbal Aprilianto, a Computer Science graduate passionate about software engineering and modern full-stack web development.",
      aboutStory:
        '<p>I have experience building full-stack web applications with PHP, Laravel, MySQL, JavaScript, React, and modern web tooling, covering relational database design, RESTful APIs, and responsive user interfaces.</p>',
      degreeLabel: 'Bachelor of Computer Science (S.Kom)',
      availabilityText: 'Open to full-time & freelance opportunities',
    },
    educations: [
      {
        ...portfolioData.educations[0],
        degree: 'Bachelor of Computer Science (S.Kom)',
        major: 'Informatics · Faculty of Information Technology',
        description:
          '<p>Informatics Engineering graduate specializing in full-stack web development with PHP, Laravel, CodeIgniter, JavaScript, MySQL, HTML, CSS, Bootstrap, and Tailwind CSS. Experienced in database design, API integration, and IoT thesis engineering (ESP8266 motorized residential gate with web and IR remote control).</p>',
      },
      {
        ...portfolioData.educations[1],
        degree: 'Islamic Senior High School (MAN)',
        major: 'Mathematics & Natural Sciences (MIPA)',
        description: null,
      },
    ],
    experiences: [
      {
        ...portfolioData.experiences[0],
        employmentType: 'MagangHub Kemnaker',
        location: 'Jombang, East Java',
        description:
          '<ul><li>Built and maintained web applications using PHP, Laravel, JavaScript, MySQL, Bootstrap, and Tailwind CSS, including company profile CMS, multiliteracy assessment, E-POS, and gold sales management systems.</li><li>Collaborated with engineers to build, test, and refine features on the Computer Based Test (CBT) platform.</li><li>Managed end-to-end delivery from requirement analysis and database modeling through deployment and maintenance.</li></ul>',
      },
      {
        ...portfolioData.experiences[1],
        employmentType: 'Intern',
        location: 'Jombang, East Java',
        description:
          '<ul><li>Developed a web-based Event Organizer and online ticket booking platform with PHP, Laravel, Bootstrap, and MySQL.</li><li>Implemented event management, participant registration, ticket checkout, payment validation, and admin dashboards.</li><li>Conducted testing, debugging, and performance tuning for reliable live operations.</li></ul>',
      },
    ],
    projects: portfolioData.projects.map((proj) => ({
      ...proj,
      ...(EN_PROJECT_OVERRIDES[proj.id] ?? {}),
    })),
    certificates: [
      {
        ...portfolioData.certificates[0],
        description:
          'Competency certification covering semantic HTML foundations, CSS Flexbox/Grid layouts, and responsive web structuring.',
      },
      {
        ...portfolioData.certificates[1],
        description:
          'Foundational Python certification covering control flow, functions, data manipulation, and exploratory data analysis.',
      },
      {
        ...portfolioData.certificates[2],
        issuer: 'Ministry of Manpower of the Republic of Indonesia',
        category: 'Professional Certification',
        skills: ['Occupational Health and Safety (OHS)'],
        description:
          'National General Occupational Health & Safety (K3) expert competency certification issued by the Ministry of Manpower RI.',
      },
    ],
    skills: [
      { ...portfolioData.skills[0], proficiencyLabel: 'Core Focus' },
      { ...portfolioData.skills[1], proficiencyLabel: null },
      { ...portfolioData.skills[2], name: 'REST API with Node.js & Express', proficiencyLabel: 'Production' },
      { ...portfolioData.skills[3], proficiencyLabel: 'Production' },
      { ...portfolioData.skills[4], name: 'Relational Database Design (MySQL)', proficiencyLabel: 'Core Focus' },
      { ...portfolioData.skills[5], name: 'Tailwind CSS & Responsive UI', proficiencyLabel: 'Production' },
      { ...portfolioData.skills[6], name: 'Web & ESP8266 IoT Integration', proficiencyLabel: 'Project' },
    ],
    techStacks: portfolioData.techStacks.map((item) => ({
      ...item,
      shortDescription: EN_TECH_DESC[item.id] ?? item.shortDescription,
    })),
    contact: {
      ...portfolioData.contact,
      additionalInfo:
        'Have a project idea, collaboration opportunity, or want to discuss web application development? Reach out through this form or the channels below.',
    },
    settings: {
      ...portfolioData.settings,
      footerText: '© 2026 Muchammad Iqbal Aprilianto. All Rights Reserved.',
      heroCtaPrimaryLabel: 'View My Work',
      heroCtaSecondaryLabel: 'Contact Me',
      contactSectionTitle: "Let's Build Solutions Together.",
      contactSectionSubtitle:
        'Have a project in mind or want to collaborate on web development? Send a message using the form.',
    },
  };
}
