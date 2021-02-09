import React from 'react';
import { Component } from 'react';
import ApiContext from '../ApiContext';
import '../Main.css';
import config from '../config';
import ErrorBoundaries from '../ErrorBoundaries';

class AddFood extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foodName: null,
      error: null,
    };
  }

  static contextType = ApiContext;

  handleSubmit(e) {
    e.preventDefault();
    const fName = e.target.foodName.value;
    const fCal = e.target.foodCal.value;

    fetch(`${config.url}/pantry`, {
      method: 'POST',
      body: JSON.stringify({
        title: fName,
        cal: fCal,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Something went wrong, could not add new food item.');
        }
        return res.json();
      })
      .then((data) => {
        this.context.addFood(data);
        this.props.history.goBack();
      })
      .catch((err) => {
        alert(err);
      });
  }

  render() {
    return (
      <ErrorBoundaries>
        <div>
          <form onSubmit={(e) => this.handleSubmit(e)}>
            <label htmlFor='food name'>Food name:</label>
            <br />
            <input type='text' name='foodName' required />
            <br />
            <label htmlFor='calorie count'>Calories per serving:</label>
            <br />
            <input type='text' name='foodCal' required />
            <br />
            <button type='submit'>Submit</button>
            <button onClick={() => this.props.history.goBack()}>Cancel</button>
          </form>
        </div>
      </ErrorBoundaries>
    );
  }
}

export default AddFood;
