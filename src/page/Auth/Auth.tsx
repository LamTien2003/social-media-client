import { useState } from 'react';

import Login from './components/Login';
import Register from './components/Register';

const Auth = () => {
    const [feature, setFeature] = useState<'login' | 'register'>('login');

    const handleChangeFeature = (feature: 'login' | 'register') => {
        setFeature(feature);
    };
    return (
        <div className="flex transition-all">
            {feature === 'login' && <Login onClickChangeFeatures={handleChangeFeature} />}
            {feature === 'register' && <Register onClickChangeFeatures={handleChangeFeature} />}
        </div>
    );
};

export default Auth;
