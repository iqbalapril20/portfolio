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
    name: 'ESP8266 / C++',
    category: 'TOOLS',
    iconUrl: 'https://api.iconify.design/devicon/arduino.svg',
    iconName: 'devicon:arduino',
    shortDescription: 'Firmware Embedded & IoT',
    displayOrder: 20,
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
        'Aplikasi web khusus pengelolaan penjualan toko emas, pencatatan kadar kemurnian, dan buku besar transaksi.',
      fullDescription:
        'Aplikasi web terstruktur untuk operasional ritel perhiasan dan toko emas yang mencakup kalibrasi harga emas harian, pencatatan kadar kemurnian (karat), kalkulasi tukar tambah / jual kembali, serta pencatatan berat presisi.',
      problemSolved:
        '<p>Ritel perhiasan emas memiliki variasi harga karat harian, presisi berat desimal dalam gram, serta potongan tukar tambah yang tidak tertangani oleh aplikasi kasir ritel biasa.</p>',
      keyFeatures: [
        {
          title: 'Indeks Kemurnian Harian',
          description:
            'Pemetaan harga emas per gram terhadap matriks kadar kemurnian (18K, 22K, 24K).',
        },
        {
          title: 'Kalkulator Tukar Tambah',
          description:
            'Perhitungan nilai buyback dan penukaran barang secara dinamis sesuai kondisi.',
        },
        {
          title: 'Registri Sertifikat',
          description:
            'Penyimpanan digital catatan keaslian emas yang terhubung langsung ke SKU stok.',
        },
        {
          title: 'Buku Besar Keuangan',
          description: 'Pemisahan pencatatan nilai logam murni dan biaya ongkos pembuatan.',
        },
      ],
      role: 'Full-Stack Developer: Merancang mesin kalkulasi harga di frontend serta menjamin presisi desimal pada transaksi database backend.',
      techTags: ['Laravel', 'MySQL', 'JavaScript', 'Tailwind CSS'],
      thumbnailUrl: '/images/projects/sistem-manajemen-penjualan-emas.jpg',
      demoUrl: null,
      githubUrl: null,
      year: 2026,
      isPublished: true,
      isFeatured: true,
      displayOrder: 2,
      techStacks: pickTechs(3, 4, 5, 6, 10, 14),
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
      role: 'Web Developer: Membangun antarmuka pengisian asesmen, dasbor skor responsif dengan Tailwind CSS, serta normalisasi data.',
      techTags: ['Laravel', 'Tailwind CSS', 'MySQL', 'Chart.js'],
      thumbnailUrl: '/images/projects/sistem-penilaian-multiliterasi-sains.jpg',
      demoUrl: null,
      githubUrl: null,
      year: 2026,
      isPublished: true,
      isFeatured: false,
      displayOrder: 4,
      techStacks: pickTechs(4, 5, 6, 10, 14, 20),
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
        'Website profil perusahaan profesional untuk menampilkan identitas brand, katalog layanan, dan formulir permintaan klien.',
      fullDescription:
        '<p>Website profil perusahaan yang dibangun dengan HTML semantik, tipografi responsif, katalog layanan terstruktur, dan formulir pertanyaan calon klien yang tervalidasi.</p>',
      problemSolved:
        '<p>Website perusahaan yang lambat dan sulit diakses dari perangkat mobile dapat menurunkan kepercayaan calon klien komersial.</p>',
      keyFeatures: [
        {
          title: 'Performa Ringan',
          description:
            'Aset halaman dioptimalkan agar tampil cepat di perangkat mobile maupun desktop.',
        },
        {
          title: 'Tata Letak Responsif',
          description: 'Hierarki tipografi dan grid adaptif di berbagai ukuran layar.',
        },
        {
          title: 'Formulir Prospek Klien',
          description: 'Formulir pertanyaan tervalidasi dengan proteksi spam dasar.',
        },
        {
          title: 'Katalog Layanan',
          description: 'Penyajian ringkas layanan perusahaan beserta catatan studi kasus.',
        },
      ],
      role: 'Frontend Engineer: Menyusun komponen HTML semantik modular dan styling responsif menggunakan Tailwind CSS.',
      techTags: ['HTML5', 'Tailwind CSS', 'JavaScript'],
      thumbnailUrl: '/images/projects/website-company-profile.jpg',
      demoUrl: null,
      githubUrl: null,
      year: null,
      isPublished: true,
      isFeatured: false,
      displayOrder: 6,
      techStacks: pickTechs(1, 3, 5, 6, 10, 20),
    },
    {
      id: 7,
      title: 'Sistem Pembuka Gerbang Otomatis Berbasis IoT Menggunakan ESP8266',
      slug: 'sistem-pembuka-gerbang-otomatis-berbasis-iot-menggunakan-esp8266',
      categoryId: 7,
      category: categoryById.get(7)!,
      shortDescription:
        'Sistem gerbang otomatis berbasis IoT menggunakan mikrokontroler ESP8266 dengan portal kontrol web dan cadangan remote IR.',
      fullDescription:
        '<p>Sistem palang gerbang otomatis yang menghubungkan mikrokontroler ESP8266 ke portal web lokal terautentikasi, dilengkapi kendali cadangan inframerah (IR) dan pencatatan riwayat akses.</p>',
      problemSolved:
        '<p>Pengoperasian gerbang secara manual memperlambat akses keluar-masuk kendaraan dan tidak meninggalkan catatan riwayat buka-tutup yang teraudit.</p>',
      keyFeatures: [
        {
          title: 'Telemetri Mikrokontroler',
          description:
            'ESP8266 menggerakkan aktuator servo melalui jaringan Wi-Fi dengan respons cepat.',
        },
        {
          title: 'Portal Web Terautentikasi',
          description:
            'Panel kontrol berbasis browser bagi petugas berwenang untuk membuka atau mengunci gerbang.',
        },
        {
          title: 'Cadangan Remote IR',
          description:
            'Mekanisme remote inframerah sebagai jalur kontrol darurat saat jaringan offline.',
        },
        {
          title: 'Riwayat Log Akses',
          description: 'Pencatatan waktu buka dan tutup gerbang ke dalam daftar log terpusat.',
        },
      ],
      role: 'IoT & Embedded Web Programmer: Menulis firmware C++ untuk ESP8266 serta membangun antarmuka kontrol HTTP ringan.',
      techTags: ['ESP8266', 'C++', 'HTML/CSS', 'WebSockets'],
      thumbnailUrl: '/images/projects/sistem-pembuka-gerbang-otomatis-esp8266.jpg',
      demoUrl: null,
      githubUrl: null,
      year: 2025,
      isPublished: true,
      isFeatured: false,
      displayOrder: 7,
      techStacks: pickTechs(1, 2, 9, 19),
    },
  ],

  certificates: [
    {
      id: 1,
      title: 'Understanding Data Science',
      issuer: 'DataCamp',
      credentialNumber: 'DC-884920',
      issuedAt: null,
      expiresAt: null,
      credentialUrl: null,
      description:
        'Sertifikasi pengenalan dasar rekayasa data, pemodelan statistik dasar, kerangka visualisasi, serta pengambilan keputusan berbasis data.',
      category: 'Data Science',
      displayOrder: 1,
    },
    {
      id: 2,
      title: 'Full-Stack Web Development',
      issuer: 'Engineering Academy',
      credentialNumber: null,
      issuedAt: null,
      expiresAt: null,
      credentialUrl: null,
      description:
        'Kurikulum yang berfokus pada pola arsitektur aplikasi PHP/Laravel, manajemen sesi aman, arsitektur MVC, dan penyediaan layanan RESTful API.',
      category: 'Web Development',
      displayOrder: 2,
    },
    {
      id: 3,
      title: 'Database Administration Fundamentals',
      issuer: 'Technical Institute',
      credentialNumber: null,
      issuedAt: null,
      expiresAt: null,
      credentialUrl: null,
      description:
        'Pembelajaran mendalam mengenai normalisasi skema relasional (1NF-3NF), optimasi indeks query, isolasi transaksi, dan integritas data.',
      category: 'Database',
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
    email: 'iqbal.aprilianto@example.com',
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
