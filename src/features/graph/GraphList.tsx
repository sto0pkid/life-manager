import React from "react";
import { useGetAllEdgesQuery, useInsertTriplesMutation, useRemoveTriplesMutation } from './api'
import TriplesTableAdd from "./TriplesTableAdd";
import TriplesTable from './TriplesTable'
import { Triple } from '../../lib/types'
import Loading from "@/components/Loading";

const GraphList : React.FC = () => {
    const { data : graph } = useGetAllEdgesQuery()
    const [ insertTriples ] = useInsertTriplesMutation()
    const [ removeTriples ] = useRemoveTriplesMutation()

    const handleAddTriple = (t : Triple) => {
        insertTriples([t])
    }
    const handleRemoveTriple = (t : Triple) => {
        removeTriples([t])
    }
    return (
        <div>
            <h2>All edges</h2>
            <TriplesTableAdd
                subject={''}
                relation={''}
                object={''}
                onSubmit={handleAddTriple}
            />
            {
                graph
                ? (
                    <TriplesTable
                        triples={graph}
                        removeTriple={handleRemoveTriple}
                    />
                ) : (
                    <Loading/>
                )
            }
        </div>
    )
}

export default GraphList