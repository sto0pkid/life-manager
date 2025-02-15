import React from 'react';
import { Routes, Route} from 'react-router'

import { routes, routeOrder } from './routes'
import Layout from './Layout'
import {GraphRouteView} from './features/graph/Graph';
import GraphList from './features/graph/GraphList';


const App: React.FC = () => {
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
                        <Route key={'graph'} path={'/graph/get/:node'} element={<GraphRouteView/>}/>
                        <Route key={'graph_all'} path={'/graph/all'} element={<GraphList/>}/> 
                    </>
                </Routes>
            </div>
        </Layout>
    );
};

export default App;