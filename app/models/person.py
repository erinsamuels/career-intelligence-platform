"""Person model."""

from __future__ import annotations

from dataclasses import dataclass, field


@dataclass
class Person:
    """Represents a person within PathForge."""

    person_id: str
    full_name: str
    professional_summary: str = ""
    location: str = ""
    is_primary_user: bool = False
    skills: list[str] = field(default_factory=list)
    target_company: str = ""
    experiences: list["Experience"] = field(default_factory=list)