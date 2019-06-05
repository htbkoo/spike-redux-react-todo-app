import {List, Map} from "immutable";
import {State} from "../models/common";
import {Action, ActionType} from "../actions/Action";

const EMPTY_STATE: State = {items: List(), itemById: Map(), itemIdSeq: 0};

export const reducer = function (state: State = EMPTY_STATE, action: Action): State {
    switch (action.type) {
        case ActionType.ADD_ITEM: {
            return {
                items: state.items.push(state.itemIdSeq.toString()),
                itemById: state.itemById.set(state.itemIdSeq.toString(), action.item),
                itemIdSeq: state.itemIdSeq + 1
            }
        }
        case ActionType.EDIT_ITEM: {
            return {
                items: state.items,
                itemById: state.itemById.set(action.id, action.item),
                itemIdSeq: state.itemIdSeq
            }
        }
        case ActionType.CLEAR_ITEMS: {
            return EMPTY_STATE;
        }
        default: {
            return state;
        }
    }
};
