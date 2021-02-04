import React from 'react';
import ApiContext from '../ApiContext';
import '../Main.css';
import ErrorBoundaries from '../ErrorBoundaries';

class MyInfo extends React.Component {
  static contextType = ApiContext;

  render() {
    return (
      <ErrorBoundaries>
      <div>
        <section class='border'>
          <h2>My Info</h2>
          <div>
            <p>Username: exampleuser1</p>
          </div>
          <button class='delete'>Delete Account</button>
        </section>
      </div>
      </ErrorBoundaries>
    );
  }
}

export default MyInfo;
