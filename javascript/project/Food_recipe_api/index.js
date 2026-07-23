let food = document.querySelector('.food');

let foodapi = async (area) => {
   const api
      = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
   const data = await api.json();
   // console.log(data.meals);
   return data.meals;
}

foodapi('india');