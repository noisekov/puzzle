# Vue 3 + TypeScript + Vite

RSS Puzzle is an interactive mini-game aimed at enhancing English language skills. Players assemble sentences from jumbled words, inspired by Lingualeo's Phrase Constructor training. The game integrates various levels of difficulty, hint options, and a unique puzzle-like experience with artwork.

# Quick start

**Clone the repository**

```bash
git clone <repository-url>
cd <project-folder>
```

**Install dependencies**

```bash
npm install
```

**Configure environment variables**

- Rename `.env.example` to `.env`
- Open .env and add your GitHub token to the VITE_GITHUB_TOKEN variable:
    ```
    VITE_GITHUB_TOKEN=your_token_here
    ```
- ПYou can get a token in GitHub settings:`Settings → Developer settings → Personal access tokens → Tokens (classic)`

**Run the project**

```bash
npm run dev
```

After running, the project will be available at the address shown in the terminal(`http://localhost:5173`).
