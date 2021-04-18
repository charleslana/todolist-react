import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

class NotFound extends Component {

    render() {

        return (
            <Grid item xs={12} sm={6}>
                <Typography align="center">Page Not Found!</Typography>
            </Grid>
        );
    }
}

export default NotFound;