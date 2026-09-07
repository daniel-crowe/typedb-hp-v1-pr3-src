import { urls } from "./urls";

export const copy = {
  meta: {
    title: "TypeDB — a knowledge graph your AI can reason over",
    description:
      "TypeDB holds and enforces domain meaning in the database. People stop rebuilding the map. AI gets one world to reason over.",
  },
  header: {
    links: [
      { label: "Docs", href: urls.docs },
      { label: "Cloud", href: urls.cloud },
      { label: "Studio", href: urls.studio },
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
    eyebrow: "In practice",
    h2: "Where TypeDB sits",
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
    eyebrow: "What having it means",
    h2: "The database holds the map",
    lede: "Three consequences of putting domain meaning in TypeDB.",
    props: [
      {
        title: "The database holds and enforces domain meaning",
        body: "Entities, relations, and attributes are typed. A fact that does not fit the schema does not land.",
      },
      {
        title: "People stop rebuilding the map",
        body: "Docs, prompts, and application code stop being where the model is reinvented on every question.",
      },
      {
        title: "AI gets one world to reason over",
        body: "Queries hit the same enforced model people write to. The prompt does not have to reconstruct the join.",
      },
    ],
    graphic: {
      title: "The domain map, held in one place",
      lede: "Facts enter, change, and stay valid against the same schema.",
      ingest: {
        label: "Ingest",
        body: "Writes arrive as typed facts: entities, relations, named roles.",
      },
      update: {
        label: "Update",
        body: "The map changes in the database. People and AI read the same version.",
      },
      enforce: {
        label: "Enforce",
        body: "A write that does not play a declared role fails here.",
      },
    },
  },
  s3: {
    eyebrow: "Jobs",
    h2: "Work a visitor already has",
    lede: "Four jobs. Each one is a typed model in TypeDB, not a logo wall.",
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
    eyebrow: "The insight",
    sentence:
      "Your domain’s meaning lives in docs, prompts, and application code, not enforced in the database, so people and AI keep rebuilding different versions of the same world.",
  },
  s5: {
    eyebrow: "One project",
    h2: "Cloud, the database, Studio, and TypeQL on the same model",
    lede: "Open Studio on Cloud. Define a domain model in TypeQL. Community Edition is the same engine. This is not a customer diary.",
    stages: [
      {
        id: "cloud",
        label: "Cloud",
        title: "Open a managed database",
        body: "TypeDB Cloud is fully managed TypeDB on AWS or GCP.",
        href: urls.cloud,
        hrefLabel: "TypeDB Cloud",
      },
      {
        id: "database",
        label: "Database",
        title: "The engine holds the schema",
        body: "Relations have named roles. A fact can connect more than two things. Schema is enforced on write.",
        href: urls.whatIs,
        hrefLabel: "What is TypeDB",
      },
      {
        id: "studio",
        label: "Studio",
        title: "Work the same instance",
        body: "Studio is the official web and desktop environment on that database.",
        href: urls.studio,
        hrefLabel: "TypeDB Studio",
      },
      {
        id: "typeql",
        label: "TypeQL",
        title: "Define the model in the query language",
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
    eyebrow: "From here",
    h2: "Three live paths",
    lede: "The database can hold the map. Start on Cloud, install Community Edition, or read how TypeQL works.",
    steps: [
      {
        n: "01",
        label: "Try Cloud",
        body: "Fully managed TypeDB on AWS or GCP.",
        href: urls.cloud,
      },
      {
        n: "02",
        label: "Install",
        body: "Community Edition on the install page.",
        href: urls.install,
      },
      {
        n: "03",
        label: "Read the docs",
        body: "TypeQL, schema, and drivers.",
        href: urls.docs,
      },
    ],
  },
  s7: {
    eyebrow: "People",
    h2: "Ways in",
    lede: "Contribute on GitHub. Collaborate on Discord. Follow the work on the blog. Event stills are not on this page.",
    ways: [
      {
        verb: "Contribute",
        label: "GitHub",
        href: urls.github,
        body: "The TypeDB engine and drivers.",
      },
      {
        verb: "Collaborate",
        label: "Discord",
        href: urls.discord,
        body: "The live community invite.",
      },
      {
        verb: "Converse",
        label: "Blog",
        href: urls.blog,
        body: "Engineering and case write-ups.",
      },
    ],
    proof: {
      eyebrow: "Named work",
      h2: "Two projects we can name",
      lede: "Proof we already have. Not the jobs above.",
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
  footer: {
    links: [
      { label: "What is TypeDB", href: urls.whatIs },
      { label: "Community Edition", href: urls.communityEdition },
      { label: "Editions", href: urls.editions },
      { label: "Discord", href: urls.discord },
    ],
  },
} as const;
