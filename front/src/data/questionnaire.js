export const questionnaire = [
  {
    id: "1",
    question: "Quel type d'acte voulez-vous réaliser ?",
    answers: [
      {
        nextQuestion: "2",
        option: "Acte de vente",
        result: null,
      },
      {
        nextQuestion: "2",
        option: "Donation",
        result: null,
      },
      {
        nextQuestion: "3",
        option: "Attestation de recasement ",
        result: null,
      },
      {
        nextQuestion: "4",
        option: "Titre foncier",
        result: null,
      },
    ],
  },
  {
    id: "2",
    question: "Dans quel cas la vente ou la donation se réalise ?",
    answers: [
      {
        nextQuestion: null,
        option: "Vente (ou Donation) de Morcellement de titre foncier",
        result: {
          message:
            "Géneration de l'Acte de Vente (ou Donation) de Morcellement de titre foncier",
          url: "https://res.cloudinary.com/digitact-storage/raw/upload/v1629218104/documents/acte_de_vente_mu4sh7",
        },
      },
      {
        nextQuestion: null,
        option: "Vente (ou Donation) avec Titre foncier",
        result: {
          message:
            "Géneration de l'Acte de Vente (ou Donation) avec Titre foncier",
          url: "https://res.cloudinary.com/digitact-storage/raw/upload/v1629218104/documents/acte_de_vente_mu4sh7",
        },
      },
      {
        nextQuestion: null,
        option: "Vente (ou Donation) avec Attestation de recasement",
        result: {
          message:
            "Géneration de l'Acte de Vente (ou Donation) avec Attestation de recasement",
          url: "https://res.cloudinary.com/digitact-storage/raw/upload/v1629218104/documents/acte_de_vente_mu4sh7",
        },
      },
      {
        nextQuestion: null,
        option: "Vente (ou Donation) avec convention de vente",
        result: {
          message:
            "Géneration de l'Acte de Vente (ou Donation) avec convention de vente",
          url: "https://res.cloudinary.com/digitact-storage/raw/upload/v1629218104/documents/acte_de_vente_mu4sh7",
        },
      },
    ],
  },
  {
    id: "3",
    question: "Quel document le vendeur possede t'il sur son bien ?",
    answers: [
      {
        nextQuestion: null,
        option: "Acte de vente",
        result: {
          message:
            "Génération d'une lettre de demande d'une attestation de recasement à partir de l'acte de vente",
          url: "https://res.cloudinary.com/digitact-storage/raw/upload/v1629218104/documents/acte_de_vente_mu4sh7",
        },
      },
      {
        nextQuestion: null,
        option: "Convention de vente",
        result: {
          message:
            "Génération d'une lettre de demande d'une attestation de recasement à partir de la convention de vente",
          url: "https://res.cloudinary.com/digitact-storage/raw/upload/v1629218104/documents/acte_de_vente_mu4sh7",
        },
      },
      {
        nextQuestion: null,
        option: "Attestation de recasement du précedent propriétaire",
        result: {
          message:
            "Génération d'une lettre de mutation d'attestation de recasement",
          url: "https://res.cloudinary.com/digitact-storage/raw/upload/v1629218104/documents/acte_de_vente_mu4sh7",
        },
      },
    ],
  },
  {
    id: "4",
    question: "Quel document le vendeur possede t'il sur son bien ?",
    answers: [
      {
        nextQuestion: null,
        option: "Attestation de recasement",
        result: {
          message: "Génération d'une lettre de demande d'un titre foncier",
          url: "https://res.cloudinary.com/digitact-storage/raw/upload/v1629218104/documents/acte_de_vente_mu4sh7",
        },
      },
      {
        nextQuestion: "5",
        option: "Titre foncier",
        result: null,
      },
    ],
  },
  {
    id: "5",
    question: "Que voulez-vous faire avec le titre foncier ?",
    answers: [
      {
        nextQuestion: null,
        option: "Morcellement d'un titre foncier",
        result: {
          message: "Génération d'une lettre de morcellement d'un titre foncier",
          url: "https://res.cloudinary.com/digitact-storage/raw/upload/v1629218104/documents/acte_de_vente_mu4sh7",
        },
      },
      {
        nextQuestion: null,
        option: "Mutation d'un titre foncier",
        result: {
          message: "Génération d'une lettre de mutation d'un titre foncier",
          url: "https://res.cloudinary.com/digitact-storage/raw/upload/v1629218104/documents/acte_de_vente_mu4sh7",
        },
      },
    ],
  },
];
