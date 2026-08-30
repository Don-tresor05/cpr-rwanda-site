/**
 * CPR Rwanda → Sanity Migration Script
 *
 * Usage:
 *   SANITY_TOKEN=sk... node migrate.mjs
 *
 * The SANITY_TOKEN must be the Editor token created in Sanity manage.
 * NEVER commit this token to git.
 */

import { createClient } from '@sanity/client'

const token = process.env.SANITY_TOKEN
if (!token) {
  console.error('Error: SANITY_TOKEN environment variable is required.')
  console.error('Run: SANITY_TOKEN=sk... node migrate.mjs')
  process.exit(1)
}

const client = createClient({
  projectId: '2bpoen39',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

// Helper: convert plain text to Sanity Portable Text blocks
function toBlocks(text) {
  return text.split('\n').filter(p => p.trim()).map(paragraph => ({
    _type: 'block',
    _key: Math.random().toString(36).slice(2),
    style: 'normal',
    markDefs: [],
    children: [{ _type: 'span', _key: Math.random().toString(36).slice(2), marks: [], text: paragraph.trim() }],
  }))
}

// ─── NEWS POSTS ────────────────────────────────────────────────────────────────

const newsPosts = [
  {
    _id: 'newsPost-nyanza-memorial',
    _type: 'newsPost',
    title: 'CPR Staff Visit Nyanza Genocide Memorial and Support Survivor Families in Mulinja Village',
    slug: { _type: 'slug', current: 'cpr-june-2026-highlights' },
    publishedAt: '2026-07-07',
    author: 'CPR Secretariat',
    category: 'Community',
    excerpt: 'CPR staff paid tribute to victims at Nyanza Genocide Memorial in Kicukiro District and delivered targeted support to 1994 Genocide survivor families in Mulinja Village as part of annual Kwibuka 31 commemorations.',
    body: toBlocks(`Conseil Protestant du Rwanda (CPR) is the Protestant Council of Churches in Rwanda. For over twelve (12) consecutive years, conducting annual Kwibuka commemoration activities—specifically visiting and supporting families of survivors of the 1994 Genocide against the Tutsi—has remained an established annual tradition within CPR.

On the occasion of Kwibuka 31, as Rwandans commemorate the 1994 Genocide against the Tutsi, CPR staff carried out two major key activities:

1. Visiting the Nyanza Genocide Memorial of the 1994 Genocide against the Tutsi in Nyanza, Kicukiro District, to pay solemn tribute to the victims.

2. Visiting and delivering support to families of survivors of the 1994 Genocide against the Tutsi who were resettled in Mulinja Village. These 46 families have partnered with CPR and its staff in carrying out annual Kwibuka commemoration activities throughout the past 12+ years. Whenever resources allow, CPR visits these families to deliver essential support—including household supplies, food provisions, and other necessities.

On this occasion, CPR staff were joined by the General Secretary of CPR alongside the Representative of the CPR President. The delegation gathered at the Church of the Nazarene located near Gahanga Sector headquarters, meeting with all 46 survivor families resettled by Kicukiro District in Mulinja Village for a meaningful moment of fellowship, solidarity, and mutual encouragement.

"Remembering and standing alongside survivors is our continuous sacred duty. Through faith, memory, and practical support, we strengthen unity and hope."`),
  },
  {
    _id: 'newsPost-annual-convention-2026',
    _type: 'newsPost',
    title: "Inside CPR's Annual Convention on Ecumenical Cooperation",
    slug: { _type: 'slug', current: 'annual-convention-2026' },
    publishedAt: '2026-07-02',
    author: 'Ecumenical Affairs Office',
    category: 'Events',
    excerpt: "Rwanda's Protestant community is building sustainable partnerships across the country. Member churches met to align strategies for education, youth leadership, and socio-economic empowerment.",
    body: toBlocks(`The 2026 Annual Convention of the Conseil Protestant du Rwanda brought together church leaders, theologians, and community champions from across East Africa to discuss the future of ecumenical partnership.

Keynote speakers highlighted the pivotal role of Protestant institutions in driving educational excellence, healthcare access, and environmental stewardship throughout Rwanda's provinces.

Bringing together more than 300 delegates, including ministers, ambassadors, development partners, academics, and youth leaders, the Convention marked the beginning of a long-term platform for advancing practical cooperation across member churches.

The convention concluded with a solemn declaration affirming mutual cooperation, interfaith dialogue, and active participation in Rwanda's national development goals.`),
  },
  {
    _id: 'newsPost-may-highlights-2026',
    _type: 'newsPost',
    title: 'CPR May 2026 Highlights & Youth Programs',
    slug: { _type: 'slug', current: 'may-highlights-2026' },
    publishedAt: '2026-06-02',
    author: 'CPR Youth Department',
    category: 'Youth',
    excerpt: "May 2026 was a landmark month for CPR's Youth Program, rolling out peacebuilding workshops and digital skills training for over 800 young church leaders nationwide.",
    body: toBlocks(`Throughout May 2026, the CPR Youth Department conducted workshops across Western and Southern provinces, empowering young leaders with digital skills, conflict resolution tools, and entrepreneurship training.

Participants engaged in interactive seminars focused on digital evangelism, community service, and mental health awareness, preparing them to lead active initiatives within their parishes.

The success of the May youth initiatives sets the foundation for our upcoming national youth summit scheduled for later this year.

"Empowering young people with skills and faith is the highest investment we can make for Rwanda's future."`),
  },
  {
    _id: 'newsPost-kwibuka-31',
    _type: 'newsPost',
    title: 'Kwibuka 31 Memorial Commemoration at Gahini Diocese',
    slug: { _type: 'slug', current: 'kwibuka-31-commemoration' },
    publishedAt: '2025-06-28',
    author: 'Peace & Reconciliation Commission',
    category: 'Community',
    excerpt: "CPR member churches joined thousands across Rwanda to remember the 1994 Genocide against the Tutsi, reaffirming their commitment to peace, reconciliation, and 'Never Again'.",
    body: toBlocks(`As part of Kwibuka 31 commemorations, CPR leadership and member church heads gathered at the Gahini Diocese for a solemn memorial service honoring victims of the 1994 Genocide against the Tutsi.

Speakers stressed the continuous duty of Christian churches to promote truth, support survivors, and nurture genocide prevention education among younger generations.

CPR reaffirmed its pledge to support trauma healing clinics and community reconciliation dialogue groups throughout the country.

"Remembering is our sacred duty. Through memory, truth, and faith, we safeguard Rwanda's unity forever."`),
  },
  {
    _id: 'newsPost-bnep-pedagogy',
    _type: 'newsPost',
    title: 'BNEP Launches Active Pedagogy Training for 1,200 Teachers',
    slug: { _type: 'slug', current: 'bnep-active-pedagogy-training' },
    publishedAt: '2025-05-14',
    author: 'BNEP Department',
    category: 'Education',
    excerpt: "The Bureau National de l'Éducation Protestante (BNEP) officially launched an intensive training initiative for 1,200 primary and secondary school teachers serving in CPR-affiliated schools.",
    body: toBlocks(`The Bureau National de l'Éducation Protestante (BNEP) officially launched an intensive training initiative for 1,200 primary and secondary school teachers serving in CPR-affiliated schools.

The program focuses on student-centered active learning, inclusive education for children with special needs, and integrating moral ethics into STEM curricula.

With over 595 schools managed by CPR member churches, BNEP continues to elevate educational standards across the nation.

"Quality education with strong moral grounding transforms learners into compassionate leaders."`),
  },
  {
    _id: 'newsPost-community-health-2026',
    _type: 'newsPost',
    title: 'CPR Launches New Community Health Initiative Across Rwanda',
    slug: { _type: 'slug', current: 'community-health-initiative-2026' },
    publishedAt: '2026-08-29',
    author: 'CPR Secretariat',
    category: 'Health',
    excerpt: 'CPR launches a new health initiative to provide medical screenings, maternal support, and health education to over 500,000 Rwandans across all 30 districts.',
    body: toBlocks(`Conseil Protestant du Rwanda has launched a comprehensive new community health initiative targeting over 500,000 Rwandans across all 30 districts of the country.

The initiative will provide free medical screenings, maternal and child health support, and health education programs through CPR's network of member churches and partner health centers.

This program builds on CPR's long tradition of holistic community service, combining faith and practical healthcare to reach Rwanda's most vulnerable populations.`),
  },
  {
    _id: 'newsPost-trauma-counselors',
    _type: 'newsPost',
    title: 'Gender & Health Department Completes Trauma Counselor Certification',
    slug: { _type: 'slug', current: 'trauma-counselor-certification' },
    publishedAt: '2025-04-03',
    author: 'Gender & Health Department',
    category: 'Health',
    excerpt: "CPR's Gender and Health Department celebrated the graduation of 42 certified community trauma counselors following a rigorous six-month practical training program.",
    body: toBlocks(`CPR's Gender and Health Department celebrated the graduation of 42 certified community trauma counselors following a rigorous six-month practical training program.

These counselors are deployed across rural health centers and parish counseling desks to provide accessible psychosocial support, family mediation, and trauma care.

This initiative addresses mental health stigma and ensures compassionate care at the grass-roots level.

"Healing hearts and restoring mental well-being is vital for healthy families and strong communities."`),
  },
]

// ─── DEPARTMENTS ───────────────────────────────────────────────────────────────

const departments = [
  {
    _id: 'department-general-secretary',
    _type: 'department',
    name: 'General Secretary',
    slug: { _type: 'slug', current: 'general-secretary' },
    shortDescription: "The General Secretary department oversees CPR's overall institutional governance, strategic coordination, partnership development, and organizational communication.",
    description: toBlocks(`The General Secretary department serves as the administrative and coordination hub of CPR, ensuring all departments work in alignment with CPR's mission and vision.

Key responsibilities include institutional communication and partnership development with local and international organizations, oversight of annual reporting, audits, and organizational performance.`),
    order: 1,
  },
  {
    _id: 'department-bnep',
    _type: 'department',
    name: 'Education / BNEP',
    slug: { _type: 'slug', current: 'education-bnep' },
    shortDescription: "BNEP is the education arm of CPR, overseeing 595+ Protestant primary and secondary schools across Rwanda, shaping the future of Rwanda's children through quality faith-based education.",
    description: toBlocks(`The Bureau National de l'Éducation Protestante (BNEP) oversees Protestant primary and secondary schools across Rwanda. With 595+ primary schools and hundreds of secondary institutions, BNEP shapes the future of Rwanda's children through quality faith-based education.

Programs include: Participatory Active Pedagogy (PAP) training for teachers, development of Protestant religious education curriculum, school inspection and quality assurance, early childhood education programs, and partnerships with REB, UNICEF, and international education donors.

Key stats: 595+ primary schools, 300,000+ students reached, 1,200+ teachers trained.`),
    order: 2,
  },
  {
    _id: 'department-diakonia',
    _type: 'department',
    name: 'Diakonia / Development',
    slug: { _type: 'slug', current: 'diakonia-development' },
    shortDescription: "The Diakonia department coordinates CPR's social services, humanitarian relief, and sustainable development initiatives, serving the most vulnerable communities.",
    description: toBlocks(`The Diakonia department coordinates CPR's social services, humanitarian relief, and sustainable development initiatives. It serves the most vulnerable communities through holistic programs that combine faith, practical support, and long-term empowerment.

Programs include: Emergency humanitarian relief and disaster response, community development focusing on sustainable livelihoods, psychotraumatology and trauma healing, WASH initiatives in rural communities, capacity building for church leaders, and partnerships with Bread for the World, FECCLAHA, and local NGOs.`),
    order: 3,
  },
  {
    _id: 'department-finance',
    _type: 'department',
    name: 'Finance & Mobilization',
    slug: { _type: 'slug', current: 'finance-mobilization' },
    shortDescription: "The Finance department ensures CPR's institutional sustainability through transparent financial administration, strategic resource mobilization, and rigorous oversight.",
    description: toBlocks(`The Finance department ensures CPR's institutional sustainability through transparent financial administration, strategic resource mobilization, and rigorous oversight. It manages budgets, donor funds, and internal controls across all departments.

Services include: Budget preparation and financial reporting, donor fund management and grant compliance, internal audit and risk management, and resource mobilization strategies.`),
    order: 4,
  },
  {
    _id: 'department-youth',
    _type: 'department',
    name: 'Youth Program',
    slug: { _type: 'slug', current: 'youth-program' },
    shortDescription: 'The Youth Program department empowers young church leaders with digital skills, conflict resolution tools, and entrepreneurship training across Rwanda.',
    description: toBlocks(`The Youth Program department empowers Rwanda's Protestant youth to become leaders in their communities through faith-based formation and practical skills training.

Programs include: Annual Youth Peace and Reconciliation Summits, leadership development camps, digital evangelism training, anti-trauma clubs in schools, inter-church sports and cultural exchange, and scholarship and mentorship programs.`),
    order: 5,
  },
  {
    _id: 'department-gender',
    _type: 'department',
    name: 'Gender Promotion',
    slug: { _type: 'slug', current: 'gender-promotion' },
    shortDescription: "The Gender Promotion department champions gender equality, women's empowerment, and the fight against GBV across CPR member churches and communities.",
    description: toBlocks(`The Gender Promotion department champions gender equality, women's empowerment, and the fight against gender-based violence (GBV) across CPR member churches and communities.

Programs include: Gender mainstreaming across all CPR departments, GBV prevention and response training, economic empowerment programs for women (savings groups, cooperatives, microfinance), maternal health education, and women's leadership development.`),
    order: 6,
  },
  {
    _id: 'department-radio',
    _type: 'department',
    name: 'Radio Inkoramutima',
    slug: { _type: 'slug', current: 'radio-inkoramutima' },
    shortDescription: 'Radio Inkoramutima 107.1 FM — the official voice of the Protestant Council of Rwanda, reaching communities across Rwanda with messages of faith, unity, and holistic development.',
    description: toBlocks(`Radio Inkoramutima 107.1 FM is the official voice of the Protestant Council of Rwanda. Broadcasting since 2005, the station reaches communities in every corner of the country with messages of faith, unity, and holistic development.

The radio grew from CPR's early broadcasts on Radio Rwanda. Today CPR operates its own studio at its Kicukiro headquarters. Programming covers religious content, community development, news, health education, and youth programming.`),
    order: 7,
  },
]

// ─── ABOUT PAGE (singleton) ────────────────────────────────────────────────────

const aboutPage = {
  _id: 'aboutPage',
  _type: 'aboutPage',
  title: 'About Conseil Protestant du Rwanda',
  subtitle: 'Who We Are',
  mission: 'To bring together Protestant churches in Rwanda for a coordinated impact in evangelization, education, health, and holistic socio-economic development.',
  vision: 'A united, faithful, and prosperous Rwandan society where every individual lives in dignity and peace.',
  history: toBlocks(`The Protestant Council of Rwanda (CPR) was established in 1963 to promote and share innovative development initiatives and deliver essential services to our member churches and the wider community.

We are committed to developing strong, impactful partnerships and providing world-class services to those we work with, fostering faith, unity, and sustainable development across Rwanda.

CPR operates through a collaborative partnership structure connecting 25 member churches and denominations across Rwanda. Resources are mobilized through local contributions and international partnerships, and sustainable, community-focused initiatives are deployed on the ground.`),
  values: [
    { _key: 'faith', title: 'Faith', description: 'Rooted in our Christian beliefs, faith guides all our actions and decisions.' },
    { _key: 'unity', title: 'Unity', description: 'Bringing together diverse denominations to speak and act with one voice.' },
    { _key: 'integrity', title: 'Integrity', description: 'Upholding transparency and accountability in all our operations.' },
    { _key: 'service', title: 'Service', description: 'Dedicated to serving the most vulnerable communities with compassion.' },
    { _key: 'excellence', title: 'Excellence', description: 'Striving for the highest quality in our education, health, and development programs.' },
  ],
  leadershipTeam: [
    { _key: 'leader-1', name: 'Samuel Mutabazi', role: 'Board Member' },
    { _key: 'leader-2', name: 'Jael', role: 'Board Member' },
    { _key: 'leader-3', name: 'Peter Mukunzi', role: 'Board Member' },
    { _key: 'leader-4', name: 'Joselyne Iragena', role: 'Board Member' },
  ],
}

// ─── DEPARTMENTS PAGE (singleton) ─────────────────────────────────────────────

const departmentsPage = {
  _id: 'departmentsPage',
  _type: 'departmentsPage',
  title: 'Departments',
  subtitle: "Seven strategic departments driving CPR's mission across education, development, finance, youth, gender, communications, and governance.",
  introText: toBlocks(`CPR's work is organized through seven specialized departments, each led by experienced professionals and supported by dedicated staff. Together, they implement programs that touch every province of Rwanda, from education and health to youth empowerment and community development.`),
}

// ─── RADIO PROGRAMS ────────────────────────────────────────────────────────────

const radioPrograms = [
  {
    _id: 'radio-program-devotion',
    _type: 'radioProgram',
    title: 'Morning Devotion',
    slug: { _type: 'slug', current: 'morning-devotion' },
    description: 'Daily morning devotional program featuring scripture readings, prayers, and messages of faith.',
    frequency: 'Daily',
    timeSlot: 'Morning',
    language: 'Kinyarwanda',
  },
  {
    _id: 'radio-program-community',
    _type: 'radioProgram',
    title: 'Community Development Hour',
    slug: { _type: 'slug', current: 'community-development-hour' },
    description: 'Weekly program covering community development, health education, and social empowerment.',
    frequency: 'Weekly',
    timeSlot: 'Afternoon',
    language: 'Kinyarwanda',
  },
  {
    _id: 'radio-program-youth',
    _type: 'radioProgram',
    title: 'Youth Voice',
    slug: { _type: 'slug', current: 'youth-voice' },
    description: 'A platform for young Rwandans to discuss faith, leadership, and digital skills.',
    frequency: 'Weekly',
    timeSlot: 'Evening',
    language: 'Kinyarwanda/French',
  },
]

// ─── TESTIMONIALS ──────────────────────────────────────────────────────────────

const testimonials = [
  {
    _id: 'testimonial-1',
    _type: 'testimonial',
    name: 'Dr. Claudine Uwimana',
    role: 'CPR Scholarship Beneficiary, Class of 2018',
    quote: 'The CPR scholarship program transformed my life. As a child of genocide survivors, I had no hope of attending university. Today I am a medical doctor serving my community.',
    featured: true,
  },
  {
    _id: 'testimonial-2',
    _type: 'testimonial',
    name: 'BNEP Teacher',
    role: 'Primary School Educator',
    quote: 'Quality education with strong moral grounding transforms learners into compassionate leaders.',
    featured: true,
  },
  {
    _id: 'testimonial-3',
    _type: 'testimonial',
    name: 'Youth Program Graduate',
    role: 'Young Church Leader',
    quote: "Empowering young people with skills and faith is the highest investment we can make for Rwanda's future.",
    featured: true,
  },
]

// ─── MEMBER CHURCHES (all 25 extracted from live site) ─────────────────────────

const memberChurches = [
  { _id: 'church-epr', _type: 'memberChurch', name: 'Eglise Presbytérienne au Rwanda (EPR)', slug: { _type: 'slug', current: 'epr' }, description: 'One of the founding members of CPR, EPR has a strong presence in education and community development across Rwanda.', location: 'Nationwide' },
  { _id: 'church-ear-kigali', _type: 'memberChurch', name: 'Eglise Anglicane au Rwanda, Diocèse de Kigali (EAR-D/Kigali)', slug: { _type: 'slug', current: 'ear-kigali' }, description: 'Anglican diocese of Kigali, a key CPR member active in education, health, and community service.', location: 'Kigali' },
  { _id: 'church-uebr', _type: 'memberChurch', name: 'Union des Eglises Baptistes au Rwanda (UEBR)', slug: { _type: 'slug', current: 'uebr' }, description: 'The Union of Baptist Churches in Rwanda, an active CPR member contributing to evangelization and community development.', location: 'Nationwide' },
  { _id: 'church-emlr', _type: 'memberChurch', name: 'Eglise Méthodiste Libre au Rwanda (EMLR)', slug: { _type: 'slug', current: 'emlr' }, description: 'The Free Methodist Church in Rwanda, focused on education, health, and community service.', location: 'Nationwide' },
  { _id: 'church-aebr', _type: 'memberChurch', name: 'Association des Eglises Baptistes au Rwanda (AEBR)', slug: { _type: 'slug', current: 'aebr' }, description: 'Association of Baptist Churches in Rwanda, contributing to evangelization and holistic community development.', location: 'Nationwide' },
  { _id: 'church-ear-byumba', _type: 'memberChurch', name: 'Eglise Anglicane au Rwanda, Diocèse de Byumba (EAR-D/Byumba)', slug: { _type: 'slug', current: 'ear-byumba' }, description: 'Anglican diocese of Byumba, serving communities in Northern Rwanda.', location: 'Northern Province' },
  { _id: 'church-ear-butare', _type: 'memberChurch', name: 'Eglise Anglicane au Rwanda, Diocèse de Butare (EAR-D/Butare)', slug: { _type: 'slug', current: 'ear-butare' }, description: 'Anglican diocese of Butare, active in education, health, and community reconciliation.', location: 'Southern Province' },
  { _id: 'church-ear-shyogwe', _type: 'memberChurch', name: 'Eglise Anglicane au Rwanda, Diocèse de Shyogwe (EAR-D/Shyogwe)', slug: { _type: 'slug', current: 'ear-shyogwe' }, description: 'Anglican diocese of Shyogwe, serving communities across Central Rwanda.', location: 'Central Rwanda' },
  { _id: 'church-ear-gahini', _type: 'memberChurch', name: 'Eglise Anglicane au Rwanda, Diocèse de Gahini (EAR-D/Gahini)', slug: { _type: 'slug', current: 'ear-gahini' }, description: 'Anglican diocese of Gahini, a historic CPR member with deep roots in Eastern Rwanda.', location: 'Eastern Province' },
  { _id: 'church-easjr', _type: 'memberChurch', name: 'Eglise Adventiste du Septième Jour au Rwanda (EASJR)', slug: { _type: 'slug', current: 'easjr' }, description: 'The Seventh-day Adventist Church in Rwanda, operating numerous schools and health centers in partnership with CPR.', location: 'Nationwide' },
  { _id: 'church-adepr', _type: 'memberChurch', name: 'Association des Eglises de Pentecôte au Rwanda (ADEPR)', slug: { _type: 'slug', current: 'adepr' }, description: 'The Association of Pentecostal Churches in Rwanda, a major CPR member with nationwide outreach.', location: 'Nationwide' },
  { _id: 'church-eear', _type: 'memberChurch', name: "Eglise Évangélique des Amis au Rwanda (EEAR)", slug: { _type: 'slug', current: 'eear' }, description: "The Evangelical Friends Church in Rwanda, contributing to CPR's mission through community development and evangelism.", location: 'Nationwide' },
  { _id: 'church-hcc', _type: 'memberChurch', name: 'Harvest Christian Church (HCC)', slug: { _type: 'slug', current: 'hcc' }, description: 'Harvest Christian Church, an active CPR member focused on youth ministry and community development.', location: 'Nationwide' },
  { _id: 'church-lcr', _type: 'memberChurch', name: 'Lutheran Church of Rwanda (LCR)', slug: { _type: 'slug', current: 'lcr' }, description: 'The Lutheran Church of Rwanda, a CPR member contributing to education and social welfare programs.', location: 'Nationwide' },
  { _id: 'church-ear-karongi', _type: 'memberChurch', name: 'Eglise Anglicane au Rwanda, Diocèse de Karongi (EAR-D/Karongi)', slug: { _type: 'slug', current: 'ear-karongi' }, description: 'Anglican diocese of Karongi, serving communities in Western Rwanda.', location: 'Western Province' },
  { _id: 'church-ear-shyira', _type: 'memberChurch', name: 'Eglise Anglicane au Rwanda, Diocèse de Shyira (EAR-D/Shyira)', slug: { _type: 'slug', current: 'ear-shyira' }, description: 'Anglican diocese of Shyira, active in Northwestern Rwanda.', location: 'Northwestern Rwanda' },
  { _id: 'church-ear-gasabo', _type: 'memberChurch', name: 'Eglise Anglicane au Rwanda, Diocèse de Gasabo (EAR-D/Gasabo)', slug: { _type: 'slug', current: 'ear-gasabo' }, description: "Anglican diocese of Gasabo, serving communities in Kigali's Gasabo District.", location: 'Kigali (Gasabo)' },
  { _id: 'church-salvation-army', _type: 'memberChurch', name: 'The Salvation Army Church', slug: { _type: 'slug', current: 'salvation-army' }, description: 'The Salvation Army, a CPR member providing community services, social welfare, and humanitarian assistance.', location: 'Nationwide' },
  { _id: 'church-bec', _type: 'memberChurch', name: 'Believers Eastern Church (BEC)', slug: { _type: 'slug', current: 'bec' }, description: 'Believers Eastern Church, a CPR member contributing to spiritual growth and community development.', location: 'Eastern Province' },
  { _id: 'church-seira', _type: 'memberChurch', name: 'SEIRA Community Church', slug: { _type: 'slug', current: 'seira' }, description: 'SEIRA Community Church, an active CPR member focused on community development and evangelism.', location: 'Nationwide' },
  { _id: 'church-llbr', _type: 'memberChurch', name: 'Ligue pour La Lecture de la Bible (LLBR)', slug: { _type: 'slug', current: 'llbr' }, description: 'The Bible Reading League, promoting biblical literacy and Christian education across Rwanda.', location: 'Nationwide' },
  { _id: 'church-jpc', _type: 'memberChurch', name: 'Jeunesse Pour Christ (JPC)', slug: { _type: 'slug', current: 'jpc' }, description: 'Youth for Christ Rwanda, focused on youth ministry, evangelism, and leadership development.', location: 'Nationwide' },
  { _id: 'church-alarm', _type: 'memberChurch', name: 'African Leadership and Reconciliation Ministries (ALARM)', slug: { _type: 'slug', current: 'alarm' }, description: 'ALARM focuses on leadership development and reconciliation work across Rwanda and Africa.', location: 'Nationwide' },
  { _id: 'church-aee', _type: 'memberChurch', name: 'African Evangelistic Enterprises (AEE)', slug: { _type: 'slug', current: 'aee' }, description: 'African Evangelistic Enterprises conducts large-scale evangelism and community transformation programs.', location: 'Nationwide' },
  { _id: 'church-barakabaho', _type: 'memberChurch', name: 'BARAKABAHO Foundation', slug: { _type: 'slug', current: 'barakabaho' }, description: 'BARAKABAHO Foundation works in holistic community development and social welfare in partnership with CPR.', location: 'Nationwide' },
]

// ─── PROJECTS ──────────────────────────────────────────────────────────────────

const projects = [
  {
    _id: 'project-capacity-building',
    _type: 'project',
    title: 'Capacity Building in Churches',
    slug: { _type: 'slug', current: 'capacity-building-churches' },
    description: 'Strengthening professional capacities of staff across 20 CPR-member churches and 5 associations.',
    body: toBlocks(`Strengthening professional capacities of staff across 20 CPR-member churches and 5 associations.

Program components: ICT and entrepreneurship training, leadership and administration capacity building, environmental theology and public health education, scholarship alumni network for ongoing collaboration.`),
    status: 'completed',
    startDate: '2019-01-01',
    endDate: '2022-12-31',
    tags: ['capacity-building', 'leadership', 'ICT', 'education'],
  },
  {
    _id: 'project-psychotraumatology',
    _type: 'project',
    title: 'Psychotraumatology & Trauma Healing',
    slug: { _type: 'slug', current: 'psychotraumatology-trauma-healing' },
    description: 'Comprehensive psychosocial support in post-conflict contexts — certifying counselors and running anti-trauma clubs.',
    body: toBlocks(`Comprehensive psychosocial support in post-conflict contexts — certifying counselors and running anti-trauma clubs nationwide.

Components: Certifying mental health providers in psychotraumatology, anti-trauma clubs in schools, faith-based counseling integration in communities, Rwanda Organization of Psychotraumatology Experts (ROPRE) partnership.`),
    status: 'ongoing',
    startDate: '2020-01-01',
    tags: ['trauma-healing', 'mental-health', 'counseling', 'peace'],
  },
]

// ─── SITE SETTINGS (singleton) ─────────────────────────────────────────────────

const siteSettings = {
  _id: 'siteSettings',
  _type: 'siteSettings',
  siteName: 'Conseil Protestant du Rwanda (CPR)',
  siteTagline: 'Bose Babe Umwe — "That All of Them May Be One"',
  contactEmail: 'cprgs@cpr-rwanda.rw',
  contactPhone: '+250 788 314 718',
  address: 'KG 2 Av 4, B.P 79, Kigali, Rwanda',
  radioFrequency: '107.1 FM',
  foundedYear: '1963',
}

// ─── MIGRATION RUNNER ──────────────────────────────────────────────────────────

async function migrate() {
  console.log('🚀 Starting CPR Rwanda → Sanity migration...\n')

  const allDocuments = [
    siteSettings,
    aboutPage,
    departmentsPage,
    ...newsPosts,
    ...departments,
    ...projects,
    ...radioPrograms,
    ...testimonials,
    ...memberChurches,
  ]

  let created = 0
  let failed = 0

  for (const doc of allDocuments) {
    try {
      await client.createOrReplace(doc)
      console.log(`✅ ${doc._type}: ${doc.title || doc.name || doc._id}`)
      created++
    } catch (err) {
      console.error(`❌ Failed: ${doc._id} — ${err.message}`)
      failed++
    }
  }

  console.log(`\n🎉 Migration complete: ${created} documents created, ${failed} failed.`)
  console.log('\nNext steps:')
  console.log('1. Go to https://cpr-rwanda-website.sanity.studio/ and verify the content')
  console.log('2. Add images to documents that need them')
  console.log('3. Install: npm install @sanity/client @sanity/image-url')
  console.log('4. Wire React pages to fetch from Sanity')
}

migrate().catch(console.error)
