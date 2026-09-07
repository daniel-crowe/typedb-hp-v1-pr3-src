import { urls } from "./urls";

export const copy = {
  meta: {
    title: "TypeDB — a knowledge graph your AI can reason over",
    description:
      "TypeDB holds and enforces domain meaning in the database. AI gets one world to reason over.",
  },
  header: {
    links: [
      { label: "Docs", href: urls.docs },
      { label: "Cloud", href: urls.cloud },
      { label: "Studio", href: urls.studio },
      { label: "Use cases", href: urls.useCasesPage },
      { label: "Blog", href: urls.blog },
      { label: "GitHub", href: urls.github },
    ],
    primary: { label: "Download", href: urls.install },
  },
  hero: {
    h1: "A knowledge graph your AI can reason over",
    sub: "AI cannot reason over a world the organization has not fixed in one place. Today that world is scattered across docs, prompts, and application code. With TypeDB, the database holds and enforces domain meaning, giving agents a source of truth leading to a deeper understanding and more token efficient workflows.",
    primary: { label: "Try Cloud", href: urls.cloud },
    secondary: { label: "Explore docs", href: urls.docs },
  },
  s1: {
    h2: "Where does the domain map live today?",
    lede: "TypeDB sits in the stack as the store that holds the domain map. People and AI query that map instead of rebuilding it.",
    tabs: {
      haveGraph: {
        id: "have-graph",
        label: "Already have a graph",
        job: "The walk already exists. TypeDB replaces the untyped store.",
      },
      noGraph: {
        id: "no-graph",
        label: "No graph yet",
        job: "The map lives in notes and prompts. TypeDB becomes the store.",
      },
    },
    stages: {
      ask: { index: "01", label: "Ask" },
      look: { index: "02", label: "Look" },
      store: { index: "03", label: "Store" },
      write: { index: "04", label: "Write" },
    },
    haveGraph: {
      ask: {
        title: "People, apps, and agents ask the same question",
        body: "Who owns the typedb repository?",
      },
      look: {
        title: "A property graph answers with an edge walk",
        body: "Alice and typedb are nodes. OWNS is a binary edge. Who is owner is a convention in application code.",
      },
      store: {
        title: "TypeDB sits here: the typed model",
        body: "The same fact is a resource-ownership relation with roles owner and resource. Schema is enforced on write.",
      },
      write: {
        title: "A mistyped edge is no longer application code’s problem",
        body: "A write that does not play owner or resource fails in the database.",
      },
    },
    noGraph: {
      ask: {
        title: "People and AI still need the same fact",
        body: "Who owns the typedb repository?",
      },
      look: {
        title: "The join is reconstructed from notes and a prompt",
        body: "Alice, the repository, and who owns it live in docs, prompts, and application code. Nothing in a store rejects a bad write.",
      },
      store: {
        title: "TypeDB sits here: one place for the map",
        body: "The same facts become types the database holds. Agents and people query resource-ownership instead of inventing it.",
      },
      write: {
        title: "Invalid structure fails before it spreads",
        body: "A write that does not fit the schema fails here.",
      },
    },
    sharedNote:
      "Alice, the typedb repository, and resource-ownership are the live homepage teaching example. They are not a customer.",
  },
  s2: {
    h2: "What does the schema enforce?",
    lede: "Three consequences of putting domain meaning in TypeDB.",
    props: [
      {
        title: "Schema is the type system",
        body: "Entities, relations, and attributes are types. A write is an instance of those types, not a hint left in application code.",
      },
      {
        title: "Relations can be n-party",
        body: "A fact can carry more than two roles. Employment can link employee, employer, and the project they work on as one relation.",
      },
      {
        title: "The database enforces",
        body: "A write or query that breaks a role or type fails with an error. TypeDB does not suggest a repair. Agents can introspect the schema.",
      },
    ],
    graphic: {
      title: "Ingest, update, enforce",
      lede: "The same type system is production.",
      ingest: {
        label: "Ingest",
        body: "Schema is the type system. Writes arrive as instances: entities, n-party relations, attributes.",
      },
      update: {
        label: "Update",
        body: "Production is the model. A change is another write. Subtype queries still see the specialized instance.",
      },
      enforce: {
        label: "Enforce",
        body: "TypeDB enforces. It does not suggest. A role or type break is a query error. Agents introspect the schema instead of inventing the join.",
      },
    },
  },
  s3: {
    h2: "What problem are you trying to hold in one model?",
    lede: "Four problems teams already have. Each one is a typed model in TypeDB.",
    items: [
      {
        id: "code-graph",
        industry: "Software",
        title: "Context drift in a growing codebase",
        job: "When a codebase is large and sessions are long, context goes stale and patterns drift. Coding agents then ship against an invented map of the code.",
        with: "A code graph in TypeDB keeps functions, tests, and the relations between them as a typed, schema-enforced source of truth. Agents query that model instead of walking untyped edges.",
        href: urls.docs,
        hrefLabel: "TypeDB docs",
      },
      {
        id: "agentic",
        industry: "Agentic systems",
        title: "Operational knowledge agents can query",
        job: "Agents need a shared model of the domain they write to. Retrieval returns neighbors. The agent still invents which things can connect.",
        with: "TypeDB stores entities, relations, and roles under a schema. Invalid writes fail. This page does not claim that agents never invent facts.",
        href: urls.agentic,
        hrefLabel: "Agentic systems",
      },
      {
        id: "cti",
        industry: "Cybersecurity",
        title: "Threats as a connected model",
        job: "Analysts need to ask how actors, campaigns, indicators, and hosts relate, not only list events.",
        with: "TypeDB models those entities and relations under a schema. Official TypeDB pages already name cyber threat intelligence. This page does not name a CTI customer.",
        href: urls.cti,
        hrefLabel: "Cyber threat intelligence",
      },
      {
        id: "decision",
        industry: "Decision support",
        title: "A domain model people can query as it changes",
        job: "Teams aiding decisions over a physical or regulatory domain need one model of sites, constraints, and measurements.",
        with: "TypeDB holds that model as typed relations. A TypeDB case write-up describes this pattern at France’s geological survey. Christian Iasio is credited on the project side. BRGM’s institutional page does not name TypeDB.",
        href: urls.brgmBlog,
        hrefLabel: "TypeDB blog",
      },
    ],
  },
  s4: {
    sentence: "Your schema is your type system is your semantic layer.",
    marks: ["schema", "type system", "semantic layer"],
  },
  s5: {
    h2: "TypeDB products for engineers",
    lede: "The engine, Cloud, Studio, and TypeQL. Same model. This is a product suite, not a project diary.",
    products: [
      {
        id: "database",
        label: "TypeDB",
        title: "The database",
        body: "The engine holds the schema. Relations have named roles. A fact can connect more than two things. Schema is enforced on write.",
        href: urls.whatIs,
        hrefLabel: "What is TypeDB",
      },
      {
        id: "cloud",
        label: "TypeDB Cloud",
        title: "Managed TypeDB",
        body: "Fully managed TypeDB on AWS or GCP. Open an instance and work the same schema.",
        href: urls.cloud,
        hrefLabel: "TypeDB Cloud",
      },
      {
        id: "studio",
        label: "TypeDB Studio",
        title: "Web and desktop environment",
        body: "Studio is the official environment on that database. Define types and run TypeQL against the live schema.",
        href: urls.studio,
        hrefLabel: "TypeDB Studio",
      },
      {
        id: "typeql",
        label: "TypeQL",
        title: "The query language",
        body: "TypeQL is how the schema and the questions are written. Community Edition runs the same engine.",
        href: urls.docs,
        hrefLabel: "TypeQL docs",
      },
    ],
    typeql: `define
  user sub entity;
  repository sub entity;
  resource-ownership sub relation,
    relates owner,
    relates resource;
  user plays resource-ownership:owner;
  repository plays resource-ownership:resource;`,
  },
  s6: {
    h2: "How do you want to run TypeDB?",
    lede: "Three paths. Cloud is managed. Install is Community Edition on your machine. Docs are the schema and TypeQL first.",
    steps: [
      {
        n: "01",
        label: "Open TypeDB Cloud",
        body: "Create a managed database on AWS or GCP. No local install.",
        href: urls.cloud,
      },
      {
        n: "02",
        label: "Install Community Edition",
        body: "Run the same engine locally from the install page.",
        href: urls.install,
      },
      {
        n: "03",
        label: "Read TypeQL in the docs",
        body: "Schema, roles, and drivers before you write application code.",
        href: urls.docs,
      },
    ],
  },
  metrics: {
    h2: "What we can source today",
    lede: "Numbers from the public typedb/typedb GitHub repository. Community size is omitted. This page does not invent it.",
    items: [
      {
        value: "4,443",
        label: "GitHub stars",
        href: urls.github,
        // Source: GET https://api.github.com/repos/typedb/typedb 2026-09-07 stargazers_count
      },
      {
        value: "372",
        label: "GitHub forks",
        href: urls.github,
        // Source: GET https://api.github.com/repos/typedb/typedb 2026-09-07 forks_count
      },
      {
        value: "2016",
        label: "Repository created",
        href: urls.github,
        // Source: GET https://api.github.com/repos/typedb/typedb created_at 2016-07-11
      },
    ],
  },
  industries: {
    h2: "Which domains does TypeDB already document?",
    lede: "Cribbed from the TypeDB use-cases docs. Each card links to that docs page. Graph and hypergraph index entries had no stable docs URL at write time, so they are omitted.",
    items: [
      {
        id: "robotics",
        title: "Robotics",
        body: "TypeDB models heterogeneous worlds, datasets, and interactions. The official robotics example is robotic navigation of a floorplan. Docs credit a real-world usage developed by Joris Sijs at TNO.",
        href: urls.useCasesRobotics,
        hrefLabel: "Robotics docs",
      },
      {
        id: "iam",
        title: "IAM",
        body: "TypeDB models identity, resources, and permission systems. The documented schema enforces permissions, ownership, and segregation of duties across subjects, objects, and actions.",
        href: urls.useCasesIam,
        hrefLabel: "IAM docs",
      },
      {
        id: "cybersecurity",
        title: "Cybersecurity",
        body: "The polymorphic model fits cyber threat intelligence. Official TypeDB CTI work implements STIX 2.1: threat actors, campaigns, indicators, and infrastructure as typed relations.",
        href: urls.useCasesCyber,
        hrefLabel: "Cybersecurity docs",
      },
      {
        id: "ai",
        title: "AI",
        body: "Docs describe TypeDB’s schema as context for AI applications: unstructured sources written into a typed graph, prompt-guided TypeQL, and the TypeDB MCP Server.",
        href: urls.useCasesAi,
        hrefLabel: "AI docs",
      },
    ],
    more: { label: "All cribbed use cases", href: urls.useCasesPage },
    proof: {
      h2: "Two projects we can name",
      lede: "Proof we already have. Not the problems above.",
      items: [
        {
          name: "Origin Sciences",
          kind: "Research platform",
          body: "Origin Sciences uses TypeDB for the knowledge graph, and DuckDB/Parquet for dense matrix data. TypeDB did not run that workload alone.",
          href: urls.originRepo,
          hrefLabel: "EpiGraph on GitHub",
        },
        {
          name: "BRGM / ThermEcoWat",
          kind: "Decision-aiding platform",
          body: "TypeDB’s case write-up describes ThermEcoWat, a decision-aiding platform at France’s geological survey (BRGM). Christian Iasio is credited on the project side. BRGM’s institutional page does not name TypeDB.",
          href: urls.brgmBlog,
          hrefLabel: "TypeDB blog",
        },
      ],
    },
  },
  close: {
    h2: "Start on one of the three paths",
    lede: "Cloud, Community Edition, or the docs. The footer has the rest of the live site.",
  },
  useCasesPage: {
    title: "TypeDB use cases",
    h2: "Use cases cribbed from the docs",
    lede: "Short versions of the official TypeDB use-case docs. Each one links to the full page. This is not a new product claim.",
  },
  footer: {
    columns: [
      {
        title: "Product",
        links: [
          { label: "What is TypeDB", href: urls.whatIs },
          { label: "TypeDB Cloud", href: urls.cloud },
          { label: "TypeDB Studio", href: urls.studio },
          { label: "Community Edition", href: urls.communityEdition },
          { label: "Editions", href: urls.editions },
        ],
      },
      {
        title: "Docs",
        links: [
          { label: "Documentation", href: urls.docs },
          { label: "Install", href: urls.install },
          { label: "Use cases", href: urls.useCasesPage },
          { label: "Use-case docs", href: urls.useCasesIndex },
        ],
      },
      {
        title: "Community",
        links: [
          { label: "GitHub", href: urls.github },
          { label: "Discord", href: urls.discord },
          { label: "Blog", href: urls.blog },
        ],
      },
      {
        title: "TypeDB",
        links: [{ label: "typedb.com", href: urls.home }],
      },
    ],
  },
} as const;
