import {ActionType, AddItemAction, ClearItemsAction, EditItemAction, ToggleItemAction} from "./Action";
import {ItemId} from "../models/common";

export function addItem(message: string): AddItemAction {
    return {
        type: ActionType.ADD_ITEM,
        item: {message}
    }
}

export function editItem(itemId: ItemId, message: string): EditItemAction {
    return {
        type: ActionType.EDIT_ITEM,
        id: itemId,
        item: {message}
    }
}

export function toggleItem(itemId: ItemId): ToggleItemAction {
    return {
        type: ActionType.TOGGLE_ITEM,
        id: itemId,
    }
}

export function clearItems(): ClearItemsAction {
    return {
        type: ActionType.CLEAR_ITEMS
    };
}