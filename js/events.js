// Global variables
let allEvents = [];
let filteredEvents = [];

// Fetch and initialize events
async function loadEvents() {
  try {
    const response = await fetch("../assets/events.json");
    if (!response.ok) {
      throw new Error("Failed to load events data");
    }
    allEvents = await response.json();
    filteredEvents = [...allEvents];

    populateCategoryFilter();
    renderEvents(filteredEvents);
    updateResultsCount();
  } catch (error) {
    console.error("Error loading events:", error);
    document.getElementById("results-count").textContent =
      "Error loading events";
    document.getElementById("events-tbody").innerHTML =
      '<tr><td colspan="5" style="text-align: center; padding: 2rem; color: red;">Failed to load events. Please check the console for details.</td></tr>';
  }
}

// Populate category filter dropdown
function populateCategoryFilter() {
  const categories = new Set();

  allEvents.forEach((event) => {
    // Split categories if multiple are listed
    const cats = event.category.split(",").map((c) => c.trim());
    cats.forEach((cat) => categories.add(cat));
  });

  const categoryFilter = document.getElementById("category-filter");
  const sortedCategories = Array.from(categories).sort();

  sortedCategories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
}

// Render events in table
function renderEvents(events) {
  const tbody = document.getElementById("events-tbody");
  const noResults = document.getElementById("no-results");

  if (events.length === 0) {
    tbody.innerHTML = "";
    noResults.style.display = "block";
    return;
  }

  noResults.style.display = "none";

  tbody.innerHTML = events
    .map(
      (event) => `
    <tr>
      <td>${event.name}</td>
      <td><span class="category-badge">${escapeHtml(event.category)}</span></td>
      <td>${escapeHtml(event.description)}</td>
      <td>${escapeHtml(event.tags)}</td>
      <td>
        <a href="${escapeHtml(event.link)}" 
           class="reference-link" 
           target="_blank" 
           rel="noopener noreferrer"
           aria-label="Learn more about ${event.name} event on W3Schools">
          W3Schools ↗
        </a>
      </td>
    </tr>
  `
    )
    .join("");
}

// Filter events based on search and category
function filterEvents() {
  const searchTerm = document
    .getElementById("search-input")
    .value.toLowerCase();
  const selectedCategory = document.getElementById("category-filter").value;

  filteredEvents = allEvents.filter((event) => {
    const matchesSearch =
      event.name.toLowerCase().includes(searchTerm) ||
      event.description.toLowerCase().includes(searchTerm) ||
      event.tags.toLowerCase().includes(searchTerm);

    // Split the event's categories and check for exact match
    const matchesCategory =
      selectedCategory === "all" ||
      event.category
        .split(",")
        .map((c) => c.trim())
        .includes(selectedCategory);

    return matchesSearch && matchesCategory;
  });

  renderEvents(filteredEvents);
  updateResultsCount();
}

// Update results count
function updateResultsCount() {
  const count = filteredEvents.length;
  const total = allEvents.length;
  const resultsText =
    count === total
      ? `Showing all ${total} events`
      : `Showing ${count} of ${total} events`;

  document.getElementById("results-count").textContent = resultsText;
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
  loadEvents();

  // Search input with debounce
  let searchTimeout;
  document.getElementById("search-input").addEventListener("input", () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(filterEvents, 300);
  });

  // Category filter
  document
    .getElementById("category-filter")
    .addEventListener("change", filterEvents);
});
