import { configureStore, PreloadedState } from '@reduxjs/toolkit'
import { render, RenderOptions } from '@testing-library/react'
import { PropsWithChildren } from 'react'
import { Provider } from 'react-redux'

import { AppStore, RootState } from '../store'
import articleReducer from '../store/slices/article'
import politicianReducer from '../store/slices/politician'

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>
  store?: AppStore
};

export const rootInitialState: RootState = {
  article: {
    articles: [],
    selectedArticle: null
  },

  politician: {
    politicians: [],
    selectedPolitician: null
  },

}

export const getMockStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: {
      article: articleReducer,
      politician: politicianReducer,
    },
    preloadedState
  })
}

export function renderWithProviders (
  ui: React.ReactElement,
  {
    preloadedState,
    store = getMockStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper ({ children }: PropsWithChildren): JSX.Element {
    return <Provider store={store}>{children}</Provider>
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}