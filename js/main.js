/**
 * In-Class Demo Week 3: Stage 2 Launch
 * JavaScript Controller for Sentence Interface Prototype
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {

  // 1. Grab DOM Elements
  const flavorSelect = document.getElementById('flavor-select');
  const timeSelect = document.getElementById('time-select');
  const ingredientSelect = document.getElementById('ingredient-select');

  const feedbackFlavor = document.getElementById('feedback-flavor');
  const feedbackTime = document.getElementById('feedback-time');
  const feedbackIngredient = document.getElementById('feedback-ingredient');

  const resultsCount = document.getElementById('results-count');
  const recipesContainer = document.getElementById('recipes-container');

  // 2. Data store for recipes
  let recipes = [];

  // 3. Load Recipe Data (supports both file:// and http:// environments)
  async function loadRecipeData() {
    try {
      // Attempt to load from data/recipes.json or root recipes.json
      let response = await fetch('data/recipes.json').catch(() => null);
      if (!response || !response.ok) {
        response = await fetch('recipes.json').catch(() => null);
      }
      if (response && response.ok) {
        recipes = await response.json();
      } else {
        throw new Error('Could not fetch JSON');
      }
    } catch (error) {
      // Fallback: If fetch is blocked by browser CORS (e.g. opening directly via file://),
      // use the local array provided by js/data.js
      if (typeof fillerRecipes !== 'undefined') {
        recipes = fillerRecipes;
      } else {
        console.error('Could not load recipe data:', error);
      }
    }

    // Initial render based on default dropdown selections
    updateInterface();
  }

  // 4. Update the Prototype when selections change
  function updateInterface() {
    const selectedFlavor = flavorSelect.value.toLowerCase();
    const selectedTime = timeSelect.value.toLowerCase();
    const selectedIngredient = ingredientSelect.value.toLowerCase();

    // A) Update Sentence Feedback text
    if (feedbackFlavor) feedbackFlavor.textContent = selectedFlavor;
    if (feedbackTime) feedbackTime.textContent = selectedTime;
    if (feedbackIngredient) feedbackIngredient.textContent = selectedIngredient;

    // B) Filter local JSON recipes strictly matching the selected dropdown values
    const matchingRecipes = recipes.filter(item =>
      item.flavor.toLowerCase() === selectedFlavor &&
      item.time.toLowerCase() === selectedTime &&
      item.ingredient.toLowerCase() === selectedIngredient
    );

    // C) Update Results Count
    if (resultsCount) {
      const count = matchingRecipes.length;
      resultsCount.textContent = `(${count} recipe${count === 1 ? '' : 's'} found)`;
    }

    // D) Render Recipe Cards matching the selected dropdowns
    renderRecipeCards(matchingRecipes, selectedFlavor, selectedTime, selectedIngredient);
  }

  // 5. Helper function to create HTML for recipe cards with wireframe placeholders
  function renderRecipeCards(cards, currentFlavor, currentTime, currentIngredient) {
    if (!recipesContainer) return;

    if (cards.length === 0) {
      recipesContainer.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 40px; text-align: center; color: var(--text-muted); background: var(--bg-card); border: 1px dashed var(--border-light); border-radius: 6px;">
          No recipes found for this combination. Try changing one of the dropdowns above!
        </div>
      `;
      return;
    }

    const cardsHtml = cards.map(recipe => {
      // Check which tags match current selections for subtle highlighting
      const isFlavorMatch = recipe.flavor.toLowerCase() === currentFlavor;
      const isTimeMatch = recipe.time.toLowerCase() === currentTime;
      const isIngredientMatch = recipe.ingredient.toLowerCase() === currentIngredient;

      return `
        <article class="recipe-card">
          <!-- Wireframe placeholder image (Box with 'X' matching sketch) -->
          <div class="placeholder-image-box" aria-label="Recipe image placeholder">
            <svg class="wireframe-x-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
              <line x1="0" y1="0" x2="100" y2="100" stroke="#9ca3af" stroke-width="1.5" />
              <line x1="100" y1="0" x2="0" y2="100" stroke="#9ca3af" stroke-width="1.5" />
            </svg>
            <span class="placeholder-badge">IMAGE</span>
          </div>

          <!-- Recipe text details -->
          <div class="recipe-details">
            <h3 class="recipe-title">${escapeHtml(recipe.title)}</h3>
            
            <div class="recipe-tags">
              <span class="recipe-tag ${isFlavorMatch ? 'highlight' : ''}">${escapeHtml(recipe.flavor)}</span>
              <span class="recipe-tag ${isTimeMatch ? 'highlight' : ''}">${escapeHtml(recipe.time)}</span>
              <span class="recipe-tag ${isIngredientMatch ? 'highlight' : ''}">${escapeHtml(recipe.ingredient)}</span>
            </div>

            <p class="recipe-description">${escapeHtml(recipe.description)}</p>

            <div class="recipe-meta-footer">
              <span>${escapeHtml(recipe.difficulty || 'Easy')}</span>
              <span>${escapeHtml(recipe.calories || '')}</span>
            </div>
          </div>
        </article>
      `;
    }).join('');

    recipesContainer.innerHTML = cardsHtml;
  }

  // Simple HTML escaping helper to prevent injection in prototype
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // 6. Listen for changes on all 3 dropdowns
  flavorSelect.addEventListener('change', updateInterface);
  timeSelect.addEventListener('change', updateInterface);
  ingredientSelect.addEventListener('change', updateInterface);

  // Initialize data loading
  loadRecipeData();
});
