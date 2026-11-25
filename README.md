# Foodloop bakery planning prototype

A dependency-free, local-first prototype organised into three workspaces:

- **Homepage:** edible supply and food demand, compatible matching capacity, state/territory comparisons and confirmed outcomes by period/category. Weight and reported people counts remain separate.
- **Business planning:** farmer/supplier, manufacturer/packer and distributor plans. Optional forecast fill rate and average order-change notice indicators. Find demand, reserve volumes, release a reservation and confirm demo receipts.
- **Demand supply chain:** EFWA food demand forecasts and possible inedible recovery partners, with state/territory, period, category and intake requirements.

## Run locally

Requires Node.js 18+; no npm install needed.

```sh
cd /Users/mozuqi/endfoodwaste/foodloop
npm run dev
```

Open http://127.0.0.1:5173. Source changes reload the browser automatically. Stop with Ctrl+C.

```sh
npm run check
npm test
npm run build
```

`src/` contains editable source. `dist/` contains the static build. Building does not update the previous hosted site.

## Files

- `src/app.js`: rendering, forms and interaction handlers.
- `src/data.js`: illustrative bakery plans, demand, recovery capacity and historical outcomes.
- `src/model.js`: planning indicators, compatibility, capacity reservations and outcome calculations.
- `src/style.css`: responsive layout and visual design.
- `tests/`: calculation, allocation, duplicate-confirmation and render smoke checks. Render checks use a minimal DOM substitute, not a browser.

## Demo assumptions

All organisations, quantities, people counts and business metrics are illustrative. Four weekly periods run from 23 November to 20 December 2026. The seed data includes historical reported outcomes in the first week and forecast plans in subsequent weeks. Filter to 30 Nov–6 Dec to explore a coherent forward planning period: 3,200 kg edible supply, 4,200 kg food demand, 2,900 kg potentially compatible food matches, 300 kg unmatched edible supply and 1,300 kg unfilled demand. Total demand exceeding supply does not eliminate state/category mismatches.

All eight Australian states and territories are available; smaller geographies are not used. Matching requires the same state/territory, period, category and edible/inedible stream. Requirements must still be reviewed. No interstate logistics optimisation is assumed.

Reservations consume available quantities but do not create outcomes. Confirming a demo receipt records the full reserved volume once, against its planning period. Future-period confirmations are allowed only to demonstrate the flow and are explicitly labelled simulated. Reported people served counts can be omitted; counts across handovers are not deduplicated and are never calculated from weight. Inedible recovery adds no people served.

Inedible material is not automatically suitable for any process. Industrial drying, fermentation, cosmetic ingredients and fertiliser are potential assessed pathways. Food-grade dried ingredients belong under edible demand. Excess edible supply is never automatically reclassified as inedible.

Planning indicators use the same period and kilogram unit: actual ordered / forecast volume × 100; total notice days / number of changes. They are advisory, not waste predictions or financial baselines. Incentives and data policies are proposed concepts, not existing entitlements or verified compliance.

Data is saved in browser localStorage under `foodloop-bakery-planning-v3`. Use **Reset demo** to restore the original seed data. Prior prototype data uses a separate storage key and is not migrated. There is no backend, shared account state, real booking, message, access control, payment or carbon credit.
