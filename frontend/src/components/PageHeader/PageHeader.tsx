import React from 'react'
import { Button } from '../ui/button'
import { DialogTrigger } from '../ui/dialog'
import Modal from '../Modal/Modal'

const PageHeader = () => {
  return (
    <header className='w-full h-auto '>
      <div className='flex flex-row justify-between p-3'>
        <h1>Projetos</h1>
        <Button>Novo Projeto</Button>
      </div>
    </header>
  )
}

export default PageHeader