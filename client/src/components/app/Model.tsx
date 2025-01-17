// import { useState } from 'react'
// import { createPortal } from 'react-dom'

// export default function Model({ children }: { children: React.ReactNode }) {
//     const [showModal, setShowModal] = useState(false)

//     return (
//         <>
//             <button onClick={() => setShowModal(true)}>
//                 Show modal using a portal
//             </button>
//             {showModal && (
//                 <div className={`bg-foreground-primary bg-opacity-50 fixed w-screen top-0 left-0 h-screen overflow-hidden grid place-items-center z-[100] duration-700 ` + (showModal ? 'bg-opacity-50' : 'bg-opacity-0')}>
//                     {createPortal(
//                         <div
//                             onClick={() => setShowModal(false)}
//                             className={`fixed w-screen top-0 left-0 h-screen overflow-hidden grid place-items-center z-[120]
//                         transition-opacity duration-700 ease-in-out
//                         bg-black ${
//                             showModal ? 'bg-opacity-50' : 'bg-opacity-0'
//                         }`}>
//                             This is the portal
//                             {children}
//                             <button onClick={() => setShowModal(false)}>
//                                 Close
//                             </button>
//                         </div>,
//                         document.getElementById('model') as HTMLElement
//                     )}
//                 </div>
//             )}
//         </>
//     )
// }

import { useState } from 'react'
import { createPortal } from 'react-dom'

export default function Model({ children }: { children: React.ReactNode }) {
    const [showModal, setShowModal] = useState(!false)

    return (
        <>
            {/* <button onClick={() => setShowModal(true)}>
                Show modal using a portal
            </button> */}

            {createPortal(
                <div
                    onClick={() => setShowModal(!showModal)}
                    className={
                        `bg-black fixed w-screen top-0 left-0 h-screen overflow-hidden grid place-items-center z-[1000] duration-300 ` +
                        (showModal ? 'bg-opacity-50' : 'bg-opacity-0')
                    }
                    style={{ pointerEvents: showModal ? 'auto' : 'none' }}>
                        
                        <span className={` duration-300 *:duration-300  ` + (showModal ? 'scale-100 *:scale-100' : 'scale-90 *:scale-90')}>
                            {showModal && children}
                        </span>
                </div>,
                document.getElementById('model') as HTMLElement
            )}
        </>
    )
}
