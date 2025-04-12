'use client';

import { useEffect, useState } from 'react'
import Modal from '../Modal/Modal'

export default function ModalClient() {
    const [showModal, setShowModal] = useState(false);
    
      useEffect(() => {
        setShowModal(true);
      }, []);
    
  return (
    <div>
           <Modal isOpen={showModal} onClose={() => setShowModal(false)} />

    </div>
  )
}