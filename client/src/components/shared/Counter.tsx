import { useSelector, useDispatch } from 'react-redux'
import {
    increment,
    decrement,
    incrementByAmount,
} from '../../store/counterSlice'
import { RootState } from '../../store/store'
import Button from './Button'

export default function Counter() {
    const count = useSelector((state: RootState) => state.counter.value)
    const dispatch = useDispatch()

    return (
        <div>
            <h1 className='text-2xl font-semibold'>Counter</h1>
            <p>Count: {count}</p>

            <div className='flex gap-x-0.5 py-2'>
                <Button
                    onClick={() => dispatch(increment())}
                    className='px-4 py-2 rounded bg-foreground-primary text-background-primary'>
                    <>Increment</>
                </Button>
                <Button
                    onClick={() => dispatch(decrement())}
                    className='px-4 py-2 rounded bg-foreground-primary text-background-primary'>
                    <>Decrement</>
                </Button>

                <Button
                    onClick={() => dispatch(incrementByAmount(5))}
                    className='px-4 py-2 rounded bg-accent text-background-primary'>
                    <>Increment by 5</>
                </Button>
            </div>
        </div>
    )
}
