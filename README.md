# GoalZ — Fast Match Forecast Engine

GoalZ is a lightweight betting assistant that turns a league CSV into a clear single-match prediction in seconds.  

Upload one league teams dataset, choose home/away sides, and get probability outputs you can use to compare markets quickly.

## What it does
- Predicts match outcomes from CSV data using a xG-based model.
- Shows 1X2 probabilities (home/draw/away), market probabilities (Over 1.5, Over 2.5, BTTS), and explanatory signals.
- Lets you fine-tune a model correction (`rho`) and optional availability factors.
- Generates the exact recommendation data you can reuse as part of a betting checklist.

## How to read the numbers (quick betting view)
- **xG Home / xG Away**: expected goals created by each team in this match setup.
- **1 / X / 2**: probability of Home win, Draw, Away win.
- **Over 1.5 / Over 2.5**: chance the match total goals exceed that line.
- **BTTS**: probability both teams score.
- **Lean**: which side the model is biased toward in the 1X2 market.
- **xG Edge**: indicates strength gap between expected scoring sides.
- **Fair O2.5**: adjusted line insight (for market evaluation).
- **Availability**: lower than 1.00 means reduced expected performance for that side.
- **Rho**: low-score correction; it shifts short-score outcomes like 0-0, 1-0, 0-1, 1-1.

Use these values as probabilities, not guarantees. Combine with stake management, liquidity, and risk control.

## Weekly league datasets via [PayPal](https://www.paypal.com/donate/?hosted_button_id=FV575PVWGXZBY)

If you do not want to build CSV inputs manually, you can [buy updated league CSV files via a PayPal donation](https://www.paypal.com/donate/?hosted_button_id=FV575PVWGXZBY).

Available leagues:
- Bundesliga
- Eredivisie
- La Liga
- Ligue 1
- Premier League
- Serie A

Datasets are updated every week (Wednesday), and [donation](https://www.paypal.com/donate/?hosted_button_id=FV575PVWGXZBY) grants access to a one-time download for that version.

> No subscription is created and there is no recurring right to future weekly files.

# [Try it](https://lucasepe.github.io/goalz/)
