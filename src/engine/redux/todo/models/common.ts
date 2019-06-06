export type ItemId = string;

export interface Item {
    message: Readonly<string>,
    completed?: boolean
}

export interface State {
    items: ReadonlyArray<ItemId>,
    itemById: Readonly<{
        [ItemId: string]: Item
    }>,
    itemIdSeq: Readonly<number>
}