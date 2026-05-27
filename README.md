# Demand Planning Dashboard

A responsive Demand Planning Grid built using **HTML, CSS, and JavaScript**.

This project includes:

- Weekly demand table
- Demand color indicators
- Status badges
- Dynamic summary totals
- Category filtering
- Status filtering
- Weekly column sorting with indicators

---

# Features

## 1. Demand Grid

The dashboard renders a table with the following columns:

- Item
- Category
- Region
- Status
- W1 → W8 (weekly demand)
- Total

Each row represents one item.

---

## 2. Weekly Demand Color Coding

Each weekly demand cell is automatically color-coded against the item's target.

### Rules

| Condition | Color |
|---|---|
| Demand ≥ 90% of target | Green |
| Demand between 50%–89% | Amber |
| Demand < 50% | Red |

---

## 3. Status Badges

The Status column displays styled badges for:

- Active
- Paused
- Discontinued

Each status has a different color for quick identification.

---

## 4. Summary Row

A summary row is displayed at the bottom of the table.

It dynamically shows:

- Total demand for W1 → W8
- Grand total across all visible rows

The summary updates automatically when filters are applied.

---

# Filtering & Sorting

## Category Filter

Dropdown filter with:

- All
- Electronics
- Furniture
- etc.

Selecting a category filters the visible rows.

---

## Status Filter

Checkbox-based filtering for:

- Active
- Paused
- Discontinued

Multiple statuses can be selected at once.

---

## Weekly Column Sorting

Click any weekly column header:

- W1
- W2
- W3
- ...
- W8

to sort rows by demand values.

### Sorting Behavior

- First click → Ascending
- Second click → Descending

Sort indicators are shown:

- ▲ Ascending
- ▼ Descending

---

# Project Structure

```bash
project-folder/
│
├── index.html
├── style.css
├── script.js
└── README.md