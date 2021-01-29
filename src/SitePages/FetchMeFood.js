import React from 'react';
import ApiContext from '../ApiContext';
import '../Main.css';

class FetchMeFood extends React.Component {

    static defaultProps = {
        onEatFood: () => {},
    }
  
    static contextType = ApiContext;

    handleClickEat = (e, id) => {
        e.preventDefault();
        const foodId = id;
        this.context.eatFood(foodId);
        this.props.onEatFood(foodId);
        console.log('eat button works');
      };
  
    render() {
      const { pantry = [] } = this.context;
  
      return (
        <div>
          <h2>Select foods to eat</h2>
            <section className='border pantryStyle'>
              {pantry.map((pan) => (
                <h3 key={pan.id}>
                  {pan.title}
                  {': '}
                  {pan.cal}
                  {'cal.'} <button onClick={(e) => this.handleClickEat(e, pan.id)}>Eat food</button>
                </h3>
              ))}
            </section>
                
            <label htmlFor='cancel button'>
            <button onClick={() => this.props.history.goBack()} className='bone'>
              <div className='c1'></div>
              <div className='c2'></div>
              <div className='c3'></div>
              <div className='c4'></div>
              <div className='b1'>
                <div className='b2'>Cancel</div>
              </div>
            </button>
          </label>
        </div>
      );
    }
  }

export default FetchMeFood;