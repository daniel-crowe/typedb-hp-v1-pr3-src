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
    h2: "Context infrastructure",
    tabs: {
      haveGraph: {
        id: "have-graph",
        label: "We've got a graph",
        job: "If you already run a property graph, roles and constraints often still live in application code. When those rules drift from the stored edges, multi-step work returns answers that look fine and are wrong. Updating that context by hand does not keep up at scale.",
      },
      noGraph: {
        id: "no-graph",
        label: "Still in docs and prompts",
        job: "If the domain map still lives in docs, prompts, and application code, someone updates it after the fact. Multi-step inference then runs on a map that lags the product. At scale that lag is the failure.",
      },
    },
    stages: {
      retrieve: { index: "01", label: "Retrieve" },
      ground: { index: "02", label: "Ground" },
      reason: { index: "03", label: "Reason" },
      persist: { index: "04", label: "Persist" },
    },
    haveGraph: {
      retrieve: {
        title: "The question hits the stored walk",
        body: "Who owns the typedb repository?",
      },
      ground: {
        title: "The edge is already there",
        body: "Alice and typedb are nodes. OWNS is a binary edge. Who is owner is still a convention in application code.",
      },
      reason: {
        title: "A longer walk can still be wrong",
        body: "Roles are not on the edge. Multi-step work can return a wrong owner and still look well-formed.",
      },
      persist: {
        title: "TypeDB writes the typed fact",
        body: "resource-ownership plays owner and resource. A write that misses a role fails in the database.",
      },
    },
    noGraph: {
      retrieve: {
        title: "The same question still needs an answer",
        body: "Who owns the typedb repository?",
      },
      ground: {
        title: "The map is reconstructed",
        body: "Alice, the repository, and who owns it live in docs, prompts, and application code.",
      },
      reason: {
        title: "Inference runs on a lagging map",
        body: "Someone updates that map after the fact. Multi-step work then reasons over a world that is already stale.",
      },
      persist: {
        title: "TypeDB holds the write",
        body: "The same facts become types. A write that does not fit the schema fails here.",
      },
    },
    sharedNote:
      "Alice, the typedb repository, and resource-ownership are the live homepage teaching example. They are not a customer.",
  },
  s2: {
    h2: "What changes when meaning lives in the database",
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
    sentence: "Structure that is not enforced is only a suggestion.",
    marks: ["Structure", "enforced", "suggestion"],
  },
  s5: {
    h2: "TypeDB products",
    lede: "One schema. Four ways to run it. Community Edition and Enterprise share the engine.",
    products: [
      {
        id: "database",
        label: "TypeDB",
        title: "The database",
        body: "The engine holds the schema. Relations have named roles. A fact can connect more than two things. Schema is enforced on write.",
        href: urls.install,
        hrefLabel: "Install TypeDB",
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
        href: urls.typeql,
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
    h2: "Get running",
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
        href: urls.communityEdition,
      },
      {
        n: "03",
        label: "Read TypeQL in the docs",
        body: "Schema, roles, and drivers before you write application code.",
        href: urls.typeql,
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
          { label: "TypeQL", href: urls.typeql },
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
