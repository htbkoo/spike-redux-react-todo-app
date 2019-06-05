import {createStore} from "redux";
import {List, Map} from "immutable";
import {State} from "../models/common";
import {reducer} from "../reducers/reducers";
import {addItem, clearItems, editItem} from "../actions/ActionCreators";

describe("redux spike", function () {
    // PROD

    // TODO: migrate to uuid/v4
    let generateId = () => Math.random().toString();

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
                items: List(["0"]),
                itemById: Map({"0": {message: "text"}}),
                itemIdSeq: 1
            });
        });
    });

    describe("edit item", () => {
        it("should be able to edit item", () => {
            // given
            const initState: State = {
                items: List(["someId"]),
                itemById: Map({"someId": {message: "text"}}),
                itemIdSeq: 1
            };

            // when
            const store = createStore(reducer, initState);
            store.dispatch(editItem("someId", "new text"));

            // then
            expect(store.getState()).toEqual({
                items: List(["someId"]),
                itemById: Map({"someId": {message: "new text"}}),
                itemIdSeq: 1
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
                }),
                itemIdSeq: 3
            };

            // when
            const store = createStore(reducer, initState);
            expect(store.getState()).toEqual(initState);

            // then
            store.dispatch(clearItems());
            expect(store.getState()).toEqual({items: List(), itemById: Map(), itemIdSeq: 0});
        });
    });

    function emptyInitState(): State {
        return {items: List(), itemById: Map(), itemIdSeq: 0};
    }
});