# Vrindavan Rasa Admin

Standalone Angular 22 admin panel (Angular Material, **no Vex**), based on the existing `e-commerce-superadmin` UI and folder structure.

This app separates the admin UI from `vr-frontend` and talks to the same Nest API (`vr-backend`). Its grouped sidebar is static and mirrors the current admin navigation in `vr-frontend`.

## Stack

- Angular 22 + standalone components
- Angular Material 22
- RxJS + `jwt-decode`
- API: `http://localhost:8080/backend/api` (see `src/environments`)

## Run

```bash
cd vr-superadmin
npm install
npm start
```

App: http://localhost:4200  
Login: `/login` → redirects to `/admin/dashboard`

Ensure `vr-backend` is running on port 8080 and allows the Angular dev origin `http://localhost:4200`.

## Structure (based on e-commerce-superadmin)

```
src/
  environments/
  static-data/          # static sidebar menu, columns, module config
  app/
    core/services/      # api, jwt, login, permission, upload, dashboard
    core/interceptors/
    guards/
    custom-layout/      # Material sidenav shell with static navigation
    pages/
      auth/
      dashboards/
      social/profile/
      errors/
      components/       # module-crud, header/footer, website-layout, orders…
```

## Features ported from vr-frontend/admin

- Auth: login, forgot/reset password, JWT + refresh interceptor, guards
- Dashboard summary
- Config-driven CRUD for all modules (products, categories, brands, attributes, offers, coupons, banners, cms-pages, blogs, reviews, FAQs, users, orders, leads, delete-requests, roles…)
- Header settings, footer settings, website layout (cms-sections)
- Order detail view, profile, settings stub

`vr-frontend` is **not** modified.
