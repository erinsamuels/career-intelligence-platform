"""Path Score engine for PathForge."""

from dataclasses import dataclass

from app.models.person import Person
from app.services.career_dna import calculate_career_dna


@dataclass
class PathScore:
    """User-facing career readiness score."""

    score: float
    rating: str
    strengths: list[str]
    improvements: list[str]


def calculate_path_score(person: Person, match: Person) -> PathScore:
    """Calculate an explainable Path Score between a person and a match."""

    dna = calculate_career_dna(person, match)

    score = round(dna.overall_score, 1)

    if score >= 85:
        rating = "Excellent trajectory"
    elif score >= 70:
        rating = "Strong trajectory"
    elif score >= 50:
        rating = "Developing trajectory"
    else:
        rating = "Early-stage trajectory"

    strengths = []

    shared_skills = set(person.skills).intersection(set(match.skills))

    if "Manufacturing" in shared_skills:
        strengths.append("Manufacturing experience")

    if "CAD" in shared_skills:
        strengths.append("CAD background")

    if "Python" in shared_skills:
        strengths.append("Python experience")

    if not strengths:
        strengths.append("Some overlapping career signals")

    improvements = []

    missing_skills = set(match.skills) - set(person.skills)

    for skill in sorted(missing_skills):
        improvements.append(f"Build {skill} experience")

    return PathScore(
        score=score,
        rating=rating,
        strengths=strengths,
        improvements=improvements[:3],
    )