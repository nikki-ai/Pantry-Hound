import React from 'react';
import config from './config';
import ApiContext from './ApiContext';
import { Route, Link } from 'react-router-dom';
import Pantry from './SitePages/Pantry';
import HomePage from './SitePages/HomePage';
import MyDiet from './SitePages/MyDiet';
import MyInfo from './SitePages/MyInfo';
import AddFood from './SitePages/AddFood';
import FetchMeFood from './SitePages/FetchMeFood';
import './Main.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      pantry: [],
      diet: [],
    };
  }

  static contextType = ApiContext;

  componentDidMount = () => {
    Promise.all([fetch(`${config.url}/pantry`), fetch(`${config.url}/diet`)])
      .then(([pantryResponse, dietResponse]) => {
        if (!pantryResponse.ok)
          return pantryResponse.json().then((error) => Promise.reject(error));
        if (!dietResponse.ok)
          return dietResponse.json().then((error) => Promise.reject(error));
        return Promise.all([pantryResponse.json(), dietResponse.json()]);
      })
      .then(([pantry, diet]) => {
        console.log(pantry, diet, 'this is from fetch');
        this.setState({ pantry, diet });
      })
      .catch((error) => {
        console.error({ error });
      });
  };

  findFood = (pantry = [], foodId) => pantry.find((food) => food.id === foodId);

  handleDeleteFood = (foodId) => {
    const deleteUrl = `${config.url}/pantry/${foodId}`;

    fetch(deleteUrl, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.status);
        } else {
          this.setState({
            pantry: this.state.pantry.filter((food) => food.id !== foodId),
          });
        }
      })
      .catch((error) => console.log(error));
  };

  handleEatFood = (foodId) => {
    const food = this.state.pantry.find((f) => f.id === foodId);
    let calEaten = this.state.diet[0].cal_eaten;
    let addCal = food.cal;
    const newCalEaten = parseFloat(calEaten) + parseFloat(addCal);
    
    console.log(newCalEaten, 'test');
    console.log(this.state.diet[0].id);
    
    fetch(`${config.url}/diet/${this.state.diet[0].id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        cal_eaten: newCalEaten,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Something went wrong, could not eat food');
        }
        calEaten = newCalEaten;
        console.log(calEaten, 'line 86');
      })
      .catch((err) => {
        alert(err);
      });

    console.log(calEaten, 'line 92');
  };

  addFood = (newFood) => {
    const addFood = [...this.state.pantry, newFood];
    this.setState({ pantry: addFood });
  };

  addDiet = (newDiet) => {
    const addDiet = [newDiet];
    this.setState({ diet: addDiet });
  };

  render() {
    //set global prop value
    const value = {
      pantry: this.state.pantry,
      diet: this.state.diet,
      addFood: this.addFood,
      addDiet: this.addDiet,
      deleteFood: this.handleDeleteFood,
      eatFood: this.handleEatFood,
    };
    console.log(value, 'this is value');

    return (
      <ApiContext.Provider value={value}>
        <header>
          <section className='titleBar'>
            <Link to='/'>
              <h1>Pantry Hound</h1>
            </Link>
          </section>

          <nav>
            <ul id='menu'>
              <li className='circle'>
                <a href='HomePage'>Home</a>
              </li>
              <li className='circle'>
                <a href='Pantry'>My Pantry</a>
              </li>
              <li className='circle'>
                <a href='MyDiet'>My Diet</a>
              </li>
              <li className='circle'>
                <a href='MyInfo'>My Info</a>
              </li>
            </ul>
          </nav>
        </header>

        <Route path='/HomePage' component={HomePage} />

        <Route path='/FetchMeFood' component={FetchMeFood} />

        <Route path='/Pantry' component={Pantry} />

        <Route path='/MyDiet' component={MyDiet} />

        <Route path='/MyInfo' component={MyInfo} />

        <Route path='/AddFood' component={AddFood} />
      </ApiContext.Provider>
    );
  }
}

export default App;
