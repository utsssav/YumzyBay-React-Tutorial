import './App.css';
import {useEffect,useState} from "react";
import Recipe from './Recipe';
function App() {
  const APP_ID = "d12a853d";
  const APP_KEY = "674ef3b156322abc07246266d8a2d0b3";
  const exampleReq = `https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`;

  const [recipes,setRecipes] = useState([]);
  const [search,setSearch] = useState('');
  const [query,setQuery] = useState('burger');
  const getRecipes = async ()=>{
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
 }
 const getSearch = (e)=>{
   e.preventDefault();
   setQuery(search);
   setSearch("");
 }
  useEffect(() => {
     getRecipes();
  },[query])

  return (
    <div className="App">
      <form  onSubmit = {getSearch} className = "search-form">
        <input type="text" className = "search-bar" value = {search} onChange = {(e)=>setSearch(e.target.value)}/>
        <button type="submit" className = "search-button">Search</button>
      </form>
      <div className = "recipes">
      {recipes.map(recipe=>(
        <Recipe key = {recipe.recipe.label} title = {recipe.recipe.label} calories = {recipe.recipe.calories} image = {recipe.recipe.image} ingredients = {recipe.recipe.ingredients}/>
      ))}
      </div>
    </div>
  );
}

export default App;
