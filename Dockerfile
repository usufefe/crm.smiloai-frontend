# Build stage
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies with legacy peer deps to handle conflicts
RUN npm ci --legacy-peer-deps

# Copy source code
COPY . .

# Set environment variables for build
ENV GENERATE_SOURCEMAP=false
ENV REACT_APP_API_URL=https://console.smiloai.com/api

# Build the app
RUN npm run build

# Production stage - serve with simple static server
FROM node:18-alpine

# Install serve globally
RUN npm install -g serve

# Copy built app from builder stage
COPY --from=builder /app/build /app

# Set working directory
WORKDIR /app

# Expose port 3000 (serve default)
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

# Start serve
CMD ["serve", "-s", ".", "-l", "3000"]