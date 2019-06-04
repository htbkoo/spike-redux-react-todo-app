import {newItemId} from "./idGenerator";

const MOCK_ID = "someId";

jest.mock('uuid', () => ({
    v1: jest.fn(() => MOCK_ID)
}));

describe("idGenerator", function () {
    describe("newItemId", () => {
        it("should generate id for new item", () => {
            // given
            // when
            const generatedId = newItemId();

            // then
            expect(generatedId).toEqual(MOCK_ID);
        });
    });
});