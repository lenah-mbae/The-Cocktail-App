document.addEventListener("DOMContentLoaded", () => {
const cocktailInput = document.getElementById("cocktail-input");
const searchButton = document.getElementById("search-button");
const cocktailContainer = document.getElementById("cocktail-container");

 
   searchButton.addEventListener("click", fetchCocktail);
   cocktailInput.addEventListener("keypress", (event) => {
       if (event.key === "Enter") fetchCocktail();
   });

   
   async function fetchCocktail() {
       const query = cocktailInput.value.trim();
       if (!query) {
           alert("Please enter a cocktail name!");
           return;
       }

       const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`;

       try {
           const response = await fetch(url);
           const data = await response.json();

           cocktailContainer.innerHTML = ""; 

           if (data.drinks) {
               data.drinks.forEach(displayCocktail);
           } else {
               cocktailContainer.innerHTML = `<p>No results found for "${query}".</p>`;
           }
       } catch (error) {
           console.error("Error fetching data:", error);
           alert("Something went wrong! Please try again.");
       }
   }

      function displayCocktail(drink) {
       const cocktailDiv = document.createElement("div");
       cocktailDiv.classList.add("cocktail-card");

       cocktailDiv.innerHTML = `
           <h2>${drink.strDrink}</h2>
           <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}" />
           <p><strong>Instructions:</strong> ${drink.strInstructions}</p>
       `;

       cocktailContainer.appendChild(cocktailDiv);
   }

});