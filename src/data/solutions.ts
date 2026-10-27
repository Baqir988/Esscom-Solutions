import type { Solution, SolutionNavigation } from "@/types/solution";

// Published means included in the brief-approved website scope, not verified stock or product certification.
export const solutions: Solution[] = [
  {
    slug: "cctv-surveillance",
    title: "CCTV & Surveillance Systems",
    shortTitle: "CCTV & Surveillance",
    icon: "camera",
    visual: "camera",
    published: true,
    shortDescription:
      "Bring visibility to entrances, shared spaces, and site activity with cameras, recording equipment, and monitoring systems.",
    metaDescription:
      "Explore ESSCOM CCTV and surveillance solutions: indoor and outdoor cameras, video recording, monitoring applications, and equipment selection.",
    heroTitle: "A clearer view of the spaces that matter.",
    heroDescription:
      "Explore camera, recording, and monitoring options for commercial and institutional environments.",
    overview: [
      "CCTV brings camera views and video recording together to help an organization observe activity in selected areas. A useful system begins with a clear purpose: understanding who enters a building, observing shared spaces, or reviewing activity around a site.",
      "The reference range includes indoor and outdoor cameras, dome cameras, video recording equipment, and mounting accessories. Choosing a suitable combination depends on the environment, the views required, and how recordings will be managed. Specific models and specifications should be confirmed for each requirement.",
    ],
    features: [
      {
        title: "Indoor and outdoor coverage",
        description:
          "Plan camera locations around entrances, circulation areas, and external spaces, with equipment appropriate to each environment.",
      },
      {
        title: "Camera formats",
        description:
          "Consider dome and other camera formats according to mounting position, the required view, and the surrounding space.",
      },
      {
        title: "Video recording",
        description:
          "Pair cameras with compatible recording equipment and define how recorded footage needs to be accessed and retained.",
      },
      {
        title: "Monitoring arrangements",
        description:
          "Identify where camera views will be observed and who needs access to live or recorded information.",
      },
    ],
    equipment: [
      {
        id: "cctv-cameras",
        title: "CCTV cameras",
        visual: "camera",
        description:
          "Indoor, outdoor, and dome camera categories for different viewing and mounting requirements.",
      },
      {
        id: "video-recording",
        title: "Video recording equipment",
        visual: "camera",
        description:
          "Recording hardware selected to work with the chosen camera system and recording requirements.",
      },
      {
        id: "camera-accessories",
        title: "Mounting & camera accessories",
        visual: "camera",
        description:
          "Brackets, housings, and supporting components considered as part of the complete installation.",
      },
    ],
    applications: [
      {
        title: "Offices & commercial premises",
        description:
          "Observe reception areas, entrances, shared corridors, and selected operational spaces.",
      },
      {
        title: "Education & institutions",
        description:
          "Consider coverage around building entrances and common areas, according to site policies.",
      },
      {
        title: "Retail environments",
        description:
          "Review camera placement around sales floors, transaction areas, and stock access points.",
      },
    ],
    benefits: [
      {
        title: "More informed observation",
        description:
          "Bring selected areas into view to support staff responsible for site oversight.",
      },
      {
        title: "A record for review",
        description:
          "Recorded footage can provide context when reviewing activity, subject to the configured recording arrangement.",
      },
      {
        title: "Coverage with a purpose",
        description:
          "A site-led plan helps connect equipment choices to the areas that actually need attention.",
      },
    ],
    considerations: [
      "Which areas need coverage, and what needs to be visible?",
      "What lighting, mounting, and environmental conditions apply?",
      "Who will monitor the system, and what recording period is needed?",
    ],
    faqs: [
      {
        question:
          "What is the difference between an indoor and an outdoor camera?",
        answer:
          "The installation environment affects camera selection. Outdoor locations need equipment suitable for the conditions at that location, while indoor selection may place more emphasis on mounting and the required view. Confirm environmental suitability in the selected model’s current datasheet.",
      },
      {
        question: "Does a dome camera suit every location?",
        answer:
          "No single camera format suits every requirement. Dome cameras are one option in the reference range; the viewing area, mounting position, lighting, and intended use should guide the choice.",
      },
      {
        question: "Can existing cameras be retained?",
        answer:
          "Possibly, but compatibility must be assessed. Existing camera interfaces, recording equipment, cabling, and the desired monitoring arrangement need to be reviewed before confirming a combined system.",
      },
      {
        question: "How much recording storage will be needed?",
        answer:
          "That depends on the number of cameras, selected recording settings, and retention requirement. This category overview does not prescribe a storage size or promise a recording duration.",
      },
    ],
    relatedSlugs: [
      "biometric-access-control",
      "queue-management",
      "digital-signage",
    ],
    sourceReference:
      "CONTENT_VERIFICATION.md: CCTV Solutions, cached C11 and C35–C39.",
  },
  {
    slug: "biometric-access-control",
    title: "Biometric Attendance & Access Control",
    shortTitle: "Attendance & Access",
    icon: "fingerprint",
    visual: "biometric",
    published: true,
    shortDescription:
      "Connect attendance recording and entry requirements with biometric terminals, RFID readers, and access-control equipment.",
    metaDescription:
      "Explore fingerprint and facial attendance, RFID readers, access terminals, electronic locks, and attendance management concepts with ESSCOM.",
    heroTitle: "A considered approach to attendance and entry.",
    heroDescription:
      "Understand the equipment behind attendance records and controlled access to workplace and institutional spaces.",
    overview: [
      "Attendance and access control address related but distinct needs. An attendance terminal records an identification event for attendance management; an access-control arrangement determines entry at a controlled point. The right design begins by deciding which of these functions is required.",
      "The supplied profile includes fingerprint and facial attendance systems, RFID readers and cards, access terminals, electronic and magnetic locks, exit buttons, and attendance-management software. These form a category-level reference, with compatibility and current software capabilities to be confirmed before selection.",
    ],
    features: [
      {
        title: "Fingerprint attendance",
        description:
          "Fingerprint-based terminals provide an identification method for recording attendance events.",
      },
      {
        title: "Facial attendance",
        description:
          "Facial attendance is another terminal category in the reference range. Suitability depends on the device and its intended environment.",
      },
      {
        title: "RFID identification",
        description:
          "Readers and compatible cards provide a card-based approach to identification and controlled entry.",
      },
      {
        title: "Controlled access points",
        description:
          "Access terminals, suitable locks, and exit controls need to be considered together for each door or entry point.",
      },
    ],
    equipment: [
      {
        id: "attendance-terminals",
        title: "Biometric attendance terminals",
        visual: "biometric",
        description:
          "Fingerprint and facial attendance equipment for recording identification events.",
      },
      {
        id: "rfid-readers",
        title: "RFID access-control equipment",
        visual: "rfid",
        description:
          "Readers and compatible cards for card-based identification at access points.",
      },
      {
        id: "electronic-locks",
        title: "Electronic locks & exit controls",
        visual: "rfid",
        description:
          "Electronic, magnetic, and bolt-lock categories with appropriate supporting exit controls.",
      },
    ],
    applications: [
      {
        title: "Corporate workplaces",
        description:
          "Consider employee attendance recording and entry arrangements for selected office areas.",
      },
      {
        title: "Education & institutions",
        description:
          "Plan staff attendance and controlled access to designated administrative or operational rooms.",
      },
      {
        title: "Shared facilities",
        description:
          "Match identification methods and access rules to the different groups using a building.",
      },
    ],
    benefits: [
      {
        title: "Structured attendance records",
        description:
          "Terminal events can support a more consistent basis for attendance review, depending on the selected software.",
      },
      {
        title: "Defined entry arrangements",
        description:
          "Identify which people need access to which areas and select equipment around that requirement.",
      },
      {
        title: "Choice of identification method",
        description:
          "Compare fingerprint, facial, and card-based options against practical workplace needs.",
      },
    ],
    considerations: [
      "Is the priority attendance, entry control, or both?",
      "Which identification method is appropriate for the people using the system?",
      "How should software, door hardware, exit arrangements, and existing systems work together?",
    ],
    faqs: [
      {
        question: "Are attendance and door access the same function?",
        answer:
          "No. Attendance records identification events for attendance management, while access control governs entry. Some equipment may support both, but the required functions and compatibility must be confirmed for the proposed system.",
      },
      {
        question: "Can RFID cards be used instead of biometrics?",
        answer:
          "RFID readers and cards are included in the reference range. Whether a card-based method meets the requirement depends on the selected readers, cards, access equipment, and operating rules.",
      },
      {
        question: "Will attendance software connect to our existing HR system?",
        answer:
          "That should be assessed before selection. The profile references attendance-management software, but it does not establish compatibility with a particular current HR or payroll system. No integration is assumed in this overview.",
      },
      {
        question:
          "What information should be considered before selecting terminals?",
        answer:
          "Clarify the number of users, identification method, attendance workflow, access points, and software requirements. Agree how identification data and attendance records will be handled, who may access them, and which organizational policies apply.",
      },
    ],
    relatedSlugs: ["cctv-surveillance", "queue-management", "digital-signage"],
    sourceReference:
      "CONTENT_VERIFICATION.md: Time Attendance & Access Control, cached C11–C26.",
  },
  {
    slug: "queue-management",
    title: "Queue Management Systems",
    shortTitle: "Queue Management",
    icon: "queue",
    visual: "queue",
    published: true,
    shortDescription:
      "Give service visits a clear sequence with ticket-based queues, counter displays, and an organized customer flow.",
    metaDescription:
      "Explore ticket-based queue management, counter displays, customer flow, and applications in banking, healthcare, and public-service environments.",
    heroTitle: "Bring clarity to every step of the queue.",
    heroDescription:
      "A visible sequence from arrival to the service counter, built around the way your organization serves people.",
    overview: [
      "Queue management gives a service visit an understandable sequence: obtain a ticket, wait for the relevant number, and proceed to the indicated counter. A clear relationship between tickets, displays, and counter organization helps visitors understand the next step.",
      "The supplied profile describes an ESS-Queue Management System and illustrates ticket numbers and counter displays. It references banking, healthcare, public agencies, utilities, and service organizations as application areas. These references support the category overview; they do not establish current system specifications or ESSCOM client relationships.",
    ],
    features: [
      {
        title: "Ticket-based sequence",
        description:
          "A numbered ticket provides the visitor with a place in the service sequence.",
      },
      {
        title: "Counter displays",
        description:
          "Visible ticket and counter information helps visitors identify where to go when called.",
      },
      {
        title: "Customer-flow planning",
        description:
          "Consider the relationship between arrival, ticket collection, waiting space, and service counters.",
      },
      {
        title: "Service-counter organization",
        description:
          "Match the proposed queue arrangement to counter roles and the types of service being provided.",
      },
    ],
    equipment: [
      {
        id: "ticket-equipment",
        title: "Ticket-issuing equipment",
        visual: "queue",
        description:
          "A ticket point at the start of the visitor journey, selected around the required queue arrangement.",
      },
      {
        id: "queue-displays",
        title: "Queue display systems",
        visual: "queue",
        description:
          "Number and counter displays positioned for visibility within the waiting area.",
      },
      {
        id: "counter-arrangement",
        title: "Counter equipment",
        visual: "queue",
        description:
          "Counter-side equipment considered as part of the selected ticket and display system.",
      },
    ],
    applications: [
      {
        title: "Banking & finance",
        description:
          "Organize visits to transaction and customer-service counters with a visible queue sequence.",
      },
      {
        title: "Healthcare reception",
        description:
          "Support the administrative journey through registration or other service desks; clinical priorities remain a separate process.",
      },
      {
        title: "Public agencies & utilities",
        description:
          "Make the next service step clearer in busy enquiry, payment, and public-facing counter environments.",
      },
    ],
    benefits: [
      {
        title: "A clearer next step",
        description:
          "Tickets and visible counter information can reduce uncertainty about where a visitor should go next.",
      },
      {
        title: "More orderly waiting",
        description:
          "A defined sequence offers an alternative to an informal line around the service desk.",
      },
      {
        title: "A shared service reference",
        description:
          "Visitors and counter staff can refer to the same ticket number during the service process.",
      },
    ],
    considerations: [
      "What services are offered, and how many counters handle them?",
      "Where will tickets be collected and displays be visible?",
      "How should staff manage different service needs within the agreed queue process?",
    ],
    faqs: [
      {
        question: "How does a ticket-based queue work?",
        answer:
          "A visitor receives a numbered ticket and waits until the corresponding number is shown with the service counter. The exact issuing and calling arrangement depends on the chosen system and the organization’s workflow.",
      },
      {
        question: "Which settings are suitable for queue management?",
        answer:
          "The profile lists banks, healthcare, public agencies, utilities, and other service organizations. These are potential applications where visitors move through a waiting area to service counters, not a list of verified ESSCOM clients.",
      },
      {
        question: "Does the system include online booking, SMS, or analytics?",
        answer:
          "Those features have not been verified in the supplied material and are not promised here. If they are required, they should be evaluated separately against the current system specifications.",
      },
      {
        question: "Can a queue system guarantee shorter waiting times?",
        answer:
          "No waiting-time reduction is guaranteed. A queue system can help communicate and organize the sequence, while actual waiting time also depends on staffing, demand, service duration, and operating procedures.",
      },
    ],
    relatedSlugs: [
      "digital-signage",
      "cctv-surveillance",
      "biometric-access-control",
    ],
    sourceReference:
      "CONTENT_VERIFICATION.md: ESS-Queue Management System, cached C29–C35.",
  },
  {
    slug: "point-of-sale",
    title: "Point-of-Sale Solutions",
    shortTitle: "Point of Sale",
    icon: "pos",
    visual: "pos",
    published: true,
    shortDescription:
      "Build a practical transaction workspace with POS terminals, barcode scanners, receipt printers, and supporting hardware.",
    metaDescription:
      "Explore POS terminals, barcode scanners, electronic cash registers, thermal printers, cash drawers, and hardware selection for commercial settings.",
    heroTitle: "A more considered transaction workspace.",
    heroDescription:
      "Explore the hardware behind scanning, recording, receipt printing, and everyday counter transactions.",
    overview: [
      "A point-of-sale workspace brings together the equipment used to handle a transaction. The combination may include a terminal or electronic cash register, barcode scanner, receipt printer, cash drawer, and supporting accessories.",
      "The reference range includes these hardware categories, as well as printer paper and related peripherals. The appropriate arrangement depends on the sales process, available counter space, and compatibility with the software in use. This overview does not indicate stock, prices, payment-processing support, or current product specifications.",
    ],
    features: [
      {
        title: "Terminal-based operation",
        description:
          "POS terminals provide the operator interface for compatible sales software and connected peripherals.",
      },
      {
        title: "Barcode input",
        description:
          "Barcode scanners provide an input method for item identification in a suitable transaction workflow.",
      },
      {
        title: "Receipt printing",
        description:
          "Thermal printers and compatible paper support printed receipts at the transaction point.",
      },
      {
        title: "Counter peripherals",
        description:
          "Cash drawers, registers, and hardware accessories should be selected as part of the overall workspace.",
      },
    ],
    equipment: [
      {
        id: "pos-terminals",
        title: "POS terminals",
        visual: "pos",
        description:
          "Operator terminals selected to suit compatible sales software and counter requirements.",
      },
      {
        id: "barcode-scanners",
        title: "Barcode scanners",
        visual: "pos",
        description:
          "Scanner categories for bringing barcode information into the sales workflow.",
      },
      {
        id: "receipts-registers",
        title: "Printers, registers & cash drawers",
        visual: "pos",
        description:
          "Thermal printers, electronic cash registers, cash drawers, and supporting accessories.",
      },
    ],
    applications: [
      {
        title: "Retail counters",
        description:
          "Bring item entry, transaction operation, and receipt printing into a practical sales-counter arrangement.",
      },
      {
        title: "Commercial service desks",
        description:
          "Select transaction hardware around the services being recorded and the receipts required.",
      },
      {
        title: "Stores with barcode workflows",
        description:
          "Consider scanners and terminal compatibility where products are identified using barcodes.",
      },
    ],
    benefits: [
      {
        title: "An organized counter",
        description:
          "Consider the placement of terminals and peripherals together to make better use of working space.",
      },
      {
        title: "Consistent item input",
        description:
          "Compatible scanners can support barcode-based item entry within the chosen software workflow.",
      },
      {
        title: "A suitable hardware combination",
        description:
          "Selecting the terminal, printer, and accessories together helps identify interface and compatibility needs early.",
      },
    ],
    considerations: [
      "Which sales software and peripheral interfaces are required?",
      "How much counter space is available for the operator and customer?",
      "What receipt, barcode, register, and cash-handling needs apply?",
    ],
    faqs: [
      {
        question: "What equipment makes up a POS system?",
        answer:
          "A typical hardware arrangement may include a POS terminal or electronic cash register, barcode scanner, receipt printer, and cash drawer. The final combination should follow the transaction workflow and software requirements.",
      },
      {
        question: "Can any printer or scanner connect to a POS terminal?",
        answer:
          "Compatibility should not be assumed. Interfaces, drivers, software support, and the intended peripheral functions need to be checked against current equipment documentation.",
      },
      {
        question: "Are POS software and payment services included?",
        answer:
          "This page describes hardware categories. Software licensing, features, payment services, and any integrations require separate confirmation and are not included by implication.",
      },
      {
        question: "Are the equipment categories available to purchase now?",
        answer:
          "These are reference categories rather than a live stock list. Current models, pricing, availability, and warranty terms must be confirmed before an order or equipment selection.",
      },
    ],
    relatedSlugs: [
      "cctv-surveillance",
      "digital-signage",
      "biometric-access-control",
    ],
    sourceReference:
      "CONTENT_VERIFICATION.md: Point of Sales Solution, cached C11 and C29.",
  },
  {
    slug: "digital-signage",
    title: "Digital Signage & Display Systems",
    shortTitle: "Digital Signage",
    icon: "display",
    visual: "display",
    published: true,
    shortDescription:
      "Make information visible with digital signage and LED/SMD displays suited to shared, commercial, and public-facing spaces.",
    metaDescription:
      "Explore digital signage, LED and SMD screens, outdoor display considerations, and commercial and corporate communication applications with ESSCOM.",
    heroTitle: "The right information, in the right place.",
    heroDescription:
      "Explore display systems for communicating with visitors, customers, and people across your organization.",
    overview: [
      "Digital signage uses screens to present information in a shared space. A display may support visitor guidance, commercial communication, or information for staff. Its usefulness depends on the audience, viewing location, and the clarity of the content being shown.",
      "The supplied profile includes digital signage and LED/SMD screen categories, including outdoor displays. Selection should consider the installation environment, viewing distance, content, and supporting equipment. No particular resolution, brightness, playback platform, or remote-management feature is assumed in this overview.",
    ],
    features: [
      {
        title: "LED & SMD screen categories",
        description:
          "Explore display options around the intended viewing area and the type of information being presented.",
      },
      {
        title: "Outdoor display planning",
        description:
          "Consider environmental suitability, placement, and visibility when evaluating an outdoor display.",
      },
      {
        title: "Commercial information",
        description:
          "Use screens to present clearly arranged messages, directions, or commercial information in suitable spaces.",
      },
      {
        title: "Corporate communication",
        description:
          "Consider reception and shared workplace locations where a visible information point would be useful.",
      },
    ],
    equipment: [
      {
        id: "signage-screens",
        title: "Digital signage screens",
        visual: "display",
        description:
          "Information display categories for reception, shared spaces, and commercial communication.",
      },
      {
        id: "led-smd-displays",
        title: "LED & SMD display systems",
        visual: "display",
        description:
          "Screen and display-module categories evaluated against the intended installation and viewing requirements.",
      },
      {
        id: "outdoor-displays",
        title: "Outdoor display equipment",
        visual: "display",
        description:
          "Outdoor display categories whose environmental and installation specifications need confirmation.",
      },
    ],
    applications: [
      {
        title: "Reception & shared offices",
        description:
          "Present visitor information or internal notices at a suitable point in the workplace.",
      },
      {
        title: "Retail & commercial spaces",
        description:
          "Communicate product information, directions, or scheduled messages to people in the space.",
      },
      {
        title: "Public-facing environments",
        description:
          "Consider display locations for guidance and general information in service or institutional settings.",
      },
    ],
    benefits: [
      {
        title: "A visible information point",
        description:
          "Place relevant messages where the intended audience is likely to see them.",
      },
      {
        title: "Content suited to its setting",
        description:
          "Plan the amount of information, text size, and viewing distance together.",
      },
      {
        title: "A coherent communication layout",
        description:
          "Coordinate screen placement with reception, service counters, and other information sources.",
      },
    ],
    considerations: [
      "Who needs to see the display, and from what distance?",
      "Will it operate indoors or outdoors, and where can it be mounted?",
      "What content and playback arrangement are required?",
    ],
    faqs: [
      {
        question: "What are digital signage screens used for?",
        answer:
          "They can present information to people in a shared space, such as visitor guidance, commercial messages, or workplace notices. The content and location should follow the needs of the intended audience.",
      },
      {
        question: "Can an indoor screen be used outdoors?",
        answer:
          "Suitability must be checked for the specific model and location. Outdoor use has environmental and visibility requirements that should be assessed before selecting equipment; indoor suitability does not imply outdoor suitability.",
      },
      {
        question: "Does digital signage include a content-management platform?",
        answer:
          "A particular platform, remote control function, or cloud service is not verified by the source material. Playback equipment, software, licensing, and content-update requirements need to be confirmed separately.",
      },
      {
        question: "How should screen size and specifications be selected?",
        answer:
          "Start with the audience, viewing distance, available space, installation environment, and type of content. Current display specifications should then be evaluated against those needs rather than selected from a generic claim.",
      },
    ],
    relatedSlugs: ["queue-management", "point-of-sale", "cctv-surveillance"],
    sourceReference:
      "CONTENT_VERIFICATION.md: Digital Signage / SMD Screens, cached C43–C44.",
  },
];

export const publishedSolutions = solutions.filter(
  (solution) => solution.published,
);
export const solutionHref = (slug: string) => `/solutions/${slug}/`;
export function getSolution(slug: string) {
  return publishedSolutions.find((solution) => solution.slug === slug);
}
export function getRelatedSolutions(solution: Solution) {
  return solution.relatedSlugs.flatMap((slug) => {
    const related = getSolution(slug);
    return related && related.slug !== solution.slug ? [related] : [];
  });
}
// Pass only this small projection into the client navbar, not the complete editorial content.
export const solutionNavigation: SolutionNavigation[] = publishedSolutions.map(
  ({ slug, shortTitle, icon }) => ({
    slug,
    shortTitle,
    icon,
    href: solutionHref(slug),
  }),
);

export const unverifiedCategories = [
  {
    slug: "it-communication",
    title: "IT & Communication Solutions",
    published: false,
    reason: "ESSCOM attribution and current service scope require approval.",
  },
] as const;
