import {List, Map} from "immutable";

export type ItemId = string;

export interface Item {
    message: Readonly<string>
}

export interface State {
    items: List<ItemId>,
    itemById: Map<ItemId, Item>,
    itemIdSeq: Readonly<number>
}