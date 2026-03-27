
export const initialStore = {
  favorites: [],    
};

export function reducer(state, action) {
  switch (action.type) {
    case "ADD_FAVORITE": {
      const exists = state.favorites.some(f => f.id === action.payload.id);
      if (exists) return state;

      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    }

    case "REMOVE_FAVORITE": {
      return {
        ...state,
        favorites: state.favorites.filter(f => f.id !== action.payload),
      };
    }

    default:
      return state;
  }
}