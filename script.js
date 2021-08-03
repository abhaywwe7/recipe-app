const searchBtnn = document.getElementById("searchBtn");
const mealListt = document.getElementById("meal");
const mealDetailsContentt = document.querySelector(".mealDetailsContent");
const recipeCloseBtnn = document.getElementById("recipeCloseBtn");
searchBtnn.addEventListener("click", getMealList);
mealListt.addEventListener("click", getMealRecipe);
recipeCloseBtnn.addEventListener("click", () => {
  mealDetailsContentt.parentElement.classList.remove("showRecipe");
});
function getMealList() {
  let searchInputTxtt = document.getElementById("searchInput").value.trim();
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxtt}
  `)
    .then((response) => response.json())
    .then((data) => {
      //   console.log(data);
      let html = "";
      if (data.meals) {
        data.meals.forEach((meal) => {
          html += `
            <div class="mealItem" data-id="${meal.idMeal}">
            <div class="mealImg">
              <img
                src="${meal.strMealThumb}"
                alt=""
                srcset=""
                class="mealImg"
              />
            </div>
            <div class="mealName">
              <h3>${meal.strMeal}</h3>
              <a href="#" class="recipeBtn">Get Recipe</a>
            </div>
          </div>
            `;
        });
        mealListt.classList.remove("notFound");
      } else {
        html = "Sorry, cannot be found!";
        mealListt.classList.add("notFound");
      }
      mealListt.innerHTML = html;
    });
}

function getMealRecipe(e) {
  e.preventDefault();
  if (e.target.classList.contains("recipeBtn")) {
    let mealItemm = e.target.parentElement.parentElement;
    // console.log(mealItemm);
    fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItemm.dataset.id}`
    )
      .then((response) => response.json())
      .then((data) => mealRecipeModal(data.meals));
  }
}

function mealRecipeModal(meal) {
  console.log(meal);
  meal = meal[0];
  let html = ` <h2 class="recipeTitle">${meal.strMeal}</h2>
  <p class="recipeCategory">${meal.strCategory}</p>
  <div class="recipeInstruct">
    <h2>Instructions:</h2>
    
    <p>
      ${meal.strInstructions}
    </p>
  </div>
  <div class="recipeMealImg">
    <img src="${meal.strMealThumb}"alt="" />
  </div>
  <div class="recipeLink">
    <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
  </div>`;

  mealDetailsContentt.innerHTML = html;
  mealDetailsContentt.parentElement.classList.add("showRecipe");
}
