# Dockerfile for Playwright Tests (Phase 8)

FROM mcr.microsoft.com/playwright:v1.59.1-noble

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy test files
COPY . .

# Clean previous HTML report and run tests
RUN rm -rf /app/playwright-report
CMD ["npm", "test"]
