/**********************************************************************************************************************
 ***********  This component is the main part of this website
 *********************************************************************************************************************/

import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import routes from '../routes';

import Spinner from './Spinner/Spinner';

const AppContent = () => {
    return (
        <div>
            <Suspense fallback={<Spinner />}>
                <Routes>
                    {
                        routes.map((route => (
                            route.element && <Route
                                key={route.id}
                                path={route.path}
                                id={route.id}
                                element={<route.element />} />
                        )))
                    }
                </Routes>
            </Suspense>
        </div>
    )
}

export default React.memo(AppContent);