import './App.css';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import BannerComponent from './components/BannerComponent';
import FooterComponent from './components/FooterComponent';
import ListTicketComponent from './components/ListTicketComponent';
import CreateTicketComponent from './components/CreateTicketComponent';

function App() {
  return (
    <div>
      <Router>
        <div> 
          <BannerComponent />
          <div className="ticket-list-wrapper"> 
            <Switch>
              <Route path="/" exact component={ListTicketComponent} />
              <Route path="/create/:id" component={CreateTicketComponent} />
              <Route path="/solution/:id" render={(props) => (<CreateTicketComponent {...props} canAddSolution={true}/>)} />
            </Switch>
          </div>
          <FooterComponent />
        </div>
      </Router>
    </div>
  );
}

export default App;
