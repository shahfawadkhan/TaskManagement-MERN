# Use Debian-based Node image (works reliably)
FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build production assets (creates dist/)
RUN npm run build

# Expose Vite port
EXPOSE 5173

# Serve production build
CMD ["npx", "vite", "preview", "--host", "--port", "5173"]
