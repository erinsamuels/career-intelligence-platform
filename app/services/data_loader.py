"""Data loading service for PathForge."""

import json
from pathlib import Path

from app.models.person import Person


def load_people_from_json(file_path: str) -> list[Person]:
    """Load people from a JSON file into Person objects."""

    path = Path(file_path)

    with path.open("r", encoding="utf-8") as file:
        raw_people = json.load(file)

    people: list[Person] = []

    for raw_person in raw_people:
        person = Person(
            person_id=raw_person["person_id"],
            full_name=raw_person["full_name"],
            location=raw_person.get("location", ""),
            skills=raw_person.get("skills", []),
            target_company=raw_person.get("target_company", ""),
        )

        people.append(person)

    return people