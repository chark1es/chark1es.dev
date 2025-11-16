FROM oven/bun:1 AS base
WORKDIR /app

# Copy package files
COPY package.json bun.lockb ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN bun run build

# Production stage
FROM oven/bun:1 AS runner
WORKDIR /app

# Install curl for health checks
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# Copy built application
COPY --from=base /app/dist ./dist
COPY --from=base /app/package.json ./

# Install only production dependencies
RUN bun install --frozen-lockfile --production

# Expose port
EXPOSE 1341

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:1341 || exit 1

# Start the application with proper host binding
CMD ["sh", "-c", "HOST=0.0.0.0 PORT=1341 bun run start"]