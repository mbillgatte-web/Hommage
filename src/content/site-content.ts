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
  // Le nombre de photos peut varier librement — ajoutez/retirez simplement
  // des entrées ici, la galerie s'adapte automatiquement.
  gallery: {
    heading: 'Ses souvenirs en images',
    photos: [
      { src: '/images/gallery/photo-1.jpg', alt: 'Photo de Mama Odette 1' },
      { src: '/images/gallery/photo-2.jpg', alt: 'Photo de Mama Odette 2' },
      { src: '/images/gallery/photo-3.jpg', alt: 'Photo de Mama Odette 3' },
      { src: '/images/gallery/photo-4.jpg', alt: 'Photo de Mama Odette 4' },
      { src: '/images/gallery/photo-5.jpg', alt: 'Photo de Mama Odette 5' },
      { src: '/images/gallery/photo-6.jpg', alt: 'Photo de Mama Odette 6' },
    ] as { src: string; alt: string }[],
  },
  // type 'family' (fils / petits-fils) : affiche la photo avec le message.
  // type 'friend' (amis) : affiche seulement le message.
  // Les vrais témoignages soumis via le site s'ajoutent automatiquement ici
  // au-dessus (voir Testimonials.tsx / fetchLiveTestimonials).
  testimonials: [] as {
    type: 'family' | 'friend'
    author: string
    relation: string
    photoSrc: string | null
    quote: string
  }[],
  event: {
    date: '2026-10-31T11:00:00',
    dateLabel: '31 octobre 2026',
    locationName: 'Lieu à confirmer',
    locationAddress: 'Adresse à venir',
    additionalInfo: 'Plus de détails seront communiqués prochainement.',
  },
} as const

export type SiteContent = typeof siteContent
