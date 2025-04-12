# Sportal Project

A modern testing framework built with Playwright and TypeScript.

## 🚀 Features

- End-to-end testing with Playwright
- API testing capabilities
- Visual regression testing
- Comprehensive test reporting with Allure
- TypeScript support
- ESLint and Prettier for code quality
- Husky for pre-commit hooks

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

## 🛠️ Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd sportal_project
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

## 🧪 Running Tests

- Run UI tests:
```bash
npm run test:ui
```

- Run API tests:
```bash
npm run test:api
```

- Run visual regression tests:
```bash
npm run test:visual
```

- Open Playwright UI mode:
```bash
npm run ui-mode
```

## 📊 Test Reports

- Generate and open Allure report:
```bash
npm run report-open
```

## 🔧 Development

- Lint code:
```bash
npm run lint
```

- Fix linting issues:
```bash
npm run lint-fix
```

- Format code with Prettier:
```bash
npm run prettier-fix
```

## 📁 Project Structure

```
src/
├── api/         # API test specifications
├── config/      # Configuration files
├── data/        # Test data and fixtures
├── fixtures/    # Test fixtures
├── services/    # Service layer implementations
├── ui/          # UI test specifications
└── utils/       # Utility functions and helpers
```

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Run tests and ensure they pass
4. Submit a pull request

## 📝 License

This project is licensed under the ISC License.