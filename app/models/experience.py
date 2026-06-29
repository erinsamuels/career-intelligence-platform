"""Experience model."""

from dataclasses import dataclass, field
from enum import Enum

from app.models.company import Company
from app.models.person import Person


class ExperienceType(Enum):
    CO_OP = "co-op"
    INTERNSHIP = "internship"
    FULL_TIME = "full-time"
    PROJECT = "project"
    RESEARCH = "research"
    LEADERSHIP = "leadership"
    EDUCATION = "education"
    VOLUNTEER = "volunteer"


@dataclass
class Experience:
    """Represents one career experience."""

    experience_id: str
    person: Person
    company: Company
    raw_title: str
    normalized_title: str
    experience_type: ExperienceType

    start_date: str = ""
    end_date: str = ""
    location: str = ""

    responsibilities: list[str] = field(default_factory=list)
    skills_used: list[str] = field(default_factory=list)
    projects: list[str] = field(default_factory=list)

    team_size: int | None = None