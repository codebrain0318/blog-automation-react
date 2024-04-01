/**********************************************************************************************************************
 ***********  This component is the main layout contains appheader, appcontent, appfooter
 *********************************************************************************************************************/

import React from 'react';

import { AppContent, AppHeader } from '../components';
import { GlobalContext } from '../components/GlobalContext';
import { useNavigate } from 'react-router-dom';

const DefaultLayout = () => {
    const globalProps = React.useContext(GlobalContext);
    const navigate = useNavigate();

    React.useEffect(()=>{
        if ( !globalProps?.user?.password ) {
            navigate("/login");
        }
    }, [])

    return (
        <div className="wrapper d-flex flex-column min-vh-100">
            <AppHeader />
            <div className="body flex-grow-1 px-3">
                <AppContent />
            </div>
            {/* <AppFooter /> */}
        </div>
    )
}

export default DefaultLayout;