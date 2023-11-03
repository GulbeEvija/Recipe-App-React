import { useEffect } from 'react';
import './App.css';
import video from './foodVideo.mp4';
import { useState } from 'react';
import MyRecipesComponent from './MyRecipesComponent';

function App() {

  const MY_ID = "517d8d5e";
  const MY_KEY = "3171077e34cdb0b17cfe54cdc7688a8c";

  const [mySearch, setMySearch] = useState("");
  const [myRecipes, setMyRecipes] = useState([]);
  const [wordSubmitted, setWordSubmitted] = useState("carrot");

  useEffect(() => {
    const getRecipe = async () => {
      const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${wordSubmitted}&app_id=${MY_ID}&app_key=${MY_KEY}`);
      const data = await response.json();
      setMyRecipes(data.hits);
    }
    getRecipe()
  }, [wordSubmitted])


  const myRecipeSearch = (e) => {
    setMySearch(e.target.value)
  }

  const finalSearch = (e) => {
    e.preventDefault()
    setWordSubmitted(mySearch)
  }

  return (
  <div className="App">
    <div className="container">
      <video autoPlay muted loop>
        <source src={video} type="video/mp4" />
      </video>

      <h1>Find a Recipe</h1>
    </div>

    <div className='container'>
     <form onSubmit={finalSearch}>
         <input className='search' placeholder='Search...' onChange={myRecipeSearch} value={mySearch}></input>
    </form>
    </div>

    <div className='container'>
      <button onClick={finalSearch}>
          <img src="https://img.icons8.com/fluency/48/000000/fry.png" alt="icon"/>
        </button>
    </div>

    {myRecipes.map((element, index) => (
      <MyRecipesComponent key={index}
        label={element.recipe.label} 
        image={element.recipe.image} 
        calories={element.recipe.calories} 
        ingredients={element.recipe.ingredientLines}/>
    ))}

  </div>
  );
}

export default App;
