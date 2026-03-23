const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      people: [],
      favorites: []
    },
    actions: {
      getPeople: async () => {
        try {
          const resp = await fetch("https://www.swapi.tech/api/people");
          const data = await resp.json();
          setStore({ people: data.results });
        } catch (error) {
          console.log(error);
        }
      },

      addFavorite: (item) => {
        const store = getStore();
        if (!store.favorites.includes(item)) {
          setStore({ favorites: [...store.favorites, item] });
        }
      },

      removeFavorite: (item) => {
        const store = getStore();
        setStore({
          favorites: store.favorites.filter(fav => fav !== item)
        });
      }
    }
  };
};

export default getState;