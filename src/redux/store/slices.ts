import { createSlice, type PayloadAction} from '@reduxjs/toolkit'
import search from './searchslice'

interface User {
    name: string;
    email: string;
    picture: string;
    [key : string]: any;
}

interface AuthState {
    user: User | null;
}
    const savedUser = localStorage.getItem('user');

const initialState: AuthState = {
    // user: null,
    user: savedUser ? JSON.parse(savedUser) : null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User>){
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        logout(state){
            state.user = null;
            localStorage.removeItem('user');    
            localStorage.removeItem('favorites')
        },
    },
});
interface FavoritesState {
  items: number[];
}

const getEmail = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user).email : null;
};

const getSavedFavorites = () => {
  const email = getEmail();
  if (!email) return [];
  const data = localStorage.getItem(`favorites_${email}`);
  return data ? JSON.parse(data) : [];
};

const initialFavoritesState: FavoritesState = {
  items: getSavedFavorites(),
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: initialFavoritesState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<number>) {
      const id = action.payload;
      const email = getEmail();
      if (!email) return;

      if (state.items.includes(id)) {
        state.items = state.items.filter((item) => item !== id);
      } else {
        state.items.push(id);
      }
      localStorage.setItem(`favorites_${email}`, JSON.stringify(state.items));
    },
    setFavorites(state, action: PayloadAction<number[]>) {
      const email = getEmail();
      if (!email) return;

      state.items = action.payload;
      localStorage.setItem(`favorites_${email}`, JSON.stringify(state.items));
    },
    clearFavorites(state) {
      const email = getEmail();
      if (!email) return;

      state.items = [];
      localStorage.removeItem(`favorites_${email}`);
    },
  },
});

export const {
  toggleFavorite,
  setFavorites,
  clearFavorites,
} = favoritesSlice.actions;

export const {setUser, logout} = authSlice.actions;
export default {
  auth: authSlice.reducer,
  favorites: favoritesSlice.reducer,
  search,
};