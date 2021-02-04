import React from 'react';
import ApiContext from '../ApiContext';
import { Link } from 'react-router-dom';
import '../Main.css';
import ErrorBoundaries from '../ErrorBoundaries';

class Pantry extends React.Component {
  static defaultProps = {
    onDeleteFood: () => {},
  };

  static contextType = ApiContext;

  // When the user clicks on <div>, open the popup
  // popUpFunction() {
  //   let popup = document.getElementById('myPopup');
  //   popup.classList.toggle('show');
  // }

  handleClickDelete = (e, id) => {
    e.preventDefault();
    const foodId = id;
    this.context.deleteFood(foodId);
    this.props.onDeleteFood(foodId);
  };

  render() {
    const { pantry = [] } = this.context;

    return (
      <ErrorBoundaries>
        <div>
          <section>
            <h2>My Pantry</h2>

            <label htmlFor='Add-food-button'>
              <Link to='/AddFood' className='popup bone'>
                <div className='c1'></div>
                <div className='c2'></div>
                <div className='c3'></div>
                <div className='c4'></div>
                <div className='b1'>
                  <div className='b2'>Add Food</div>
                </div>
              </Link>
            </label>

            <section className='border pantryStyle'>
              {pantry.map((pan) => (
                <h3 key={pan.id}>
                  {pan.title}
                  {': '}
                  {pan.cal}
                  {'cal.'}{' '}
                  <button onClick={(e) => this.handleClickDelete(e, pan.id)}>
                    Delete
                  </button>
                </h3>
              ))}
            </section>
          </section>
        </div>
      </ErrorBoundaries>
    );
  }
}

export default Pantry;
