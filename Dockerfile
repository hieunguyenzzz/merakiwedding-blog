FROM node:18-alpine

# Set OpenSSL legacy provider for Node.js 18 compatibility
ENV NODE_OPTIONS=--openssl-legacy-provider

WORKDIR /app

# Install dependencies using the updated package-lock.json
COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps

# Copy the rest of the code
COPY . .

# Next.js collects anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
ENV NEXT_TELEMETRY_DISABLED 1

# Build the app
RUN npm run build

ENV NODE_ENV production
ENV PORT 3000

EXPOSE 3000

# Run the app
CMD ["npm", "start"] 