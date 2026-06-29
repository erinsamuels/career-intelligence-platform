"""Sample data for PathForge.

Creates a sample Person with a realistic career history for testing
and demonstration purposes.
"""

from app.models.company import Company
from app.models.experience import Experience, ExperienceType
from app.models.person import Person


def get_sample_person() -> Person:
    """Return a sample Person object for development."""

    erin = Person(
        person_id="P001",
        full_name="Erin Samuels",
        professional_summary="Mechanical Engineering student passionate about EV manufacturing.",
        location="Blacksburg, VA",
        is_primary_user=True,
        skills=[
            "CAD",
            "Python",
            "Manufacturing",
            "Root Cause Analysis",
            "Project Management",
        ],
        target_company="Rivian",
    )

    virginia_tech = Company(
        company_id="C001",
        name="Virginia Tech",
        industry="Higher Education",
        size_category="University",
        headquarters_location="Blacksburg, VA",
    )

    hevt = Company(
        company_id="C002",
        name="Hybrid Electric Vehicle Team",
        industry="Student Engineering Organization",
        size_category="Student Organization",
        headquarters_location="Blacksburg, VA",
    )

    dupont = Company(
        company_id="C003",
        name="DuPont",
        industry="Advanced Manufacturing",
        size_category="Enterprise",
        headquarters_location="Wilmington, DE",
    )

    erin.experiences = [
        Experience(
            experience_id="E001",
            person=erin,
            company=virginia_tech,
            raw_title="Mechanical Engineering Student",
            normalized_title="Mechanical Engineering Student",
            experience_type=ExperienceType.EDUCATION,
            start_date="2023-08",
            location="Blacksburg, VA",
        ),
        Experience(
            experience_id="E002",
            person=erin,
            company=hevt,
            raw_title="Mechanical Team Member",
            normalized_title="Engineering Project",
            experience_type=ExperienceType.PROJECT,
            start_date="2023-09",
            location="Blacksburg, VA",
            skills_used=["CAD", "Manufacturing"],
        ),
        Experience(
            experience_id="E003",
            person=erin,
            company=dupont,
            raw_title="Dry End Mechanical Engineering Co-op",
            normalized_title="Mechanical Engineering Co-op",
            experience_type=ExperienceType.CO_OP,
            start_date="2026-05",
            end_date="2026-12",
            location="Richmond, VA",
            skills_used=[
                "Manufacturing",
                "Root Cause Analysis",
                "Python",
            ],
        ),
    ]

    return erin