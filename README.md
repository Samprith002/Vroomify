# Vroomify

## Requirements

### Python

Install Python v3.10 (preferably) because it has proper support for all packages

### Bun

If you have Node.js, just run

```bash
npm install -g bun
```

---

## Setting Up

### Client

1. Run `bun install` to install all necessary dependencies.
2. Run `bun dev` to start the development server.
3. Visit <http://localhost:3000> to see the result.

### Server

1. Create and activate a virtual environment (required).
2. Install dependencies

```bash
pip install -r requirements.txt
```

3. Run the development server

```bash
fastapi dev index.py
```

4. The API starts serving on <http://localhost:8000>.

Should you install any other dependencies, make sure to run

```bash
pip freeze > requirements.txt
```

before closing the virtual environment with `deactivate`.
