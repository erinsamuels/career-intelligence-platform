"""Career search engine."""

from app.models.person import Person
from app.services.career_dna import calculate_career_dna


def find_best_match(person: Person, candidates: list[Person]) -> tuple[Person, float]:
    """Find the candidate with the highest Career DNA score."""

    best_person = candidates[0]
    best_score = -1.0

    for candidate in candidates:

        dna = calculate_career_dna(person, candidate)

        if dna.overall_score > best_score:
            best_person = candidate
            best_score = dna.overall_score

    return best_person, best_score