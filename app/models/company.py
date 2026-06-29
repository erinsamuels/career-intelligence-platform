"""Company model for PathForge."""

from dataclasses import dataclass


@dataclass
class Company:
    """Represents a company or organization in a career path."""

    company_id: str
    name: str
    industry: str = ""
    size_category: str = ""
    headquarters_location: str = ""