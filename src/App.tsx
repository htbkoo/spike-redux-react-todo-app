import React from 'react';
import {connect} from 'react-redux';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

import {State} from "./engine/redux/todo/models/common";
import {addItem, clearItems, editItem} from "./engine/redux/todo/actions/ActionCreators";

import './App.css';
import {TextField} from "@material-ui/core";

const mapStateToProps = ({items, itemById,}: State /*, ownProps*/) => {
    return {
        items,
        itemById
    }
};

const mapDispatchToProps = {addItem, clearItems, editItem};

interface AppProps {
    items: State["items"],
    itemById: State["itemById"],
    addItem: typeof addItem,
    clearItems: typeof clearItems,
    editItem: typeof editItem,
}

const App: React.FC<AppProps> = props => {
    return (
        <div className="App">
            <div>
                Simple react-redux todo list
            </div>
            <div style={{display: "flex", flexDirection: "column", marginLeft: "20%", marginRight: "20%",}}>
                {props.items.map(id => (
                        <TextField
                            id="outlined-with-placeholder"
                            label={`Todo-${id}`}
                            placeholder="Content"
                            margin="normal"
                            variant="outlined"
                            key={id}
                            onChange={event => props.editItem(id, event.target.value)}
                            value={props.itemById[id].message}
                            style={{margin: "1%"}}
                        />
                    )
                )}
            </div>
            <div>
                <Fab color="primary" aria-label="Add" onClick={() => props.addItem("")} style={{margin: "1%"}}>
                    <AddIcon/>
                </Fab>
                <Fab aria-label="Delete" onClick={props.clearItems} style={{margin: "1%"}}>
                    <DeleteIcon/>
                </Fab>
            </div>
        </div>
    );
};

export {App};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
