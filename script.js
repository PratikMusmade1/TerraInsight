const data = [
  {
    item: "Laptop",
    category: "Electronics",
    region: "North",
    status: "active",
    target: 100,
    weeks: [95, 85, 40, 100, 92, 55, 20, 99]
  },
  {
    item: "Phone",
    category: "Electronics",
    region: "South",
    status: "paused",
    target: 100,
    weeks: [70, 88, 60, 45, 77, 95, 85, 50]
  },
  {
    item: "Chair",
    category: "Furniture",
    region: "East",
    status: "discontinued",
    target: 100,
    weeks: [20, 30, 55, 65, 90, 100, 80, 45]
  },
  {
    item: "Desk",
    category: "Furniture",
    region: "West",
    status: "active",
    target: 100,
    weeks: [100, 98, 96, 94, 92, 90, 88, 86]
  }
];

const tableBody = document.getElementById("tableBody");
const categoryFilter = document.getElementById("categoryFilter");
const statusFilters = document.querySelectorAll(".statusFilter");

let currentSort = {
  column: null,
  ascending: true
};

/* Populate category dropdown */
function populateCategories() {
  const categories = [...new Set(data.map(d => d.category))];

  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
}

/* Get demand color */
function getDemandClass(value, target) {
  const percentage = (value / target) * 100;

  if (percentage >= 90) return "green";
  if (percentage >= 50) return "amber";
  return "red";
}

/* Render table */
function renderTable() {

  let filteredData = [...data];

  /* Category filter */
  const selectedCategory = categoryFilter.value;

  if (selectedCategory !== "All") {
    filteredData = filteredData.filter(
      item => item.category === selectedCategory
    );
  }

  /* Status filter */
  const selectedStatuses = [...statusFilters]
    .filter(cb => cb.checked)
    .map(cb => cb.value);

  filteredData = filteredData.filter(
    item => selectedStatuses.includes(item.status)
  );

  /* Sorting */
  if (currentSort.column !== null) {

    filteredData.sort((a, b) => {

      const valA = a.weeks[currentSort.column];
      const valB = b.weeks[currentSort.column];

      return currentSort.ascending
        ? valA - valB
        : valB - valA;
    });
  }

  tableBody.innerHTML = "";

  let weeklyTotals = Array(8).fill(0);
  let grandTotal = 0;

  filteredData.forEach(item => {

    const row = document.createElement("tr");

    const total = item.weeks.reduce((a, b) => a + b, 0);
    grandTotal += total;

    item.weeks.forEach((val, idx) => {
      weeklyTotals[idx] += val;
    });

    row.innerHTML = `
      <td>${item.item}</td>
      <td>${item.category}</td>
      <td>${item.region}</td>

      <td>
        <span class="badge ${item.status}">
          ${item.status}
        </span>
      </td>

      ${item.weeks.map(week => `
        <td class="${getDemandClass(week, item.target)}">
          ${week}
        </td>
      `).join("")}

      <td>${total}</td>
    `;

    tableBody.appendChild(row);
  });

  /* Update summary row */
  weeklyTotals.forEach((sum, index) => {
    document.getElementById(`sumW${index + 1}`).textContent = sum;
  });

  document.getElementById("grandTotal").textContent = grandTotal;
}

/* Filters */
categoryFilter.addEventListener("change", renderTable);

statusFilters.forEach(cb => {
  cb.addEventListener("change", renderTable);
});

/* Sorting */
document.querySelectorAll(".sortable").forEach((header, index) => {

  header.addEventListener("click", () => {

    const weekIndex = index;

    if (currentSort.column === weekIndex) {
      currentSort.ascending = !currentSort.ascending;
    } else {
      currentSort.column = weekIndex;
      currentSort.ascending = true;
    }

    /* Reset arrows */
    document.querySelectorAll(".sortable").forEach(h => {
      h.textContent = h.dataset.week.toUpperCase();
    });

    header.textContent =
      header.dataset.week.toUpperCase() +
      (currentSort.ascending ? " ▲" : " ▼");

    renderTable();
  });

});

populateCategories();
renderTable();