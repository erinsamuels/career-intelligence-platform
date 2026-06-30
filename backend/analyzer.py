"""Career profile analysis — Claude API with rich pattern-based fallback."""

import json
import os
import re


# ── Claude prompt (used only when ANTHROPIC_API_KEY is set) ──────────────────

SYSTEM_PROMPT = """You are a career intelligence engine for PathForge, a premium career navigation platform.

Analyze the provided resume or LinkedIn profile text and return a structured JSON object.
Return ONLY valid JSON — no markdown, no explanation, no code fences.

The JSON must have this exact structure:
{
  "name": "Full Name",
  "headline": "Short professional headline",
  "location": "City, State or Remote",
  "education": [
    { "school": "...", "degree": "...", "year": "...", "gpa": "" }
  ],
  "experience": [
    {
      "company": "...",
      "title": "...",
      "dates": "...",
      "industry": "...",
      "bullets": ["...", "..."]
    }
  ],
  "skills": ["skill1", "skill2"],
  "industries": ["industry1"],
  "leadership": ["leadership example 1"],
  "achievements": ["achievement 1"],
  "careerInterests": ["interest 1", "interest 2"],
  "keywords": ["keyword1", "keyword2"],
  "pathScore": 74,
  "scoreLabel": "Strong trajectory",
  "careerSummary": "2-3 sentence summary of the person's career trajectory and strongest angles.",
  "bestFitRoles": [
    { "title": "Role Title", "company": "Company Name", "fit": "Why this fits", "matchScore": 82 }
  ],
  "skillGaps": [
    { "skill": "Skill Name", "impact": "+5 pts", "suggestion": "How to address it" }
  ],
  "targetCompanies": [
    { "name": "Company", "fit": "Why it fits", "roleType": "Role types available", "matchScore": 85 }
  ],
  "steppingStones": [
    { "role": "Intermediate role", "description": "Why this bridges the gap", "timeframe": "~6 months" }
  ],
  "nextSteps": [
    "Specific action 1",
    "Specific action 2",
    "Specific action 3",
    "Specific action 4"
  ]
}"""


def analyze_profile(text: str) -> dict:
    """Analyze resume/profile text and return structured career profile."""
    api_key = os.getenv("ANTHROPIC_API_KEY")
    if api_key:
        return _analyze_with_claude(text, api_key)
    return _analyze_with_fallback(text)


def _analyze_with_claude(text: str, api_key: str) -> dict:
    import anthropic

    client = anthropic.Anthropic(api_key=api_key)
    message = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=4096,
        system=SYSTEM_PROMPT,
        messages=[{"role": "user", "content": f"Analyze this resume/profile:\n\n{text[:12000]}"}],
    )
    raw = message.content[0].text.strip()
    raw = re.sub(r"^```(?:json)?\s*", "", raw)
    raw = re.sub(r"\s*```$", "", raw)
    return json.loads(raw)


# ── Rich pattern-based fallback ───────────────────────────────────────────────

# Skills organized by domain — each entry: (display_name, domain_tags)
SKILL_CATALOG = [
    # Engineering — mechanical
    ("SolidWorks",           ["mech", "eng"]),
    ("AutoCAD",              ["mech", "eng"]),
    ("CATIA",                ["mech", "eng"]),
    ("ANSYS",                ["mech", "eng"]),
    ("MATLAB",               ["mech", "eng", "data"]),
    ("Simulink",             ["mech", "eng"]),
    ("GD&T",                 ["mech", "eng"]),
    ("FEA",                  ["mech", "eng"]),
    ("CFD",                  ["mech", "eng"]),
    ("Mechanical Design",    ["mech", "eng"]),
    # Engineering — manufacturing / process
    ("Manufacturing",        ["mfg", "eng"]),
    ("Process Engineering",  ["mfg", "eng"]),
    ("Lean",                 ["mfg", "ops"]),
    ("Six Sigma",            ["mfg", "ops"]),
    ("DFMEA",                ["mfg", "eng"]),
    ("APQP",                 ["mfg", "auto"]),
    ("SPC",                  ["mfg", "eng"]),
    ("Root Cause Analysis",  ["mfg", "eng"]),
    ("Kaizen",               ["mfg", "ops"]),
    ("Quality",              ["mfg", "ops"]),
    ("DFM",                  ["mfg", "eng"]),
    ("PPAP",                 ["mfg", "auto"]),
    ("ISO 9001",             ["mfg", "ops"]),
    # EV / automotive / energy
    ("Battery",              ["ev", "energy"]),
    ("Automotive",           ["auto", "mfg"]),
    ("EV",                   ["ev", "auto"]),
    ("Thermal Management",   ["ev", "mech"]),
    ("Powertrain",           ["ev", "auto"]),
    ("BMS",                  ["ev", "energy"]),
    ("HV Systems",           ["ev", "auto"]),
    # Software / data
    ("Python",               ["software", "data"]),
    ("Java",                 ["software"]),
    ("JavaScript",           ["software", "web"]),
    ("TypeScript",           ["software", "web"]),
    ("React",                ["software", "web"]),
    ("SQL",                  ["software", "data"]),
    ("C++",                  ["software", "eng"]),
    ("AWS",                  ["software", "cloud"]),
    ("Docker",               ["software", "cloud"]),
    ("Kubernetes",           ["software", "cloud"]),
    ("Machine Learning",     ["software", "data", "ai"]),
    ("TensorFlow",           ["software", "data", "ai"]),
    ("PyTorch",              ["software", "data", "ai"]),
    ("pandas",               ["software", "data"]),
    ("NumPy",                ["software", "data"]),
    ("Git",                  ["software"]),
    ("Linux",                ["software"]),
    ("REST API",             ["software", "web"]),
    # Business / operations
    ("Project Management",   ["ops", "leadership"]),
    ("Agile",                ["ops", "software"]),
    ("Scrum",                ["ops", "software"]),
    ("Excel",                ["ops", "data"]),
    ("Leadership",           ["leadership", "ops"]),
    ("Cross-functional",     ["leadership", "ops"]),
    ("Budget Management",    ["ops", "leadership"]),
    ("Stakeholder Management", ["leadership", "ops"]),
    # Misc
    ("CAD",                  ["mech", "eng"]),
    ("Arduino",              ["eng", "software"]),
    ("Tableau",              ["data"]),
    ("Power BI",             ["data"]),
    ("R",                    ["data"]),  # kept but matched as whole word
]

UNIVERSITIES = [
    "Virginia Tech", "MIT", "Stanford", "Georgia Tech", "University of Michigan",
    "Purdue University", "Ohio State", "Carnegie Mellon", "Cornell", "UCLA",
    "UC Berkeley", "UT Austin", "Clemson", "Penn State", "NC State",
    "Georgia Institute", "Virginia Commonwealth", "Virginia Military",
]

DEGREE_PATTERNS = [
    r"B\.?S\.?\s+(?:in\s+)?([A-Z][^\n,]+)",
    r"B\.?E\.?\s+(?:in\s+)?([A-Z][^\n,]+)",
    r"M\.?S\.?\s+(?:in\s+)?([A-Z][^\n,]+)",
    r"M\.?Eng\.?\s+(?:in\s+)?([A-Z][^\n,]+)",
    r"Bachelor(?:'s)?\s+(?:of\s+)?(?:Science\s+)?(?:in\s+)?([A-Z][^\n,]+)",
    r"Master(?:'s)?\s+(?:of\s+)?(?:Science\s+)?(?:in\s+)?([A-Z][^\n,]+)",
    r"Ph\.?D\.?\s+(?:in\s+)?([A-Z][^\n,]+)",
]

# Role clusters: domain tags → (role_title, company_examples, match_score_base)
ROLE_MAP = [
    ({"ev", "mfg"},    "Battery Manufacturing Engineer",   ["Tesla", "Panasonic Energy", "Rivian", "CATL"],      84),
    ({"ev", "mech"},   "EV Mechanical Engineer",           ["Rivian", "Tesla", "Lucid Motors", "Canoo"],         82),
    ({"ev", "auto"},   "Powertrain Engineer",              ["GM", "Ford", "Stellantis", "BorgWarner"],            80),
    ({"mfg", "mech"},  "Manufacturing Engineer",           ["DuPont", "3M", "Honeywell", "GE", "Eaton"],         78),
    ({"mfg", "ops"},   "Process Engineer",                 ["BASF", "Dow", "Eastman", "Air Products"],           76),
    ({"auto", "mfg"},  "Quality Engineer",                 ["Toyota", "Honda", "Bosch", "Magna", "Aptiv"],       75),
    ({"software", "data"}, "Data Engineer",                ["Google", "Meta", "Amazon", "Databricks"],           80),
    ({"software", "ai"},   "ML Engineer",                  ["OpenAI", "Anthropic", "NVIDIA", "Google DeepMind"], 82),
    ({"software", "web"},  "Full-Stack Engineer",          ["Stripe", "Shopify", "Vercel", "Linear"],            79),
    ({"software"},         "Software Engineer",            ["Google", "Meta", "Apple", "Microsoft", "Amazon"],   78),
    ({"data"},             "Data Analyst",                 ["McKinsey", "Deloitte", "PwC", "Accenture"],         74),
    ({"ops", "leadership"}, "Program Manager",             ["Boeing", "Lockheed", "Northrop", "Raytheon"],       73),
    ({"energy"},           "Energy Systems Engineer",      ["Tesla Energy", "Enphase", "Sunrun", "NextEra"],     77),
    ({"mech", "eng"},      "Mechanical Engineer",          ["SpaceX", "Blue Origin", "Joby Aviation", "Boom"],  76),
]

# Skill gaps by domain
SKILL_GAP_MAP = {
    "ev":       [
        ("Battery Manufacturing",  "+6 pts", "Take a battery cell manufacturing course (Coursera / MIT OCW)"),
        ("BMS Design",             "+5 pts", "Study battery management system fundamentals and build a small project"),
        ("HV Safety",              "+4 pts", "Complete an EV high-voltage safety certification"),
    ],
    "mfg":      [
        ("DFMEA",                  "+5 pts", "Work through an AIAG DFMEA workbook with a practice case study"),
        ("Six Sigma",              "+5 pts", "Pursue a Green Belt certification via ASQ or Coursera"),
        ("PPAP / APQP",            "+4 pts", "Learn the AIAG APQP manual — widely expected in automotive manufacturing"),
    ],
    "software": [
        ("System Design",          "+5 pts", "Practice distributed system design on Exponent or Grokking"),
        ("Cloud (AWS/GCP)",        "+5 pts", "Complete an AWS Solutions Architect Associate certification"),
        ("LeetCode DSA",           "+4 pts", "Solve 50 medium problems on LeetCode focusing on arrays and graphs"),
    ],
    "data":     [
        ("SQL (Advanced)",         "+5 pts", "Complete Mode Analytics SQL tutorial and practice window functions"),
        ("dbt",                    "+4 pts", "Build a small dbt project on a public dataset and publish it"),
        ("Spark",                  "+4 pts", "Complete a Databricks Lakehouse Fundamentals course"),
    ],
    "auto":     [
        ("APQP",                   "+5 pts", "Study the AIAG APQP reference manual — core to automotive quality"),
        ("IATF 16949",             "+4 pts", "Learn IATF 16949 quality standard requirements"),
        ("DVP&R",                  "+4 pts", "Study Design Verification Plan and Report methodology"),
    ],
    "leadership": [
        ("PMP Certification",      "+5 pts", "Pursue PMI PMP — recognized across engineering and tech industries"),
        ("OKR Framework",          "+3 pts", "Study OKR goal-setting methodology and practice with your current team"),
    ],
}

# Next steps by domain
NEXT_STEP_MAP = {
    "ev":       [
        "Add one quantified EV or battery achievement to your resume (cost, weight, yield, range impact)",
        "Connect with 2 EV engineers on LinkedIn from your target companies — alumni first",
        "Explore open-source BMS or thermal simulation projects on GitHub to show initiative",
    ],
    "mfg":      [
        "Rewrite your strongest manufacturing bullet using this formula: action + metric + constraint",
        "Research the AIAG Core Tools (APQP, FMEA, MSA, SPC, PPAP) — interviewers at Tier 1s expect them",
        "Create a one-page process improvement case study from your co-op or internship experience",
    ],
    "software": [
        "Push a portfolio project to GitHub that demonstrates your strongest technical skill",
        "Write a short technical blog post or README explaining a problem you solved",
        "Complete one system design mock interview on Exponent or Interviewing.io",
    ],
    "data":     [
        "Build and publish a Kaggle notebook or public analysis on a dataset you care about",
        "Add SQL and a BI tool to your resume if you've used them — even informally",
        "Reach out to 2 data professionals at target companies for informational interviews",
    ],
    "auto":     [
        "Tailor your resume to use automotive vocabulary: PPAP, APQP, GD&T, DVP&R, launch",
        "Research your target company's product lines so you can speak to them in interviews",
        "Search for SAE technical papers related to your experience area and read 2-3",
    ],
    "leadership": [
        "Document one example of leading a project or team using the STAR format",
        "Quantify your impact: how many people, what budget, what outcome",
    ],
}

COMPANY_MAP = {
    "ev":       [
        ("Rivian",         "Leading EV OEM with strong mechanical and manufacturing roles", "ME, Mfg Eng, Process Eng", 86),
        ("Tesla",          "High-growth EV leader known for manufacturing and engineering velocity", "Mfg Eng, Process Eng, Battery Eng", 84),
        ("Lucid Motors",   "Premium EV company with deep engineering culture", "Vehicle Systems, ME, Test Eng", 78),
        ("Canoo",          "EV startup with openings across systems and manufacturing", "ME, Systems Eng, Process Eng", 72),
    ],
    "mfg":      [
        ("3M",             "Global manufacturing leader with diverse engineering roles", "Process Eng, Mfg Eng, Quality", 80),
        ("Honeywell",      "Broad industrial manufacturer with process and systems roles", "Process Eng, Systems Eng", 77),
        ("Eaton",          "Power management company with strong engineering pipeline", "Mfg Eng, Quality Eng", 75),
        ("Parker Hannifin","Motion and control technology with global manufacturing", "Mfg Eng, Systems Eng", 74),
    ],
    "auto":     [
        ("BorgWarner",     "Tier 1 supplier with strong EV transition and engineering depth", "Mfg Eng, Quality Eng, Process Eng", 82),
        ("Bosch",          "Global automotive supplier with broad engineering roles", "Systems Eng, Quality Eng, ME", 80),
        ("Aptiv",          "Advanced safety and electrical architecture — growing EV focus", "Systems Eng, Electrical Eng", 76),
        ("Magna",          "Full-vehicle supplier with roles across all engineering disciplines", "ME, Mfg Eng, Quality Eng", 74),
    ],
    "software": [
        ("Google",         "World-class engineering culture and scale", "SWE, SRE, Data Eng", 82),
        ("Meta",           "High-impact systems and infrastructure engineering", "SWE, ML Eng, Data Eng", 80),
        ("Stripe",         "Best-in-class payments infrastructure engineering", "SWE, Backend Eng", 79),
        ("Linear",         "Craft-focused product engineering team", "SWE, Full-Stack", 75),
    ],
    "data":     [
        ("Databricks",     "Leading data and AI platform — strong data engineering culture", "Data Eng, Analytics Eng", 82),
        ("Snowflake",      "Cloud data warehouse with strong analytics engineering roles", "Analytics Eng, Data Eng", 80),
        ("dbt Labs",       "Analytics engineering focused company", "Analytics Eng, Data Eng", 77),
        ("McKinsey",       "Top consulting with strong analytics and data science practice", "Data Analyst, Data Scientist", 74),
    ],
    "energy":   [
        ("Tesla Energy",   "Grid-scale storage and solar — engineering and operations roles", "Systems Eng, Process Eng", 84),
        ("Enphase",        "Microinverter and battery storage technology", "Systems Eng, HW Eng", 78),
        ("NextEra Energy", "Largest renewable energy company in the US", "Energy Eng, Project Eng", 76),
        ("QuantumScape",   "Solid-state battery startup with deep technical engineering", "Process Eng, R&D Eng", 73),
    ],
}

STEPPING_STONE_MAP = {
    "ev":       [
        ("EV Battery Internship",      "Adds direct battery or EV systems experience that EV OEMs look for", "~6 months"),
        ("Auto Tier 1 Supplier Role",  "Bridges manufacturing experience to EV through supply chain exposure", "1-2 years"),
    ],
    "mfg":      [
        ("Process Engineering Co-op",  "Hands-on process improvement work is the fastest path to manufacturing roles", "6 months"),
        ("Quality Engineering Role",   "Quality experience is a recognized bridge into manufacturing engineering", "1 year"),
    ],
    "software": [
        ("SWE Internship",             "Industry internships are the strongest signal for full-time software roles", "3 months"),
        ("Open Source Contribution",   "Contributing to a visible project proves real-world engineering ability", "Ongoing"),
    ],
    "data":     [
        ("Analytics Internship",       "Hands-on SQL and BI work in a real business context is highly valued", "3 months"),
        ("Data Engineering Co-op",     "Pipeline and warehouse experience is the fastest path to senior data roles", "6 months"),
    ],
    "auto":     [
        ("Automotive Internship",      "OEM or Tier 1 exposure is near-essential for full-time automotive hiring", "3-6 months"),
        ("Quality Co-op",              "Quality experience translates directly across all automotive functions", "6 months"),
    ],
}


def _find(pattern: str, text: str, flags: int = 0) -> str:
    """Return first group of first match, or empty string."""
    m = re.search(pattern, text, flags)
    return m.group(1).strip() if m else ""


def _has(term: str, text: str) -> bool:
    return bool(re.search(r"\b" + re.escape(term) + r"\b", text, re.IGNORECASE))


def _extract_name(text: str) -> str:
    for line in text.splitlines():
        line = line.strip()
        words = line.split()
        if 2 <= len(words) <= 3 and line[0].isupper() and all(w[0].isupper() for w in words):
            if not any(kw in line.lower() for kw in ("experience", "education", "skills", "summary", "objective")):
                return line
    return "Your Profile"


def _extract_location(text: str) -> str:
    m = re.search(r"\b([A-Z][a-zA-Z ]{2,25},\s*[A-Z]{2})\b", text)
    if m:
        return m.group(1).strip()
    return ""


def _extract_email(text: str) -> str:
    m = re.search(r"[\w.+-]+@[\w-]+\.[a-zA-Z]{2,}", text)
    return m.group(0) if m else ""


def _extract_education(text: str) -> list:
    results = []
    for uni in UNIVERSITIES:
        if uni.lower() in text.lower():
            degree = ""
            for pat in DEGREE_PATTERNS:
                d = _find(pat, text)
                if d:
                    degree = d[:60]
                    break
            gpa = _find(r"GPA[:\s]+(\d\.\d+)", text)
            year = _find(r"(?:Expected|Graduating|Class of)?\s*(20\d{2})", text)
            results.append({
                "school": uni,
                "degree": degree or "Engineering",
                "year": year,
                "gpa": gpa,
            })
            if len(results) >= 2:
                break
    return results


_DATE_PAT = r"((?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s+20\d{2}|20\d{2})\s*[-–]\s*((?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s+20\d{2}|20\d{2}|Present|Current)"
_COMPANY_KW = [
    "Inc", "LLC", "Corp", "Co.", "Company", "Group", "Technologies",
    "Systems", "Solutions", "Industries", "Labs", "Team", "University",
    "DuPont", "Tesla", "Rivian", "Google", "Amazon", "Apple", "Microsoft",
    "Boeing", "Lockheed", "General", "Honeywell", "3M", "Eaton",
]


def _extract_experience(text: str) -> list:
    """Extract company/role blocks using heuristics."""
    lines = text.splitlines()
    consumed: set[int] = set()
    results: list[dict] = []

    def date_in(s: str):
        return re.search(_DATE_PAT, s, re.IGNORECASE)

    def strip_dates(s: str) -> str:
        return re.sub(_DATE_PAT, "", s, flags=re.IGNORECASE).strip(" -–|,").strip()

    def is_bullet(s: str) -> bool:
        return bool(s) and s[0] in "-•*"

    def collect_bullets(start: int) -> list[str]:
        out = []
        j = start
        while j < len(lines) and len(out) < 3:
            if j in consumed:
                j += 1
                continue
            b = lines[j].strip()
            if not b:
                break
            if is_bullet(b) and len(b) > 15:
                out.append(b.lstrip("-•*– "))
            elif date_in(b):
                break  # next job header — stop
            j += 1
        return out

    i = 0
    while i < len(lines) and len(results) < 5:
        if i in consumed:
            i += 1
            continue
        line = lines[i].strip()
        if not line or is_bullet(line):
            i += 1
            continue

        next_line = lines[i + 1].strip() if i + 1 < len(lines) else ""
        dm_here = date_in(line)
        dm_next = date_in(next_line) if next_line else None
        has_kw = any(_has(kw, line) for kw in _COMPANY_KW)

        if has_kw and not dm_here and dm_next:
            # Pattern: "CompanyName - Location" / "Title Jan 2024 - Aug 2024"
            company = line.strip(" -–|,")
            title = strip_dates(next_line)
            dates = f"{dm_next.group(1)} - {dm_next.group(2)}"
            consumed.add(i + 1)
            bullets = collect_bullets(i + 2)
            if company:
                results.append({
                    "company": company[:60],
                    "title": (title or "Engineer")[:60],
                    "dates": dates,
                    "industry": "",
                    "bullets": bullets,
                })
        elif dm_here and not is_bullet(line):
            # Date on this line — try to split company | title
            stripped = strip_dates(line)
            if "|" in stripped:
                parts = [p.strip() for p in stripped.split("|", 1)]
                company, title = parts[0], parts[1]
            else:
                company, title = stripped, ""
            dates = f"{dm_here.group(1)} - {dm_here.group(2)}"
            if company and not is_bullet(company):
                results.append({
                    "company": company[:60],
                    "title": (title or "Engineer")[:60],
                    "dates": dates,
                    "industry": "",
                    "bullets": collect_bullets(i + 1),
                })
        i += 1
    return results


def _extract_achievements(text: str) -> list:
    """Pull lines with quantified achievements (numbers + impact words)."""
    hits = []
    impact_words = r"(reduced|improved|increased|saved|led|built|designed|managed|launched|achieved|cut|grew|won|awarded)"
    for line in text.splitlines():
        line = line.strip().lstrip("-•*– ")
        if re.search(impact_words, line, re.IGNORECASE) and re.search(r"\d+", line) and len(line) > 30:
            hits.append(line[:120])
        if len(hits) >= 4:
            break
    return hits


def _extract_leadership(text: str) -> list:
    hits = []
    patterns = [
        r"[Ll]ed\s+(?:a\s+)?(?:team\s+of\s+)?([\w\s,]+)",
        r"[Mm]anaged\s+([\w\s,]+)",
        r"[Mm]entor(?:ed)?\s+([\w\s,]+)",
        r"[Ff]ounded\s+([\w\s,]+)",
        r"[Cc]hair(?:ed)?\s+([\w\s,]+)",
    ]
    for line in text.splitlines():
        line = line.strip().lstrip("-•*– ")
        for pat in patterns:
            if re.search(pat, line) and len(line) > 20:
                hits.append(line[:110])
                break
        if len(hits) >= 3:
            break
    return hits


def _detect_skills(text: str) -> tuple[list[str], set[str], dict]:
    """Return (skill_names, domain_tags, tag_counts)."""
    found_skills = []
    domain_tags: set[str] = set()
    tag_counts: dict[str, int] = {}
    for skill, tags in SKILL_CATALOG:
        if _has(skill, text):
            found_skills.append(skill)
            domain_tags.update(tags)
            for t in tags:
                tag_counts[t] = tag_counts.get(t, 0) + 1
    return found_skills, domain_tags, tag_counts


def _detect_industries(text: str, domain_tags: set[str], skill_tag_counts: dict | None = None) -> list[str]:
    industries = set()
    if "ev" in domain_tags:
        industries.add("Electric Vehicles")
    if "auto" in domain_tags:
        industries.add("Automotive")
    if "mfg" in domain_tags:
        industries.add("Manufacturing")
    if domain_tags & {"software", "web", "cloud"}:
        industries.add("Software / Tech")
    if domain_tags & {"data", "ai"}:
        industries.add("Data & AI")
    if "energy" in domain_tags:
        industries.add("Energy")
    if "aerospace" in text.lower() or "aviation" in text.lower():
        industries.add("Aerospace")
    if "healthcare" in text.lower() or "medical" in text.lower():
        industries.add("Healthcare")
    if "finance" in text.lower() or "banking" in text.lower():
        industries.add("Finance")
    if "consulting" in text.lower():
        industries.add("Consulting")
    return sorted(industries)


def _primary_domain(domain_tags: set[str]) -> str:
    """Pick the single strongest domain for generating recommendations."""
    priority = ["ev", "mfg", "auto", "energy", "software", "data", "leadership"]
    for d in priority:
        if d in domain_tags:
            return d
    return "mfg"


def _build_roles(domain_tags: set[str], score: int) -> list[dict]:
    results = []
    for required, title, companies, base in ROLE_MAP:
        if required & domain_tags:
            overlap = len(required & domain_tags) / len(required)
            match = min(int(base * overlap) + (score - 60) // 4, 95)
            results.append({
                "title": title,
                "company": companies[0],
                "fit": f"Your detected skills in {', '.join(sorted(required))} align with this role.",
                "matchScore": max(match, 60),
            })
    results.sort(key=lambda r: -r["matchScore"])
    return results[:4]


def _build_gaps(domain_tags: set[str], found_skills: list[str]) -> list[dict]:
    gaps = []
    skill_lower = {s.lower() for s in found_skills}
    primary = _primary_domain(domain_tags)
    domains_to_check = [primary] + [d for d in ["mfg", "ev", "software", "data", "auto"] if d != primary]
    seen = set()
    for dom in domains_to_check:
        for skill, impact, suggestion in SKILL_GAP_MAP.get(dom, []):
            if skill.lower() not in skill_lower and skill not in seen:
                gaps.append({"skill": skill, "impact": impact, "suggestion": suggestion})
                seen.add(skill)
            if len(gaps) >= 5:
                break
        if len(gaps) >= 5:
            break
    return gaps


def _build_companies(domain_tags: set[str]) -> list[dict]:
    companies = []
    seen = set()
    priority = ["ev", "mfg", "auto", "software", "data", "energy"]
    for dom in priority:
        if dom in domain_tags:
            for name, fit, role_type, match in COMPANY_MAP.get(dom, []):
                if name not in seen:
                    companies.append({"name": name, "fit": fit, "roleType": role_type, "matchScore": match})
                    seen.add(name)
            if len(companies) >= 4:
                break
    return companies[:4]


def _build_stones(domain_tags: set[str]) -> list[dict]:
    primary = _primary_domain(domain_tags)
    stones = []
    for role, desc, timeframe in STEPPING_STONE_MAP.get(primary, []):
        stones.append({"role": role, "description": desc, "timeframe": timeframe})
    return stones


def _build_next_steps(domain_tags: set[str], skills: list[str], experience: list[dict]) -> list[str]:
    steps = []
    primary = _primary_domain(domain_tags)
    steps.extend(NEXT_STEP_MAP.get(primary, []))
    # Generic steps based on what's present/missing
    if not experience:
        steps.append("Add concrete work experience to your resume with measurable outcomes")
    if not any(_has(s, " ".join(skills)) for s in ["leadership", "led", "managed"]):
        steps.append("Highlight any team leadership or project ownership experience you have")
    steps.append("Update your LinkedIn headline to match your target role title and industry")
    return steps[:5]


def _build_summary(name: str, skills: list[str], industries: list[str], experience: list[dict]) -> str:
    n_skills = len(skills)
    n_exp = len(experience)
    ind_str = " and ".join(industries[:2]) if industries else "engineering"
    exp_str = f" with {n_exp} detected work {'experience' if n_exp == 1 else 'experiences'}" if n_exp else ""
    return (
        f"{name.split()[0]} shows a {n_skills}-skill profile across {ind_str}{exp_str}. "
        "Key strengths include hands-on technical and engineering experience. "
        "Roles, companies, and skill gaps below are tailored to your detected skills and background."
    )


_MONTHS = r"(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)"


def _normalize_text(text: str) -> str:
    """Fix common PDF extraction artifacts before parsing."""
    # Insert space when a month name is directly concatenated to text (e.g. "Co-opJan" → "Co-op Jan")
    text = re.sub(r"([a-zA-Z])" + _MONTHS + r"(\s+\d{4})", r"\1 \2\3", text)
    # Replace en-dash / em-dash with ASCII hyphen
    text = text.replace("–", "-").replace("—", "-")
    return text


def _analyze_with_fallback(text: str) -> dict:
    text = _normalize_text(text)
    name       = _extract_name(text)
    location   = _extract_location(text)
    education  = _extract_education(text)
    experience = _extract_experience(text)
    achievements = _extract_achievements(text)
    leadership   = _extract_leadership(text)

    skills, domain_tags, tag_counts = _detect_skills(text)

    # Suppress incidental software/data signals for engineering-primary profiles
    if domain_tags & {"ev", "mfg", "auto"}:
        if tag_counts.get("software", 0) < 5:
            domain_tags -= {"software", "web", "cloud"}
        if tag_counts.get("data", 0) < 5:
            domain_tags -= {"data", "ai"}

    industries = _detect_industries(text, domain_tags, tag_counts)

    # Score: base 45, +2 per skill, +3 per industry, +3 per experience, +2 per education
    raw_score = (
        45
        + min(len(skills), 15) * 2
        + min(len(industries), 4) * 3
        + min(len(experience), 3) * 3
        + min(len(education), 2) * 2
    )
    score = min(raw_score, 82)

    if score >= 75:
        label = "Strong trajectory"
    elif score >= 60:
        label = "Developing trajectory"
    else:
        label = "Early-stage trajectory"

    primary = _primary_domain(domain_tags)
    headline_map = {
        "ev":       "EV & Battery Engineer",
        "mfg":      "Manufacturing Engineer",
        "auto":     "Automotive Engineer",
        "software": "Software Engineer",
        "data":     "Data / Analytics Engineer",
        "energy":   "Energy Systems Engineer",
        "leadership": "Engineering Leader",
        "mech":     "Mechanical Engineer",
    }
    headline = headline_map.get(primary, "Engineering Professional")
    if education:
        ed = education[0]
        if ed.get("degree"):
            headline = ed["degree"][:50]

    return {
        "name":           name,
        "headline":       headline,
        "location":       location,
        "education":      education,
        "experience":     experience,
        "skills":         skills[:16],
        "industries":     industries,
        "leadership":     leadership,
        "achievements":   achievements,
        "careerInterests": list({t.title() for t in domain_tags})[:4],
        "keywords":       skills[:8],
        "pathScore":      score,
        "scoreLabel":     label,
        "careerSummary":  _build_summary(name, skills, industries, experience),
        "bestFitRoles":   _build_roles(domain_tags, score),
        "skillGaps":      _build_gaps(domain_tags, skills),
        "targetCompanies": _build_companies(domain_tags),
        "steppingStones": _build_stones(domain_tags),
        "nextSteps":      _build_next_steps(domain_tags, skills, experience),
    }
