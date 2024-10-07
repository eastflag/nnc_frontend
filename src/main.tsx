import ReactDOM from 'react-dom/client'
import {BrowserRouter} from "react-router-dom";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {persistStore} from "redux-persist";
import App from './App.tsx'
import store from "./store";
import { theme } from './config/theme.ts';

import './index.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import {ConfirmProvider} from "material-ui-confirm"; // Optional Theme applied to the Data Grid

const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode> <= this cause api twice call
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <ConfirmProvider>
              <CssBaseline />
              <App />
            </ConfirmProvider>
          </ThemeProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  // </React.StrictMode>,
);
