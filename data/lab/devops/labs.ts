import type { Lab } from "@/src/lib/types/devops-lab"

export const labs: Lab[] = [
    {
        slug: "dockerize-spring-boot",
        title: "Dockerize a Spring Boot App",
        description:
            "Package a Spring Boot service into a small, production-ready image using a multi-stage build.",
        difficulty: "intermediate",
        estimatedTime: "45 min",
        prerequisites: [
            "Docker installed and running",
            "A Java 21 Spring Boot project with Maven and one executable JAR",
            "spring-boot-starter-actuator installed; GET /actuator/health permitted by your security configuration",
            "A standalone API that starts without an external database, or its database configuration supplied explicitly",
        ],
        setup: [
            {
                title: "Prepare the API",
                description:
                    "Use this same API in every lab. Add spring-boot-starter-actuator to pom.xml, run ./mvnw verify, and confirm the health endpoint returns HTTP 200 with status UP. Keep secrets outside the image. Add target/, .git/, and .env to .dockerignore. The Docker build skips tests only after this verification.",
            },
        ],
        troubleshooting: [
            {
                symptom: "Health check returns 404 or 401",
                fix: "Check that Actuator is installed and health is permitted by Spring Security. Rebuild the image and repeat curl --fail-with-body; do not expose all management endpoints.",
            },
            {
                symptom: "Container exits at startup",
                fix: "Read docker logs myapp-lab. Supply the database or other required environment variables; do not activate an unconfigured prod profile.",
            },
        ],
        architecture: {
            title: "Build stage vs. runtime stage",
            nodes: [
                { label: "Source + pom.xml", sublabel: "build stage" },
                { label: "Maven build", sublabel: "mvn package" },
                { label: "app.jar", sublabel: "artifact only" },
                { label: "JRE image", sublabel: "runtime stage" },
            ],
        },
        steps: [
            {
                title: "Write a multi-stage Dockerfile",
                description:
                    "Stage one compiles the JAR with Maven; stage two copies only the built artifact into a slim JRE image — the final image never contains Maven, the JDK, or your source code.",
                command: `FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn package -DskipTests

FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
RUN addgroup -S app && adduser -S app -G app
COPY --from=build --chown=app:app /app/target/*.jar app.jar
USER app
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]`,
            },
            {
                title: "Build the image",
                command: "docker build -t myapp:1.0 .",
            },
            {
                title: "Run it locally",
                command:
                    "docker run --name myapp-lab --rm -d -p 127.0.0.1:8080:8080 myapp:1.0",
            },
            {
                title: "Confirm it's actually responding",
                description:
                    'Expect HTTP 200 and {"status":"UP"}. Record the actual image size, then stop the practice container before the Compose lab.',
                command:
                    "curl --fail-with-body http://localhost:8080/actuator/health\ndocker image inspect myapp:1.0 --format '{{.Size}}'\ndocker stop myapp-lab",
            },
        ],
        expectedResult:
            "Before cleanup, the container returns HTTP 200 with status UP on port 8080. Record the image size in bytes; the runtime image contains the JRE and application JAR, without Maven or source files. Compare with a single-stage image before claiming a size improvement.",
        lessonsLearned: [
            "COPY pom.xml first, then run dependency:go-offline, before copying src/ — Docker caches layers, so dependency resolution only re-runs when pom.xml actually changes, not on every source edit.",
            "-DskipTests in the Dockerfile is deliberate: tests should run in CI before the image is even built, not slow down every local image build.",
            "The runtime creates and switches to an unprivileged app user; a container intended for production should not run the JVM as root.",
            "eclipse-temurin:21-jre-alpine is readable but mutable. Resolve and pin a reviewed digest for controlled production builds, then use automation to propose digest updates.",
        ],
    },
    {
        slug: "docker-compose-full-stack",
        title: "Docker Compose: Next.js + Spring Boot + PostgreSQL",
        description:
            "Run the whole stack — frontend, API, and database — with a single command and no manually installed services.",
        difficulty: "intermediate",
        estimatedTime: "1 hr",
        prerequisites: [
            "Complete the Docker lab; Docker Compose v2 installed",
            "Project root contains api/Dockerfile and frontend/Dockerfile; both builds run from those directories",
            "API includes the PostgreSQL JDBC driver and Actuator; health returns UP after a database connection",
            "Next.js includes an actual UI operation that calls the API and stores data in PostgreSQL",
        ],
        setup: [
            {
                title: "Configure local variables",
                description:
                    "Create .env.example containing DB_PASSWORD=replace-with-a-local-password. Copy it to .env, choose a local password, and ignore .env in Git. Both Compose and the commands below run from the project root. Stop any earlier container using port 8080.",
            },
            {
                title: "Configure frontend networking",
                description:
                    "For browser requests, allow http://localhost:3000 in API CORS configuration and pass NEXT_PUBLIC_API_URL at build time. In frontend/Dockerfile declare ARG NEXT_PUBLIC_API_URL and ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL before RUN npm run build (or your package-manager equivalent). For server-side requests use API_URL=http://api:8080 at request time. localhost inside a container means that container, not the API.",
            },
        ],
        troubleshooting: [
            {
                symptom: "Frontend loads but API requests fail",
                fix: "Inspect the browser Network panel. Check CORS and the URL embedded at build time; rebuild after changing NEXT_PUBLIC_API_URL. Server-side calls must use api:8080.",
            },
            {
                symptom: "Database rejects the configured password",
                fix: "Check the explicit datasource username and password. An existing pgdata volume keeps its original credentials; changing .env does not reset them. Update credentials deliberately without deleting your data.",
            },
        ],
        architecture: {
            title: "Three services on one Compose network",
            nodes: [
                { label: "frontend", sublabel: "Next.js :3000" },
                { label: "api", sublabel: "Spring Boot :8080" },
                { label: "db", sublabel: "PostgreSQL :5432" },
            ],
        },
        steps: [
            {
                title: "Write docker-compose.yml",
                command: `services:
  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: appdb
      POSTGRES_USER: app
      POSTGRES_PASSWORD: \${DB_PASSWORD:?Set DB_PASSWORD in .env}
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U app -d appdb"]
      interval: 5s
      retries: 5

  api:
    build: ./api
    environment:
      SPRING_DATASOURCE_URL: jdbc:postgresql://db:5432/appdb
      SPRING_DATASOURCE_USERNAME: app
      SPRING_DATASOURCE_PASSWORD: \${DB_PASSWORD:?Set DB_PASSWORD in .env}
    depends_on:
      db:
        condition: service_healthy
    ports:
      - "127.0.0.1:8080:8080"

  frontend:
    build:
      context: ./frontend
      args:
        NEXT_PUBLIC_API_URL: http://localhost:8080
    environment:
      API_URL: http://api:8080
    depends_on:
      - api
    ports:
      - "127.0.0.1:3000:3000"

volumes:
  pgdata:`,
            },
            {
                title: "Start every service",
                command:
                    "docker compose config --quiet\ndocker compose up -d --build",
            },
            {
                title: "Watch the logs while it starts",
                command:
                    "docker compose ps\ndocker compose logs --tail=100 api frontend",
            },
            {
                title: "Verify the complete data flow",
                description:
                    "First confirm the API returns HTTP 200 and status UP. Open localhost:3000, create a record through the UI, and check the API request in the browser Network panel. Reload the page and verify the saved record remains. Check the corresponding database row with the SQL below, replacing the placeholder with your real table name. A successful HTML response alone is not an end-to-end check.",
                command:
                    "curl --fail-with-body http://localhost:8080/actuator/health\ndocker compose exec db psql -U app -d appdb -c 'SELECT * FROM your_table LIMIT 5;'",
            },
        ],
        expectedResult:
            "Three containers running together, the API only starting once the database passes its healthcheck, and the frontend reachable on port 3000 with working API calls to the backend on port 8080.",
        lessonsLearned: [
            "depends_on: condition: service_healthy is what actually prevents the app from racing the database on startup — plain depends_on only waits for the container to start, not for Postgres inside it to be ready to accept connections.",
            "The API connects to db:5432, not localhost:5432 — Compose gives every service a DNS name on the shared network matching the service key in the YAML.",
            "A named volume (pgdata) preserves PostgreSQL data across container recreation and docker compose down. Do not use down --volumes unless the practice data is disposable.",
            "For cleanup run docker compose down; retain pgdata for the persistence check. Plain depends_on does not prove the API is ready, so wait for its health endpoint before testing the UI.",
        ],
    },
    {
        slug: "nginx-reverse-proxy-https",
        title: "Configure Nginx Reverse Proxy with HTTPS",
        description:
            "Put Nginx in front of a Spring Boot app, terminate TLS with a free Let's Encrypt certificate, and force HTTPS.",
        difficulty: "intermediate",
        estimatedTime: "1 hr",
        prerequisites: [
            "Ubuntu server with sudo access, Nginx, Certbot, and the Certbot Nginx plugin installed",
            "A domain whose A record (and AAAA record, if present) points at this server",
            "Inbound TCP 80 and 443 allowed; API port 8080 bound only to 127.0.0.1",
            "The same Spring Boot API responds on http://127.0.0.1:8080/actuator/health",
        ],
        setup: [
            {
                title: "Prepare the server",
                description:
                    "Replace api.example.com throughout with your domain. Save the following server block as /etc/nginx/sites-available/myapp using sudoedit. These paths target Ubuntu package installations. Configure Spring Boot server.forward-headers-strategy=NATIVE when relying on proxy headers; trust only your own proxy. Keep the API inaccessible directly from the internet.",
            },
        ],
        troubleshooting: [
            {
                symptom: "Nginx returns 502",
                fix: "Run curl --fail-with-body http://127.0.0.1:8080/actuator/health on the server, then inspect the API logs and /var/log/nginx/error.log. Confirm the API is running on the configured port.",
            },
            {
                symptom: "Certificate validation fails",
                fix: "Check public DNS, any AAAA record, and inbound port 80 before retrying. A successful renewal dry-run tests renewal but does not prove a recurring timer is enabled.",
            },
        ],
        architecture: {
            title: "TLS terminates at the proxy, not the app",
            nodes: [
                { label: "Client", sublabel: "HTTPS request" },
                { label: "Nginx :443", sublabel: "TLS termination" },
                {
                    label: "Spring Boot :8080",
                    sublabel: "plain HTTP, localhost only",
                },
            ],
        },
        steps: [
            {
                title: "Write the base reverse proxy config",
                command: `server {
    listen 80;
    server_name api.example.com;

    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}`,
            },
            {
                title: "Test the config, then reload Nginx",
                description:
                    "Enable this site once, then validate before reloading. If the symlink already exists, inspect it rather than overwriting another site.",
                command:
                    "sudo ln -s /etc/nginx/sites-available/myapp /etc/nginx/sites-enabled/myapp\nsudo nginx -t && sudo systemctl reload nginx",
            },
            {
                title: "Provision a free certificate and auto-configure HTTPS",
                description:
                    "Certbot rewrites the config to listen on 443 with the certificate, and adds an HTTP→HTTPS redirect for the existing server block.",
                command: "sudo certbot --nginx --redirect -d api.example.com",
            },
            {
                title: "Verify HTTPS, redirects, and renewal scheduling",
                description:
                    "Expect an HTTP redirect to HTTPS and a successful HTTPS health response. Inspect the timer list for an enabled Certbot renewal timer; installation methods may use a snap timer or cron instead. Verify the scheduler separately from the renewal dry-run.",
                command:
                    "curl -I http://api.example.com/actuator/health\ncurl --fail-with-body https://api.example.com/actuator/health\nsudo certbot renew --dry-run\nsystemctl list-timers --all | grep -i certbot",
            },
        ],
        expectedResult:
            "https://api.example.com reaches the Spring Boot app, http://api.example.com redirects to HTTPS automatically, and the certificate renews itself before it expires.",
        lessonsLearned: [
            "The app itself never needs to know about TLS at all — it just serves plain HTTP on localhost, and Nginx handles encryption entirely at the edge.",
            "Forwarded headers must be processed by Spring Boot and trusted only from your proxy. Sending X-Forwarded-Proto alone does not guarantee correct redirects or secure-cookie behavior.",
            "A renewal dry-run checks the renewal process. Inspect and enable the renewal scheduler appropriate to your Certbot installation, and monitor expiry separately.",
        ],
    },
    {
        slug: "github-actions-cicd-pipeline",
        title: "GitHub Actions: CI + Image Publishing",
        description:
            "Run tests on every pull request, and build + push a Docker image automatically on every merge to main.",
        difficulty: "intermediate",
        estimatedTime: "1 hr",
        prerequisites: [
            "GitHub repository with the same Java 21 API and Dockerfile at its root (adjust paths for a monorepo)",
            "Docker Hub repository plus DOCKERHUB_USERNAME and DOCKERHUB_TOKEN repository secrets",
            "Permission to configure repository rules requiring the test status check",
        ],
        setup: [
            {
                title: "Define the release boundary",
                description:
                    "This lab tests and publishes an image; it does not deploy a server. Replace myorg/myapp with your Docker Hub repository. Server rollout, post-deploy health checks, and rollback remain a separate exercise.",
            },
        ],
        troubleshooting: [
            {
                symptom: "Registry push is denied",
                fix: "Check that the token can write to the target Docker Hub repository and that the tag uses the correct namespace. Never print the token in logs.",
            },
            {
                symptom:
                    "Image exists but the running application has not changed",
                fix: "Publishing does not deploy. A separate release operation must pull the SHA-tagged image, restart the service, verify health, and retain the previous SHA for rollback.",
            },
        ],
        architecture: {
            title: "Two workflows, two triggers",
            nodes: [
                { label: "Pull Request", sublabel: "trigger" },
                { label: "Run Tests", sublabel: "mvn verify" },
                { label: "Merge to main", sublabel: "trigger" },
                {
                    label: "Build + Push Image",
                    sublabel: "tagged by commit SHA",
                },
            ],
        },
        steps: [
            {
                title: "PR workflow — .github/workflows/test.yml",
                command: `name: Test
permissions:
  contents: read
on:
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@08eba0b27e820071cde6df949e0beb9ba4906955 # v4.3.0
      - uses: actions/setup-java@c1e323688fd81a25caa38c78aa6df2d33d3e20d9 # v4.8.0
        with:
          java-version: '21'
          distribution: 'temurin'
          cache: 'maven'
      - run: mvn --batch-mode verify`,
            },
            {
                title: "Publish workflow — .github/workflows/publish.yml",
                description:
                    "Re-run verification on the exact main commit before publishing; PR-only checks do not protect direct pushes or every merge result.",
                command: `name: Publish Image
permissions:
  contents: read
on:
  push:
    branches: [main]

jobs:
  build-and-push:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@08eba0b27e820071cde6df949e0beb9ba4906955 # v4.3.0
      - uses: actions/setup-java@c1e323688fd81a25caa38c78aa6df2d33d3e20d9 # v4.8.0
        with:
          java-version: '21'
          distribution: 'temurin'
          cache: 'maven'
      - run: mvn --batch-mode verify
      - uses: docker/login-action@5e57cd118135c172c3672efd75eb46360885c0ef # v3.6.0
        with:
          username: \${{ secrets.DOCKERHUB_USERNAME }}
          password: \${{ secrets.DOCKERHUB_TOKEN }}
      - uses: docker/build-push-action@ca052bb54ab0790a636c9b5f226502c73d547a25 # v5.4.0
        with:
          push: true
          tags: myorg/myapp:\${{ github.sha }}`,
            },
            {
                title: "Protect main so the test workflow is required",
                description:
                    "Open a test PR so the test status check exists, then configure a main-branch ruleset (or branch protection) to require the test job and PR review before merge. Verify a failing test blocks merge. Merge a passing PR and confirm Publish Image succeeds and the SHA-tagged image exists in Docker Hub. Download that image and verify its health locally before claiming success.",
            },
        ],
        expectedResult:
            "With the required status check configured, failing PR tests block merge. A successful main push verifies that commit and publishes a Docker image tagged with its exact SHA. Capture the workflow URL and image digest as evidence; no server deployment is performed here.",
        lessonsLearned: [
            "cache: 'maven' on setup-java cuts test-workflow time noticeably by reusing the dependency cache between runs instead of re-downloading the whole tree.",
            "Tagging images by commit SHA (not just latest) means any deployed image can be traced back to the exact commit — essential when you need to know exactly what's running in production.",
            "Pin third-party actions to reviewed full commit SHAs and retain a version comment for readability; use dependency automation to propose reviewed updates.",
            "Separate PR verification from image publishing, but verify the main commit again before publishing. Image publishing is not continuous deployment.",
        ],
    },
]

export function getLab(slug: string) {
    return labs.find((l) => l.slug === slug)
}

/** Recommended sequence; stable slugs keep existing progress and bookmarks valid. */
export const labJourney = [
    "dockerize-spring-boot",
    "docker-compose-full-stack",
    "github-actions-cicd-pipeline",
    "nginx-reverse-proxy-https",
].map((slug) => labs.find((lab) => lab.slug === slug)!)
