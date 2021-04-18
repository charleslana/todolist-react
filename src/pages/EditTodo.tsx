import React, {ChangeEvent, Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import CheckIcon from '@material-ui/icons/Check';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import InputAdornment from '@material-ui/core/InputAdornment';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actions as todoActions} from '../reducers/todo';

interface MyProps {
    todoActions: any;
    todo: any;
    match: any;
}

interface MyState {
    history: any;
}

class EditTodo extends Component<MyProps & MyState> {

    state = {
        item: {
            title: ''
        }
    }

    // get active item by ID from router (match.params.id)
    componentDidMount() {
        const {match, todo} = this.props;
        const item = todo.items.find((item: any) => item.id === match.params.id) || {title: ''};

        this.setState({item});
    }

    // handle change active item data
    handleChange = (name: any) => (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            item: {
                ...this.state.item,
                [name]: event.target.value
            }
        });
    }

    //handle submit to update todo on redux state and go back to home

    handleSubmit = (event: ChangeEvent<HTMLFormElement & any>) => {
        event.preventDefault();
        const {item} = this.state;
        if (item.title) {
            const {todoActions} = this.props;

            todoActions.update(item);
            this.goBack();

        }
    }

    //go back home
    goBack = () => {
        const {history} = this.props;
        history.goBack();
    }

    render() {

        const {item} = this.state;

        return (
            <Grid item xs={12} sm={6}>
                <Typography align="center">Edit Todo</Typography>
                <Paper style={{paddingLeft: 16, paddingRight: 16}}>
                    <form onSubmit={this.handleSubmit}>
                        <TextField
                            id="todo"
                            label="What needs to be done?"
                            onChange={this.handleChange('title')}
                            fullWidth
                            margin="normal"
                            value={item.title}
                            autoComplete="off"
                            autoFocus={true}
                            InputProps={{
                                endAdornment:
                                    (<InputAdornment position="end">
                                        <IconButton
                                            onClick={this.handleSubmit}

                                        >
                                            <CheckIcon/>
                                        </IconButton>
                                    </InputAdornment>)

                            }}
                        />
                        <IconButton aria-label="Edit" onClick={this.handleSubmit}>
                            <ArrowBackIcon/>
                        </IconButton>
                    </form>

                </Paper>
            </Grid>
        );
    }
}

const mapStateToProps = ({todo}: any) => ({todo});
const mapDispatchToProps = (dispatch: any) => ({todoActions: bindActionCreators(todoActions, dispatch)});

export default connect(mapStateToProps, mapDispatchToProps)(EditTodo);