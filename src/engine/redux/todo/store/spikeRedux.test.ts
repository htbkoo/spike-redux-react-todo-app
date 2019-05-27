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
        ADD_ITEM, CLEAR_ITEM
    }

    interface AddItemAction {
        type: ActionType.ADD_ITEM,
        item: Item
    }

    interface ClearItemsAction {
        type: ActionType.CLEAR_ITEM
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

    const reducer = function (state, action: Action): State {
        switch (action.type) {
            case ActionType.ADD_ITEM: {
                return {items: [...state.items, action.item]}
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
        expect(store.getState()).toEqual(initState);

        // then
        store.dispatch(addItem("text"));
        expect(store.getState()).toEqual({
            items: [
                {message: "text"}
            ]
        });
    });
});