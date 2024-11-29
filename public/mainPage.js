const token = localStorage.getItem('token')

document.addEventListener('DOMContentLoaded', async (event) => {

    if (!token) {
        window.location.href = '/public/login.html';  // Redirect to login page if not logged in
        return;
    }

    axios.get(`http://localhost:3000/user/profile`, {
        headers: { authorization: token }
    })
        .then(res => {

            const data = res.data.userDetails
            const div = document.getElementById('profile')

            const name = document.createElement('p')
            name.textContent = `Name:-${data.username}`

            const email = document.createElement('p')
            email.textContent = `Email:-${data.email}`

            div.appendChild(name)
            div.appendChild(email)

        })
        .catch(err => console.log(err))

    const updateProfile = document.getElementById('updateProfileForm')

    const recipeForm = document.getElementById('createRecipeForm')

    const userRecipes=document.getElementById('yourRecipes')

    const editRecipeForm=document.getElementById('editRecipeForm')

    updateProfile.addEventListener('submit',
        async (event) => {
            event.preventDefault();

            const name = document.getElementById('updateUsername').value
            const email = document.getElementById('updateEmail').value

            try {

                const res = await axios.put('http://localhost:3000/user/updateUser', { name, email }, {
                    headers: { authorization: token }
                });
                console.log('res----', res.data)
            }
            catch (err) {
                console.log(err)
            }

        }
    )
    recipeForm.addEventListener('submit',
        async (event) => {
            event.preventDefault();
            const formData = new FormData();
            formData.append('title', document.getElementById('title').value);
            formData.append('ingredients', document.getElementById('ingredients').value);
            formData.append('instructions', document.getElementById('instructions').value);
            formData.append('cookingTime', document.getElementById('cookingTime').value);
            formData.append('servings', document.getElementById('servings').value);
            formData.append('image', document.getElementById('image').files[0])

            try {
                const response = await axios.post('http://localhost:3000/recipe/createRecipe', formData, {
                    headers: {authorization:token}
                });
                console.log(response.data);
            } catch (error) {
                console.error('Error creating recipe:', error);
            }
        }
    )
    userRecipes.addEventListener('click',async (event) => {
        event.preventDefault()

        getUserRecipts()
    })
    editRecipeForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const recipeId = document.getElementById('editRecipeId').value;
        const formData = new FormData();
        formData.append('title', document.getElementById('editTitle').value);
        formData.append('ingredients', document.getElementById('editIngredients').value);
        formData.append('instructions', document.getElementById('editInstructions').value);
        formData.append('cookingTime', document.getElementById('editCookingTime').value);
        formData.append('servings', document.getElementById('editServings').value);
        formData.append('image', document.getElementById('editImage').files[0])

        try {
            const response = await axios.put(`http://localhost:3000/recipe/${recipeId}`, formData, {
                    headers: { authorization: token }
            });

            document.getElementById('editRecipeForm').style.display = 'none';
            getUserRecipts()
        } catch (error) {
            console.error('Error updating recipe:', error);
        }
    });
})
async function getUserRecipts() {
    try {
        const response = await axios.get('http://localhost:3000/recipe/userRecipe', {
            headers: {authorization:token}
        });
        console.log(response.data.userRecipe.length)

        const recipes = response.data.userRecipe;
            const recipesContainer = document.getElementById('recipesContainer');
            recipesContainer.innerHTML = '';
            recipes.forEach(recipe => {
                const recipeDiv = document.createElement('div');
                recipeDiv.innerHTML = `
                    <h3>Title:-${recipe.title}</h3>
                    <p>Ingredients;_${recipe.ingredients}</p>
                    <p>Instructions:-${recipe.instructions}</p>
                    <p>Cooking Time: ${recipe.cookingTime}</p>
                    <p>Servings: ${recipe.servings}</p>
                    <img src="${recipe.imageUrl}" alt="${recipe.title}" style="width:100px;height:100px;"><br>
                    <button onclick="editRecipe(${recipe.id})">Edit</button>
                    <button onclick="deleteRecipe(${recipe.id})">Delete</button>
                `;
                recipesContainer.appendChild(recipeDiv);
            });
        
    } catch (error) {
        console.error('Error creating recipe:', error);
    }
}
async function deleteRecipe(id) {
    try {
        const response=await axios.delete(`http://localhost:3000/recipe/${id}`, {
                headers: {authorization:token}
            });
        console.log(response.data);
        getUserRecipts()
        
    } catch (error) {
        console.error('Error deleting recipe:', error);
    }
}
async function editRecipe(id) {
    document.getElementById('editRecipeForm').style.display = 'block';
    document.getElementById('editRecipeId').value = id;
}