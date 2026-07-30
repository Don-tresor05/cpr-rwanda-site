const fs = require('fs');

const en = {
  stats: {
    churches: "Member Churches",
    schools: "Primary Schools",
    fm: "FM Frequency",
    years: "Years of Service"
  },
  footer: {
    desc: "Uniting Protestant churches in Rwanda for spiritual growth, peacebuilding, and holistic development since 1963.",
    quickLinks: "Quick Links",
    contactUs: "Contact Us",
    followUs: "Follow Us",
    rights: "All rights reserved.",
    developedBy: "Developed by"
  }
};

const fr = {
  stats: {
    churches: "Églises Membres",
    schools: "Écoles Primaires",
    fm: "Fréquence FM",
    years: "Années de Service"
  },
  footer: {
    desc: "Unissant les églises protestantes au Rwanda pour la croissance spirituelle, la consolidation de la paix et le développement holistique depuis 1963.",
    quickLinks: "Liens Rapides",
    contactUs: "Contactez-Nous",
    followUs: "Suivez-Nous",
    rights: "Tous droits réservés.",
    developedBy: "Développé par"
  }
};

const rw = {
  stats: {
    churches: "Amatorero Anyamuryango",
    schools: "Amashuri Abanza",
    fm: "Umurongo wa FM",
    years: "Imyaka y'Imirimo"
  },
  footer: {
    desc: "Ihuza amatorero y'abaporotesitanti mu Rwanda mu gukura mu mwuka, kubaka amahoro, n'iterambere rusange kuva mu 1963.",
    quickLinks: "Aho wakanda vuba",
    contactUs: "Twandikire",
    followUs: "Dukurikire",
    rights: "Uburenganzira bwose burabitswe.",
    developedBy: "Yakozwe na"
  }
};

const langs = { en, fr, rw };

for (const lang of Object.keys(langs)) {
  const p = `src/locales/${lang}/common.json`;
  const json = JSON.parse(fs.readFileSync(p, 'utf8'));
  Object.assign(json, langs[lang]);
  fs.writeFileSync(p, JSON.stringify(json, null, 2));
}
