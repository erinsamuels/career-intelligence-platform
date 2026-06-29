"""PathForge — AI Career Intelligence Platform.

Application entry point.
"""


from app.sample_data import get_sample_person
from app.services.timeline import format_career_timeline

APP_NAME: str = "PathForge"
APP_VERSION: str = "0.1.0"


def main() -> None:
    """Run the PathForge application."""
    
    print("🚨 NEW MAIN.PY IS RUNNING 🚨")

    person = get_sample_person()
    timeline = format_career_timeline(person)

    print(timeline)
    print("")
    print(f"Version: {APP_VERSION}")


if __name__ == "__main__":
    main()