import React from 'react';
import ApiContext from '../ApiContext';
import '../Main.css';

class MyInfo extends React.Component {
  static contextType = ApiContext;

  render() {
    return (
      <div>
        <section class='border'>
          <h2>My Info</h2>
          <div>
            <p>Username: exampleuser1</p>
          </div>
          <button class='delete'>Delete Account</button>
        </section>
      </div>
    );
  }
}

export default MyInfo;
