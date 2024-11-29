### Test Automation Framework: A Journey Through Best Practices

---

    This project showcases a TAF demo, built with a focus on best practices and a commitment to clean, maintainable code.

---

### Core Principles

#### This project embodies the following principles:
1. Layered Architecture
2. Framework Development Patterns: POP, OOP, Fabrics and etc
3. SOLID, DRY, KISS and etc

### Getting Started:
#### 1. Clone repository to your directory and navigate to project folder
- Write to your command line this command
    ```bash
    git clone https://github.com/danikkrapivnitskiy/sportal_project && cd sportal_project
    ```
#### 2. Prerequisites:
  - install project
    ```bash
    npm ci
    ```
#### 3. Run Tests:
- Run UI tests.
    ```bash
    npm run test:ui
    ```
- Run Visual tests.
    ```bash
    npm run test:visual
    ```
- Run API tests.
    ```bash
    npm run test:api
    ```
#### 4. Take a look at your first test report!
- Generate allure report
    ```bash
    npm run report-open
    ```