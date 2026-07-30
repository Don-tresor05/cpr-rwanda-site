const fs = require('fs');

const en = {
  about: {
    ourStory: "Our Story",
    title: "Six Decades of\nFaith & Service",
    p1: "Founded in <strong className=\"text-[#4E6132]\">1963</strong>, the Conseil Protestant du Rwanda (CPR) is the umbrella body uniting Rwanda's 19 Protestant churches. Since its inception, CPR has been at the heart of Rwanda's social fabric — rebuilding communities after conflict, championing education, and upholding the dignity of every person.",
    p2Start: "Today, through its departments in education, health, evangelism, and communications, CPR touches every province of Rwanda. Our motto — ",
    motto: "“Bose Babe Umwe” (That All of Them May Be One)",
    p2End: " — guides every initiative.",
    historyBtn: "Our Full History",
    visionBtn: "Vision & Mission"
  },
  departments: {
    ourWork: "Our Work",
    title: "Departments & Projects",
    desc: "CPR's work spans four strategic departments, each addressing a critical dimension of Rwanda's transformation.",
    learnMore: "Learn More",
    items: [
      {
        title: "General Secretary",
        desc: "Oversees the strategic direction, coordination, and overall governance of the Conseil Protestant du Rwanda."
      },
      {
        title: "Education/BNEP",
        desc: "Manages Protestant primary and secondary schools, implementing modern pedagogical methodologies across the country."
      },
      {
        title: "Diakonia/Development",
        desc: "Coordinates social services, humanitarian relief operations, and sustainable community development programs."
      },
      {
        title: "Finance/Mobilization",
        desc: "Ensures institutional financial sustainability, transparent administration, and strategic resource mobilization."
      },
      {
        title: "Youth Program",
        desc: "Empowers the next generation through peacebuilding, reconciliation projects, and active leadership training."
      },
      {
        title: "Gender Promotion",
        desc: "Promotes gender equality, fights gender-based violence (GBV), and empowers women in economic and social spheres."
      },
      {
        title: "Radio Inkoramutima",
        desc: "Spreads messages of evangelization, national unity, healing, and community development across Rwanda on 107.1 FM."
      }
    ]
  },
  news: {
    ourStories: "Our Stories",
    title: "Latest News & Events",
    desc: "Stay updated with the latest activities, reports, and events from our member churches and departments.",
    readArticle: "Read Article",
    viewAllBtn: "View All News",
    items: [
      {
        category: "Event",
        title: "Kwibuka 31 Memorial Commemoration at Gahini Diocese",
        excerpt: "CPR member churches joined thousands across Rwanda to remember the 1994 Genocide against the Tutsi, reaffirming their commitment to never again."
      },
      {
        category: "Education",
        title: "BNEP Launches Active Pedagogy Training for 1,200 Teachers",
        excerpt: "The Bureau National de l'Éducation Protestante rolled out its flagship Participatory Active Pedagogy program in partnership with international donors."
      },
      {
        category: "Health",
        title: "Gender & Health Department Completes Trauma Counselor Certification",
        excerpt: "Forty-two community health workers across five provinces were certified as trauma counselors, strengthening CPR's mental health outreach capacity."
      },
      {
        category: "Development",
        title: "CPR Partners with Local Cooperatives for Agricultural Sustainability",
        excerpt: "A new initiative aiming to support rural communities with climate-smart farming techniques was launched in Eastern Province, impacting over 500 families."
      },
      {
        category: "Youth",
        title: "Annual Youth Peace and Reconciliation Summit Announced",
        excerpt: "Youth leaders from various Protestant parishes across the country will gather in Kigali to discuss peacemaking, leadership, and digital evangelism."
      }
    ]
  },
  testimonials: {
    impact: "Our Impact",
    title: "Voices from the Community",
    desc: "Hear from the individuals and communities whose lives have been touched by the work of the Conseil Protestant du Rwanda.",
    items: [
      {
        quote: "The CPR scholarship program transformed my life. As a child of genocide survivors, I had no hope of attending university. Today I am a medical doctor serving my community.",
        role: "CPR Scholarship Beneficiary, Class of 2018"
      },
      {
        quote: "Radio Inkoramutima reaches our village every morning. The trauma counseling programs on air have helped our whole congregation find peace and reconciliation.",
        role: "Member Church Pastor, Eastern Province"
      },
      {
        quote: "Through the BNEP Active Pedagogy training, our teachers now create joyful classrooms where every child participates. Student performance has increased by 40% in two years.",
        role: "Head Teacher, EPRK Primary School, Kigali"
      }
    ]
  },
  radio: {
    listenLive: "Listen Live",
    title: "Radio Inkoramutima 107.1 FM",
    desc: "Broadcasting messages of faith, unity, and development to communities across Rwanda since 2005. The official voice of the Protestant Council of Rwanda.",
    nowPlaying: "Now Playing:",
    nowPlayingDesc: "Morning Devotion & Community News",
    listenBtn: "Listen Live",
    scheduleBtn: "Program Schedule"
  },
  gallery: {
    galleryLabel: "Gallery",
    title: "Moments & Memories",
    desc: "A visual journey through our community events, school programs, and church services across the country.",
    viewAllBtn: "View Full Gallery"
  },
  partners: {
    trustedBy: "Trusted By",
    title: "Our Partners & Affiliates",
    desc: "We collaborate with local and international organizations to maximize our impact and reach."
  },
  cta: {
    title: "Ready to Make an Impact?",
    desc: "Join us in our mission to unite, serve, and develop communities across Rwanda through faith and action.",
    donateBtn: "Make a Donation",
    contactBtn: "Contact Us Today"
  }
};

const fr = {
  about: {
    ourStory: "Notre Histoire",
    title: "Six Décennies de\nFoi et de Service",
    p1: "Fondé en <strong className=\"text-[#4E6132]\">1963</strong>, le Conseil Protestant du Rwanda (CPR) est l'organe faîtier réunissant les 19 églises protestantes du Rwanda. Depuis sa création, le CPR est au cœur du tissu social rwandais — reconstruisant les communautés après les conflits, soutenant l'éducation et défendant la dignité de chaque personne.",
    p2Start: "Aujourd'hui, à travers ses départements de l'éducation, de la santé, de l'évangélisation et de la communication, le CPR touche chaque province du Rwanda. Notre devise — ",
    motto: "« Bose Babe Umwe » (Afin que tous soient un)",
    p2End: " — guide chaque initiative.",
    historyBtn: "Notre Histoire Complète",
    visionBtn: "Vision et Mission"
  },
  departments: {
    ourWork: "Notre Travail",
    title: "Départements et Projets",
    desc: "Le travail du CPR s'étend sur quatre départements stratégiques, chacun abordant une dimension critique de la transformation du Rwanda.",
    learnMore: "En Savoir Plus",
    items: [
      {
        title: "Secrétariat Général",
        desc: "Supervise la direction stratégique, la coordination et la gouvernance globale du Conseil Protestant du Rwanda."
      },
      {
        title: "Éducation/BNEP",
        desc: "Gère les écoles primaires et secondaires protestantes, mettant en œuvre des méthodologies pédagogiques modernes à travers le pays."
      },
      {
        title: "Diaconie/Développement",
        desc: "Coordonne les services sociaux, les opérations de secours humanitaire et les programmes de développement communautaire durable."
      },
      {
        title: "Finance/Mobilisation",
        desc: "Assure la viabilité financière institutionnelle, l'administration transparente et la mobilisation stratégique des ressources."
      },
      {
        title: "Programme Jeunesse",
        desc: "Autonomise la prochaine génération par la consolidation de la paix, des projets de réconciliation et une formation active au leadership."
      },
      {
        title: "Promotion du Genre",
        desc: "Promeut l'égalité des genres, lutte contre les violences basées sur le genre (VBG) et autonomise les femmes dans les sphères économiques et sociales."
      },
      {
        title: "Radio Inkoramutima",
        desc: "Diffuse des messages d'évangélisation, d'unité nationale, de guérison et de développement communautaire au Rwanda sur 107.1 FM."
      }
    ]
  },
  news: {
    ourStories: "Nos Histoires",
    title: "Dernières Nouvelles",
    desc: "Restez informé des dernières activités, rapports et événements de nos églises membres et départements.",
    readArticle: "Lire l'Article",
    viewAllBtn: "Toutes les Nouvelles",
    items: [
      {
        category: "Événement",
        title: "Kwibuka 31: Commémoration au Diocèse de Gahini",
        excerpt: "Les églises membres du CPR se sont jointes à des milliers de personnes au Rwanda pour se souvenir du génocide de 1994 contre les Tutsi."
      },
      {
        category: "Éducation",
        title: "Le BNEP Lance une Formation en Pédagogie Active",
        excerpt: "Le Bureau National de l'Éducation Protestante a déployé son programme phare de Pédagogie Active."
      },
      {
        category: "Santé",
        title: "Certification de Conseillers en Traumatisme",
        excerpt: "Quarante-deux agents de santé communautaire ont été certifiés comme conseillers en traumatisme."
      },
      {
        category: "Développement",
        title: "Le CPR s'Associe aux Coopératives Locales",
        excerpt: "Une nouvelle initiative visant à soutenir les communautés rurales a été lancée dans la province de l'Est."
      },
      {
        category: "Jeunesse",
        title: "Sommet Annuel de la Jeunesse Annoncé",
        excerpt: "Des jeunes leaders de diverses paroisses protestantes se réuniront à Kigali pour discuter de la paix."
      }
    ]
  },
  testimonials: {
    impact: "Notre Impact",
    title: "Voix de la Communauté",
    desc: "Écoutez les individus et les communautés dont les vies ont été touchées par le travail du CPR.",
    items: [
      {
        quote: "Le programme de bourses d'études du CPR a transformé ma vie. Aujourd'hui, je suis médecin et je sers ma communauté.",
        role: "Bénéficiaire de bourse du CPR, Promotion 2018"
      },
      {
        quote: "La Radio Inkoramutima atteint notre village chaque matin. Les programmes nous ont aidés à trouver la paix.",
        role: "Pasteur d'une église membre, Province de l'Est"
      },
      {
        quote: "Grâce à la formation du BNEP, nos enseignants créent des classes joyeuses où chaque enfant participe.",
        role: "Directrice, École primaire EPRK, Kigali"
      }
    ]
  },
  radio: {
    listenLive: "Écouter en Direct",
    title: "Radio Inkoramutima 107.1 FM",
    desc: "Diffuser des messages de foi, d'unité et de développement à travers le Rwanda depuis 2005.",
    nowPlaying: "En Cours :",
    nowPlayingDesc: "Dévotion Matinale & Nouvelles",
    listenBtn: "Écouter en Direct",
    scheduleBtn: "Programme"
  },
  gallery: {
    galleryLabel: "Galerie",
    title: "Moments et Souvenirs",
    desc: "Un voyage visuel à travers nos événements communautaires et programmes scolaires.",
    viewAllBtn: "Voir la Galerie Complète"
  },
  partners: {
    trustedBy: "Approuvé Par",
    title: "Nos Partenaires",
    desc: "Nous collaborons avec des organisations locales et internationales pour maximiser notre impact."
  },
  cta: {
    title: "Prêt à Faire une Différence ?",
    desc: "Rejoignez-nous dans notre mission pour unir, servir et développer les communautés au Rwanda.",
    donateBtn: "Faire un Don",
    contactBtn: "Contactez-Nous"
  }
};

const rw = {
  about: {
    ourStory: "Amateka Yacu",
    title: "Imyaka Mirongo Itandatu\ny'Ukwizera n'Imirimo",
    p1: "Inama y'Abaporotesitanti mu Rwanda (CPR) yashinzwe mu <strong className=\"text-[#4E6132]\">1963</strong>, ni umuzimwa uhuza amatorero 19 y'abaporotesitanti mu Rwanda. Kuva yashingwa, CPR yagize uruhare rukomeye mu mibereho y'abaturage — kubaka imiryango nyuma y'amakimbirane, guteza imbere uburezi, no kubumbatira agaciro ka buri muntu.",
    p2Start: "Uyu munsi, binyuze mu mashami yayo y'uburezi, ubuzima, ivugabutumwa, n'itumanaho, CPR igera mu ntara zose z'u Rwanda. Intego yacu — ",
    motto: "“Bose Babe Umwe”",
    p2End: " — iyobora buri gikorwa cyose.",
    historyBtn: "Amateka Yacu Arambuye",
    visionBtn: "Icyerekezo n'Inshingano"
  },
  departments: {
    ourWork: "Ibikorwa Byacu",
    title: "Amashami n'Imishinga",
    desc: "Ibikorwa bya CPR bikorwa binyuze mu mashami ane akomeye, buri shami rifite uruhare mu mpinduka z'u Rwanda.",
    learnMore: "Menya Byinshi",
    items: [
      {
        title: "Ubunyamabanga Bukuru",
        desc: "Bukurikirana icyerekezo, imikoranire, n'imiyoborere rusange y'Inama y'Abaporotesitanti mu Rwanda."
      },
      {
        title: "Uburezi/BNEP",
        desc: "Igenzura amashuri abanza n'ayisumbuye, ishyira mu bikorwa uburyo bugezweho bwo kwigisha mu gihugu hose."
      },
      {
        title: "Diyakoniya/Iterambere",
        desc: "Ihuza ibikorwa by'imibereho myiza, ubutabazi, n'iterambere rirambye ry'abaturage."
      },
      {
        title: "Imari/Gushaka Ubushobozi",
        desc: "Yita ku gushaka ubushobozi bw'ikigo, imicungire inoze y'imari, no gushaka umutungo."
      },
      {
        title: "Gahunda y'Urubyiruko",
        desc: "Ifasha urubyiruko binyuze mu kubaka amahoro, ubwiyunge, no kubaha amahugurwa y'ubuyobozi."
      },
      {
        title: "Kwimakaza Uburinganire",
        desc: "Iteza imbere uburinganire, irwanya ihohoterwa rishingiye ku gitsina, n'iterambere ry'abagore."
      },
      {
        title: "Radio Inkoramutima",
        desc: "Itangaza ubutumwa bw'ivugabutumwa, ubumwe, gukira, n'iterambere kuri 107.1 FM."
      }
    ]
  },
  news: {
    ourStories: "Inkuru Zacu",
    title: "Amakuru Mashya",
    desc: "Menya amakuru mashya n'ibikorwa by'amatorero n'amashami yacu.",
    readArticle: "Soma Inkuru",
    viewAllBtn: "Reba Amakuru Yose",
    items: [
      {
        category: "Igikorwa",
        title: "Kwibuka 31 muri Diyosezi ya Gahini",
        excerpt: "Amatorero agize CPR yifatanyije n'abandi banyarwanda kwibuka Jenoside yakorewe Abatutsi mu 1994."
      },
      {
        category: "Uburezi",
        title: "BNEP yatangije Amahugurwa ku Barezi 1,200",
        excerpt: "Ibiro by'Igihugu bishinzwe Uburezi bw'Abaporotesitanti byatangije gahunda y'imyigishirize igezweho."
      },
      {
        category: "Ubuzima",
        title: "Amahugurwa y'Abajyanama b'Ihungabana",
        excerpt: "Abajyanama b'ubuzima 42 mu ntara zitanu bahawe impabumenyi mu gufasha abafite ihungabana."
      },
      {
        category: "Iterambere",
        title: "CPR mu Bufatanye na Koperative z'Abahinzi",
        excerpt: "Gahunda nshya yo gufasha abahinzi guhangana n'imihindagurikire y'ikirere yatangirijwe mu Burasirazuba."
      },
      {
        category: "Urubyiruko",
        title: "Inama y'Urubyiruko ku Mahoro n'Ubwiyunge",
        excerpt: "Abayobozi b'urubyiruko bazahurira i Kigali kuganira ku mahoro n'ubuyobozi."
      }
    ]
  },
  testimonials: {
    impact: "Umusaruro Wacu",
    title: "Ijwi ry'Abaturage",
    desc: "Umva ibyo abantu bafashijwe na CPR bavuga.",
    items: [
      {
        quote: "Buruse ya CPR yahinduye ubuzima bwanjye. Ubu ndi muganga ufasha abaturage.",
        role: "Uwafashijwe na CPR kwiga, 2018"
      },
      {
        quote: "Radio Inkoramutima igera mu mudugudu wacu buri gitondo. Ibiganiro byayo byadufashije kubona amahoro.",
        role: "Umushumba, Intara y'Iburasirazuba"
      },
      {
        quote: "Binyuze mu mahugurwa ya BNEP, abarimu bacu ubu barigisha neza. Imitsindire yazamutseho 40%.",
        role: "Umuyobozi w'Ikigo, Kigali"
      }
    ]
  },
  radio: {
    listenLive: "Umva Nonaha",
    title: "Radio Inkoramutima 107.1 FM",
    desc: "Itangaza ubutumwa bw'ukwizera, ubumwe, n'iterambere mu Rwanda kuva 2005.",
    nowPlaying: "Ikiganiro Kiriho:",
    nowPlayingDesc: "Isengesho rya Mu Gitondo & Amakuru",
    listenBtn: "Umva Nonaha",
    scheduleBtn: "Gahunda y'Ibiganiro"
  },
  gallery: {
    galleryLabel: "Amafoto",
    title: "Ibihe by'Ingenzi",
    desc: "Urugendo mu mafoto y'ibikorwa byacu hirya no hino.",
    viewAllBtn: "Reba Amafoto Yose"
  },
  partners: {
    trustedBy: "Abo Dukorana",
    title: "Abafatanyabikorwa",
    desc: "Dukorana n'imiryango y'imbere mu gihugu n'iy'amahanga kugira ngo tugere ku ntego zacu."
  },
  cta: {
    title: "Witeguye Gutanga Umusanzu?",
    desc: "Fasha umuryango wacu kunga, gukorera no guteza imbere abaturage b'u Rwanda.",
    donateBtn: "Tanga Inkunga",
    contactBtn: "Twandikire Uyu Munsi"
  }
};

const langs = { en, fr, rw };

for (const lang of Object.keys(langs)) {
  const p = `src/locales/${lang}/home.json`;
  const json = JSON.parse(fs.readFileSync(p, 'utf8'));
  Object.assign(json, langs[lang]);
  fs.writeFileSync(p, JSON.stringify(json, null, 2));
}
