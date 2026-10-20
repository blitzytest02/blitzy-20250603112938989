# hello_date

A minimal Python 3.12 command-line tool that prints the greeting `Hello, world` and today's date in ISO 8601 form, as a single line on standard output.

## Prerequisites

- Python 3.12: check the interpreter with `python --version`, which prints `Python 3.12.x`.
- pytest 9.1.1: the test runner used below.

## Run

From the repository root:

```
python hello_date.py
```

It prints exactly one line: the greeting, a single space, and today's date as `YYYY-MM-DD`. For example:

```
Hello, world 2026-10-20
```

## Test

From the repository root:

```
pytest -q
```

The test runs the script and asserts its output, so the summary line reports:

```
1 passed
```
