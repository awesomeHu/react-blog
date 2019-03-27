const CATEGORY_ACTIONS = {
    ADD_CATEGORY: 'ADD_CATEGORY',
    FETCH_ALL_CATEGORY: 'FETCH_ALL_CATEGORY',
    DELETE_CATEGORY: 'DELETE_CATEGORY'
}

export const fetchAllCategories = () => ({
    type: CATEGORY_ACTIONS.FETCH_ALL_CATEGORY,
})

export const addCategory = (name) => ({
    type: CATEGORY_ACTIONS.ADD_CATEGORY,
    payload: name
})

export const removeCategory = (id) => ({
    type: CATEGORY_ACTIONS.DELETE_CATEGORY,
    payload: id
})