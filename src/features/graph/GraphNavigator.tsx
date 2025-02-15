
import { ViewType } from './types'
import TriplesTable from './TriplesTable'
import TriplesTableAdd from './TriplesTableAdd'
import { Link } from 'react-router'

const GraphNavigator : React.FC<ViewType> = ({
    node,
    triples,
    onSubmitAddTriple,
    onRemoveTriple
}) => {
    return (
        <div>
            <div>
                <Link to={'/graph/all'}>All Triples</Link>
            </div>
            <TriplesTableAdd
                subject={node}
                subjectDisabled={true}
                relation={''}
                object={''}
                onSubmit={onSubmitAddTriple}
            />
            <div>
                <h2>In</h2>
                <TriplesTable
                    triples={triples.in}
                    removeTriple={onRemoveTriple}
                />
            </div>
            <h2>Out</h2>
            <TriplesTable
                triples={triples.out}
                removeTriple={onRemoveTriple}
            />
        </div>
    )
}

export default GraphNavigator