import {createStore} from "redux";
import {List, Map} from "immutable";

describe("redux spike", function () {
    // PROD

    type ItemId = string;

    interface Item {
        message: Readonly<string>
    }

    interface State {
        items: List<ItemId>,
        itemById: Map<ItemId, Item>,
    }

    enum ActionType {
        ADD_ITEM, EDIT_ITEM, CLEAR_ITEMS
    }

    interface AddItemAction {
        type: ActionType.ADD_ITEM,
        id: ItemId,
        item: Item
    }

    interface EditItemAction {
        type: ActionType.EDIT_ITEM,
        id: ItemId,
        item: Item
    }

    interface ClearItemsAction {
        type: ActionType.CLEAR_ITEMS
    }

    type Action =
        | AddItemAction
        | EditItemAction
        | ClearItemsAction
        ;

    // TODO: migrate to uuid/v4
    let generateId = () => Math.random().toString();

    function addItem(message: string): AddItemAction {
        return {
            type: ActionType.ADD_ITEM,
            id: generateId(),
            item: {message}
        }
    }

    function editItem(itemId: ItemId, message: string): EditItemAction {
        return {
            type: ActionType.EDIT_ITEM,
            id: itemId,
            item: {message}
        }
    }

    function clearItems(): ClearItemsAction {
        return {
            type: ActionType.CLEAR_ITEMS
        };
    }

    const EMPTY_STATE: State = {items: List(), itemById: Map()};

    const reducer = function (state: State = EMPTY_STATE, action: Action): State {
        switch (action.type) {
            case ActionType.ADD_ITEM: {
                return {
                    items: state.items.push(action.id),
                    itemById: state.itemById.set(action.id, action.item)
                }
            }
            case ActionType.EDIT_ITEM: {
                return {
                    items: state.items,
                    itemById: state.itemById.set(action.id, action.item)
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

    //

    describe("create store", () => {
        it("should create store", () => {
            // given
            const initState: State = emptyInitState();

            // when
            const store = createStore(reducer, initState);

            // then
            expect(store.getState()).toEqual(initState);
        });
    });

    describe("add item", () => {
        it("should add item", () => {
            // given
            generateId = () => "someId";
            const initState: State = emptyInitState();

            // when
            const store = createStore(reducer, initState);
            store.dispatch(addItem("text"));

            // then
            expect(store.getState()).toEqual({
                items: List(["someId"]),
                itemById: Map({"someId": {message: "text"}})
            });
        });
    });

    describe("edit item", () => {
        it("should be able to edit item", () => {
            // given
            const initState: State = {items: List(["someId"]), itemById: Map({"someId": {message: "text"}})};

            // when
            const store = createStore(reducer, initState);
            store.dispatch(editItem("someId", "new text"));

            // then
            expect(store.getState()).toEqual({
                items: List(["someId"]),
                itemById: Map({"someId": {message: "new text"}})
            });


        });
    });

    describe("remove all", () => {
        it("should remove all items upon Action.CLEAR_ITEMS", () => {
            // given
            const initState: State = {
                items: List(),
                itemById: Map({
                    "1": {message: "some item"},
                    "2": {message: "another item"},
                })
            };

            // when
            const store = createStore(reducer, initState);
            expect(store.getState()).toEqual(initState);

            // then
            store.dispatch(clearItems());
            expect(store.getState()).toEqual({items: List(), itemById: Map()});
        });
    });

    function emptyInitState(): State {
        return {items: List(), itemById: Map()};
    }
});