export const targets = [
  {
    id: "rivian",
    company: "Rivian",
    title: "Rivian Mechanical Engineer",
    role: "Mechanical Engineer",
    score: 74,
    current: "DuPont Tyvek Co-op",
    currentRole: "ME Student",
    targetCompany: "Rivian",
    targetFunction: "Mechanical Engineering",
    summary:
      "Strong route: DuPont manufacturing plus HEVT vehicle experience can become a credible EV story.",
    nodes: [
      {
        id: "today",
        label: "Today",
        title: "ME Student",
        type: "current",
        match: 62,
        timeframe: "Now",
        detail:
          "Your foundation is mechanical engineering coursework, HEVT, and early manufacturing exposure.",
        skills: ["Mechanical fundamentals", "HEVT", "Career clarity"],
        action: "Write a one-line target statement for EV mechanical roles.",
        exits: ["DuPont", "HEVT", "Auto supplier"],
      },
      {
        id: "dupont",
        label: "DuPont",
        title: "Tyvek Co-op",
        type: "active",
        match: 72,
        timeframe: "Active now",
        detail:
          "Your plant experience is valuable. The win is translating it into measurable engineering impact.",
        skills: ["Manufacturing", "Root cause analysis", "Process improvement"],
        action: "Create one quantified resume bullet from your DuPont work.",
        exits: ["Tesla manufacturing", "Battery process", "Rivian operations"],
      },
      {
        id: "bridge",
        label: "Bridge",
        title: "EV / Battery Internship",
        type: "bridge",
        match: 80,
        timeframe: "~6 months",
        detail:
          "A bridge role connects your manufacturing background to batteries, vehicles, or validation.",
        skills: ["Battery basics", "Automotive manufacturing", "Testing"],
        action:
          "Apply to roles mentioning batteries, process engineering, vehicles, or validation.",
        exits: ["Rivian", "Tesla", "Lucid"],
      },
      {
        id: "goal",
        label: "Rivian",
        title: "Mechanical Engineer",
        type: "goal",
        match: 88,
        timeframe: "Goal",
        detail:
          "Best positioning: manufacturing credibility plus hands-on vehicle project experience.",
        skills: ["Vehicle systems", "Design validation", "Cross-functional work"],
        action: "Message one Rivian engineer or VT alum for a 15-minute career chat.",
        exits: ["Senior EV Engineer", "Vehicle systems", "Manufacturing launch"],
      },
    ],
    metrics: [
      { label: "Experience", value: 72 },
      { label: "Projects",   value: 81 },
      { label: "Skills",     value: 64 },
      { label: "Network",    value: 58 },
      { label: "Resume",     value: 70 },
    ],
    nextMoves: [
      "Add one EV-specific project to your portfolio.",
      "Turn DuPont work into measurable resume bullets.",
      "Find Rivian or EV alumni with manufacturing backgrounds.",
    ],
    resumeGap: {
      readiness: 70,
      focus: "Translate manufacturing work into EV mechanical impact.",
      missingKeywords: [
        "design validation",
        "vehicle systems",
        "root cause analysis",
        "manufacturing launch",
      ],
      presentKeywords: [
        "manufacturing",
        "process improvement",
        "HEVT",
        "mechanical engineering",
      ],
      bulletUpgrades: [
        {
          before: "Worked on manufacturing projects at DuPont.",
          after:
            "Supported Tyvek manufacturing improvements by analyzing process issues and documenting engineering actions tied to reliability, quality, or throughput.",
        },
        {
          before: "Member of HEVT.",
          after:
            "Contributed to HEVT vehicle development through hands-on mechanical design, testing, or integration work connected to EV systems.",
        },
      ],
    },
    companies: [
      {
        name: "Rivian",
        fit: "Dream target for EV mechanical and manufacturing-adjacent roles.",
        roleType:
          "Mechanical Engineer, Manufacturing Engineer, Validation Engineer",
        introAngle:
          "VT alumni, HEVT connection, EV passion, manufacturing experience.",
        matchScore: 88,
      },
      {
        name: "Tesla",
        fit: "Strong bridge through high-volume manufacturing and production engineering.",
        roleType:
          "Manufacturing Engineer, Process Engineer, Production Engineering Intern",
        introAngle:
          "DuPont plant experience and measurable process improvement.",
        matchScore: 79,
      },
      {
        name: "Lucid",
        fit: "Good fit for vehicle systems, validation, and premium EV engineering.",
        roleType: "Vehicle Systems, Test Engineer, Mechanical Design Intern",
        introAngle: "HEVT vehicle experience and systems-focused project work.",
        matchScore: 74,
      },
    ],
    connections: [
      {
        type: "Rivian VT Alum",
        reason:
          "Best warm path because shared school context makes outreach more natural.",
        search: "Virginia Tech Rivian mechanical engineer LinkedIn",
        message:
          "Mention HEVT, DuPont manufacturing, and that you are exploring EV mechanical paths.",
      },
      {
        type: "Manufacturing-to-EV",
        reason:
          "Shows how someone translated plant experience into an EV company.",
        search: "DuPont Tesla Rivian manufacturing engineer LinkedIn",
        message:
          "Ask how they framed manufacturing experience when moving into automotive or EV.",
      },
      {
        type: "HEVT Project Engineer",
        reason:
          "Helps you understand which student vehicle projects matter most to EV recruiters.",
        search: "Rivian vehicle systems engineer Formula SAE HEVT LinkedIn",
        message:
          "Ask what project evidence made their profile stronger for vehicle engineering roles.",
      },
    ],
  },

  {
    id: "tesla",
    company: "Tesla",
    title: "Tesla Manufacturing Engineer",
    role: "Manufacturing Engineer",
    score: 78,
    current: "DuPont Manufacturing Co-op",
    currentRole: "ME Student",
    targetCompany: "Tesla",
    targetFunction: "Manufacturing Engineering",
    summary:
      "Very natural fit: DuPont manufacturing experience maps directly to production engineering.",
    nodes: [
      {
        id: "today",
        label: "Today",
        title: "ME Student",
        type: "current",
        match: 66,
        timeframe: "Now",
        detail:
          "Your engineering background gives you a base for equipment, process, and production roles.",
        skills: ["Problem solving", "Mechanical systems", "Manufacturing interest"],
        action: "Collect examples of times you improved or fixed a process.",
        exits: ["DuPont", "Supplier", "Battery plant"],
      },
      {
        id: "dupont",
        label: "DuPont",
        title: "Manufacturing Co-op",
        type: "active",
        match: 78,
        timeframe: "Active now",
        detail:
          "This is directly relevant. Tesla-style roles care about speed, ownership, and measurable impact.",
        skills: ["Troubleshooting", "Equipment reliability", "Lean thinking"],
        action: "Rewrite a bullet using downtime, throughput, safety, yield, or cost.",
        exits: ["Tesla", "Auto supplier", "Battery manufacturing"],
      },
      {
        id: "supplier",
        label: "Supplier",
        title: "Auto Supplier Internship",
        type: "bridge",
        match: 84,
        timeframe: "~6 months",
        detail:
          "An automotive supplier or battery plant creates a direct transition into vehicle manufacturing.",
        skills: ["Quality", "DFM", "Production systems"],
        action:
          "Target automotive suppliers, battery plants, and process engineering internships.",
        exits: ["Tesla manufacturing", "Rivian operations", "Lucid production"],
      },
      {
        id: "goal",
        label: "Tesla",
        title: "Manufacturing Engineer",
        type: "goal",
        match: 89,
        timeframe: "Goal",
        detail:
          "Your story should emphasize urgency, ownership, production metrics, and problem solving.",
        skills: ["High-volume production", "Automation", "Rapid execution"],
        action:
          "Build one STAR story around solving a production issue under constraints.",
        exits: ["Launch lead", "Production manager", "Automation engineer"],
      },
    ],
    metrics: [
      { label: "Experience", value: 82 },
      { label: "Projects",   value: 70 },
      { label: "Skills",     value: 68 },
      { label: "Network",    value: 52 },
      { label: "Resume",     value: 73 },
    ],
    nextMoves: [
      "Quantify one manufacturing improvement.",
      "Add automotive manufacturing keywords to your resume.",
      "Search for Tesla employees from supplier/manufacturing backgrounds.",
    ],
    resumeGap: {
      readiness: 73,
      focus: "Show production speed, ownership, and measurable manufacturing impact.",
      missingKeywords: [
        "throughput",
        "downtime",
        "yield",
        "equipment reliability",
      ],
      presentKeywords: [
        "manufacturing",
        "process improvement",
        "mechanical engineering",
        "co-op",
      ],
      bulletUpgrades: [
        {
          before: "Helped with manufacturing work.",
          after:
            "Investigated production issues and supported process improvements aimed at reducing downtime, improving reliability, or increasing throughput.",
        },
        {
          before: "Worked with equipment.",
          after:
            "Collaborated with operators and engineers to troubleshoot equipment behavior and identify practical manufacturing improvements.",
        },
      ],
    },
    companies: [
      {
        name: "Tesla",
        fit: "Best match for fast-paced manufacturing and production ownership.",
        roleType: "Manufacturing Engineer, Equipment Engineer, Process Engineer",
        introAngle:
          "Manufacturing co-op experience with throughput, downtime, or reliability impact.",
        matchScore: 89,
      },
      {
        name: "Panasonic Energy",
        fit: "Battery manufacturing bridge with strong process and production relevance.",
        roleType:
          "Battery Manufacturing, Process Engineering, Quality Engineering",
        introAngle:
          "DuPont process exposure and interest in EV battery production.",
        matchScore: 81,
      },
      {
        name: "General Motors",
        fit: "Strong automotive manufacturing stepping stone with many plant roles.",
        roleType: "Manufacturing Engineer, Launch Engineer, Quality Engineer",
        introAngle: "Mechanical engineering plus manufacturing systems experience.",
        matchScore: 76,
      },
    ],
    connections: [
      {
        type: "Tesla Mfg Engineer",
        reason:
          "Most direct source for understanding what production engineering stories matter.",
        search: "Tesla manufacturing engineer mechanical engineering LinkedIn",
        message:
          "Ask what measurable manufacturing experience stands out for Tesla production roles.",
      },
      {
        type: "Auto Supplier Alum",
        reason:
          "Supplier experience can be a realistic bridge into Tesla manufacturing.",
        search: "automotive supplier Tesla manufacturing engineer LinkedIn",
        message:
          "Ask how supplier or plant experience helped them move into Tesla.",
      },
      {
        type: "Battery Mfg Contact",
        reason:
          "Battery manufacturing is a strong adjacent route into Tesla and EV production.",
        search: "Panasonic Tesla battery manufacturing engineer LinkedIn",
        message:
          "Ask which process or equipment skills are most useful in battery production roles.",
      },
    ],
  },

  {
    id: "battery",
    company: "Energy",
    title: "Battery Process Engineer",
    role: "Process Engineer",
    score: 76,
    current: "DuPont Process / Manufacturing Co-op",
    currentRole: "ME Student",
    targetCompany: "Panasonic Energy / QuantumScape",
    targetFunction: "Process Engineering",
    summary:
      "Clean bridge: process engineering and manufacturing experience translate well to battery production.",
    nodes: [
      {
        id: "today",
        label: "Today",
        title: "ME Student",
        type: "current",
        match: 65,
        timeframe: "Now",
        detail:
          "Mechanical engineering supports process, equipment, and manufacturing roles in energy.",
        skills: ["Engineering fundamentals", "Data thinking", "Process curiosity"],
        action: "Learn the basic battery production flow from cell to pack.",
        exits: ["DuPont", "Battery plant", "Energy storage"],
      },
      {
        id: "dupont",
        label: "DuPont",
        title: "Process Co-op",
        type: "active",
        match: 79,
        timeframe: "Active now",
        detail:
          "Process variables, quality, and production problem-solving are directly useful in battery plants.",
        skills: ["Process variables", "Root cause analysis", "Manufacturing data"],
        action:
          "Explain one process variable you worked with and how it affected output.",
        exits: ["Battery process", "Quality engineering", "Manufacturing engineering"],
      },
      {
        id: "battery-plant",
        label: "Battery",
        title: "Battery Mfg Internship",
        type: "bridge",
        match: 86,
        timeframe: "~6 months",
        detail:
          "Battery production values yield, safety, process discipline, and equipment understanding.",
        skills: ["Battery fundamentals", "Quality control", "Yield improvement"],
        action:
          "Learn terms: cell, module, pack, slurry, coating, formation, thermal management.",
        exits: ["Energy storage", "EV battery", "Process engineering"],
      },
      {
        id: "goal",
        label: "Energy",
        title: "Battery Process Engineer",
        type: "goal",
        match: 90,
        timeframe: "Goal",
        detail:
          "This path combines manufacturing credibility with clean energy and EV relevance.",
        skills: ["SPC", "DOE mindset", "Scale-up"],
        action:
          "Create a mini case study showing how you would reduce defects or improve yield.",
        exits: ["Senior process", "Battery scale-up", "Manufacturing quality"],
      },
    ],
    metrics: [
      { label: "Experience", value: 84 },
      { label: "Projects",   value: 67 },
      { label: "Skills",     value: 72 },
      { label: "Network",    value: 50 },
      { label: "Resume",     value: 75 },
    ],
    nextMoves: [
      "Learn battery manufacturing vocabulary.",
      "Create one process-improvement case study.",
      "Look for battery manufacturing internships and suppliers.",
    ],
    resumeGap: {
      readiness: 75,
      focus: "Position process experience around yield, quality, and production control.",
      missingKeywords: [
        "yield improvement",
        "process control",
        "quality systems",
        "battery manufacturing",
      ],
      presentKeywords: [
        "process engineering",
        "manufacturing",
        "root cause analysis",
        "mechanical engineering",
      ],
      bulletUpgrades: [
        {
          before: "Worked on process engineering tasks.",
          after:
            "Supported process troubleshooting by connecting production variables to quality, reliability, or output performance.",
        },
        {
          before: "Interested in batteries.",
          after:
            "Built foundational battery manufacturing knowledge across cell, module, pack, coating, formation, and thermal management concepts.",
        },
      ],
    },
    companies: [
      {
        name: "Panasonic",
        fit: "Strong battery manufacturing target for process and quality roles.",
        roleType:
          "Process Engineer, Battery Manufacturing Engineer, Quality Engineer",
        introAngle:
          "DuPont manufacturing background and battery process interest.",
        matchScore: 86,
      },
      {
        name: "Tesla",
        fit: "Relevant through battery cell, pack, and manufacturing process work.",
        roleType:
          "Battery Process Engineer, Manufacturing Engineer, Equipment Engineer",
        introAngle: "Process improvement and interest in EV battery production.",
        matchScore: 82,
      },
      {
        name: "QuantumScape",
        fit: "Advanced battery technology target with process scale-up relevance.",
        roleType: "Process Engineer, Manufacturing Development Engineer",
        introAngle:
          "Materials/process curiosity plus mechanical engineering foundation.",
        matchScore: 71,
      },
    ],
    connections: [
      {
        type: "Battery Process Eng",
        reason:
          "Closest match for learning how process experience translates into battery production.",
        search: "battery process engineer mechanical engineering LinkedIn",
        message:
          "Ask which manufacturing and process skills mattered most for entering battery roles.",
      },
      {
        type: "Panasonic Contact",
        reason:
          "Strong practical view into battery manufacturing and production engineering.",
        search: "Panasonic Energy process engineer LinkedIn",
        message:
          "Ask how to prepare for process, quality, or manufacturing roles in battery plants.",
      },
      {
        type: "Clean Energy VT Alum",
        reason:
          "Shared school background makes the conversation easier to start.",
        search: "Virginia Tech battery engineer energy storage LinkedIn",
        message:
          "Mention your DuPont process exposure and ask what skills helped them enter energy storage.",
      },
    ],
  },
];

export const simulatorMoves = [
  {
    id: "ev-project",
    title: "EV Side Project",
    impact: 6,
    detail: "Adds vehicle-specific proof to your profile and shows genuine interest.",
  },
  {
    id: "battery-skill",
    title: "Battery Certification",
    impact: 5,
    detail: "Improves EV and energy alignment with recognized credentials.",
  },
  {
    id: "referral",
    title: "Alumni Referral",
    impact: 4,
    detail: "Creates warmer access to target companies through shared connections.",
  },
  {
    id: "auto-internship",
    title: "Auto Internship",
    impact: 7,
    detail: "Adds direct industry credibility with hands-on vehicle experience.",
  },
];
