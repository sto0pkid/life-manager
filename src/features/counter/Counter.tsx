import React from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { decrement, increment } from './counterSlice'
import { RootState } from '../../store'; // Import your Redux store's root state type


const Counter : React.FC = () => {
  const count = useSelector((state : RootState) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  )
}

export default Counter