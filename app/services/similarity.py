"""Similarity service for PathForge."""

from app.models.person import Person


def calculate_skill_similarity(person_a: Person, person_b: Person) -> float:
    """Calculate the percentage of shared skills between two people."""

    skills_a = set(person_a.skills)
    skills_b = set(person_b.skills)

    if not skills_a or not skills_b:
        return 0.0

    shared_skills = skills_a.intersection(skills_b)
    total_unique_skills = skills_a.union(skills_b)

    return round((len(shared_skills) / len(total_unique_skills)) * 100, 1)