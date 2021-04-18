import React, {ChangeEvent, Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import {ListItem, ListItemSecondaryAction, ListItemText} from '@material-ui/core';
import List from '@material-ui/core/List';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {MenuItem} from '@material-ui/core';
import {FormControl} from '@material-ui/core';
import Select from '@material-ui/core/Select';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actions as todoActions} from '../reducers/todo';
import uniqueId from 'lodash/uniqueId';

interface MyProps {
    todoActions: any;
    todo: any;
}

interface MyState {
    history: any;
}

class Home extends Component<MyProps & MyState> {
    state = {
        form: {
            title: ''
        },
        filter: 'all'
    }
    // handle change filter
    handleChangeFilter = (event: ChangeEvent<HTMLSelectElement & any>) => {
        this.setState({filter: event.target.value});
    }
    // handle change form data
    handleChange = (name: any) => (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            form: {
                ...this.state.form,
                [name]: event.target.value
            }
        })
    }

    //handle submit new todo

    handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        const {form} = this.state;
        if (form.title) {
            const {todoActions} = this.props;
            const item = {
                id: uniqueId(),
                title: form.title,
                completed: false
            };
            todoActions.create(item);
            this.setState({form: {title: ''}});
        }
    }

    // handle completed checkbox
    handleToggleCompleted = (value: any) => (event: any) => {

        const {todoActions} = this.props;
        const item = {
            ...value,
            completed: !value.completed
        }
        todoActions.update(item);
    }

    // handle edit todo
    handleEdit = (value: any) => (event: any) => {
        const {history} = this.props;
        history.push(`/edit/${value.id}`);
    }

    // handle delete todo
    handleDelete = (value: any) => (event: any) => {
        const {todoActions} = this.props;
        todoActions.delete(value);
    }

    // filter todo items base on filter state
    filterTodoItems = (item: any) => {
        const {filter} = this.state;
        if (filter === 'completed') {
            return item.completed;
        } else if (filter === 'active') {
            return !item.completed;
        } else {
            return true;
        }
    }

    //render component
    render() {
        const {todo} = this.props;
        const {form, filter} = this.state;

        return (
            <Grid item xs={12} sm={6}>
                <Typography align="center">Todos</Typography>
                <Paper style={{paddingLeft: 16, paddingRight: 16}}>
                    <form onSubmit={this.handleSubmit}>
                        <TextField
                            id="todo"
                            label="What needs to be done?"
                            onChange={this.handleChange('title')}
                            fullWidth
                            margin="normal"
                            value={form.title}
                            autoComplete="off"
                        />
                    </form>

                    {todo.items.length > 0 &&
                    <FormControl fullWidth>
                        <Select
                            value={filter}
                            onChange={this.handleChangeFilter}
                            name="filter"
                            fullWidth
                        >
                            <MenuItem value='all'>All</MenuItem>
                            <MenuItem value='completed'>Completed</MenuItem>
                            <MenuItem value='active'>Active</MenuItem>
                        </Select>

                    </FormControl>
                    }

                    <List>
                        {todo.items.filter(this.filterTodoItems).map((value: any) => (
                            <ListItem
                                key={value.id}
                                dense
                                button
                                onClick={this.handleToggleCompleted(value)}
                            >
                                <Checkbox
                                    checked={value.completed}
                                    tabIndex={-1}
                                    disableRipple
                                />
                                <ListItemText primary={value.title}/>
                                <ListItemSecondaryAction>
                                    <IconButton aria-label="Edit" onClick={this.handleEdit(value)}>
                                        <EditIcon/>
                                    </IconButton>
                                    <IconButton aria-label="Delete" onClick={this.handleDelete(value)}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            </Grid>
        );
    }
}

const mapStateToProps = ({todo}: any) => ({todo});
const mapDispatchToProps = (dispatch: any) => ({todoActions: bindActionCreators(todoActions, dispatch)});

export default connect(mapStateToProps, mapDispatchToProps)(Home);