import {createStore} from "redux";
import {State} from "../models/common";
import {reducer} from "../reducers/reducers";
import {addItem, clearItems, editItem, toggleItem} from "../actions/ActionCreators";

describe("Redux engine", function () {
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
            const initState: State = emptyInitState();

            // when
            const store = createStore(reducer, initState);
            store.dispatch(addItem("text"));

            // then
            expect(store.getState()).toEqual({
                items: ["0"],
                itemById: {"0": {message: "text"}},
                itemIdSeq: 1
            });
        });
    });

    describe("edit item", () => {
        it("should be able to edit item", () => {
            // given
            const initState: State = {
                items: ["someId"],
                itemById: {"someId": {message: "text"}},
                itemIdSeq: 1
            };

            // when
            const store = createStore(reducer, initState);
            store.dispatch(editItem("someId", "new text"));

            // then
            expect(store.getState()).toEqual({
                items: ["someId"],
                itemById: {"someId": {message: "new text"}},
                itemIdSeq: 1
            });


        });
    });

    describe("toggle item", () => {
        it("should be able to toggle item to completed", () => {
            // given
            const initState: State = {
                items: ["someId"],
                itemById: {"someId": {message: "text"}},
                itemIdSeq: 1
            };

            // when
            const store = createStore(reducer, initState);
            store.dispatch(toggleItem("someId"));

            // then
            expect(store.getState()).toEqual({
                items: ["someId"],
                itemById: {"someId": {message: "text", completed: true}},
                itemIdSeq: 1
            });
        });

        it("should be able to toggle item from completed back to incompleted", () => {
            // given
            const initState: State = {
                items: ["someId"],
                itemById: {"someId": {message: "text", completed: true}},
                itemIdSeq: 1
            };

            // when
            const store = createStore(reducer, initState);
            store.dispatch(toggleItem("someId"));

            // then
            expect(store.getState()).toEqual({
                items: ["someId"],
                itemById: {"someId": {message: "text", completed: false}},
                itemIdSeq: 1
            });
        });
    });

    describe("remove all", () => {
        it("should remove all items upon Action.CLEAR_ITEMS", () => {
            // given
            const initState: State = {
                items: [],
                itemById: {
                    "1": {message: "some item"},
                    "2": {message: "another item"},
                },
                itemIdSeq: 3
            };

            // when
            const store = createStore(reducer, initState);
            expect(store.getState()).toEqual(initState);

            // then
            store.dispatch(clearItems());
            expect(store.getState()).toEqual({items: [], itemById: {}, itemIdSeq: 0});
        });
    });

    function emptyInitState(): State {
        return {items: [], itemById: {}, itemIdSeq: 0};
    }
});