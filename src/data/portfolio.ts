import type { PortfolioData, TechStack } from '@/types/portfolio';

const techStacksData: TechStack[] = [
  {
    id: 1,
    name: 'HTML5',
    category: 'FRONTEND',
    iconUrl: 'https://api.iconify.design/devicon/html5.svg',
    iconName: 'devicon:html5',
    shortDescription: 'Struktur Semantik',
    displayOrder: 1,
  },
  {
    id: 2,
    name: 'CSS3',
    category: 'FRONTEND',
    iconUrl: 'https://api.iconify.design/devicon/css3.svg',
    iconName: 'devicon:css3',
    shortDescription: 'Styling Modern',
    displayOrder: 2,
  },
  {
    id: 3,
    name: 'JavaScript',
    category: 'FRONTEND',
    iconUrl: 'https://api.iconify.design/devicon/javascript.svg',
    iconName: 'devicon:javascript',
    shortDescription: 'Standar ES6+',
    displayOrder: 3,
  },
  {
    id: 4,
    name: 'TypeScript',
    category: 'FRONTEND',
    iconUrl: 'https://api.iconify.design/devicon/typescript.svg',
    iconName: 'devicon:typescript',
    shortDescription: 'Kode Type-Safe',
    displayOrder: 4,
  },
  {
    id: 20,
    name: 'Inertia.js',
    category: 'TOOLS',
    iconUrl: 'https://api.iconify.design/devicon/inertiajs.svg',
    iconName: 'devicon:inertiajs',
    shortDescription: 'Adapter Monolith SPA',
    displayOrder: 5,
  },
  {
    id: 5,
    name: 'Tailwind CSS',
    category: 'FRONTEND',
    iconUrl: 'https://api.iconify.design/devicon/tailwindcss.svg',
    iconName: 'devicon:tailwindcss',
    shortDescription: 'Utility-First CSS',
    displayOrder: 6,
  },
  {
    id: 6,
    name: 'React.js',
    category: 'FRONTEND',
    iconUrl: 'https://api.iconify.design/devicon/react.svg',
    iconName: 'devicon:react',
    shortDescription: 'Arsitektur Komponen',
    displayOrder: 7,
  },
  {
    id: 7,
    name: 'Next.js',
    category: 'FRONTEND',
    iconUrl: 'https://api.iconify.design/devicon/nextjs.svg',
    iconName: 'devicon:nextjs',
    shortDescription: 'App Router & SSR',
    displayOrder: 8,
  },
  {
    id: 8,
    name: 'Bootstrap',
    category: 'FRONTEND',
    iconUrl: 'https://api.iconify.design/devicon/bootstrap.svg',
    iconName: 'devicon:bootstrap',
    shortDescription: 'Grid UI Cepat',
    displayOrder: 9,
  },
  {
    id: 9,
    name: 'PHP',
    category: 'BACKEND',
    iconUrl: 'https://api.iconify.design/devicon/php.svg',
    iconName: 'devicon:php',
    shortDescription: 'Pemrograman Berorientasi Objek',
    displayOrder: 10,
  },
  {
    id: 10,
    name: 'Laravel',
    category: 'BACKEND',
    iconUrl: 'https://api.iconify.design/devicon/laravel.svg',
    iconName: 'devicon:laravel',
    shortDescription: 'Eloquent, Routing, Blade',
    displayOrder: 11,
  },
  {
    id: 11,
    name: 'Node.js',
    category: 'BACKEND',
    iconUrl: 'https://api.iconify.design/devicon/nodejs.svg',
    iconName: 'devicon:nodejs',
    shortDescription: 'Runtime Server',
    displayOrder: 12,
  },
  {
    id: 12,
    name: 'Express.js',
    category: 'BACKEND',
    iconUrl: 'https://api.iconify.design/devicon/express.svg',
    iconName: 'devicon:express',
    shortDescription: 'Framework REST API',
    displayOrder: 13,
  },
  {
    id: 13,
    name: 'RESTful APIs',
    category: 'BACKEND',
    iconUrl: 'https://api.iconify.design/carbon/api.svg',
    iconName: 'carbon:api',
    shortDescription: 'Kontrak Payload JSON',
    displayOrder: 14,
  },
  {
    id: 14,
    name: 'MySQL',
    category: 'DATABASE',
    iconUrl: 'https://api.iconify.design/devicon/mysql.svg',
    iconName: 'devicon:mysql',
    shortDescription: 'Query Relasional, FK & Indeks',
    displayOrder: 15,
  },
  {
    id: 15,
    name: 'Prisma ORM',
    category: 'DATABASE',
    iconUrl: 'https://api.iconify.design/devicon/prisma.svg',
    iconName: 'devicon:prisma',
    shortDescription: 'Migrasi Skema & Query Aman',
    displayOrder: 16,
  },
  {
    id: 16,
    name: 'Git & GitHub',
    category: 'TOOLS',
    iconUrl: 'https://api.iconify.design/devicon/git.svg',
    iconName: 'devicon:git',
    shortDescription: 'Kontrol Versi & Kolaborasi',
    displayOrder: 17,
  },
  {
    id: 17,
    name: 'VS Code',
    category: 'TOOLS',
    iconUrl: 'https://api.iconify.design/devicon/vscode.svg',
    iconName: 'devicon:vscode',
    shortDescription: 'Lingkungan Pengembangan',
    displayOrder: 18,
  },
  {
    id: 18,
    name: 'Postman',
    category: 'TOOLS',
    iconUrl: 'https://api.iconify.design/devicon/postman.svg',
    iconName: 'devicon:postman',
    shortDescription: 'Pengujian Endpoint API',
    displayOrder: 19,
  },
  {
    id: 19,
    name: 'Arduino IDE / ESP8266',
    category: 'TOOLS',
    iconUrl: 'https://api.iconify.design/devicon/arduino.svg',
    iconName: 'devicon:arduino',
    shortDescription: 'Firmware Embedded & IoT',
    displayOrder: 20,
  },
  {
    id: 21,
    name: 'Chart.js',
    category: 'FRONTEND',
    iconUrl: 'https://api.iconify.design/simple-icons/chartdotjs.svg',
    iconName: 'simple-icons:chartdotjs',
    shortDescription: 'Visualisasi Data & Grafik',
    displayOrder: 21,
  },
  {
    id: 22,
    name: 'Shadcn UI',
    category: 'FRONTEND',
    iconUrl: 'https://api.iconify.design/simple-icons/shadcnui.svg',
    iconName: 'simple-icons:shadcnui',
    shortDescription: 'Komponen UI Aksesibel',
    displayOrder: 22,
  },
];

const techById = new Map(techStacksData.map((t) => [t.id, t]));
function pickTechs(...ids: number[]): TechStack[] {
  return ids.map((id) => techById.get(id)).filter((item): item is TechStack => Boolean(item));
}

const categoriesData = [
  {
    id: 1,
    name: 'POS & Commerce',
    slug: 'pos-commerce',
    description: 'Sistem kasir ritel dan manajemen inventori',
    displayOrder: 1,
  },
  {
    id: 2,
    name: 'Enterprise ERP',
    slug: 'enterprise-erp',
    description: 'Platform operasional dan pencatatan transaksi khusus',
    displayOrder: 2,
  },
  {
    id: 3,
    name: 'Operasional',
    slug: 'operations',
    description: 'Sistem koordinasi logistik dan jadwal acara',
    displayOrder: 3,
  },
  {
    id: 4,
    name: 'EdTech',
    slug: 'edtech',
    description: 'Platform asesmen pendidikan dan rubrik penilaian',
    displayOrder: 4,
  },
  {
    id: 5,
    name: 'Aplikasi Web',
    slug: 'web-app',
    description: 'Aplikasi web interaktif full-stack',
    displayOrder: 5,
  },
  {
    id: 6,
    name: 'Korporat',
    slug: 'corporate',
    description: 'Website profil perusahaan dan katalog layanan',
    displayOrder: 6,
  },
  {
    id: 7,
    name: 'Hardware & IoT',
    slug: 'hardware-iot',
    description: 'Integrasi mikrokontroler dan portal kontrol web',
    displayOrder: 7,
  },
];

const categoryById = new Map(categoriesData.map((c) => [c.id, c]));

export const portfolioData: PortfolioData = {
  profile: {
    id: 1,
    fullName: 'Muchammad Iqbal Aprilianto',
    brandMark: 'iqbal.dev',
    headline: 'Membangun Solusi Digital yang Terstruktur Melalui Kode.',
    heroRoles: [
      'Full-Stack Web Developer',
      'Web Developer',
      'Programmer',
      'Software Developer',
    ],
    shortBio:
      'Saya seorang programmer dan web developer yang berfokus pada pengembangan aplikasi berbasis web. Saya senang membangun solusi digital yang fungsional, efisien, dan mudah digunakan melalui kombinasi teknologi frontend dan backend.',
    aboutSummary:
      'Perkenalkan, saya Muchammad Iqbal Aprilianto, seorang lulusan Sarjana Komputer yang memiliki ketertarikan pada dunia pemrograman dan pengembangan aplikasi berbasis web.',
    aboutStory:
      '<p>Saya memiliki pengalaman dalam membangun berbagai aplikasi web menggunakan PHP, Laravel, MySQL, JavaScript, React, dan teknologi web modern lainnya. Saya terbiasa terlibat dalam proses pengembangan mulai dari perancangan database relasional, pengembangan backend dan RESTful API, hingga implementasi antarmuka yang responsif. Bagi saya, pengembangan software bukan hanya tentang menulis kode, tetapi juga bagaimana menciptakan solusi yang dapat membantu menyelesaikan permasalahan pengguna secara terstruktur dan terukur.</p>',
    coreCompetencies: [
      {
        title: 'Pengembangan Frontend',
        description:
          'Antarmuka web responsif menggunakan React, Next.js, TypeScript, dan Tailwind CSS.',
      },
      {
        title: 'Backend & Database',
        description: 'Logika server, autentikasi aman, dan desain basis data relasional MySQL.',
      },
      {
        title: 'Integrasi API',
        description: 'Perancangan serta integrasi RESTful API dengan kontrak JSON yang konsisten.',
      },
      {
        title: 'Responsive Interface',
        description: 'Tata letak adaptif yang nyaman diakses di perangkat mobile maupun desktop.',
      },
      {
        title: 'Arsitektur Sistem',
        description: 'Pemisahan lapisan controller, service, dan akses data yang terawat.',
      },
      {
        title: 'Kontrol Hak Akses',
        description: 'Pengelolaan hak akses multi-peran untuk aplikasi bisnis dan CMS.',
      },
    ],
    degreeLabel: 'Sarjana Komputer (S.Kom)',
    availabilityText: 'Open to full-time & freelance opportunities',
    isAvailable: true,
    profileImageUrl: '/images/profile-iqbal-hero.jpg',
    heroImageUrl: '/images/profile-iqbal-hero.jpg',
    aboutImageUrl: '/images/profile-iqbal-about.jpg',
    resumeUrl: null,
  },

  educations: [
    {
      id: 1,
      institution: 'Universitas KH. A. Wahab Hasbullah Jombang (UNWAHA)',
      degree: 'Sarjana Komputer (S.Kom)',
      major: 'Informatika / Fakultas Teknologi Informasi',
      startYear: 2021,
      endYear: 2025,
      isCurrent: false,
      logoUrl: null, // Siap diisi misal: '/images/logos/unwaha.png'
      description:
        '<p>Memiliki latar belakang pendidikan Informatika dengan fokus pada pengembangan aplikasi berbasis web. Menguasai dasar hingga pengembangan aplikasi menggunakan PHP, Laravel, CodeIgniter, JavaScript, MySQL, HTML, CSS, Bootstrap, dan Tailwind CSS. Terbiasa mengembangkan frontend, backend, merancang database, serta membangun berbagai sistem informasi. Melalui skripsi, saya juga mengembangkan sistem pagar otomatis berbasis IoT menggunakan ESP8266 dengan kendali website dan remote inframerah.</p>',
      displayOrder: 1,
    },
    {
      id: 2,
      institution: 'MAN 3 Jombang',
      degree: 'Madrasah Aliyah (SMA)',
      major: 'Jurusan MIPA',
      startYear: 2018,
      endYear: 2021,
      isCurrent: false,
      logoUrl: null, // Siap diisi misal: '/images/logos/man3-jombang.png'
      description: null,
      displayOrder: 2,
    },
  ],

  experiences: [
    {
      id: 1,
      title: 'Web Developer & Programmer',
      organization: 'PT. Nusatama Jaya Sakti',
      employmentType: 'MagangHub Kemnaker',
      location: 'Jombang, Jawa Timur',
      startDate: 'Dec 2025',
      endDate: 'Jun 2026',
      isCurrent: false,
      logoUrl: null, // Siap diisi misal: '/images/logos/nusatama.png'
      description:
        '<ul><li>Mengembangkan dan membangun berbagai aplikasi berbasis web menggunakan PHP, Laravel, JavaScript, MySQL, Bootstrap, dan Tailwind CSS, termasuk website company profile, sistem penilaian multiliterasi, aplikasi E-POS, serta sistem penjualan toko emas.</li><li>Berkolaborasi dengan tim developer dalam merancang, mengembangkan, menguji, dan menyempurnakan fitur pada sistem Computer Based Test (CBT) agar berjalan sesuai kebutuhan pengguna dan memberikan pengalaman penggunaan yang optimal.</li><li>Mengelola proses pengembangan website mulai dari analisis kebutuhan, perancangan database, implementasi fitur, integrasi frontend dan backend, pengujian, perbaikan bug, hingga proses deployment dan pemeliharaan aplikasi untuk memastikan sistem berjalan dengan baik.</li></ul>',
      techTags: ['Laravel', 'MySQL', 'Tailwind CSS', 'REST API', 'React'],
      displayOrder: 1,
    },
    {
      id: 2,
      title: 'Web Developer & Programmer',
      organization: 'CV. Pratama Computech',
      employmentType: 'Intern',
      location: 'Jombang, Jawa Timur',
      startDate: 'Dec 2024',
      endDate: 'Mar 2025',
      isCurrent: false,
      logoUrl: null, // Siap diisi misal: '/images/logos/pratama-computech.png'
      description:
        '<ul><li>Mengembangkan aplikasi Event Organizer dan sistem pemesanan tiket berbasis web menggunakan PHP, Laravel, Bootstrap, dan MySQL, dengan fokus pada kemudahan penggunaan serta efisiensi pengelolaan data.</li><li>Merancang dan mengimplementasikan berbagai fitur, seperti manajemen event, registrasi peserta, pemesanan tiket, validasi pembayaran, dashboard admin, serta pengelolaan data pengguna untuk mendukung operasional penyelenggaraan acara.</li><li>Memastikan aplikasi berjalan dengan baik melalui proses pengujian, perbaikan bug, optimasi performa, serta pemeliharaan sistem agar memberikan pengalaman pengguna yang optimal dan mendukung kebutuhan penyelenggara maupun peserta acara.</li></ul>',
      techTags: ['PHP', 'MySQL', 'Bootstrap', 'Laravel'],
      displayOrder: 2,
    },
  ],

  categories: categoriesData,

  projects: [
    {
      id: 19,
      title: 'Website Portofolio',
      slug: 'website-portofolio',
      categoryId: 6,
      category: categoryById.get(6)!,
      shortDescription:
        'Website portofolio pribadi yang dirancang untuk menampilkan profil, pengalaman, pendidikan, keterampilan, serta kumpulan proyek secara profesional dalam satu platform digital.',
      fullDescription:
        '<h2>Website Portofolio Pribadi</h2><p>Website portofolio pribadi ini merupakan platform digital yang dikembangkan sebagai media untuk memperkenalkan diri, menampilkan perjalanan akademik dan profesional, serta mendokumentasikan berbagai proyek yang telah dikerjakan.</p><p>Website ini dirancang dengan tampilan yang modern, responsif, dan intuitif agar pengunjung dapat dengan mudah mengenal profil, melihat pengalaman, memahami keterampilan yang dimiliki, serta mengeksplorasi hasil karya yang telah dikembangkan.</p><p>Selain berfungsi sebagai media personal branding, website ini juga menjadi sarana untuk membangun identitas profesional di dunia digital dan mempermudah pihak lain dalam mengenal kompetensi, pengalaman, serta potensi yang dimiliki.</p>',
      problemSolved:
        '<p>Informasi mengenai profil, pengalaman, keterampilan, dan hasil proyek sering kali tersebar di berbagai platform sehingga sulit untuk disajikan secara terstruktur dan profesional. Website portofolio pribadi ini hadir sebagai solusi untuk mengintegrasikan seluruh informasi tersebut ke dalam satu platform yang mudah diakses, sehingga memudahkan recruiter, klien, maupun kolaborator dalam mengenal kompetensi dan hasil karya secara lebih menyeluruh.</p>',
      keyFeatures: [],
      role: 'Mengembangkan website portofolio pribadi, mulai dari desain UI, implementasi fitur, hingga CMS untuk mengelola konten. Memastikan website responsif, intuitif, dan profesional.',
      techTags: ['Node.js', 'Next.js', 'Express.js', 'MySQL', 'TypeScript'],
      thumbnailUrl: '/images/projects/website-portofolio.jpg',
      demoUrl: null,
      githubUrl: null,
      year: 2026,
      isPublished: true,
      isFeatured: false,
      displayOrder: 0,
      techStacks: pickTechs(4, 5, 7, 11, 12, 13, 15),
    },
    {
      id: 2,
      title: 'Sistem Manajemen Penjualan Emas',
      slug: 'sistem-manajemen-penjualan-emas',
      categoryId: 1,
      category: categoryById.get(1)!,
      shortDescription:
        'Aplikasi web khusus pengelolaan penjualan emas, penetapan harga jual harian per kadar, pencatatan stok, dan grafik laporan transaksi.',
      fullDescription:
        'Aplikasi web terstruktur untuk operasional penjualan emas yang berfokus pada pengelolaan stok perhiasan, penetapan harga jual harian berdasarkan kadar kemurnian (karat), pencatatan transaksi penjualan kasir, serta grafik laporan penjualan ritel.',
      problemSolved:
        '<p>Toko perhiasan emas memerlukan penetapan harga jual per gram yang akurat sesuai kadar kemurnian dan presisi berat desimal agar proses transaksi penjualan berlangsung cepat dan tercatat rapi.</p>',
      keyFeatures: [
        {
          title: 'Indeks Harga Jual Harian',
          description:
            'Pemetaan harga jual emas per gram terhadap matriks kadar kemurnian (18K, 22K, 24K).',
        },
        {
          title: 'Kalkulator Harga Penjualan',
          description:
            'Perhitungan total harga jual otomatis berdasarkan berat gram, kadar kemurnian, dan tarif harga harian.',
        },
        {
          title: 'Inventori & SKU Perhiasan',
          description:
            'Manajemen stok item perhiasan lengkap dengan catatan berat, kadar, dan ketersediaan etalase.',
        },
        {
          title: 'Laporan & Grafik Penjualan',
          description: 'Visualisasi tren omzet penjualan dan pencatatan riwayat nota penjualan toko.',
        },
      ],
      role: 'Full-Stack Developer: Membangun aplikasi Laravel + Inertia.js & React.js dengan Shadcn UI, Chart.js untuk laporan penjualan, serta presisi desimal pada database MySQL.',
      techTags: ['Laravel', 'Inertia.js', 'React.js', 'MySQL', 'Tailwind CSS', 'Chart.js', 'Shadcn UI'],
      thumbnailUrl: '/images/projects/sistem-manajemen-penjualan-emas.jpg',
      demoUrl: null,
      githubUrl: null,
      year: 2026,
      isPublished: true,
      isFeatured: true,
      displayOrder: 2,
      techStacks: pickTechs(5, 6, 10, 14, 20, 21, 22),
    },
    {
      id: 3,
      title: 'Event Organizer Management System',
      slug: 'event-organizer-management-system',
      categoryId: 3,
      category: categoryById.get(3)!,
      shortDescription:
        'Sistem manajemen berbasis web untuk mengatur logistik acara, koordinasi vendor, dan pelacakan jadwal rundown.',
      fullDescription:
        'Platform terpusat untuk mengelola logistik acara multi-tahap, jadwal rundown tim lapangan, keluar-masuk perlengkapan acara, komunikasi klien, serta pelacakan anggaran vendor.',
      problemSolved:
        'Koordinasi yang tersebar antara tim venue, vendor dekorasi, tim audio, dan klien kerap memicu bentrok jadwal serta hilangnya perlengkapan acara.',
      keyFeatures: [
        {
          title: 'Pusat Koordinasi Vendor',
          description:
            'Pencatatan kontrak vendor, tenggat pengiriman, dan direktori kontak dalam satu tempat.',
        },
        {
          title: 'Timeline Rundown',
          description: 'Jadwal rundown interaktif dengan penanda progres pelaksanaan acara.',
        },
        {
          title: 'Checkout Aset Acara',
          description:
            'Pencatatan keluar-masuk perlengkapan berbasis kode barang untuk mencegah kehilangan aset.',
        },
        {
          title: 'Pemantau Anggaran',
          description: 'Perbandingan antara estimasi anggaran klien dan realisasi biaya vendor.',
        },
      ],
      role: 'Backend & System Architect: Merancang struktur database, hierarki izin pengguna, dan modul pembuatan rundown acara.',
      techTags: ['PHP', 'MySQL', 'Bootstrap', 'jQuery'],
      thumbnailUrl: '/images/projects/event-organizer-management-system.jpg',
      demoUrl: null,
      githubUrl: null,
      year: null,
      isPublished: true,
      isFeatured: false,
      displayOrder: 3,
      techStacks: pickTechs(8, 9, 14),
    },
    {
      id: 4,
      title: 'Sistem Penilaian Asesmen Multiliterasi',
      slug: 'sistem-penilaian-asesmen-multiliterasi',
      categoryId: 4,
      category: categoryById.get(4)!,
      shortDescription:
        'Aplikasi web untuk mengevaluasi dan memantau kompetensi literasi peserta didik melalui parameter penilaian terstruktur.',
      fullDescription:
        'Sistem evaluasi akademik untuk mengukur kemampuan membaca, pemahaman konteks, dan sintesis informasi digital menggunakan rubrik multi-kriteria lengkap dengan grafik perkembangan dan ekspor laporan PDF.',
      problemSolved:
        '<p>Asesmen konvensional sering hanya mengandalkan pilihan ganda satu dimensi sehingga belum mampu mengevaluasi pemahaman konteks dan literasi media secara menyeluruh.</p>',
      keyFeatures: [
        {
          title: 'Rubrik Multi-Kriteria',
          description:
            'Matriks penilaian terkonfigurasi untuk mengukur berpikir kritis dan pemahaman bacaan.',
        },
        {
          title: 'Analitik Kelompok',
          description: 'Grafik perbandingan capaian individu terhadap standar rata-rata kelas.',
        },
        {
          title: 'Umpan Balik Otomatis',
          description:
            'Ringkasan diagnostik untuk menandai aspek literasi yang perlu pendampingan.',
        },
        {
          title: 'Ekspor Laporan PDF',
          description: 'Pencetakan laporan hasil evaluasi untuk guru dan pembimbing akademik.',
        },
      ],
      role: 'Full-Stack Developer: Membangun antarmuka asesmen dan komponen evaluasi dengan Inertia React, Tailwind CSS, Shadcn UI, visualisasi grafik Chart.js, serta backend Laravel & MySQL.',
      techTags: ['Laravel', 'Inertia.js', 'React.js', 'MySQL', 'Tailwind CSS', 'Chart.js', 'Shadcn UI'],
      thumbnailUrl: '/images/projects/sistem-penilaian-multiliterasi-sains.jpg',
      demoUrl: null,
      githubUrl: null,
      year: 2026,
      isPublished: true,
      isFeatured: false,
      displayOrder: 4,
      techStacks: pickTechs(5, 6, 10, 14, 20, 21, 22),
    },
    {
      id: 5,
      title: 'Event Ticket Booking System',
      slug: 'event-ticket-booking-system',
      categoryId: 5,
      category: categoryById.get(5)!,
      shortDescription:
        'Aplikasi pemesanan tiket berbasis web dengan katalog acara, registrasi peserta, simulasi pembayaran, dan check-in QR.',
      fullDescription:
        'Platform tiket acara interaktif yang menampilkan katalog acara, ketersediaan kategori tiket secara real-time, pembuatan tiket QR unik terverifikasi, pemindai pintu masuk, serta distribusi e-ticket.',
      problemSolved:
        '<p>Pendaftaran acara tanpa validasi kuota dan tiket fisik rawan menimbulkan duplikasi pemesanan serta antrean panjang saat proses check-in peserta.</p>',
      keyFeatures: [
        {
          title: 'Katalog Kuota Dinamis',
          description:
            'Penghitungan sisa kuota tiket secara langsung untuk mencegah pemesanan ganda.',
        },
        {
          title: 'Tiket QR Unik',
          description:
            'Pembuatan kode QR bertanda tangan kriptografis untuk setiap peserta terdaftar.',
        },
        {
          title: 'Pemindai Check-In Cepat',
          description: 'Tampilan pemindai QR berbasis kamera untuk validasi tiket di pintu masuk.',
        },
        {
          title: 'Simulasi Transaksi',
          description: 'Pemrosesan status pembayaran dan pembuatan e-ticket otomatis.',
        },
      ],
      role: 'Frontend & API Developer: Membangun antarmuka pemesanan interaktif dengan React serta integrasi RESTful API dengan Laravel.',
      techTags: ['React', 'Laravel', 'MySQL', 'Tailwind CSS'],
      thumbnailUrl: '/images/projects/event-ticket-booking-system.jpg',
      demoUrl: null,
      githubUrl: null,
      year: null,
      isPublished: true,
      isFeatured: true,
      displayOrder: 5,
      techStacks: pickTechs(10, 14),
    },
    {
      id: 6,
      title: 'Website Company Profile',
      slug: 'company-profile-website',
      categoryId: 6,
      category: categoryById.get(6)!,
      shortDescription:
        'Website company profile full-stack dilengkapi CMS admin dinamis untuk mengatur struktur navbar, halaman custom, konten, dan isi layanan perusahaan.',
      fullDescription:
        '<p>Aplikasi web company profile full-stack yang dibangun dengan CMS terintegrasi agar administrator dapat menambah, mengubah, dan menata halaman secara fleksibel, termasuk kustomisasi menu navbar, susunan konten section, dan seluruh isi halaman tanpa menyentuh kode.</p>',
      problemSolved:
        '<p>Company profile statis menyulitkan tim internal saat perlu menambah halaman baru, memperbarui isi layanan, atau mengubah susunan navigasi dengan cepat.</p>',
      keyFeatures: [
        {
          title: 'CMS Manajemen Konten',
          description:
            'Panel admin terstruktur untuk mengelola dan memperbarui seluruh konten halaman secara mandiri.',
        },
        {
          title: 'Kustomisasi Navbar & Halaman',
          description:
            'Administrator dapat menambah halaman baru serta mengatur menu dan urutan tautan navbar.',
        },
        {
          title: 'Katalog Layanan & Profil',
          description: 'Penyajian profil perusahaan, layanan unggulan, dan visual statistik interaktif.',
        },
        {
          title: 'Formulir Prospek Klien',
          description: 'Formulir pertanyaan tervalidasi yang tersimpan rapi ke database admin.',
        },
      ],
      role: 'Full-Stack Web Developer: Merancang arsitektur CMS Laravel + Inertia.js & React.js dengan Shadcn UI, Chart.js, Tailwind CSS, dan database MySQL untuk kustomisasi navbar, halaman, dan konten.',
      techTags: ['Laravel', 'Inertia.js', 'React.js', 'MySQL', 'Tailwind CSS', 'Chart.js', 'Shadcn UI'],
      thumbnailUrl: '/images/projects/website-company-profile.jpg',
      demoUrl: null,
      githubUrl: null,
      year: null,
      isPublished: true,
      isFeatured: false,
      displayOrder: 6,
      techStacks: pickTechs(5, 6, 10, 14, 20, 21, 22),
    },
    {
      id: 7,
      title: 'Sistem Pembuka Gerbang Otomatis Berbasis IoT Menggunakan ESP8266',
      slug: 'sistem-pembuka-gerbang-otomatis-berbasis-iot-menggunakan-esp8266',
      categoryId: 7,
      category: categoryById.get(7)!,
      shortDescription:
        'Sistem kendali gerbang rumah bermotor dinamo berbasis ESP8266 yang dapat dibuka dan ditutup melalui website maupun remote inframerah (IR).',
      fullDescription:
        '<p>Sistem otomasi gerbang rumah yang menggerakkan motor dinamo melalui mikrokontroler ESP8266, terintegrasi dengan aplikasi web untuk perintah buka dan tutup gerbang serta kendali remote inframerah (IR) secara langsung.</p>',
      problemSolved:
        '<p>Membuka dan menutup gerbang rumah secara manual memakan waktu saat berkendara atau hujan, sehingga dibutuhkan kendali ganda yang praktis melalui website maupun remote inframerah.</p>',
      keyFeatures: [
        {
          title: 'Penggerak Motor Dinamo & ESP8266',
          description:
            'ESP8266 mengendalikan motor dinamo pengerak gerbang rumah secara stabil melalui Wi-Fi.',
        },
        {
          title: 'Kontrol Buka & Tutup via Web',
          description:
            'Antarmuka web responsif bagi penghuni untuk mengirim perintah buka dan tutup gerbang dari browser.',
        },
        {
          title: 'Kendali Remote Inframerah (IR)',
          description:
            'Dukungan kontrol fisik menggunakan remote IR sebagai pengendali langsung di sekitar rumah.',
        },
        {
          title: 'Integrasi API PHP & MySQL',
          description:
            'Komunikasi endpoint API antara modul ESP8266 dan server PHP/MySQL untuk sinkronisasi perintah kendali.',
        },
      ],
      role: 'IoT & Full-Stack Web Programmer: Memprogram ESP8266 di Arduino IDE untuk kontrol motor dinamo & sensor IR serta membangun web kendali buka-tutup gerbang dengan PHP, API, HTML, CSS, dan MySQL.',
      techTags: ['Arduino IDE', 'ESP8266', 'PHP', 'HTML', 'CSS', 'API', 'MySQL'],
      thumbnailUrl: '/images/projects/sistem-pembuka-gerbang-otomatis-esp8266.jpg',
      demoUrl: null,
      githubUrl: null,
      year: 2025,
      isPublished: true,
      isFeatured: false,
      displayOrder: 7,
      techStacks: pickTechs(1, 2, 9, 13, 14, 19),
    },
  ],

  certificates: [
    {
      id: 1,
      title: 'Belajar Dasar Pemrograman Web',
      issuer: 'Dicoding Indonesia',
      credentialNumber: 'MEPJMQM36P3V',
      issuedAt: 'Nov 2026',
      expiresAt: null,
      credentialUrl: null,
      imageUrl: '/images/certificates/dicoding-pemrograman-web.jpg',
      skills: ['HTML', 'CSS', 'Web Development'],
      description:
        'Sertifikasi kompetensi kelulusan dasar pemrograman web yang mencakup HTML semantik, CSS Flexbox/Grid, serta struktur tampilan responsif.',
      category: 'Web Development',
      displayOrder: 1,
    },
    {
      id: 2,
      title: 'Python Fundamental for Data Science',
      issuer: 'DQLab',
      credentialNumber: '#DQLABINTP1QWGVQU',
      issuedAt: 'Nov 2026',
      expiresAt: null,
      credentialUrl: null,
      imageUrl: '/images/certificates/dqlab-python.jpg',
      skills: ['Python (Programming Language)'],
      description:
        'Sertifikasi fundamental pemrograman Python untuk pengolahan data, struktur kontrol, fungsi dasar, dan eksplorasi dataset awal.',
      category: 'Data Science',
      displayOrder: 2,
    },
    {
      id: 3,
      title: 'Ahli K3 Umum Kemnaker',
      issuer: 'Kementerian Ketenagakerjaan Republik Indonesia',
      credentialNumber: null,
      issuedAt: 'Sep 2026',
      expiresAt: null,
      credentialUrl: null,
      imageUrl: '/images/certificates/k3-kemnaker.jpg',
      skills: ['Keselamatan dan Kesehatan Kerja (K3)'],
      description:
        'Sertifikasi kompetensi Ahli Keselamatan dan Kesehatan Kerja (K3) Umum dari Kementerian Ketenagakerjaan Republik Indonesia.',
      category: 'Sertifikasi Profesi',
      displayOrder: 3,
    },
  ],

  skills: [
    {
      id: 1,
      name: 'Full-Stack Web Developer',
      category: 'Engineering Inti',
      proficiencyLabel: 'Core Focus',
      displayOrder: 1,
    },
    {
      id: 2,
      name: 'PHP & Laravel Architecture',
      category: 'Backend Engineering',
      proficiencyLabel: null,
      displayOrder: 2,
    },
    {
      id: 3,
      name: 'REST API dengan Node.js & Express',
      category: 'Backend Engineering',
      proficiencyLabel: 'Pengalaman Produksi',
      displayOrder: 3,
    },
    {
      id: 4,
      name: 'React.js, Next.js & TypeScript',
      category: 'Frontend Engineering',
      proficiencyLabel: 'Pengalaman Produksi',
      displayOrder: 4,
    },
    {
      id: 5,
      name: 'Perancangan Database Relasional (MySQL)',
      category: 'Database & Data',
      proficiencyLabel: 'Fokus Utama',
      displayOrder: 5,
    },
    {
      id: 6,
      name: 'Tailwind CSS & Antarmuka Responsif',
      category: 'Frontend Engineering',
      proficiencyLabel: 'Pengalaman Produksi',
      displayOrder: 6,
    },
    {
      id: 8,
      name: 'Integrasi Web & IoT ESP8266',
      category: 'Hardware & IoT',
      proficiencyLabel: 'Pengalaman Proyek',
      displayOrder: 7,
    },
  ],

  techStacks: techStacksData,

  contact: {
    email: 'iqballaprilianto@gmail.com',
    whatsapp: '08560867100',
    githubUrl: null,
    linkedinUrl: null,
    instagramUrl: null,
    location: 'Indonesia',
    additionalInfo:
      'Punya ide proyek, peluang kolaborasi, atau ingin berdiskusi mengenai pengembangan aplikasi web? Silakan hubungi saya melalui formulir ini atau kanal komunikasi yang tersedia.',
  },

  settings: {
    siteTitle: 'Muchammad Iqbal Aprilianto | Full-Stack Web Developer',
    siteDescription:
      'Portofolio resmi Muchammad Iqbal Aprilianto, Full-Stack Web Developer dan Programmer yang berfokus pada pengembangan aplikasi web modern menggunakan Next.js, TypeScript, Laravel, Node.js, dan MySQL.',
    siteKeywords: [
      'Muchammad Iqbal Aprilianto',
      'Full-Stack Web Developer',
      'Web Developer',
      'Programmer',
      'Software Developer',
      'Next.js',
      'Laravel',
      'MySQL',
    ],
    footerText: '© 2026 Muchammad Iqbal Aprilianto. Seluruh Hak Cipta Dilindungi.',
    heroCtaPrimaryLabel: 'Lihat Karya Saya',
    heroCtaSecondaryLabel: 'Hubungi Saya',
    contactSectionTitle: 'Mari Bangun Solusi Bersama.',
    contactSectionSubtitle:
      'Punya ide proyek, peluang kolaborasi, atau ingin berdiskusi mengenai pengembangan aplikasi web? Kirimkan pesan melalui formulir di bawah ini.',
  },
};
