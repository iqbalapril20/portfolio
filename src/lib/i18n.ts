export type Locale = 'id' | 'en';

export interface UiTranslations {
  header: {
    backHomeAria: string;
    availableFull: string;
    availableShort: string;
    navAria: string;
    mobileNavAria: string;
    navItems: {
      top: string;
      about: string;
      portfolio: string;
      contact: string;
    };
    contactCta: string;
    aboutAria: string;
    aboutTitle: string;
    menuOpen: string;
    menuClose: string;
    cliMode: string;
    languageLabel: string;
    switchLanguageAria: string;
  };
  hero: {
    greetingPrefix: string;
    rolePrefix: string;
    pauseRole: string;
    playRole: string;
    statProjects: string;
    statCertificates: string;
    statTech: string;
    statAriaPrefix: string;
    cliMode: string;
    dragHint: string;
    dragRelease: string;
    dragHoverSuffix: string;
    resetCardAria: string;
    resetCardTitle: string;
    cardRegionAria: string;
    degreeFallback: string;
    department: string;
    roleBadgeTitle: string;
    photoAltPrefix: string;
  };
  marquee: {
    regionAria: string;
    playLabel: string;
    pauseLabel: string;
    playText: string;
    pauseText: string;
  };
  about: {
    sectionTitle: string;
    greeting: string;
    contactCta: string;
    openToWork: string;
    viewProjects: string;
    educationHeading: string;
    experienceHeading: string;
    present: string;
    educationBadgeUni: string;
    educationBadgeHighSchool: string;
    clickDetails: string;
    modalCloseLabel: string;
    modalEyebrowEducation: string;
    modalEyebrowExperience: string;
    modalDescriptionTitle: string;
    modalNoDescription: string;
    modalPeriodLabel: string;
    modalLocationLabel: string;
    modalTechTitle: string;
  };
  portfolio: {
    sectionTitle: string;
    tabListAria: string;
    tabProjects: string;
    tabCertificates: string;
    tabTechStack: string;
    scrollHintPrefix: string;
    swipeHintPrefix: string;
    projectNoun: string;
    certificateNoun: string;
    scrollLeftPrefix: string;
    scrollRightPrefix: string;
    viewDetails: string;
    issuedPrefix: string;
    viewProjectAriaPrefix: string;
    viewCertAriaPrefix: string;
    techCategories: {
      FRONTEND: string;
      BACKEND: string;
      DATABASE: string;
      TOOLS: string;
    };
    techCountSuffix: string;
  };
  projectModal: {
    defaultTitle: string;
    closeLabel: string;
    problemSolution: string;
    roleTitle: string;
    featuresTitle: string;
    techTitle: string;
    discussCta: string;
    projectLabel: string;
  };
  certModal: {
    defaultTitle: string;
    closeLabel: string;
    issuedPrefix: string;
    issuerLabel: string;
    credentialLabel: string;
    credentialFallback: string;
    skillsLabel: string;
  };
  contact: {
    sectionTitle: string;
    openOpportunities: string;
    directEmailLabel: string;
    copied: string;
    copyEmail: string;
    whatsappLabel: string;
    whatsappAction: string;
    locationLabel: string;
    formTitle: string;
    formSubtitle: string;
    nameLabel: string;
    namePlaceholder: string;
    nameError: string;
    emailLabel: string;
    emailPlaceholder: string;
    emailError: string;
    subjectLabel: string;
    subjectPlaceholder: string;
    subjectError: string;
    messageLabel: string;
    messagePlaceholder: string;
    messageError: string;
    emailAppLink: string;
    submitting: string;
    submit: string;
    submittedMessage: (name: string, subject: string) => string;
    whatsappPrefill: string;
  };
  footer: {
    about: string;
    portfolio: string;
    contact: string;
    whatsapp: string;
    whatsappPrefill: string;
    builtWith: string;
  };
  backToTop: {
    ariaLabel: string;
  };
  cli: {
    welcomeAccent: string;
    welcomeReady: (fullName: string) => string;
    closeLabel: string;
    helpText: string;
    projectsPrefix: (count: number) => string;
    techPrefix: (count: number) => string;
    locationLabel: string;
    unknownCommand: (raw: string) => string;
    inputPlaceholder: string;
    runButton: string;
  };
}

const ID_TRANSLATIONS: UiTranslations = {
  header: {
    backHomeAria: 'Kembali ke beranda',
    availableFull: 'Available for work',
    availableShort: 'Available',
    navAria: 'Navigasi Utama',
    mobileNavAria: 'Navigasi Mobile',
    navItems: {
      top: 'Home',
      about: 'About',
      portfolio: 'Portfolio',
      contact: 'Contact',
    },
    contactCta: 'Hubungi Saya',
    aboutAria: 'Tentang Muchammad Iqbal Aprilianto',
    aboutTitle: 'Tentang Iqbal',
    menuOpen: 'Menu',
    menuClose: 'Tutup',
    cliMode: 'CLI Mode',
    languageLabel: 'Bahasa',
    switchLanguageAria: 'Ganti bahasa halaman',
  },
  hero: {
    greetingPrefix: 'Halo, Saya',
    rolePrefix: 'Saya',
    pauseRole: 'Jeda animasi peran',
    playRole: 'Lanjutkan animasi peran',
    statProjects: 'Proyek Utama',
    statCertificates: 'Sertifikasi',
    statTech: 'Teknologi',
    statAriaPrefix: 'Lihat',
    cliMode: 'CLI Mode',
    dragHint: 'Geser',
    dragRelease: 'Lepas',
    dragHoverSuffix: ' / Hover',
    resetCardAria: 'Reset posisi kartu profil',
    resetCardTitle: 'Reset posisi',
    cardRegionAria: 'Kartu foto interaktif. Bisa digeser dengan mouse atau tombol panah keyboard.',
    degreeFallback: 'Sarjana Komputer',
    department: 'Teknik Informatika',
    roleBadgeTitle: 'Full-Stack Web',
    photoAltPrefix: 'Foto studio',
  },
  marquee: {
    regionAria: 'Logo teknologi yang dikuasai',
    playLabel: 'Jalankan marquee teknologi',
    pauseLabel: 'Jeda marquee teknologi',
    playText: 'Jalan',
    pauseText: 'Jeda',
  },
  about: {
    sectionTitle: 'About Me',
    greeting: "Hi, I'm",
    contactCta: 'Hubungi Saya',
    openToWork: 'Open to Work',
    viewProjects: 'Lihat Proyek',
    educationHeading: 'Education',
    experienceHeading: 'Experience',
    present: 'Sekarang',
    educationBadgeUni: 'S1 Informatika',
    educationBadgeHighSchool: 'MIPA',
    clickDetails: 'Lihat Detail',
    modalCloseLabel: 'Tutup detail riwayat',
    modalEyebrowEducation: 'Riwayat Pendidikan',
    modalEyebrowExperience: 'Pengalaman Kerja',
    modalDescriptionTitle: 'Ringkasan & Fokus Kegiatan',
    modalNoDescription: 'Menempuh pendidikan formal sesuai jurusan dengan aktif dalam pengembangan kompetensi.',
    modalPeriodLabel: 'Periode',
    modalLocationLabel: 'Keterangan',
    modalTechTitle: 'Teknologi Terkait',
  },
  portfolio: {
    sectionTitle: 'Portfolio',
    tabListAria: 'Kategori konten portofolio',
    tabProjects: 'Projects',
    tabCertificates: 'Certifications',
    tabTechStack: 'Tech Stack',
    scrollHintPrefix: 'Scroll ke bawah untuk menggeser',
    swipeHintPrefix: 'Geser ke samping untuk melihat',
    projectNoun: 'proyek',
    certificateNoun: 'sertifikat',
    scrollLeftPrefix: 'Geser ke kiri untuk',
    scrollRightPrefix: 'Geser ke kanan untuk',
    viewDetails: 'Lihat Detail',
    issuedPrefix: 'Terbit',
    viewProjectAriaPrefix: 'Lihat detail proyek',
    viewCertAriaPrefix: 'Lihat detail sertifikat',
    techCategories: {
      FRONTEND: 'Frontend Architecture',
      BACKEND: 'Backend & REST API',
      DATABASE: 'Database & ORM',
      TOOLS: 'Tools, Adapter & IoT',
    },
    techCountSuffix: 'Tech',
  },
  projectModal: {
    defaultTitle: 'Detail Proyek',
    closeLabel: 'Tutup detail proyek',
    problemSolution: 'Permasalahan & Solusi',
    roleTitle: 'Peran Pengembangan',
    featuresTitle: 'Fitur Utama Sistem',
    techTitle: 'Teknologi yang Digunakan',
    discussCta: 'Diskusikan Proyek Serupa',
    projectLabel: 'Proyek',
  },
  certModal: {
    defaultTitle: 'Detail Sertifikat',
    closeLabel: 'Tutup detail sertifikat',
    issuedPrefix: 'Diterbitkan',
    issuerLabel: 'Penerbit',
    credentialLabel: 'Nomor Kredensial',
    credentialFallback: 'Tercatat pada arsip resmi',
    skillsLabel: 'Keahlian Terkait',
  },
  contact: {
    sectionTitle: 'Contact',
    openOpportunities: 'Open to Opportunities',
    directEmailLabel: 'Email Langsung',
    copied: 'Tersalin',
    copyEmail: 'Salin Email',
    whatsappLabel: 'WhatsApp',
    whatsappAction: 'Chat WhatsApp',
    locationLabel: 'Lokasi',
    formTitle: 'Kirim Pesan & Diskusi',
    formSubtitle: 'Mode frontend aktif. Validasi formulir berjalan langsung di browser.',
    nameLabel: 'Nama Lengkap *',
    namePlaceholder: 'Nama Lengkap Anda',
    nameError: 'Nama minimal 2 karakter',
    emailLabel: 'Alamat Email *',
    emailPlaceholder: 'email@contoh.com',
    emailError: 'Masukkan alamat email yang valid',
    subjectLabel: 'Subjek Diskusi *',
    subjectPlaceholder: 'Pengembangan aplikasi web atau kolaborasi',
    subjectError: 'Subjek minimal 3 karakter',
    messageLabel: 'Detail Pesan *',
    messagePlaceholder: 'Ceritakan kebutuhan aplikasi web atau kolaborasi Anda...',
    messageError: 'Pesan minimal 10 karakter',
    emailAppLink: 'Atau kirim lewat aplikasi email',
    submitting: 'Mengirim...',
    submit: 'Kirim Pesan',
    submittedMessage: (name, subject) =>
      `Terima kasih, ${name}. Pesan "${subject}" telah tercatat di pratinjau frontend. Untuk respons tercepat, silakan hubungi langsung lewat WhatsApp atau Email di sebelah kiri.`,
    whatsappPrefill:
      'Halo Iqbal, saya tertarik untuk berdiskusi mengenai proyek atau kolaborasi pengembangan web.',
  },
  footer: {
    about: 'About',
    portfolio: 'Portfolio',
    contact: 'Contact',
    whatsapp: 'WhatsApp',
    whatsappPrefill: 'Halo Iqbal, saya menghubungi melalui website portofolio.',
    builtWith: 'Dibangun dengan Next.js, TypeScript & Tailwind CSS.',
  },
  backToTop: {
    ariaLabel: 'Kembali ke atas halaman',
  },
  cli: {
    welcomeAccent: "Ketik 'help', 'whoami', 'bio', 'projects', 'skills', 'contact', 'clear', atau 'exit'.",
    welcomeReady: (fullName) => `Shell portofolio ${fullName} siap digunakan.`,
    closeLabel: 'Tutup terminal CLI',
    helpText: 'Perintah tersedia: help, whoami, bio, projects, skills, contact, clear, exit',
    projectsPrefix: (count) => `${count} Proyek Terpublikasi:`,
    techPrefix: (count) => `Tech Stack (${count}):`,
    locationLabel: 'Lokasi',
    unknownCommand: (raw) => `Perintah tidak dikenali: '${raw}'. Ketik 'help' untuk daftar perintah.`,
    inputPlaceholder: 'Ketik perintah (mis. help, projects, skills)...',
    runButton: 'Jalankan',
  },
};

const EN_TRANSLATIONS: UiTranslations = {
  header: {
    backHomeAria: 'Back to top',
    availableFull: 'Available for work',
    availableShort: 'Available',
    navAria: 'Primary Navigation',
    mobileNavAria: 'Mobile Navigation',
    navItems: {
      top: 'Home',
      about: 'About',
      portfolio: 'Portfolio',
      contact: 'Contact',
    },
    contactCta: 'Contact Me',
    aboutAria: 'About Muchammad Iqbal Aprilianto',
    aboutTitle: 'About Iqbal',
    menuOpen: 'Menu',
    menuClose: 'Close',
    cliMode: 'CLI Mode',
    languageLabel: 'Language',
    switchLanguageAria: 'Switch page language',
  },
  hero: {
    greetingPrefix: "Hi, I'm",
    rolePrefix: "I'm a",
    pauseRole: 'Pause role animation',
    playRole: 'Resume role animation',
    statProjects: 'Featured Projects',
    statCertificates: 'Certifications',
    statTech: 'Technologies',
    statAriaPrefix: 'View',
    cliMode: 'CLI Mode',
    dragHint: 'Drag',
    dragRelease: 'Release',
    dragHoverSuffix: ' / Hover',
    resetCardAria: 'Reset profile card position',
    resetCardTitle: 'Reset position',
    cardRegionAria: 'Interactive portrait card. Drag with mouse or move with arrow keys.',
    degreeFallback: 'Bachelor of Computer Science',
    department: 'Informatics Engineering',
    roleBadgeTitle: 'Full-Stack Web',
    photoAltPrefix: 'Studio portrait of',
  },
  marquee: {
    regionAria: 'Technology stack logos',
    playLabel: 'Play tech stack marquee',
    pauseLabel: 'Pause tech stack marquee',
    playText: 'Play',
    pauseText: 'Pause',
  },
  about: {
    sectionTitle: 'About Me',
    greeting: "Hi, I'm",
    contactCta: 'Contact Me',
    openToWork: 'Open to Work',
    viewProjects: 'View Projects',
    educationHeading: 'Education',
    experienceHeading: 'Experience',
    present: 'Present',
    educationBadgeUni: 'Undergraduate',
    educationBadgeHighSchool: 'Science Track',
    clickDetails: 'View Details',
    modalCloseLabel: 'Close timeline details',
    modalEyebrowEducation: 'Education Background',
    modalEyebrowExperience: 'Work Experience',
    modalDescriptionTitle: 'Highlights & Focus Areas',
    modalNoDescription: 'Completed formal academic curriculum while building strong technical foundations.',
    modalPeriodLabel: 'Period',
    modalLocationLabel: 'Program / Type',
    modalTechTitle: 'Related Technologies',
  },
  portfolio: {
    sectionTitle: 'Portfolio',
    tabListAria: 'Portfolio content categories',
    tabProjects: 'Projects',
    tabCertificates: 'Certifications',
    tabTechStack: 'Tech Stack',
    scrollHintPrefix: 'Scroll down to slide',
    swipeHintPrefix: 'Swipe sideways to browse',
    projectNoun: 'projects',
    certificateNoun: 'certificates',
    scrollLeftPrefix: 'Slide left',
    scrollRightPrefix: 'Slide right',
    viewDetails: 'View Details',
    issuedPrefix: 'Issued',
    viewProjectAriaPrefix: 'View project details for',
    viewCertAriaPrefix: 'View certificate details for',
    techCategories: {
      FRONTEND: 'Frontend Architecture',
      BACKEND: 'Backend & REST API',
      DATABASE: 'Database & ORM',
      TOOLS: 'Tools, Adapter & IoT',
    },
    techCountSuffix: 'Tech',
  },
  projectModal: {
    defaultTitle: 'Project Details',
    closeLabel: 'Close project details',
    problemSolution: 'Problem & Solution',
    roleTitle: 'Development Role',
    featuresTitle: 'Key System Features',
    techTitle: 'Technologies Used',
    discussCta: 'Discuss a Similar Project',
    projectLabel: 'Project',
  },
  certModal: {
    defaultTitle: 'Certificate Details',
    closeLabel: 'Close certificate details',
    issuedPrefix: 'Issued',
    issuerLabel: 'Issuer',
    credentialLabel: 'Credential ID',
    credentialFallback: 'Recorded in official archive',
    skillsLabel: 'Related Skills',
  },
  contact: {
    sectionTitle: 'Contact',
    openOpportunities: 'Open to Opportunities',
    directEmailLabel: 'Direct Email',
    copied: 'Copied',
    copyEmail: 'Copy Email',
    whatsappLabel: 'WhatsApp',
    whatsappAction: 'Chat on WhatsApp',
    locationLabel: 'Location',
    formTitle: 'Send a Message',
    formSubtitle: 'Frontend mode active. Form validation runs directly in your browser.',
    nameLabel: 'Full Name *',
    namePlaceholder: 'Your Full Name',
    nameError: 'Name must be at least 2 characters',
    emailLabel: 'Email Address *',
    emailPlaceholder: 'you@example.com',
    emailError: 'Please enter a valid email address',
    subjectLabel: 'Subject *',
    subjectPlaceholder: 'Web application development or collaboration',
    subjectError: 'Subject must be at least 3 characters',
    messageLabel: 'Message *',
    messagePlaceholder: 'Tell me about your web project or collaboration idea...',
    messageError: 'Message must be at least 10 characters',
    emailAppLink: 'Or open in your email client',
    submitting: 'Sending...',
    submit: 'Send Message',
    submittedMessage: (name, subject) =>
      `Thank you, ${name}. Your inquiry "${subject}" has been recorded in the frontend preview. For the fastest reply, reach out directly via WhatsApp or Email on the left.`,
    whatsappPrefill:
      'Hi Iqbal, I am interested in discussing a web development project or collaboration.',
  },
  footer: {
    about: 'About',
    portfolio: 'Portfolio',
    contact: 'Contact',
    whatsapp: 'WhatsApp',
    whatsappPrefill: 'Hi Iqbal, reaching out from your portfolio website.',
    builtWith: 'Built with Next.js, TypeScript & Tailwind CSS.',
  },
  backToTop: {
    ariaLabel: 'Back to top',
  },
  cli: {
    welcomeAccent: "Type 'help', 'whoami', 'bio', 'projects', 'skills', 'contact', 'clear', or 'exit'.",
    welcomeReady: (fullName) => `${fullName}'s portfolio shell is ready.`,
    closeLabel: 'Close CLI terminal',
    helpText: 'Available commands: help, whoami, bio, projects, skills, contact, clear, exit',
    projectsPrefix: (count) => `${count} Published Projects:`,
    techPrefix: (count) => `Tech Stack (${count}):`,
    locationLabel: 'Location',
    unknownCommand: (raw) => `Unknown command: '${raw}'. Type 'help' for available commands.`,
    inputPlaceholder: 'Type a command (e.g. help, projects, skills)...',
    runButton: 'Run',
  },
};

export function getTranslations(locale: Locale): UiTranslations {
  return locale === 'en' ? EN_TRANSLATIONS : ID_TRANSLATIONS;
}
