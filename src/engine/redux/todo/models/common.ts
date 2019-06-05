export type ItemId = string;

export interface Item {
    message: Readonly<string>
}

export interface State {
    items: ReadonlyArray<ItemId>,
    itemById: Readonly<{
        [ItemId: string]: Item
    }>,
    itemIdSeq: Readonly<number>
}