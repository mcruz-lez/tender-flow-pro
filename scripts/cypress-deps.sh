# Cypress Required Dependencies for Linux (Debian/Ubuntu)

# Install all required system dependencies for running Cypress in CI or locally
sudo apt-get update
sudo apt-get install -y \
  libgtk2.0-0 \
  libgtk-3-0 \
  libgbm-dev \
  libnotify-dev \
  libgconf-2-4 \
  libnss3 \
  libxss1 \
  libasound2 \
  libxtst6 \
  xauth \
  xvfb \
  libatk-bridge2.0-0 \
  libgtk-3-0 \
  libdrm2 \
  libxcomposite1 \
  libxdamage1 \
  libxrandr2 \
  libgbm1 \
  libpango-1.0-0 \
  libpangocairo-1.0-0 \
  libcups2 \
  libxshmfence1 \
  libxinerama1 \
  libglu1-mesa

# For more info: https://on.cypress.io/required-dependencies
