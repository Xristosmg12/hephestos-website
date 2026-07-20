export const industries = [
  {
    slug: "maritime-logistics",
    name: "Maritime & Logistics",
    image:
      "https://images.pexels.com/photos/2231744/pexels-photo-2231744.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1400",
    problem:
      "Vessel quotations, port documentation, and PO approvals still crawl through email threads and spreadsheets. Every delayed quote is a lost booking, and every manual approval ties up hours your operations team can't spare.",
    automations: [
      "Automated vessel quotation generation from incoming RFQs",
      "PO approval routing with rule-based sign-offs",
      "Shipment tracking updates synced across systems and clients",
      "Customs and compliance document generation on demand",
    ],
    results: [
      { value: 12, suffix: "h", label: "Saved per week per operator" },
      { value: 90, suffix: "%", label: "Faster quote turnaround" },
      { value: 0, suffix: "", prefix: "", label: "Missed PO deadlines", zeroText: "Zero" },
    ],
  },
  {
    slug: "e-commerce",
    name: "E-commerce",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1400&q=80",
    problem:
      "Orders, inventory, returns, and support tickets pile up faster than any team can process by hand. Manual order handling leads to overselling, slow responses, and customers who don't come back.",
    automations: [
      "End-to-end order processing across channels",
      "Real-time inventory sync between store and suppliers",
      "AI-powered support and returns handling",
      "Automated abandoned-cart and post-purchase flows",
    ],
    results: [
      { value: 80, suffix: "%", label: "Faster support response" },
      { value: 24, suffix: "/7", label: "Order processing coverage" },
      { value: 3, suffix: "x", label: "Throughput without new hires" },
    ],
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    image:
      "https://images.pexels.com/photos/4082527/pexels-photo-4082527.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1400",
    problem:
      "Leads slip through the cracks while agents juggle listings, viewings, and paperwork. Slow follow-up means competitors close the deal first, and contract admin eats into selling time.",
    automations: [
      "Instant lead capture, qualification, and follow-up",
      "Automated viewing scheduling and reminders",
      "Listing syndication across portals",
      "Contract and document generation with e-signatures",
    ],
    results: [
      { value: 5, suffix: "min", label: "Average lead response time" },
      { value: 60, suffix: "%", label: "Less admin per agent" },
      { value: 2, suffix: "x", label: "More viewings booked" },
    ],
  },
  {
    slug: "finance-accounting",
    name: "Finance & Accounting",
    image:
      "https://images.pexels.com/photos/30268012/pexels-photo-30268012.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1400",
    problem:
      "Reconciliations, invoicing, and reporting swallow entire days. Manual data entry breeds errors that surface at the worst possible moment — month-end close.",
    automations: [
      "Automated invoice processing and matching",
      "Bank and ledger reconciliation",
      "Scheduled financial reporting from live data",
      "Expense capture and approval workflows",
    ],
    results: [
      { value: 85, suffix: "%", label: "Less manual data entry" },
      { value: 4, suffix: "x", label: "Faster month-end close" },
      { value: 99, suffix: "%", label: "Reconciliation accuracy" },
    ],
  },
  {
    slug: "healthcare-admin",
    name: "Healthcare Admin",
    image:
      "https://images.pexels.com/photos/37036967/pexels-photo-37036967.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1400",
    problem:
      "Scheduling, intake forms, and insurance paperwork bury administrative staff. Every hour on manual admin is an hour not spent on patient care.",
    automations: [
      "Automated appointment scheduling and reminders",
      "Digital patient intake and record updates",
      "Insurance and claims documentation prep",
      "Follow-up and no-show recovery workflows",
    ],
    results: [
      { value: 70, suffix: "%", label: "Less admin workload" },
      { value: 40, suffix: "%", label: "Fewer no-shows" },
      { value: 3, suffix: "x", label: "Faster patient intake" },
    ],
  },
  {
    slug: "retail",
    name: "Retail",
    image:
      "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1400&q=80",
    problem:
      "Stock counts, reordering, and promotions are managed by hand across locations. Stockouts and overstock quietly drain margins every single week.",
    automations: [
      "Automated stock monitoring and reordering",
      "Multi-location inventory synchronization",
      "Promotion and pricing rollouts",
      "Sales reporting and demand forecasting",
    ],
    results: [
      { value: 50, suffix: "%", label: "Fewer stockouts" },
      { value: 30, suffix: "%", label: "Lower overstock" },
      { value: 10, suffix: "h", label: "Saved weekly per store" },
    ],
  },
  {
    slug: "legal",
    name: "Legal",
    image:
      "https://images.unsplash.com/photo-1618771623063-6c3faa854a61?w=1400&q=80",
    problem:
      "Document drafting, review, and case intake consume billable hours on repetitive work. Manual contract handling introduces risk and slows every matter down.",
    automations: [
      "Automated document and contract drafting",
      "Clause extraction and review assistance",
      "Client intake and conflict checks",
      "Deadline and matter tracking",
    ],
    results: [
      { value: 65, suffix: "%", label: "Faster document drafting" },
      { value: 3, suffix: "x", label: "Quicker client intake" },
      { value: 20, suffix: "h", label: "Billable hours reclaimed" },
    ],
  },
  {
    slug: "construction",
    name: "Construction",
    image:
      "https://images.unsplash.com/photo-1575230167650-dce335edc7f4?w=1400&q=80",
    problem:
      "Bids, subcontractor coordination, and compliance paperwork live in scattered spreadsheets and inboxes. Delays and miscommunication cost real money on site.",
    automations: [
      "Automated bid and estimate generation",
      "Subcontractor onboarding and coordination",
      "Compliance and safety documentation",
      "Project reporting and progress tracking",
    ],
    results: [
      { value: 55, suffix: "%", label: "Faster bid preparation" },
      { value: 40, suffix: "%", label: "Less coordination overhead" },
      { value: 2, suffix: "x", label: "More bids submitted" },
    ],
  },
  {
    slug: "marketing-agencies",
    name: "Marketing Agencies",
    image:
      "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?w=1400&q=80",
    problem:
      "Reporting, content scheduling, and client onboarding pull your team away from creative work. Manual reporting alone can eat a full day every week.",
    automations: [
      "Automated multi-channel performance reporting",
      "Content scheduling and publishing pipelines",
      "Client onboarding and asset collection",
      "Lead routing and CRM automation",
    ],
    results: [
      { value: 90, suffix: "%", label: "Less time on reporting" },
      { value: 3, suffix: "x", label: "Faster client onboarding" },
      { value: 15, suffix: "h", label: "Creative hours reclaimed" },
    ],
  },
  {
    slug: "hospitality",
    name: "Hospitality",
    image:
      "https://images.unsplash.com/photo-1744782996368-dc5b7e697f4c?w=1400&q=80",
    problem:
      "Bookings, guest communication, and reviews are handled reactively across disconnected tools. Missed messages mean missed revenue and unhappy guests.",
    automations: [
      "Automated booking confirmations and reminders",
      "Guest messaging across channels",
      "Review request and response workflows",
      "Housekeeping and operations scheduling",
    ],
    results: [
      { value: 24, suffix: "/7", label: "Guest response coverage" },
      { value: 45, suffix: "%", label: "More reviews collected" },
      { value: 30, suffix: "%", label: "Less front-desk admin" },
    ],
  },
  {
    slug: "manufacturing",
    name: "Manufacturing",
    image:
      "https://images.unsplash.com/photo-1716191299980-a6e8827ba10b?w=1400&q=80",
    problem:
      "Production tracking, procurement, and quality reporting rely on manual logs. Blind spots on the floor lead to downtime and missed shipments.",
    automations: [
      "Automated production and output tracking",
      "Procurement and reorder workflows",
      "Quality inspection reporting",
      "Maintenance scheduling and alerts",
    ],
    results: [
      { value: 35, suffix: "%", label: "Less production downtime" },
      { value: 60, suffix: "%", label: "Faster reporting" },
      { value: 2, suffix: "x", label: "Procurement efficiency" },
    ],
  },
  {
    slug: "smes",
    name: "SMEs",
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1400&q=80",
    problem:
      "Small teams wear every hat — sales, admin, support, finance. The manual work that keeps the lights on is the same work stopping you from growing.",
    automations: [
      "Automated lead capture and follow-up",
      "Invoicing and payment reminders",
      "Customer support and FAQ handling",
      "Cross-tool workflow integrations",
    ],
    results: [
      { value: 20, suffix: "h", label: "Saved weekly per team" },
      { value: 3, suffix: "x", label: "Output without new hires" },
      { value: 50, suffix: "%", label: "Less repetitive admin" },
    ],
  },
];

export const getIndustry = (slug) => industries.find((i) => i.slug === slug);
