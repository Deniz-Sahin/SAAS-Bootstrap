
## High-Level Architecture

The system follows a **modular, layered architecture** built with NestJS.

Key principles:

* Explicit boundaries between layers
* Domain logic isolated from infrastructure
* Frameworks treated as implementation details

---

## Technology Stack

* **Runtime:** Node.js
* **Framework:** NestJS
* **Database:** PostgreSQL
* **ORM:** Prisma
* **Authentication:** JWT (access + refresh tokens)
* **API Style:** REST

---

## Application Layers

### API Layer

Responsibilities:

* HTTP request handling
* DTO validation
* Authentication & authorization guards
* Request-scoped organization context

No business logic lives in controllers.

---

### Application Layer

Responsibilities:

* Use cases / services
* Transaction boundaries
* Authorization enforcement
* Orchestration of domain logic

This layer represents **what the system does**.

---

### Domain Layer

Responsibilities:

* Core business rules
* Entity behavior
* Invariants and validation

The domain layer is framework-agnostic.

---

### Infrastructure Layer

Responsibilities:

* Database access (Prisma)
* External services (email, queues, etc.)
* Configuration

This layer can be replaced without impacting domain logic.

---

## Multi-Tenancy Strategy

* Single database, shared schema
* Organization ID included on all tenant-owned tables
* Organization context resolved per request
* Guards ensure organization isolation at API boundaries

This approach balances simplicity and scalability for early to mid-stage SaaS products.

---

## Authentication Architecture

* Short-lived access tokens
* Long-lived refresh tokens
* Refresh tokens stored and rotated
* Logout invalidates refresh tokens

Authentication is stateless at the API level, with minimal server-side state for token revocation.

---

## Authorization Model

* Roles map to permissions
* Permissions checked explicitly in services
* Guards prevent unauthorized access early

Authorization decisions are **explicit and testable**.

---

## Database Design Principles

* Explicit join tables (no hidden magic)
* Soft deletes for recoverability
* Audit-friendly schema
* Indexes on tenant and lookup columns

Prisma is used as a data mapper, not as a domain model.

---

## Error Handling

* Consistent error response format
* Domain errors mapped to HTTP errors
* No leaking of internal details

---

## Observability

* Structured logging
* Request IDs propagated through the stack
* Centralized error handling

---

## Architectural Trade-offs

### Chosen

* Clarity over cleverness
* Explicit patterns over implicit magic
* Slight duplication over tight coupling

### Deferred

* Event sourcing
* Microservices
* CQRS

These can be introduced later if justified by scale.

---

## Evolution Path

This architecture can evolve to include:

* Background jobs
* Webhooks
* Billing
* Public APIs

Without requiring fundamental rewrites.
