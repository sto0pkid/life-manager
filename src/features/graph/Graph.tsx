import React from "react";
import {
    useGetEdgesQuery,
    useInsertTriplesMutation,
    useRemoveTriplesMutation
} from './api'
import { useParams } from "react-router";
import { Triple } from '../../lib/types'
import { ViewType } from './types'
import GraphNavigator from "./GraphNavigator";

const DefaultView = GraphNavigator



const views : {[key:string] : React.FC<ViewType>}= {
    default: DefaultView
}

const GraphView : React.FC<{
    node: string,
    view: string
}> = ({
    node,
    view = 'default'
}) => {
    const { data : nodeData } = useGetEdgesQuery(node)
    const [ insertTriples ] = useInsertTriplesMutation()
    const [ removeTriples ] = useRemoveTriplesMutation()

    const handleAddTriple = (t : Triple) => {
        insertTriples([t])
    }

    const handleRemoveTriple = (t : Triple) => {
        removeTriples([t])
    }

    const Component  = views[view]
    return (
        <div>
            {
                nodeData
                ? (
                    <Component
                        node={node}
                        triples={nodeData}
                        onSubmitAddTriple={handleAddTriple}
                        onRemoveTriple={handleRemoveTriple}
                    />
                ) : (
                    <span className="loading loading-spinner loading-md"></span>
                )
            }
        </div>       
    )
}

export const GraphRouteView : React.FC = () => {
    const {node} = useParams()
    return (
        node
        ? <GraphView node={node} view={'default'}/>
        : <p>Please specify node</p>
    )
}


export default GraphView