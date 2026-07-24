let food = document.querySelector('.food');

let india = document.querySelector('#indian');
let canadian = document.querySelector('#canadian');
let american = document.querySelector('#american');
let thai = document.querySelector('#thai');
let british = document.querySelector('#british');
let russian = document.querySelector('#russian');
let recipe;
let fetchData = async (area) => {
   const api
      = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
   const data = await api.json();
   // console.log(data.meals);
   let recipe = data.meals;
   showData(recipe);
}

const searchRecipe = () => {
   let search = document.querySelector('.filter');

   search.addEventListener('keydown', async (e) => {
      if (e.key === "Enter") {
         let inputValue = search.value;
         const api
            = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`);
         const data = await api.json();
         // console.log(data.meals);
         let recipe = data.meals;
         showData(recipe);
      }
   })


}
searchRecipe();

let showData = (recipe) => {

   food.innerHTML = recipe.map((meal) => `
     <div class="main">
     <div class="hover-effect">
     <img src="${meal.strMealThumb}" class="img-path" />
     </div>
     <h5>${meal.strMeal}</h5>
     </div>
   `).join("");
}


fetchData('india');

india.addEventListener('click', () => {
   fetchData('india');
});

canadian.addEventListener('click', () => {
   fetchData('canadian');
});

thai.addEventListener('click', () => {
   fetchData('thai');
});


british.addEventListener('click', () => {
   fetchData('british');
});


russian.addEventListener('click', () => {
   fetchData('russian');
});

american.addEventListener('click', () => {
   fetchData('american');
});


