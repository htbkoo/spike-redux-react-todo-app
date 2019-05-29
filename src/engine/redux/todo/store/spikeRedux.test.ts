import {createStore} from "redux";

describe("redux spike", function () {
    // PROD

    type ItemId = string;

    interface Item {
        message: string
    }

    interface State {
        items: ItemId[],
        itemById: {
            [id: string]: Item
        }
    }

    enum ActionType {
        ADD_ITEM, CLEAR_ITEMS
    }

    interface AddItemAction {
        type: ActionType.ADD_ITEM,
        id: ItemId,
        item: Item
    }

    interface ClearItemsAction {
        type: ActionType.CLEAR_ITEMS
    }

    type Action =
        | AddItemAction
        | ClearItemsAction;

    // TODO: migrate to uuid/v4
    let generateId = () => Math.random().toString();

    function addItem(message: string): AddItemAction {
        return {
            type: ActionType.ADD_ITEM,
            id: generateId(),
            item: {message}
        }
    }

    function clearItems(): ClearItemsAction {
        return {
            type: ActionType.CLEAR_ITEMS
        };
    }

    const EMPTY_STATE: State = {items: [], itemById: {}};

    const reducer = function (state: State = EMPTY_STATE, action: Action): State {
        switch (action.type) {
            case ActionType.ADD_ITEM: {
                return {
                    items: [...state.items, action.id],
                    itemById: {...state.itemById, [action.id]: action.item}
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

    it("should create store", () => {
        // given
        const initState: State = {items: [], itemById: {}};

        // when
        const store = createStore(reducer, initState);

        // then
        expect(store.getState()).toEqual(initState);
    });

    it("should add item", () => {
        // given
        generateId = () => "someId";
        const initState: State = {items: [], itemById: {}};

        // when
        const store = createStore(reducer, initState);

        // then
        store.dispatch(addItem("text"));
        expect(store.getState()).toEqual({
            items: [
                "someId"
            ],
            itemById: {
                "someId": {message: "text"}
            }
        });
    });

    it("should remove all items upon Action.CLEAR_ITEMS", () => {
        // given
        const initState: State = {
            items: [],
            itemById: {
                "1": {message: "some item"},
                "2": {message: "another item"},
            }
        };

        // when
        const store = createStore(reducer, initState);
        expect(store.getState()).toEqual(initState);

        // then
        store.dispatch(clearItems());
        expect(store.getState()).toEqual({items: [], itemById: {}});
    });
});