type ProgrammeItem = string | { time: string; label: string }
type ProgrammeDay = { date: string; title: string; items: ProgrammeItem[] }

export const siteContent = {
  hero: {
    fullName: 'Mama MAVOO ODETTE',
    initials: 'MO',
    photoSrc: '/images/gallery/photo-4.jpg' as string | null,
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
    date: '2026-10-14T09:00:00',
    dateLabel: '14 au 18 octobre 2026',
    locationName: 'Bamendjou',
    locationAddress: 'Adresse à préciser',
    additionalInfo: 'Culte d\'ouverture le 14 — grand jour le 17 octobre. Voir le programme complet ci-dessus.',
  },
  // Annonce du deuil + programme détaillé des 4 jours de funérailles.
  programme: {
    heading: 'Le deuil de nos parents',
    announcement: [
      "Avec cette mélodie, je viens ce matin vous annoncer le deuil de nos parents, prévu au mois d'octobre, du 14 au 17.",
      'Nous avons déjà pleuré, tous ceux qui devaient pleurer nos parents.',
      "Nos parents ont laissé leurs beaux de Bamendjou, à qui ils ont tout donné de leur vivant. Leurs beaux non plus n'ont pas eu l'occasion de témoigner cet amour à travers les multiples danses qu'ils auraient bien voulu offrir, pour célébrer l'amour qui a existé entre les deux familles.",
      'Nos parents ont laissé Ma Sessa et Deh Tagabon vivants.',
      'Nos parents ont laissé Ma Ali de Bapi vivante.',
      'Nos parents ont laissé la famille Tiam encore bien solide — gloire à Dieu, ils sont encore vivants.',
      'Nos parents ont laissé le papa de notre beau Lambert vivant — gloire à Dieu, sa maman est encore là.',
      'Nos parents ont laissé Ma Emis de Tonton Baillard et Papa Piano vivants, etc.',
      'Nous avons accompagné plusieurs personnes pour célébrer leurs parents.',
      "Ce 4 mai, jour du mois de départ de notre maman, nous avons décidé — et nous vous supplions de nous rejoindre — pour qu'ensemble, du 14 au 17 octobre, nous montrions aux yeux des hommes et des femmes que Papa Kamdem Jean et Maman Mavoo Odette ont eux aussi eu une progéniture, et que cette progéniture n'a pas oublié leur existence.",
    ] as string[],
    days: [
      {
        date: '14 octobre',
        title: "Culte d'ouverture",
        items: ["Culte d'ouverture"],
      },
      {
        date: '15 octobre',
        title: 'Ledalap',
        items: [
          'Session de danse des réunions de la mère et réunions de Magitina',
          'Descente de Billy avec son deuil',
          "Toute personne souhaitant faire son deuil ce jour est invitée à le faire, pour éviter d'être frustrée le grand jour",
        ],
      },
      {
        date: '16 octobre',
        title: 'Moumeteh',
        items: [
          'Arrivée des multiples relations et proches des familles',
          'Installation de la logistique et mise en place',
          'Multiples cuisines',
          'Réception des invités',
        ],
      },
      {
        date: '17 octobre',
        title: 'Grand jour',
        items: [
          { time: '8h', label: 'Arrivée des invités et messe' },
          { time: '9h', label: "Début de cérémonie — danse traditionnelle d'accueil des invités" },
          {
            time: '10h',
            label:
              'Descente des multiples beaux, passage des danses offertes par les proches de la zone anglophone, etc.',
          },
          { time: '14h', label: 'Grande réception' },
          {
            time: '16h',
            label:
              'Début de la grande danse Mehouppe, supervisée par le grand-père Tadjida Tawet et le père Luc Tadji',
          },
          { time: '19h', label: 'Fin des funérailles' },
        ],
      },
      {
        date: '18 octobre',
        title: 'Clôture (dimanche)',
        items: [
          "Prière de clôture et action de grâce, en remerciement à Dieu pour le soutien qu'il nous a accordé pour la réussite de l'événement",
        ],
      },
    ] as ProgrammeDay[],
  },
} as const

export type SiteContent = typeof siteContent
