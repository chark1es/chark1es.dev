---
location: "IEEE Student Branch at UC San Diego"
position: "Webmaster"
years: "Oct 2023 – Present"
logo: "/images/ieeeucsd.png"
skills:
    [
        { "skill": "Front-End Development", "skillLogo": "mdi:web" },
        { "skill": "Web Development", "skillLogo": "mdi:code-tags" },
        { "skill": "Convex", "skillLogo": "simple-icons:convex" },
        { "skill": "TanStack Start", "skillLogo": "simple-icons:react" },
    ]
---

As Webmaster, I architect and maintain IEEE UCSD's technical infrastructure, spanning dashboards, authentication systems, internal tooling, and self-hosted production services.

I built the IEEE Dashboard using Convex as the backend and TanStack Start as the frontend, creating a centralized platform for event discovery, reimbursement submissions, event management, sponsorship tracking, resume database access, link sharing, user management, and analytics. I integrated Google APIs, including Google Calendar synchronization, to ensure real-time event updates and improved member engagement across the organization.

I led the initiative to self-host IEEE's core infrastructure by deploying our dashboard, main website, authentication services, and internal tools on a VPS environment. Using open-source tooling such as Dokploy, I manage containerized services including databases, authentication providers, and internal microservices. This increased reliability, security, and operational control while reducing reliance on external platforms.

I implemented organization-wide authentication using Logto with OpenID Connect and JWT-based security, establishing role-based access control across all IEEE services. This unified authentication layer secures internal dashboards, project tools, and administrative systems under a standardized identity infrastructure.

Beyond web systems, I developed the IEEE Presence Tracker using Convex as the backend and a Raspberry Pi with AstroJS as the frontend. The system leverages Rust-based Bluetooth proximity detection to automatically determine member attendance in real time. I also built the IEEE Parts Platform, featuring a 2D blueprint interface for inventory visualization and a structured check-in and check-out system powered by Convex and TanStack Start.
