//action types
export const types = {
    CREATE: 'app/todo/CREATE',
    UPDATE: 'app/todo/UPDATE',
    DELETE: 'app/todo/DELETE'
}

//initial state
export const initialState = {
    items: []
}

//interface
interface ActionInterface {
    type: any;
    payload: {
        item: {
            id: number
        }
    }
}

interface ItemInterface {
    id: number;
}

//reducer
const reducer = (state = initialState, action: ActionInterface) => {
    switch (action.type) {
        case types.CREATE:
            return {
                ...state,
                items: [
                    action.payload.item,
                    ...state.items
                ]
            };
        case types.UPDATE:
            return {
                ...state,
                items: state.items.map((item: ItemInterface) => {
                    if (item.id === action.payload.item.id) {
                        return {
                            ...item,
                            ...action.payload.item
                        }

                    }
                    return item;
                })
            };
        case types.DELETE:
            const deleteIndex = state.items.findIndex((item: ItemInterface) => (item.id === action.payload.item.id));
            if (deleteIndex > -1) {
                const deletedItems = [
                    ...state.items.slice(0, deleteIndex),
                    ...state.items.slice(deleteIndex + 1)
                ];
                return {
                    ...state,
                    items: deletedItems
                };
            }
            return state;
        default:
            return state;
    }
}

//actions creators
export const actions = {
    create: (item: ItemInterface) => ({ type: types.CREATE, payload: { item } }),
    update: (item: ItemInterface) => ({ type: types.UPDATE, payload: { item } }),
    delete: (item: ItemInterface) => ({ type: types.DELETE, payload: { item } })
}

export default reducer;