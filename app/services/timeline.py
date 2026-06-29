"""Timeline formatting service."""

from app.models.person import Person


def format_career_timeline(person: Person) -> str:

    output = []

    output.append("=" * 40)
    output.append("             PathForge")
    output.append("=" * 40)
    output.append("")
    output.append(person.full_name)
    output.append("")
    output.append(f"Target Company: {person.target_company}")
    output.append("")
    output.append("Career Timeline")
    output.append("-" * 40)

    for experience in person.experiences:
        output.append(experience.start_date)
        output.append(experience.company.name)
        output.append(experience.normalized_title)
        output.append("")

    output.append("Skills")
    output.append("-" * 40)

    for skill in person.skills:
        output.append(f"• {skill}")

    return "\n".join(output)