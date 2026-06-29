"""Career DNA scoring engine for PathForge."""

from dataclasses import dataclass

from app.models.person import Person
from app.services.similarity import calculate_skill_similarity


@dataclass
class CareerDNA:
    """Represents a person's similarity to another career path."""

    timeline_score: float
    skill_score: float
    industry_score: float
    overall_score: float


def calculate_career_dna(person: Person, match: Person) -> CareerDNA:
    """Calculate a simple Career DNA score."""

    timeline_score = (
        min(len(person.experiences), len(match.experiences))
        / max(len(person.experiences), len(match.experiences))
    ) * 100

    skill_score = calculate_skill_similarity(person, match)

    person_industries = {exp.company.industry.lower() for exp in person.experiences}
    match_industries = {exp.company.industry.lower() for exp in match.experiences}

    if person_industries == match_industries:
        industry_score = 100.0
    elif person_industries & match_industries:
        industry_score = 75.0
    else:
        industry_score = 25.0

    overall_score = round(
        timeline_score * 0.35 + skill_score * 0.45 + industry_score * 0.20,
        1,
    )

    return CareerDNA(
        timeline_score=round(timeline_score, 1),
        skill_score=skill_score,
        industry_score=industry_score,
        overall_score=overall_score,
    )
