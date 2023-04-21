import React, { Component } from "react";


import "./App.css";
import 'semantic-ui-less/semantic.less';

// Import components
import Ccp from "./components/ccp";



class App extends Component {
       render() {
              return (
                     <div className="App">
                        <Ccp />
                     </div>
              );
       }
}

export default App
