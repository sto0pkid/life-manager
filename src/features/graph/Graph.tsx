import React from "react";
import { useGetEdgesQuery } from './api'
import { Link, useParams } from "react-router";

type Triple = [string, string, string]

const TriplesTable : React.FC<{
    triples: Triple[]
}> = ({
    triples
}) => {
    return (
        <table className="table">
            <tbody>
                <>
                {
                    triples.map(([s,p,o] : Triple, index) => (
                        <tr key={index}>
                            <td><Link to={`/graph/get/${s}`}>{s}</Link></td>
                            <td>{p}</td>
                            <td><Link to={`/graph/get/${o}`}>{o}</Link></td>
                        </tr>
                    ))
                }
                </>
            </tbody>
        </table>
    )
}

const DefaultView : React.FC<{
    triples: {
        in: Triple[],
        out: Triple[]
    }
}> = ({
    triples
}) => {
    return (
        <div>
            <h2>In</h2>
            <TriplesTable triples={triples.in}/>
            <h2>Out</h2>
            <TriplesTable triples={triples.out}/>
        </div>
    )
}

const views : {[key:string] : React.FC<{triples:{in:Triple[], out:Triple[]}}>}= {
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
    const Component : React.FC<{triples:{in:Triple[], out:Triple[]}}> = views[view]
    return (
        <div>
            {
                nodeData
                ? <Component triples={nodeData}/>
                : <span className="loading loading-spinner loading-md"></span>
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