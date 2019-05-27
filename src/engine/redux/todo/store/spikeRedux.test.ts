import {createStore} from "redux";

describe("redux spike", function () {
    // PROD

    interface Item {
        message: string
    }

    interface State {
        items: Item[]
    }

    enum ActionType {
        ADD_ITEM, CLEAR_ITEMS
    }

    interface AddItemAction {
        type: ActionType.ADD_ITEM,
        item: Item
    }

    interface ClearItemsAction {
        type: ActionType.CLEAR_ITEMS
    }

    type Action =
        | AddItemAction
        | ClearItemsAction;

    function addItem(message: string): AddItemAction {
        return {
            type: ActionType.ADD_ITEM,
            item: {message}
        }
    }

    function clearItems(): ClearItemsAction {
        return {
            type: ActionType.CLEAR_ITEMS
        };
    }

    const EMPTY_STATE = {items: []};

    const reducer = function (state, action: Action): State {
        switch (action.type) {
            case ActionType.ADD_ITEM: {
                return {items: [...state.items, action.item]}
            }
            case ActionType.CLEAR_ITEMS: {
                return EMPTY_STATE;
            }
            default: {
                return state;
            }
        }
    };

    type ActionCreator = (any) => Action;

    //

    it("should create store", () => {
        // given
        const initState: State = {items: []};

        // when
        const store = createStore(reducer, initState);

        // then
        expect(store.getState()).toEqual(initState);
    });

    it("should add item", () => {
        // given
        const initState: State = {items: []};

        // when
        const store = createStore(reducer, initState);

        // then
        store.dispatch(addItem("text"));
        expect(store.getState()).toEqual({
            items: [
                {message: "text"}
            ]
        });
    });

    it("should remove all itmes upon Action.CLEAR_ITEMS", () => {
        // given
        const initState: State = {
            items: [
                {message: "some item"},
                {message: "another item"},
            ]
        };

        // when
        const store = createStore(reducer, initState);
        expect(store.getState()).toEqual(initState);

        // then
        store.dispatch(clearItems());
        expect(store.getState()).toEqual({items: []});
    });
});