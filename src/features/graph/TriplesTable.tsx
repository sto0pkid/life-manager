
import { Triple } from '../../lib/types'
import { Link } from 'react-router'

const TriplesTable : React.FC<{
    triples: Triple[],
    removeTriple: (triple: Triple) => void
}> = ({
    triples,
    removeTriple
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
                            <td>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => removeTriple([s,p,o])}
                                >
                                    Remove
                                </button>
                            </td>
                        </tr>
                    ))
                }
                </>
            </tbody>
        </table>
    )
}

export default TriplesTable