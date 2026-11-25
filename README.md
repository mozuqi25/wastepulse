# WastePulse bakery planning prototype

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

The website is branded WastePulse. The existing local folder remains `foodloop`; browser storage retains the legacy key `foodloop-bakery-planning-v3` to preserve saved plans. Use **Reset demo** to restore the original seed data. Prior prototype data uses a separate storage key and is not migrated. There is no backend, shared account state, real booking, message, access control, payment or carbon credit.

## Bakery cost-sharing analysis

The three existing pages now include a standalone financial scenario adapted from the user-supplied `EFWA_Option2_Actuarial_Model.xlsx`. The original workbook is unchanged and is not included in the website build.

- Homepage: average annual exposure, 95th percentile and mean of the worst 5% of simulated annual outcomes.
- Business planning: flour, bread and pastry handover presets; editable event assumptions; cost allocation chart; five stress cases; downloadable scenario CSV.
- EFWA planning: the currently selected proposed notice-based contribution schedule and limitations on transferring the tomato weather-pool design.

Model and presentation live in `src/risk-model.js` and `src/risk-view.js`. Scenario inputs persist with browser state; they do not modify operational plans, matches, waste outcomes or people served. Dashboard region/period/category filters do not filter this independently labelled scenario.

### Provenance and adaptation

| Workbook section | Reused idea | Bakery adaptation |
| --- | --- | --- |
| Demo A5:C20 | Cancelled quantity, contract and salvage value; allocation between parties | One bakery handover, selling/ordering roles, partial recovery and handling/disposal costs |
| Assumptions A19:C22 | Proposed 80% / 50% / 0% contribution bands | Editable bands; flour keeps 2/8-day boundaries; bread/pastry use illustrative 1/3-day boundaries |
| Scenarios A4:F17 | Five stress cases and comparison bars | Current inputs, larger cancellation, +20% price, no recovery outlet, earlier notice plus explicitly higher recovery |
| Results A4:D15 | Mean, percentile and tail-mean annual charts | Regenerated bakery scenarios; no tomato annual values copied |
| Guide A16:A17; Simulation A2:J4 | Model uncertainty and simulation disclosure | 10,000 reproducible 52-week trials; seed 2026; regenerated on recalculation |
| Sources; Pool | Tomato-specific evidence and weather pool | Not applied to bakery prices, waste rates, premiums or coverage |

Prices and all bakery assumptions are illustrative, not researched sector benchmarks. Preset weekly/affected quantities mirror the prototype seed examples only. The 15% weekly chance and 30% variability originate as assumptions in the workbook; they have no established bakery calibration. The new model applies variability to event monetary exposure, rather than copying the original price-volatility, Beta cancellation and weather processes.

Event exposure = max(0, affected kg × contract price − recovered kg × recovery sale price + recovered kg × handling cost + residual kg × disposal cost). Recovered kg = affected kg × recovery share. Contributions divide this exposure without reducing its combined value. This is a revenue-shortfall-plus-extra-cost proxy, not accounting profit or a measure of verified food waste avoided.

Annual model: each of 52 independent weeks has the chosen chance of one event. Monetary severity is lognormal, with mean equal to event exposure and the chosen coefficient of variation. Selected notice and contribution rate remain fixed. No correlated events, shared-weather losses, pool, premium or reserve estimate is included. The 95th percentile uses linear interpolation; tail mean uses exactly the worst 5% of trials. Changing assumptions regenerates the simulation with the same random seed for comparability.

The source's cached Results means and 95th percentiles were independently reconciled against its 10,000 simulation rows. Its draws are static; changing source frequency/severity assumptions alone would not regenerate them. These source results are not bakery evidence.
