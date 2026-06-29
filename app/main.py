"""PathForge — AI Career Intelligence Platform."""

from app.sample_data import get_sample_person
from app.services.timeline import format_career_timeline

APP_NAME = "PathForge"
APP_VERSION = "0.1.0"


def main() -> None:
    """Application entry point."""

    person = get_sample_person()

    print(format_career_timeline(person))
    print()
    print(f"Version: {APP_VERSION}")


if __name__ == "__main__":
    main()