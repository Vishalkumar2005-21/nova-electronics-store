# NOVA Electronics — e-commerce starter

A premium-style electronics storefront starter project for learning web development and CEH concepts.

## Included
- Responsive storefront with product catalogue, search, category filters and sorting
- Shopping bag with quantity controls and subtotal
- Demo checkout flow (does not process payment or send an order to a server)
- Demo sign-in flow (does not authenticate users or store passwords)
- Isolated, browser-only security learning simulations:
  - Sample HTTP request inspection concepts
  - Safe text rendering/input handling
  - Access-control/IDOR decision scenario
- No backend, database, payment integration, or real user accounts

## Run locally
1. Extract the ZIP.
2. Open `index.html` in a browser, or use VS Code with the Live Server extension.
3. Test the shop, bag, checkout simulation and security lab.

## Publish using GitHub + Vercel
This is a static site, so it can be deployed as a static project.

1. Create a new GitHub repository named `nova-electronics-store`.
2. Upload `index.html`, `styles.css`, `app.js`, and `README.md` to the repository root.
3. Sign in at https://vercel.com/ and choose **Add New → Project**.
4. Import your GitHub repository.
5. For a plain static site, leave the framework preset as **Other** and do not add a build command. Set the output directory to `.` if Vercel asks for one.
6. Deploy. Vercel will provide a live URL after successful deployment.

## Important production gaps
This is a functional front-end prototype, not a production-ready online shop. Before accepting real customers or money, add:
- Server-side API and database for products, stock, customers, carts and orders
- Real authentication with secure password hashing, session handling, and authorization
- Server-side input validation, output encoding, CSRF protections where applicable, rate limiting and logging
- Payment provider integration using hosted/tokenized checkout; never store card details yourself
- Privacy policy, terms, shipping/returns information, and appropriate compliance for your business

## CEH practice safety
The built-in lab is intentionally a safe simulation. It does not execute SQL, interpret submitted HTML/JavaScript, send attack traffic, or make the public storefront vulnerable. Do not add deliberately vulnerable endpoints to the public Vercel deployment. If your instructor requires hands-on exploitation, run a separate intentionally vulnerable target locally or in a private isolated lab, and test only systems you own or have explicit permission to assess.
