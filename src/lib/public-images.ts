const AGENCY_LOGO_PATHS: Record<string, string> = {
  DOH: "/agenices/doh.png",
  DEPED: "/agenices/deped.png",
  DA: "/agenices/agri.png",
  DSWD: "/agenices/dswd.png",
  DPWH: "/agenices/dpwh.png",
  DILG: "/agenices/dilg.jpg",
  NEDA: "/agenices/neda.jpg",
};

const SECRETARY_PHOTO_PATHS: Record<string, string> = {
  "Teodoro J. Herbosa": "/officials/teodoro.jpg",
  "Juan Edgardo Sonny Angara": "/officials/juanedgardo.jpg",
  "Francisco P. Tiu Laurel Jr.": "/officials/francisco.png",
  "Rexlon T. Gatchalian": "/officials/rexlon.jpg",
  "Manuel M. Bonoan": "/officials/manuelbonoan.jpg",
  "Arsenio M. Balisacan": "/officials/arsenio.png",
  "Juanito Victor C. Remulla Jr.": "/officials/juanito.jpg",
};

const OFFICIAL_PHOTO_PATHS: Record<string, string> = {
  "Risa Hontiveros": "/officials/hontiveros.png",
  "Francis Escudero": "/officials/escudero.png",
  "Raffy Tulfo": "/officials/rtulfo.png",
  "Robin Padilla": "/officials/padilla.png",
  "Loren Legarda": "/officials/legarda.png",
  "Sherwin Gatchalian": "/officials/gatchalian.png",
  "Mark Villar": "/officials/mvillar.png",
  "Alan Peter Cayetano": "/officials/acayetano.png",
  "Juan Miguel Zubiri": "/officials/zubiri.png",
  "Joel Villanueva": "/officials/villanueva.png",
  "JV Ejercito": "/officials/ejercito.png",
  "Jinggoy Estrada": "/officials/estrada.png",
  "Bong Go": "/officials/go.png",
  "Bam Aquino": "/officials/aquino.png",
  "Ronald dela Rosa": "/officials/delarosa.png",
  "Erwin Tulfo": "/officials/etulfo.png",
  "Kiko Pangilinan": "/officials/pangilinan.png",
  "Rodante Marcoleta": "/officials/marcoleta.png",
  "Panfilo Lacson": "/officials/lacson.png",
  "Tito Sotto": "/officials/sotto.png",
  "Pia Cayetano": "/officials/pcayetano.png",
  "Camille Villar": "/officials/cvillar.png",
  "Lito Lapid": "/officials/lapid.png",
  "Imee Marcos": "/officials/marcos.png",
};

export function getAgencyLogoPath(acronym: string) {
  return AGENCY_LOGO_PATHS[String(acronym ?? "").toUpperCase()] ?? "";
}

export function getAgencySecretaryPhotoPath(secretaryName: string) {
  return SECRETARY_PHOTO_PATHS[String(secretaryName ?? "").trim()] ?? "";
}

export function getOfficialPhotoPath(officialName: string) {
  return OFFICIAL_PHOTO_PATHS[String(officialName ?? "").trim()] ?? "";
}