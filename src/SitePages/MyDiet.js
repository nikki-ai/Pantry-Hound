import React from 'react';
import ApiContext from '../ApiContext';
import '../Main.css';
import config from '../config';
import ErrorBoundaries from '../ErrorBoundaries';

class MyDiet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      calLimit: null,
      error: null,
    }
  }
  
  static contextType = ApiContext;

  componentDidMount() {
    //fetch diet #1 
    fetch(`${config.url}/diet`)
    .then(response => this.setState({diet: response}));
  }

  handleSubmit(e) {
    e.preventDefault();
    const cLimit = e.target.calLimit.value;
    const thisDiet = this.context.diet[0];

    fetch(`${config.url}/diet/${thisDiet.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        cal_limit: cLimit
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error('Something went wrong, could not update diet');
      }
      thisDiet.cal_limit = cLimit;
      this.context.addDiet(thisDiet);
    })
    .catch((err) => {
      alert(err);
    });
  }

  render() {
    const { diet = [] } = this.context;

    return (
      <ErrorBoundaries>
      <div>
        <h2>My Diet</h2>

        <section className='myDiet'>
          {diet.map((d) => (
            <p key={d.id}>
              {'Your daily calorie limit is: '}
              {d.cal_limit}
            </p>
          ))}
        </section>

        <form onSubmit={(e) => this.handleSubmit(e)}>
          <label htmlFor='New calorie limit'>New Cal Limit:</label>
          <br />
          <input type='text' name='calLimit' required />
          <br/><br/>
          <button type='submit' className='plainButton'>Submit</button>{' '}
          <button onClick={() => this.props.history.goBack()} className='plainButton'>Cancel</button>
        </form>

      </div>
      </ErrorBoundaries>
    );
  }
}

export default MyDiet;
