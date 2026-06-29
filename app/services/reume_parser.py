"""Resume parser for PathForge.

Version 1:
Loads a plain text resume.

Future versions:
- PDF
- DOCX
- LinkedIn
"""

from pathlib import Path


def load_resume(file_path: str) -> str:
    """Load the contents of a resume."""

    path = Path(file_path)

    with path.open("r", encoding="utf-8") as file:
        return file.read()