import React from 'react';
import { Routes, Route} from 'react-router'

import { routes, routeOrder } from './routes'
import Layout from './Layout'


const App: React.FC = () => {
    return (
        <Layout>
            <div>
                <Routes>
                    <>
                        {
                            routeOrder.map(path => {
                                const Component = routes[path].component
                                return <Route path={path} element={<Component />}/>
                            })
                        }
                    </>
                </Routes>
            </div>
        </Layout>
    );
};

export default App;