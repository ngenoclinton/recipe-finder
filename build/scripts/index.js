document.addEventListener('DOMContentLoaded', function(){
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const mealList =document.getElementById('meal');
    // 
    const closeBtn = document.getElementById('recipe-close-btn');
    const mealDetailsContent = document.querySelector('.meal-details-content')

    
    // get meal list that matches with the ingredients 
    const getMealList =()=>{
        let searchInputText = searchInput.value.trim();
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputText}`).then( response => response.json()).then(data =>{
                let html ='';

                if(data.meals){
                    data.meals.forEach(meal => {
                        html +=`
                            <div class="meal-item shadow-xl rounded-2xl overflow-hidden my-8 mx-0 cursor-pointer bg-slate-50" id="${meal.idMeal}">
                                <div class="meal-img block w-full">
                                    <img src="${meal.strMealThumb}" alt="recipe image is placed here">
                                </div>
                                <div class="meal-name px-2 py-6">
                                    <h3 class="font-bold text-xl my-8">"${meal.strMeal}"</h3>
                                    <a href="#" class="recipe-btn font-semibold text-lg no-underline my-8 mx-auto bg-teal-400 hover:bg-teal-500 text-white rounded-3xl py-2 px-5">Get Recipe</a>
                                </div>
                            </div>
                        `
                    });
                    mealList.classList.remove('notFound')
                }else{
                    html=`Sorry, we didn't find your Meal!`
                    mealList.classList.add('text-orange-500', 'text-2xl', 'font-semibold', 'mx-auto','text-center','w-full', 'items-center','bg-teal-100',"notFound",'pt-10','!grid','notFound');
                };
                mealList.innerHTML = html;

            }).catch(error => {
                console.error('Error fetching data:', error);
              });
        
    }
    // event Listeners 
    searchBtn.addEventListener('click', getMealList);

   
    // Function to get meal recipe 
    const getMealRecipe =(e)=> {
        e.preventDefault();
        // console.log(e.target);
        if(e.target.classList.contains('recipe-btn')){
            let mealItem = e.target.parentElement.parentElement
            console.log(mealItem);

            // Get the ID from the 'id' attribute of the meal-item element
            let mealItemId = mealItem.getAttribute('id');
            console.log(mealItemId); // Check if the ID is correctly extracted.
            fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.getAttribute('id')}`).then(response=>response.json()).then(data=>{
                console.log(data);
                mealRecipeModal(data.meals)
            })

        }
    }
   // getMealRecipe event Listeners 
   mealList.addEventListener('click', getMealRecipe);

    // modal functio 
    const mealRecipeModal =(meal)=>{
        console.log(meal);
        meal= meal[0];
        console.log(meal);
        let html = `
                <h2 class="recipe-title font-bold text-2xl">${meal.strMeal}</h2>
                <p class="recipe-category text-xl font-semibold bg-white  w-fit mx-auto items-center px-3 py-1 rounded-2xl shadow-lg text-orange-500">${meal.strCategory}</p>
                <div class="recipe-instructions px-8">
                    <h3 class="title text-xl font-semibold py-2 mb-3 mx-auto">Instructions:</h3>
                    <p${meal.strInstructions}</p>
                </div>
                <div class="recipe-meal-img items-center flex justify-center mx-auto mt-3">
                    <img src=${meal.strMealThumb} alt="recipe image" class="rounded-full w-[100px] h-[100px] mx-auto block">
                </div> 
                <div class="recipe-links no-underline text-lg font-semibold bg-teal-400 rounded-3xl py-1 px-5 text-white w-fit flex justify-center mx-auto ">
                    <a href=${meal.strYoutube} target="_blank" class="flex justify-center mx-auto">Watch Video</a>
                </div>
        `
        mealDetailsContent.innerHTML=html;
        mealDetailsContent.parentElement.classList.add('showRecipe');
        mealDetailsContent.parentElement.classList.remove('meal-details');
        }
        
    closeBtn.addEventListener('click', ()=>{
        mealDetailsContent.parentElement.classList.remove('showRecipe');
        mealDetailsContent.parentElement.classList.add('meal-details');
    })   
})