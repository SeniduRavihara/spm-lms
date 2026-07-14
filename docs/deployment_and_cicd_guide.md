# SPM LMS: Complete VPS Deployment & CI/CD Documentation

This document provides a comprehensive, step-by-step guide explaining the system architecture, database connectivity, server configuration, and the automated CI/CD pipeline implemented for the **SPM LMS** application.

---

## 1. System Architecture Overview

The application is deployed inside a multi-container environment on a **1GB RAM Ubuntu VPS** provided by Oracle Cloud. Traffic is routed securely without exposed ports using a reverse proxy.

```mermaid
graph TD
    User([User Browser]) -->|HTTP Port 80| Nginx[Nginx Reverse Proxy]
    
    subgraph VPS [Oracle Cloud 1GB VPS]
        Nginx -->|Proxy Pass /| ClientContainer[Client Container: Next.js - Port 3000]
        Nginx -->|Proxy Pass /api| ServerContainer[Server Container: Express - Port 4000]
        
        subgraph Docker [Docker Compose Network]
            ClientContainer
            ServerContainer
        end
    end
    
    ServerContainer -->|Prisma Client SSL| NeonDB[(Neon Serverless Postgres)]
```

---

## 2. Step 1: VPS Memory Optimization (Swap Space)

To prevent the Next.js compiler from crashing on a **1GB RAM** machine, we configured a **4GB Swapfile** on the SSD as an emergency memory buffer.

### Configuration Commands Run on VPS:
```bash
# 1. Allocate 4GB space for the swapfile
sudo fallocate -l 4G /swapfile

# 2. Set strict read/write permissions
sudo chmod 600 /swapfile

# 3. Format the file as Swap space
sudo mkswap /swapfile

# 4. Activate the swap file
sudo swapon /swapfile

# 5. Make it persist permanently across server restarts
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab

# 6. Verify swap is active
free -h
```

---

## 3. Step 2: Database Connectivity & Prisma

The application uses **Neon Serverless Postgres** for database storage. 

### Prisma Integration:
*   The schema is defined in [schema.prisma](file:///home/senu/PROJECTS/spm-lms/server/prisma/schema.prisma).
*   Prisma generates a type-safe client during the Docker build stage using the command:
    ```bash
    npx prisma generate
    ```
*   Prisma automatically establishes connection pooling and connects to Neon over secure SSL query parameters (`?sslmode=require`).

---

## 4. Step 3: Environment Variables (`.env`)

Docker Compose reads environment variables from a single `.env` file located in the **project root directory** (`~/spm-lms/.env`) on the VPS.

### Required `.env` File Structure:
```env
# 1. Neon Postgres connection string
DATABASE_URL="postgresql://senu:password@ep-steep-boat-ahjbwrjh.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require"

# 2. Key used to sign JWT auth session tokens
JWT_SECRET="your_secure_random_key_here"

# 3. Internal port mapped inside the server container
PORT=4000
```

---

## 5. Step 4: Nginx Reverse Proxy Setup

Nginx acts as the entry point for all web traffic. It listens on standard **Port 80** and routes requests internally:
*   All root requests (`/`) are forwarded to the **Next.js Frontend Container** listening on `http://localhost:3000`.
*   All API requests (`/api`) are forwarded to the **Express Backend Container** listening on `http://localhost:4000/api`.

### Configuration file (`/etc/nginx/sites-available/lms`):
```nginx
server {
    listen 80;
    server_name 134.185.84.132; # Your VPS IP address

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /api {
        proxy_pass http://localhost:4000/api;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 6. Step 5: Automated CI/CD Pipeline (GitHub Actions)

We configured a complete pipeline defined in [.github/workflows/ci.yml](file:///home/senu/PROJECTS/spm-lms/.github/workflows/ci.yml). 

### How it triggers and runs step-by-step:

```mermaid
sequenceDiagram
    actor Developer
    participant GitHub as GitHub Actions (CI/CD)
    participant VPS as Target VPS (Oracle Cloud)

    Developer->>GitHub: git push origin main
    Note over GitHub: Job 1: test-and-build
    GitHub->>GitHub: Installs Node.js & dependencies
    GitHub->>GitHub: Runs server unit tests (Jest)
    GitHub->>GitHub: Verifies docker compose build compiles
    
    rect rgb(20, 30, 40)
        Note over GitHub: Job 2: deploy (SSH Trigger)
        GitHub->>VPS: Connects securely via SSH (Port 22)
        VPS->>VPS: cd ~/spm-lms
        VPS->>VPS: git pull origin main (pulls latest code)
        VPS->>VPS: sudo docker compose up -d --build (rebuilds and launches containers)
    end
    
    VPS-->>Developer: Website updated live at http://134.185.84.132
```

### GitHub Secrets Configuration:
To authorize the deployment securely, the following secrets must be added to your GitHub repository (**Settings > Secrets and variables > Actions**):

| Secret Name | Value | Description |
| :--- | :--- | :--- |
| `VPS_HOST` | `134.185.84.132` | The public IP of your server |
| `VPS_USERNAME` | `ubuntu` | The administrator user account on the VPS |
| `VPS_SSH_KEY` | `-----BEGIN RSA PRIVATE KEY----- ...` | The complete text of your private SSH key file |

---

## 7. Useful Docker Commands for VPS Maintenance

To monitor or manage your containers on the VPS, use these commands:

*   **View active container statuses**:
    ```bash
    sudo docker ps
    ```
*   **Check logs in real-time**:
    ```bash
    sudo docker compose logs -f
    ```
*   **Restart the containers manually**:
    ```bash
    sudo docker compose restart
    ```
