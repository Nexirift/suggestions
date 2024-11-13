FROM imbios/bun-node:22-slim AS deps
ARG DEBIAN_FRONTEND=noninteractive
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

# Build the app
FROM deps AS builder
WORKDIR /app
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN SKIP_ENV_VALIDATION=true bun run build

# Move node_modules to temp location to avoid overwriting
RUN mv node_modules _node_modules
RUN rm package.json bun.lockb

# Install dependencies for migration
RUN cp drizzle/migrate/package.json ./package.json
RUN cp drizzle/migrate/bun.lockb ./bun.lockb
RUN bun install --frozen-lockfile

# Copy node_modules for migration to migrate folder for migration script
RUN mv node_modules drizzle/migrate/node_modules

# Production image, copy all the files and run next
FROM imbios/bun-node:22-slim AS runner
WORKDIR /app

ARG CONFIG_FILE
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=builder /app/scripts ./scripts
RUN chmod +x ./scripts/run.sh

# Copy drizle migration scripts
COPY --from=builder /app/drizzle/migrate ./migrate
COPY --from=builder /app/drizzle ./drizzle

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

COPY --from=builder /app/docker/entrypoint .
RUN chmod +x entrypoint.sh       
RUN chmod +x docker-entrypoint.d/*.sh

EXPOSE 3000/tcp
ENV PORT 3000

ENTRYPOINT [ "./entrypoint.sh", "scripts/run.sh" ]
CMD []
