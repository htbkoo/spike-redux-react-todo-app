import React from 'react';
import {connect} from 'react-redux';

import './App.css';

import {State} from "./engine/redux/todo/models/common";
import {addItem, clearItems, editItem} from "./engine/redux/todo/actions/ActionCreators";

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
                        <input
                            key={id}
                            onChange={event => props.editItem(id, event.target.value)}
                            value={props.itemById[id].message}
                        />
                    )
                )}
            </div>
            <div>
                <button onClick={() => props.addItem("")}>+</button>
            </div>
            <div>
                <button onClick={props.clearItems}>Clear All</button>
            </div>
        </div>
    );
};

export {App};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
