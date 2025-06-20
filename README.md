# Admin Panel — SaaS Management Dashboard Framework

A production-grade admin panel framework for SaaS products, featuring user management, subscription control, audit logging, real-time dashboard analytics, JWT authentication, and event notifications.

Built with Django, Daphne, Channels, and React + Vite, this project delivers a scalable, modular foundation for operational control in multi-user SaaS platforms.

## 📦 Tech Stack

### Backend: Python 3.13.2, Django 5.x, Django REST Framework, SimpleJWT, Channels, Daphne

### Frontend: Node v23.11.0, React, Vite, Tailwind CSS

### WebSocket: Live real-time data via Django Channels

## 🎯 Core Features

User Management: Add, update, and manage user accounts

Subscription Management: Control plan subscriptions and user tiers (simulated models)

JWT Authentication: Full authentication flow using SimpleJWT (access/refresh tokens)

Role-based Access Control: Basic role handling for admin and staff-level route permissions

Real-time Dashboard: Live operational metrics and activity streams over WebSocket

Audit Logs: Persistent, queryable logs of system and admin actions

System Notifications: In-app event notifications via WebSocket (simulated events)

WebSocket Infrastructure: ASGI-native communication via Channels & Daphne

## 🏗️ Architectural Highlights
Decoupled React + Vite frontend and Django backend for clean separation of concerns

SimpleJWT integration for stateless, secure user authentication with refresh token support

Channels & Daphne for native ASGI support and scalable real-time WebSocket features

Modular Django apps for users, subscriptions, notifications, audit logs, and dashboard services

Basic role-based access system managing admin-only and staff-level route access control

Extensible data models, API endpoints, and frontend routes

Production-ready WebSocket infrastructure -- ready to integrate with live services

## 🚀 Local Development Setup
### Backend

```python
cd backend
python -m venv env
source env/bin/activate  # Windows: env\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
daphne config.asgi:application
```

### Frontend
```
cd frontend
npm install
npm run dev
```

## 📌 Project Notes

Current implementation uses simulated data models — no external payment or service integrations configured.

JWT authentication and WebSocket infrastructure are fully operational.

Audit logs, notifications, role-based access, and dashboard metrics work end-to-end with simulated data.

No production security hardening applied (for demo/dev use only).

This project serves as a deployable starting point for SaaS admin systems — ready for integration with real data sources, services, and authentication extensions.

## 📄 License
Unlicensed. Free to use, modify, and extend without restriction.