export const siteContent = {
  hero: {
    fullName: 'Mama MAVOO ODETTE',
    initials: 'MO',
    photoSrc: null as string | null, // ex: "/images/mama-odette-portrait.jpg" — à ajouter plus tard
    birthYear: '1940',
    deathYear: '2021',
    tagline: "Une vie de courage, d'amour et de foi",
  },
  biography: {
    heading: 'Sa vie',
    paragraphs: [
      'Texte de biographie à venir. Ce paragraphe racontera qui était Mama MAVOO ODETTE : son parcours, ses valeurs, les moments qui ont marqué sa vie.',
      "Un second paragraphe pourra évoquer son rôle au sein de la famille, sa foi, sa générosité, et l'héritage qu'elle laisse à ceux qui l'ont connue.",
    ],
  },
  // type 'family' (fils / petits-fils) : affiche la photo avec le message.
  // type 'friend' (amis) : affiche seulement le message.
  testimonials: [
    {
      type: 'family',
      author: 'Un fils',
      relation: 'Fils',
      photoSrc: '/images/testimonials/portrait-1.svg',
      quote:
        'Témoignage à venir — un hommage à la mère et au pilier de notre grande famille.',
    },
    {
      type: 'family',
      author: 'Un petit-fils',
      relation: 'Petit-fils',
      photoSrc: '/images/testimonials/portrait-2.svg',
      quote:
        "Témoignage à venir — un souvenir, une leçon de vie, un mot d'amour pour Mama Odette.",
    },
    {
      type: 'family',
      author: 'Une petite-fille',
      relation: 'Petite-fille',
      photoSrc: '/images/testimonials/portrait-3.svg',
      quote: 'Témoignage à venir — ce que sa présence représentait au quotidien.',
    },
    {
      type: 'friend',
      author: 'Un ami de la famille',
      relation: 'Ami',
      photoSrc: null,
      quote:
        "Témoignage à venir — quelques mots d'un proche qui a connu et aimé Mama Odette.",
    },
    {
      type: 'friend',
      author: 'Une amie',
      relation: 'Amie',
      photoSrc: null,
      quote: 'Témoignage à venir — un souvenir partagé avec la famille.',
    },
  ],
  event: {
    date: '2026-10-31T11:00:00',
    dateLabel: '31 octobre 2026',
    locationName: 'Lieu à confirmer',
    locationAddress: 'Adresse à venir',
    additionalInfo: 'Plus de détails seront communiqués prochainement.',
  },
} as const

export type SiteContent = typeof siteContent
