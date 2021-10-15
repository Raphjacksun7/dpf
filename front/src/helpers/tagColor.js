export default function tagColor(tagName) {
  switch (tagName) {
    case "VERIFICATION":
      return "tag-verification";
    case "EN VERIFICATION":
      return "tag-verification";
    case "A TRAITER":
      return "tag-treating";
    case "EN TRAITEMENT":
      return "tag-treating";
    case "REVISION":
      return "tag-review";
    case "A SIGNÉ":
      return "tag-to-signed";
    case "V-FINANCE":
      return "tag-finance-review";
    case "FINALISÉ":
      return "tag-finalised";
    case "ANNULÉ":
      return "tag-cancel";
    case "ACTE":
      return "tag-acte";
    case "LETTRE":
      return "tag-letter";
    case "LETTER":
      return "tag-letter";
    case "JUSTIFICATIF":
      return "tag-justificatif";
    default:
      return "tag-verification";
  }
}
