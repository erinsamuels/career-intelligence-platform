"""PathForge — AI Career Intelligence Platform.

Application entry point.
"""

from app.sample_data import get_sample_match, get_sample_person
from app.services.path_score import calculate_career_dna
from app.services.timeline import format_career_timeline
from app.services.data_loader import load_people_from_json

APP_VERSION: str = "0.1.0"


def main() -> None:
    """Run the PathForge application."""

    person = get_sample_person()
    match = get_sample_match()
    dna = calculate_career_dna(person, match)
    candidates = load_people_from_json("data/careers.json")

    print(format_career_timeline(person))
    print()
    print(f"Career Match: {match.full_name}")
    print()
    print("Career DNA")
    print("-" * 30)
    print(f"Timeline : {dna.timeline_score}%")
    print(f"Skills   : {dna.skill_score}%")
    print(f"Industry : {dna.industry_score}%")
    print("-" * 30)
    print(f"Overall  : {dna.overall_score}%")
    print()
    print(f"Version: {APP_VERSION}")


if __name__ == "__main__":
    main()