const loadMealData = (meal) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => displayMeal(data.meals));
};

const displayMeal = (meals) => {
  const mealsContainer = document.getElementById("card-container");
  mealsContainer.innerHTML = "";
  meals.forEach((meal) => {
    console.log(meal);
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
    <div class="card">
    <img src="${meal.strMealThumb}
    " class="card-img-top" alt="..." />
    <div class="card-body">
      <h5 class="card-title">${meal.strMeal}</h5>
      <button onclick="detailsMeal(${meal.idMeal})" type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#meal-Modal">
      Details
</button>
    </div>
    </div>
    `;
    mealsContainer.appendChild(div);
  });
};

const searchMeal = () => {
  const searchText = document.getElementById("search-input").value;
  loadMealData(searchText);
  document.getElementById("search-input").value = "";
};

const detailsMeal = (idMeal) => {
  //   console.log(idMeal);
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayModal(data.meals[0]));
};

const displayModal = (meal) => {
  console.log(meal);
  document.getElementById("meal-ModalLabel").innerHTML = meal.strMeal;
  const modalBody = document.getElementById("modal-body");

  modalBody.innerHTML = `
    <p><span class="fw-bold">Catagory:</span> ${meal.strCategory}</p>
    <p><span class="fw-bold">Country:</span> ${meal.strArea}</p>
    <p><span class="fw-bold">Recipe:</span> <a href="${meal.strYoutube}" target="_blank">Watch On YouTube!</a></p>
  
  `;
};
loadMealData("fish");
