import React, { Component } from "react";
import PartialNav from "../Navigation/PartialNav";
import Navigation from "../Navigation/Navigation";

class Home extends Component {
  render() {
    return (
      <div>
        <div>
          <PartialNav />
          <Navigation />
        </div>
      </div>
    );
  }
}

export default Home;
