import {Item, ItemId} from "../models/common";

export enum ActionType {
    ADD_ITEM, EDIT_ITEM, CLEAR_ITEMS
}

export interface AddItemAction {
    type: ActionType.ADD_ITEM,
    item: Item
}

export interface EditItemAction {
    type: ActionType.EDIT_ITEM,
    id: ItemId,
    item: Item
}

export interface ClearItemsAction {
    type: ActionType.CLEAR_ITEMS
}

export type Action =
    | AddItemAction
    | EditItemAction
    | ClearItemsAction
    ;
