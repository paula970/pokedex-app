# 🔥 Pokédex App

A modern Pokédex built with React, Vite, Redux Toolkit, Apollo Client, and Atomic Design.


## 🌟 Live Demo
**[View Demo](https://pokedex-app-six-lilac.vercel.app/)**

## ✨ Features

- 🔍 **List and search** Pokémon
- 🏷️ **Filter by type** of Pokémon 
- ❤️ **Persistent favorites** system
- 📱 **Responsive design** for all devices
- ♾️ **Infinite scroll** for smooth navigation

## 🛠️ Technologies

- **React 18** + TypeScript
- **Redux Toolkit** for state management
- **Apollo Client** + GraphQL
- **Vite** as build tool
- **Vitest** for testing (25 tests ✅)

## 🔨 Architecture Decisions

- **Redux Toolkit** was chosen for its robustness and ease in handling global state (favorites, filters).
- **Atomic Design** enables a modular UI that's easy to maintain and scale.
- **Apollo Client** for efficient consumption of the GraphQL API.

## 🚀 Installation

```bash
# Clone the repo
git clone https://github.com/paula970/pokedex-app.git
cd pokedex-app

# Install dependencies
npm install

# Run in development
npm run dev
```

## 📂 Project Structure

Following Brad Frost's **Atomic Design** methodology:

```
src/
├── components/          # React Components (Atomic Design)
│   ├── atoms/          # 🔹 Basic elements (Button, Input)
│   ├── molecules/      # 🔸 Compound components (SearchBar, Card)
│   ├── organisms/      # 🔶 Complex sections (Grid, Header)
│   └── templates/      # 📄 Page layouts
├── pages/              # 📱 Complete app pages
├── hooks/              # 🎣 Custom hooks
├── store/              # 🗃️ Redux state
├── utils/              # 🛠️ Utility functions
└── styles/             # 🎨 CSS styles per component
```

### 🏗️ Atomic Design

**Atoms** → **Molecules** → **Organisms** → **Templates** → **Pages**

- **🔹 Atoms**: Reusable basic UI elements (`Button`, `Input`)
- **🔸 Molecules**: Simple combinations of atoms (`SearchBar`, `PokemonCard`) 
- **🔶 Organisms**: Complex sections (`PokemonGrid`, `Header`)
- **📄 Templates**: Page structure and layout (`MainTemplate`)
- **📱 Pages**: Complete instances with real data (`HomePage`)

## 🧪 Testing

25 unit tests covering:
- ✅ Input validation (14 tests)
- ✅ Button components (5 tests) 
- ✅ Input components (6 tests)

```bash
npm test        # Run tests
npm run build   # Production build
```

## 👩‍💻 Author

Paula — [@paula970](https://github.com/paula970)
