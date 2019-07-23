import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class RecipeService{
    recipeChanged = new Subject<Recipe[]>();
    private recipes: Recipe[] = [
        new Recipe(
            'Healthier-than-Egg Rolls',
             'It\'s really good trust me!', 
             'https://www.tasteofhome.com/wp-content/uploads/2017/10/Healthier-than-Egg-Rolls_EXPS_SDON17_55166_C06_23_6b-696x696.jpg',
             [
                 new Ingredient('Egg', 3),
                 new Ingredient('Rolls', 4)
             ], 0),
        new Recipe(
            'Lemon Bars', 
            'A delicious dessert with crumbly crust and a lemon zest',
             'https://vignette.wikia.nocookie.net/recipes/images/f/f3/IMG_3909.jpg',
             [
                 new Ingredient('Butter', 1),
                 new Ingredient('Sugar', .5),
                 new Ingredient('White Flour', 2)
             ], 1)
    ];

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(id: number) {
        return this.recipes[id];
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, recipe: Recipe) {
        this.recipes[index] = recipe;
        this.recipeChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipeChanged.next(this.recipes.slice());
    }
    
}