FROM oven/bun:1 AS base
WORKDIR /app

# Copy package files
COPY package.json bun.lockb ./

# Install dependencies
RUN bun install --frozen-lockfile --production=false

# Copy source code
COPY . .

# Build the application
RUN bun run build

# Production stage
FROM oven/bun:1 AS runner
WORKDIR /app

# Create non-root user
RUN groupadd -r bun -g 1001 && \
    useradd -r -g bun -u 1001 bun

# Copy built application
COPY --from=base /app/dist ./dist
COPY --from=base /app/package.json ./

# Install only production dependencies
RUN bun install --frozen-lockfile --production

# Set permissions
USER bun

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8080 || exit 1

# Start the application
CMD ["bun", "run", "start"]