from app.sample_data import get_sample_match, get_sample_person
from app.services.similarity import calculate_skill_similarity
from app.services.timeline import format_career_timeline

APP_VERSION = "0.1.0"


def main() -> None:
    person = get_sample_person()
    match = get_sample_match()

    print(format_career_timeline(person))
    print()
    print(f"Career Match: {match.full_name}")
    print(f"Skill Similarity: {calculate_skill_similarity(person, match)}%")
    print()
    print(f"Version: {APP_VERSION}")


if __name__ == "__main__":
    main()