# Haql Labs — Marketing Website

Static multi-page site for Haql Labs — deterministic, offline tools for oil and gas data.

One page per product:

- `index.html` — suite hub (what each tool is, pricing, how it works, FAQ)
- `haql-qc.html` — production data QC with verifiable audit trails
- `haql-closeout.html` — month-end closeout QC (well tests vs daily, downtime vs production, gaps, field balance, cumulatives, negatives, duplicates)
- `haql-45q.html` — 45Q MRV packager (mass balance, statutory credit rates, certification pack, Subpart RR due clock)
- `haql-engine.html` — independent three-phase black-oil engine and simulation audit (mass balance, convergence, reproduction, input integrity)
- `haql-emission.html` — GHG inventory reconciliation and EU ETS allowance position
- `haql-rrc.html` — Texas RRC Form PR filing QC (operator, disposition codes, district, deadline, fine clock)
- `haql-dataroom.html` — A&D dataroom cross-check (production vs well master/RRC, revenue, severance, reserves, LAS)
- `haql-units.html` — field-to-SI unit conversions (MIT)
- `haql-coords.html` — minimum curvature, DLS, UTM/WGS84 (MIT)
- `credits.html` — image credits and licenses for the field photography
- `haql-rs.html` — retired old URL; noindex redirect to `haql-engine.html`

## Photography
The homepage uses self-hosted field photography under public-domain, CC0 and
CC BY 2.0 licenses. Images are illustrative and do not depict customer assets
or customer locations. Full attribution is on `credits.html`. The site makes no
third-party network requests at runtime.

## Run locally
```bash
cd /home/cakepc/Desktop/workspace/haql-website
python3 -m http.server 8000
```

## Deployment (GitHub Pages)
1. Push to repo `haql-lab/haql-lab.github.io` on `main` branch
2. Settings → Pages → Deploy from branch (main / root)
3. Live at https://haql-lab.github.io/