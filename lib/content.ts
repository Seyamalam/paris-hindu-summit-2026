export const event = {
  name: "Paris Assembly",
  descriptor: "Global Solidarity Summit for Bangladeshi Hindus",
  theme: "Justice for Bangladeshi Hindus, Solidarity Without Borders",
  dates: "3–4 October 2026",
  venue: "Salle des Princes",
  address: "12 Rue de Stalingrad, 93700 Drancy, Paris, France",
}

export const navItems = [
  { href: "/about", label: "About" },
  { href: "/programme", label: "Programme" },
  { href: "/speakers", label: "Speakers" },
  { href: "/regional", label: "Regional" },
  { href: "/engage", label: "Engage" },
  { href: "/partners", label: "Partners" },
  { href: "/media", label: "Media" },
  { href: "/support", label: "Support" },
]

export const regionalFallback = [
  {
    slug: "pakistan",
    name: "Pakistan",
    code: "PK",
    eyebrow: "Minority protection",
    headline: "Equal citizenship must be enforceable.",
    summary:
      "A regional dialogue on safeguarding worship, representation, personal security, and equal access to public life.",
    detail:
      "The forum connects documented experience with practical protections, accountable institutions, and sustained international attention.",
    sourceUrl: null,
    imageUrl: null,
    order: 1,
  },
  {
    slug: "afghanistan",
    name: "Afghanistan",
    code: "AF",
    eyebrow: "Community continuity",
    headline: "Historic communities must not disappear unseen.",
    summary:
      "Documentation, cultural continuity, safe passage, and the protection of displaced Hindu and Sikh families remain urgent concerns.",
    detail:
      "The regional programme creates space for evidence, heritage protection, and cooperation with communities living in displacement.",
    sourceUrl: null,
    imageUrl: null,
    order: 2,
  },
  {
    slug: "myanmar",
    name: "Myanmar",
    code: "MM",
    eyebrow: "Freedom and belonging",
    headline: "Rights do not stop at a border.",
    summary:
      "The conversation examines citizenship, displacement, religious freedom, and the security of vulnerable communities.",
    detail:
      "Regional specialists will connect local testimony to international standards and durable protection mechanisms.",
    sourceUrl: null,
    imageUrl: null,
    order: 3,
  },
  {
    slug: "nepal",
    name: "Nepal",
    code: "NP",
    eyebrow: "Regional cooperation",
    headline: "Shared heritage can support shared responsibility.",
    summary:
      "Nepal joins the regional section through dialogue on constitutional secularism, equal citizenship, heritage, and cross-border cooperation.",
    detail:
      "Its inclusion broadens Beyond Bangladesh into a platform where South Asian institutions can exchange practical lessons and commitments.",
    sourceUrl: null,
    imageUrl: null,
    order: 4,
  },
] as const

export const partnerFallback = [
  {
    slug: "institutional-partners",
    name: "Institutional partners",
    kind: "partner",
    tier: "strategic",
    description: "Host, policy, and international cooperation organisations.",
    websiteUrl: null,
    logoUrl: null,
    order: 1,
  },
  {
    slug: "research-network",
    name: "Research & evidence network",
    kind: "partner",
    tier: "knowledge",
    description:
      "Researchers, archives, legal experts, and documentation partners.",
    websiteUrl: null,
    logoUrl: null,
    order: 2,
  },
  {
    slug: "diaspora-organisations",
    name: "Diaspora organisations",
    kind: "partner",
    tier: "community",
    description:
      "Community organisations carrying the summit into local action.",
    websiteUrl: null,
    logoUrl: null,
    order: 3,
  },
  {
    slug: "summit-supporters",
    name: "Summit supporters",
    kind: "sponsor",
    tier: "supporting",
    description:
      "Organisations supporting access, translation, travel, and production.",
    websiteUrl: null,
    logoUrl: null,
    order: 4,
  },
] as const

export const speakers = [
  {
    name: "Dr. Richard L. Benkin",
    role: "President · Geopolitical analyst and human-rights advocate",
    country: "United States",
    image: "/people/richard-benkin.jpg",
    bio: "For two decades, Dr. Benkin has documented the persecution of Hindus in Bangladesh, gathered evidence on the ground, and advocated internationally for people facing captivity and human-rights abuses.",
  },
  {
    name: "Aditya Trivedi",
    role: "Joint Cultural Affairs Secretary · Counsel and strategic advisor",
    country: "India",
    image: "/people/aditya-trivedi.jpg",
    bio: "A New Delhi-based counsel working at the intersection of law, governance, economic policy, and civilisational rights, with experience at UNCTAD, the European Commission and Y20 India.",
  },
  {
    name: "Dipan Mitra",
    role: "Organizing Secretary · Education specialist",
    country: "France",
    image: "/people/dipan-mitra.jpg",
    bio: "President of the Bureau of Human Rights and Justice in France and a former BRAC University senior researcher whose work advances human rights, social harmony, and Hindu community welfare.",
  },
  {
    name: "Indranil Bhowmik",
    role: "Cultural Affairs Secretary · Filmmaker",
    country: "India",
    image: "/people/indranil-bhowmik.jpg",
    bio: "A filmmaker, creative producer, and former photojournalist creating documentary and human-interest work across culture, heritage, development, and the history of Partition.",
  },
  {
    name: "Suvra Dev Kar",
    role: "Vice President · FoRB advocate",
    country: "Bangladesh",
    image: "/people/suvra-dev-kar.jpg",
    bio: "A leading freedom-of-religion-or-belief advocate who documents violations, builds interfaith and policy initiatives, and equips vulnerable communities through digital safety and youth programmes.",
  },
]

export const committee = [
  ["Dr. Richard L. Benkin", "President"],
  ["Khalid Ahsas", "Vice President"],
  ["Richa Gautam", "Vice President"],
  ["Suvra Dev Kar", "Vice President"],
  ["Pushpita Prasad", "Vice President"],
  ["Sudha Jagannathan", "Vice President"],
  ["Dipan Mitra", "Organizing Secretary"],
  ["Sujit Chakrabarty", "Joint Organizing Secretary"],
  ["Mithun Kumar Das", "Joint Organizing Secretary"],
  ["Jony Sharma", "Assistant Organizing Secretary"],
  ["Dr. Wahidullah Shirzad", "Organizing Executive"],
  ["Dr. Obaidullah Baweri", "Organizing Executive"],
  ["Dulal Chandra Das", "Organizing Executive"],
  ["Rahul Kumar Das", "Organizing Executive"],
  ["Gobinda Saha", "Organizing Executive"],
  ["Indranil Bhowmik", "Cultural Affairs Secretary"],
  ["Advocate Aditya Trivedi", "Joint Cultural Affairs Secretary"],
  ["Charan Singh", "Board Member"],
] as const

export const dayOne = [
  ["08:30", "Tea and registration", "Arrival, accreditation and welcome."],
  [
    "09:30",
    "Opening audiovisual",
    "A visual record of testimony and the summit’s purpose.",
  ],
  [
    "10:00",
    "Keynote address",
    "Justice, citizenship and the international responsibility to act.",
  ],
  [
    "11:00",
    "Panel I · Understand",
    "History, demographics, constitutional change and documented violence.",
  ],
  [
    "13:00",
    "Networking lunch",
    "Delegates, researchers, media and partner organisations.",
  ],
  [
    "14:30",
    "Panel II · Engage",
    "Testimony, protection, legal remedies and the seven-point charter.",
  ],
  [
    "16:30",
    "Day one closing",
    "Evidence gathered, priorities named and questions carried forward.",
  ],
]

export const dayTwo = [
  [
    "09:00",
    "Opening presentation",
    "From evidence to international coordination.",
  ],
  [
    "09:30",
    "Sessions 1 and 2",
    "Rapid response, risk assessment and prevention mechanisms.",
  ],
  ["11:30", "Tea break", "Informal exchange and bilateral conversations."],
  [
    "12:00",
    "Policy roundtable",
    "Human-rights standards, justice, property rights and legal protection.",
  ],
  [
    "14:30",
    "Sessions 3 and 4",
    "Partnerships, early warning, research, media and public awareness.",
  ],
  [
    "16:00",
    "Paris Declaration",
    "Adoption of a common agenda and sustained advocacy framework.",
  ],
  ["17:00", "Agni Sakshi", "Sacred pledge ceremony witnessed in solidarity."],
  [
    "17:45",
    "Closing remarks",
    "Commitments, next actions and the standing international network.",
  ],
]

export const evidence = [
  {
    value: "22.05%",
    label: "Hindu share of East Pakistan’s population in the 1951 census",
  },
  {
    value: "7.5%",
    label: "Hindu share of Bangladesh’s population in the 2022 census",
  },
  {
    value: "2,710",
    label: "Incidents recorded by BHBCUC from August 2024 to December 2025",
  },
  {
    value: "505",
    label: "Incidents recorded across 62 districts from January to May 2026",
  },
]

export const charter = [
  "A comprehensive Minority Protection Act with real enforcement",
  "A National Minority Commission empowered to investigate complaints",
  "An Elimination of Discrimination Act covering employment, education, and public life",
  "An Intestate Property Protection Act securing inheritance rights",
  "Full implementation of the Vested Property Return Act",
  "Proper implementation of the Chittagong Hill Tracts Peace Accord and Hill Land Commission Act",
  "A separate Land Commission for plains-dwelling Adivasi and minority communities",
]
