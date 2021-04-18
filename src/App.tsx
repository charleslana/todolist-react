import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './pages/Home';
import EditTodo from './pages/EditTodo';
import NotFound from './pages/NotFound';

class App extends Component {
    render() {
        return (
            <Router>
                <div style={{padding: 8}}>
                    <Grid container spacing={10} justify="center">
                        <Switch>
                            <Route exact path="/" component={Home}/>
                            <Route path="/edit/:id" component={EditTodo}/>
                            <Route component={NotFound}/>
                        </Switch>
                    </Grid>
                </div>
            </Router>
        );
    }
}

export default App;
