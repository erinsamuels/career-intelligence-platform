"""Create Person objects from resume text."""

from app.models.person import Person


def build_person_from_resume(text: str) -> Person:
    """Very simple Version 1 parser."""

    person = Person(
        person_id="UPLOAD",
        full_name="Resume Upload",
        professional_summary="Imported Resume",
    )

    lines = [line.strip() for line in text.splitlines() if line.strip()]

    if lines:
        person.full_name = lines[0]

    skills = [
        "CAD",
        "Python",
        "Manufacturing",
        "SolidWorks",
        "Root Cause Analysis",
        "Leadership",
    ]

    for skill in skills:
        if skill.lower() in text.lower():
            person.skills.append(skill)

    return person