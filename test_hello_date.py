"""Assert the single line hello_date.py writes when it is run as a script."""

import re
import subprocess
import sys
from datetime import date
from pathlib import Path

SCRIPT = Path(__file__).resolve().parent / "hello_date.py"


def test_hello_date_output():
    """The script prints one line: the greeting and today's ISO 8601 date."""
    before = date.today()
    result = subprocess.run(
        [sys.executable, str(SCRIPT)],
        capture_output=True,
        text=True,
        check=True,
    )
    after = date.today()

    lines = result.stdout.splitlines()
    assert len(lines) == 1
    assert re.fullmatch(r"Hello, world \d{4}-\d{2}-\d{2}", lines[0])

    printed_date = lines[0].removeprefix("Hello, world ")
    assert printed_date in (before.isoformat(), after.isoformat())

    assert result.stderr == ""
