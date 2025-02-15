import { Triple } from '../../lib/types'

export type ViewType = {
    node: string,
    triples: {
        in: Triple[],
        out: Triple[]
    },
    onSubmitAddTriple: (triple : Triple) => void,
    onRemoveTriple: (triple : Triple) => void
}