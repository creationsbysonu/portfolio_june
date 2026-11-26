// Recruiter briefs, keyed by the application number printed on the interview invite.
// To add a new interview, copy an entry, change the number and the role details.

export type ApplicationDocument = {
  kind: string
  title: string
  detail: string
  file: string
  meta: string
}

export type ApplicationWork = {
  title: string
  detail: string
  tags: string[]
  href?: string
  hrefLabel?: string
}

export type ApplicationProfile = {
  number: string
  company: string
  role: string
  location: string
  interviewedOn: string
  statusLabel: string
  summary: string
  focusTags: string[]
  fitPoints: { title: string; detail: string }[]
  aiPoints: { title: string; detail: string }[]
  documents: ApplicationDocument[]
  work: ApplicationWork[]
}

export const applications: Record<string, ApplicationProfile> = {
  '922497': {
    number: '922497',
    company: 'Mahalaxmi Bikas Bank',
    role: 'System Support — Senior Assistant',
    location: 'Nepal',
    interviewedOn: 'November 26, 2026',
    statusLabel: 'Interviewed',
    summary:
      'Application number 922497 is the brief I promised the panel: the support and implementation work I do day to day, plus the AI/ML research behind the systems I build. Everything below is drawn from the resume and the two attached PDFs — no filler.',
    focusTags: [
      'System implementation & support',
      'End-user training',
      'Troubleshooting live operations',
      'SQL & reporting',
      'AI/ML engineering',
    ],
    fitPoints: [
      {
        title: 'Supporting real users, not just tickets',
        detail:
          'As IT Lead at St. Joseph School I ran IT infrastructure and digital platform operations for 1,500+ students, training and supporting 70–75 staff members on new web-based tools and resolving their technical queries daily.',
      },
      {
        title: 'Implementation that survives go-live',
        detail:
          'Over 10+ freelance client applications I owned delivery end to end — requirements, rollout, post-launch support and user training — so teams could run their own dashboards after handover.',
      },
      {
        title: 'Measurable operational improvement',
        detail:
          'Built automated reporting workflows at St. Joseph that saved more than 10 hours of manual operational work every week, and maintained the digital asset trackers and databases behind those reports.',
      },
      {
        title: 'Reporting and data discipline',
        detail:
          'Comfortable with MS Excel, Word and Google Slides for summary reporting, and with SQL/MySQL, MongoDB and PHP for the systems underneath — including a pharmacy DBMS where I handled implementation, end-user training and reporting fixes.',
      },
      {
        title: 'Engineering background for escalations',
        detail:
          'BE Computer Engineering, IOE Purwanchal Campus (First Division, 69.74%), and a Nepal Engineering Council registered Computer Engineer — Reg. No. 102745.',
      },
    ],
    aiPoints: [
      {
        title: 'Vision Transformer retrieval at scale',
        detail:
          'Major project: an image-based product retrieval system for e-commerce using ViT, fine-tuned on 100,000+ product images for content-based search — the full report is attached below.',
      },
      {
        title: 'PatchLake research paper',
        detail:
          'Single-author paper on a patch-columnar lakehouse format and zero-copy pushdown engine for low-latency ViT ingestion: 4.45× throughput over WebDataset baselines (1,187.45 vs 266.98 img/sec) and 75.6% smaller tensor storage on COCO 2017, as reported in the paper.',
      },
      {
        title: 'Applied NLP and speech',
        detail:
          'Multilingual RAG question answering for Hindi and Nepali, and a stutter detection system for regional-language speech.',
      },
    ],
    documents: [
      {
        kind: 'Research paper',
        title: 'PatchLake: A Native Patch-Columnar Lakehouse Format and Zero-Copy Pushdown Engine',
        detail:
          'Single author. Columnar formats for ViT patch tensors on Apache Arrow IPC, with DuckDB metadata pushdown and zero-copy slicing — evaluated on COCO 2017.',
        file: '/pdf_files/patchlake-paper.pdf',
        meta: 'Sonu Kumar Gupta · preprint manuscript',
      },
      {
        kind: 'Major project report',
        title: 'An Image-Based Product Retrieval System for E-Commerce Using Vision Transformer (ViT)',
        detail:
          'Final-year major project, IOE Purwanchal Campus, March 2026. Team of four: Nigam Yadav, Sagar Katuwal, Sonu Kumar Gupta, Suvash Giri.',
        file: '/pdf_files/major-project-report-vit-product-retrieval.pdf',
        meta: 'Tribhuvan University · IOE Purwanchal Campus',
      },
    ],
    work: [
      {
        title: 'Pharmacia — Pharmacy Management System',
        detail:
          'Multi-tenant pharmacy platform covering inventory, suppliers, purchases, sales and reporting. This is the closest match to branch-level system support: implementation, user training and troubleshooting reporting issues.',
        tags: ['React', 'Node.js', 'MySQL'],
        href: 'https://pharmacy-management-system-seven-sable.vercel.app/',
        hrefLabel: 'Open live system ↗',
      },
      {
        title: 'Mero Pasal — E-Commerce Nepal',
        detail:
          'Full marketplace with catalog, coupons and order flow — the production side of the retrieval research.',
        tags: ['React', 'Node.js', 'MongoDB'],
        href: 'https://ecommerce-nepal-five.vercel.app/',
        hrefLabel: 'Open live site ↗',
      },
      {
        title: 'Bajeko Chiya Pasal — Nepali Music Radio',
        detail:
          'A small, fast product built end to end: 300+ songs across ten themed stations, streamed through official embeds.',
        tags: ['React', 'TypeScript', 'Vite'],
        href: 'https://bajeko-chiya-pasal.vercel.app/',
        hrefLabel: 'Open live site ↗',
      },
      {
        title: 'AI-Powered Visual Search (e-Pasal)',
        detail:
          'The applied half of the ViT report: image-based product search with deep feature embeddings for accurate content-based retrieval.',
        tags: ['ViT', 'Python', 'FastAPI'],
        href: '/pdf_files/major-project-report-vit-product-retrieval.pdf',
        hrefLabel: 'Read the report ↗',
      },
    ],
  },
}

export const findApplication = (rawNumber: string) => {
  const number = rawNumber.replace(/[^0-9]/g, '')
  return number ? applications[number] : undefined
}
