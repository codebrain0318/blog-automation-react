import React, { Suspense } from 'react';
import './App.css';
import Spinner from './components/Spinner/Spinner';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { GlobalProvider } from './components/GlobalContext';

const DefaultLayout = React.lazy(() => import("./layout/DefaultLayout"));

function App() {
  return (
    <BrowserRouter>
      <GlobalProvider>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="*" id="Home" element={<DefaultLayout />} />
          </Routes>
        </Suspense>
      </GlobalProvider>
    </BrowserRouter>
  );
}

export default App;
