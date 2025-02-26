import React, {useState, useEffect} from 'react';
import { Routes, Route} from 'react-router'

import { routes, routeOrder } from './routes'
import Layout from './Layout'
import {GraphRouteView} from './features/graph/Graph';
import GraphList from './features/graph/GraphList';
import keycloak from './auth/keycloak';
import { useNavigate } from 'react-router-dom';

const NotFound : React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-4xl font-bold mb-4">404 Not Found</h1>
            <p className="text-lg">The page you are looking for does not exist.</p>
        </div>
    );
}

let keycloakInitializing = false

const LoginComponent : React.FC = () => {
    keycloak.login({
        redirectUri: 'http://localhost:5173/loginRedirect',
        prompt: 'login'
    })
    return (
        <div>
        </div>
    );
}

const LoginRedirectComponent : React.FC = () => {
    const navigate = useNavigate()
    useEffect(() => {
        if (!keycloak.authenticated) {
            keycloak.init({
                onLoad: 'check-sso',
                pkceMethod: 'S256',
                checkLoginIframe: false,
            }).then((authenticated) => {
                if (authenticated) {
                    if(keycloak.token){
                        localStorage.setItem('token', keycloak.token);
                    }
                    navigate('/'); // Redirect to home or dashboard after login
                }
            });
        } else {
            if(keycloak.token){
                localStorage.setItem('token', keycloak.token);
            }
            navigate('/'); // Redirect to home or dashboard after login
        }
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-4xl font-bold mb-4">Login Redirect</h1>
            <p className="text-lg">Redirecting...</p>
        </div>
    )
}

const App: React.FC = () => {
    const [keycloakInitialized, setKeycloakInitialized] = useState(false)
    const [_isAuthenticated, setIsAuthenticated] = useState(false)
    const [_token, setToken] = useState<string | null>(null);

    useEffect(() => {
        if(!keycloakInitializing){
            keycloakInitializing = true
            keycloak.init({
                //onLoad: 'login-required',
                pkceMethod: 'S256',
                checkLoginIframe: false,
                redirectUri: 'http://localhost:5173/'
            }).then((authenticated) => {
                console.log('keycloak initialized', {authenticated})
                setKeycloakInitialized(true)
            })
        }
    }, []);

    useEffect(() => {
        if (keycloak.authenticated) {
            const interval = setInterval(async () => {
                try {
                    await keycloak.updateToken(60); // Refresh token if needed
                } catch (error) {
                    console.error('Token refresh failed, logging out...');
                    keycloak.logout();
                }
            }, 30000); // Check every 30 seconds
        
            return () => clearInterval(interval);
        }
    }, [keycloak.authenticated]);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
          setToken(storedToken);
          setIsAuthenticated(true);
        }
      }, []);

    if (!keycloakInitialized) {
        return <div>Loading...</div>
    }
  
    return (
        <Layout>
            <div className="w-full h-full">
                <Routes>
                    <>
                        {
                            routeOrder.map(path => {
                                const Component = routes[path].component
                                return <Route key={path} path={path} element={<Component />}/>
                            })
                        }
                        <Route key={'login'} path={'/login'} element={<LoginComponent/>}/>
                        <Route key={'loginRedirect'} path={'/loginRedirect'} element={<LoginRedirectComponent/>}/>
                        <Route key={'graph'} path={'/graph/get/:node'} element={<GraphRouteView/>}/>
                        <Route key={'graph_all'} path={'/graph/all'} element={<GraphList/>}/>
                        <Route path="*" element={<NotFound />} /> {/* Catch-all route */}
                    </>
                </Routes>
            </div>
        </Layout>
    );
};

export default App;