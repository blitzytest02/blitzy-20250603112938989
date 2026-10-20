"""Print the greeting and today's date as a single line of standard output."""

from datetime import date


def hello_date_line() -> str:
    """Return the greeting and today's date in ISO 8601 form."""
    return f"Hello, world {date.today().isoformat()}"


if __name__ == "__main__":
    print(hello_date_line())
