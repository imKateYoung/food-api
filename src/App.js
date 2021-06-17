import './App.css';
import {ID} from "./key";
import {KEY} from "./key";
import {useState} from "react";
import Axios from "axios";
//import searchForNutrients from './components/SearchNutrients';


function App() {

  const [query, setquery] = useState("")
  const [items, setItems] = useState([])   //initiate empty array
  var url = `https://api.edamam.com/auto-complete?app_id=${ID}&app_key=${KEY}&q=${query}&limit=10`;

  async function getFood(){
    try{
      //alert("it's working")
      var result = await Axios.get(url);
      setItems(result.data); // assign data to setItems  [hits][0][food][values]
      console.log(result.data);
      console.log(url)
    }
    catch (error){
      console.log(error)
    } 
    
  }
  //prevent default
  const submit = (e) => {
    e.preventDefault();
    getFood();
  }
  
  return (
    <div className="App">
      <h1>Food Plaza🍕</h1>
      <p>You can enter food name to search for nutrition and diet information within our Food Database.</p>
      <div>
        <form className="App-form" onSubmit={submit}>
          <input className="App-input" 
          type="text" 
          placeholder="Please enter food name" 
          value={query} 
          onChange={(e) => setquery(e.target.value)}/>
          <input className="App-submit" type="submit" value="Search" /> 
        </form>
        <div className="container">
          <p>information display below</p>
          {items && items.map(item => {
            return <p>{item}</p>
            //[0=item][key:food][value:category] expected result to be print out
          })}
        </div>
      </div>
        
    </div>
  );
}

export default App;



//what do i want? get the food api link, and display food
// what do i need? an api link, a submit form, an input
//what are the steps? 
//create a form:Execute a function when a form is submitted,
// preventDefault: Onsubmit created an event, pass in this event in arror function to handle default handling.
// useState, when the input is typed in, log the input as setquery and return data
//create function to fetch data, using Axios.
//data will be stored in setstate, accessing data by map, loop through each key and value pair
//display them on screen