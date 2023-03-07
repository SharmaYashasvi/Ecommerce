import './App.css';
import { useEffect} from "react";
import  Header  from './components/layout/Header/Header.js';
import {BrowserRouter as Router} from "react-router-dom";
import WebFont from "webfontloader";
function App() {
  // for web fonts
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []);

  return (
      <Router>
            <Header/>
      </Router>   
  );
}

export default App;
