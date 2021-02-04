import React from 'react';
import ApiContext from '../ApiContext';
import '../Main.css';
import { Link } from 'react-router-dom';
import ErrorBoundaries from '../ErrorBoundaries';

class HomePage extends React.Component {
  static contextType = ApiContext;

  render() {
    const { diet = [] } = this.context;
    let remainingCal =
      (diet[0] && diet[0].cal_limit) - (diet[0] && diet[0].cal_eaten);
    return (
      <ErrorBoundaries>
        <div>
          <section>
            <h2>Home</h2>
            <label htmlFor='calorie-meter'>Cal. Meter</label>
            <br />
            <meter
              id='calorie-meter'
              min='0'
              max={diet[0] && diet[0].cal_limit}
              low='0.3'
              high='0.6'
              optimum='80'
              value={diet[0] && diet[0].cal_eaten}
            >
              at 50/100
            </meter>

            <br />
            <p>{remainingCal} remaining calories</p>
            <p>
              You've eaten {diet[0] && diet[0].cal_eaten} calories out of your{' '}
              {diet[0] && diet[0].cal_limit} calorie limit for today
            </p>
            <br />
            <label htmlFor='link'>
              <Link to='/FetchMeFood' className='bone'>
                <div className='c1'></div>
                <div className='c2'></div>
                <div className='c3'></div>
                <div className='c4'></div>
                <div className='b1'>
                  <div className='b2'>Fetch me food!</div>
                </div>
              </Link>
            </label>
          </section>
          <section className='border'>
            <h2>About Pantry Hound</h2>
            <p>
              Pantry Hound will let you log all of your household foods and
              their calorie count and set a daily calorie limit for yourself.
              When you press a button "Fetch my food" we will generate a list of
              your available foods and the amount of servings you could eat of
              that specific food before you were to reach your cal. limit. As
              the day goes on and you are closer to your cal. limit the list
              gets more refined.
            </p>
          </section>
        </div>
      </ErrorBoundaries>
    );
  }
}

export default HomePage;
