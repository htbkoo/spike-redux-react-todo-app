import produce from "immer";

import {State} from "../models/common";
import {Action, ActionType} from "../actions/Action";

const EMPTY_STATE: State = Object.freeze({items: [], itemById: {}, itemIdSeq: 0});

export const reducer = function (state: State = EMPTY_STATE, action: Action): State {
    switch (action.type) {
        case ActionType.ADD_ITEM: {
            return produce(state, draft => {
                const id = draft.itemIdSeq.toString();
                draft.items.push(id);
                draft.itemIdSeq = draft.itemIdSeq + 1;
                draft.itemById[id] = action.item;
            });
        }
        case ActionType.EDIT_ITEM: {
            return produce(state, draft => {
                draft.itemById[action.id] = action.item;
            });
        }
        case ActionType.TOGGLE_ITEM: {
            return produce(state, draft => {
                const id = action.id;
                draft.itemById[id].completed = !state.itemById[id].completed;
            });
        }
        case ActionType.CLEAR_ITEMS: {
            return EMPTY_STATE;
        }
        default: {
            return state;
        }
    }
};
