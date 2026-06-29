"""PathForge — AI Career Intelligence Platform.

Application entry point.
"""

from app.sample_data import get_sample_person
from app.services.data_loader import load_people_from_json
from app.services.path_score import calculate_path_score
from app.services.search import find_best_match
from app.services.timeline import format_career_timeline

APP_VERSION: str = "0.1.0"


def main() -> None:
    """Run the PathForge application."""

    person = get_sample_person()
    candidates = load_people_from_json("data/careers.json")

    best_match, _ = find_best_match(person, candidates)
    path_score = calculate_path_score(person, best_match)

    print(format_career_timeline(person))
    print()
    print("Best Career Match")
    print("-" * 30)
    print(best_match.full_name)
    print()
    print("Path Score")
    print("-" * 30)
    print(f"{path_score.score}/100")
    print(path_score.rating)
    print()
    print("Strengths")
    print("-" * 30)
    for strength in path_score.strengths:
        print(f"✓ {strength}")

    print()
    print("Improve Score")
    print("-" * 30)
    for improvement in path_score.improvements:
        print(f"+ {improvement}")

    print()
    print(f"Version: {APP_VERSION}")


if __name__ == "__main__":
    main()