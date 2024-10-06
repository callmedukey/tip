# Builder image
FROM node:18-alpine AS builder

WORKDIR /app

# First install dependencies so we can cache them
RUN apk update && apk upgrade
RUN apk add curl
RUN apk add --no-cache libc6-compat

COPY package.json package-lock.json ./
RUN npm install
RUN npm install -g prisma
RUN npm install @prisma/client

RUN npm install --cpu=x64 --os=linux --libc=musl sharp@0.32.6
# Now copy the rest of the app and build it
COPY . .
RUN npx prisma generate
RUN npm run build

# Production image
FROM node:18-alpine AS runner

WORKDIR /app

# Create a non-root user
RUN addgroup -S nonroot && adduser -S nonroot -G nonroot
USER nonroot

# Copy the standalone output from the builder image
COPY --from=builder --chown=nonroot:nonroot /app/.next/standalone ./
COPY --from=builder --chown=nonroot:nonroot /app/public ./public
COPY --from=builder --chown=nonroot:nonroot /app/prisma ./prisma/
COPY --from=builder --chown=nonroot:nonroot /app/.next/static ./.next/static


# Copy the start script
COPY --from=builder /app/start.sh ./start.sh

# Make sure the script is executable

# Prepare the app for production
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV HOSTNAME="0.0.0.0"


EXPOSE 3000

# Start the app
CMD ["./start.sh"]
