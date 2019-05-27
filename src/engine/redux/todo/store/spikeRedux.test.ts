import {createStore} from "redux";

describe("redux spike", function () {
    it("should create store", () => {
        // given
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

        const initState: State = {
            items: []
        };

        const reducer = function (state = initState, action: Action): State {
            return state;
        };

        // when
        const store = createStore(reducer,);
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