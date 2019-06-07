import React from 'react';
import {connect} from 'react-redux';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import {Checkbox, TextField, Typography} from "@material-ui/core";

import {Item, ItemId, State} from "./engine/redux/todo/models/common";
import {addItem, clearItems, editItem, toggleItem} from "./engine/redux/todo/actions/ActionCreators";

import './App.css';

const mapStateToProps = ({items, itemById,}: State /*, ownProps*/) => ({items, itemById});

const mapDispatchToProps = {addItem, clearItems, editItem, toggleItem};

interface AppProps {
    items: State["items"],
    itemById: State["itemById"],
}

type DispatchProps = typeof mapDispatchToProps;

const App: React.FC<AppProps & DispatchProps> = props => {
    return (
        <div className="App" style={{margin: "2.5%", marginBottom: "5%", }}>
            <div>
                <Typography variant="h3" gutterBottom>
                    Simple react-redux todo list
                </Typography>
            </div>
            <div>
                <Fab color="primary" aria-label="Add" onClick={() => props.addItem("")} style={{margin: "1%"}}>
                    <AddIcon/>
                </Fab>
                <Fab aria-label="Delete" onClick={props.clearItems} style={{margin: "1%"}}>
                    <DeleteIcon/>
                </Fab>
            </div>
            <div style={{display: "flex", flexDirection: "column", marginLeft: "20%", marginRight: "20%",}}>
                {props.items.map(id => (
                        <TodoItemComponent
                            id={id}
                            item={props.itemById[id]}
                            editItem={props.editItem}
                            toggleItem={props.toggleItem}
                        />
                    )
                )}
            </div>
        </div>
    );
};

interface TodoItemComponentProps {
    id: ItemId,
    item: Item,
    editItem: DispatchProps["editItem"],
    toggleItem: DispatchProps["toggleItem"],
}

function TodoItemComponent({id, editItem, toggleItem, item}: TodoItemComponentProps) {
    return (
        <div style={{display: "flex", alignItems: "center",}}>
            <Checkbox
                checked={item.completed}
                value=""
                color="primary"
                inputProps={{'aria-label': 'isCompleted',}}
                onClick={() => toggleItem(id)}
            />
            <TextField
                id="outlined-with-placeholder"
                label={`Todo-${id}`}
                placeholder="Content"
                margin="normal"
                variant="outlined"
                key={id}
                onChange={event => editItem(id, event.target.value)}
                value={item.message}
                style={{flex: 1}}
            />
        </div>
    );
}

export {App};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
