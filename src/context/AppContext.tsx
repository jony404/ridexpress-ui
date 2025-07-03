import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AppState, AuthState, User, Ride } from '../types';

interface AppContextType {
  state: AppState;
  login: (user: User, token: string) => void;
  logout: () => void;
  setCurrentRide: (ride: Ride | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

type AppAction =
  | { type: 'SET_AUTH'; payload: { user: User; token: string } }
  | { type: 'LOGOUT' }
  | { type: 'SET_CURRENT_RIDE'; payload: Ride | null }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_AUTH_LOADING'; payload: boolean };

const initialState: AppState = {
  auth: {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
  },
  currentRide: null,
  loading: false,
  error: null,
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_AUTH':
      return {
        ...state,
        auth: {
          user: action.payload.user,
          token: action.payload.token,
          isAuthenticated: true,
          loading: false,
        },
      };
    case 'LOGOUT':
      return {
        ...state,
        auth: {
          user: null,
          token: null,
          isAuthenticated: false,
          loading: false,
        },
        currentRide: null,
      };
    case 'SET_CURRENT_RIDE':
      return {
        ...state,
        currentRide: action.payload,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    case 'SET_AUTH_LOADING':
      return {
        ...state,
        auth: {
          ...state.auth,
          loading: action.payload,
        },
      };
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Check for stored authentication on app load
  useEffect(() => {
    const token = localStorage.getItem('ridexpress_token');
    const user = localStorage.getItem('ridexpress_user');
    
    if (token && user) {
      try {
        const parsedUser = JSON.parse(user);
        dispatch({ type: 'SET_AUTH', payload: { user: parsedUser, token } });
      } catch (error) {
        localStorage.removeItem('ridexpress_token');
        localStorage.removeItem('ridexpress_user');
      }
    }
  }, []);

  const login = (user: User, token: string) => {
    localStorage.setItem('ridexpress_token', token);
    localStorage.setItem('ridexpress_user', JSON.stringify(user));
    dispatch({ type: 'SET_AUTH', payload: { user, token } });
  };

  const logout = () => {
    localStorage.removeItem('ridexpress_token');
    localStorage.removeItem('ridexpress_user');
    dispatch({ type: 'LOGOUT' });
  };

  const setCurrentRide = (ride: Ride | null) => {
    dispatch({ type: 'SET_CURRENT_RIDE', payload: ride });
  };

  const setLoading = (loading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  };

  const setError = (error: string | null) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  };

  return (
    <AppContext.Provider
      value={{
        state,
        login,
        logout,
        setCurrentRide,
        setLoading,
        setError,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}