import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

import 'nprogress/nprogress.css';
import App from 'src/App';
import { SidebarProvider } from 'src/contexts/SidebarContext';
import * as serviceWorker from 'src/serviceWorker';
import { LoadingProvider } from './contexts/LoadingContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { DictionaryProvider } from './contexts/DictionaryContext';
import { UserProvider } from './contexts/UserContext';
import { BlogProvider } from './contexts/BlogContext';

ReactDOM.render(
  <HelmetProvider>
    <LoadingProvider>
      <UserProvider>
        <SidebarProvider>
          <LanguageProvider>
            <DictionaryProvider>
              <BlogProvider>
                <BrowserRouter>
                  <App />
                </BrowserRouter>
              </BlogProvider>
            </DictionaryProvider>
          </LanguageProvider>
        </SidebarProvider>
      </UserProvider>
    </LoadingProvider>
  </HelmetProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
