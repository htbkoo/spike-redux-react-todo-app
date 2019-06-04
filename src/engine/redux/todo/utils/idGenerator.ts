import {v1} from "uuid";
import {ItemId} from "../models/common";

function newItemId(): ItemId {
    return v1();
}

export {newItemId};