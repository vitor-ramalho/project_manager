import React, { useContext } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { IProject, ITask } from '@/services/ProjectService'
import { Button } from '../ui/button'
import { Edit2, EditIcon, FilePenLine } from 'lucide-react'
import { resolveTask } from '@/services/TaskService'
import { LoadingContext } from '@/context/Loading'

interface TaskListProps {
  tasks: ITask[] | undefined
  setProjects: React.Dispatch<React.SetStateAction<IProject[]>>
  modalOpen?: boolean
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  setTaskId: React.Dispatch<React.SetStateAction<number | null>>
}

const TaskList = ({ tasks, modalOpen, setModalOpen, setTaskId, setProjects}: TaskListProps) => {
  const {loading, setLoading} = useContext(LoadingContext);

  async function submitResolveTask(id: number){
    setLoading(true)
    const resolvedTask = await resolveTask(id);
    setProjects(prevProjects => {
      if (!prevProjects) return prevProjects;
      return prevProjects.map(project => {
        return {
          ...project,
          tasks: project.tasks && project.tasks.map(task => task.id === id ? resolvedTask : task)
        }
      });
    });
    setLoading(false);
  }

  return (
    <Table
      className='w-full min-w-full'
    >
      <TableHeader>
        <TableRow >
          <TableCell className='font-bold'>Titulo</TableCell>
          <TableCell className='font-bold'>Descrição</TableCell>
          <TableCell className='font-bold'>Previsão de conclusão</TableCell>
          <TableCell className='font-bold'>Finalizada</TableCell>
          <TableCell className='font-bold'>Opções</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          tasks && tasks?.map((task) => (
            <TableRow key={task.id}>
              <TableCell className='px-3 py-1'>{task.title}</TableCell>
              <TableCell className='px-3 py-1'>{task.description}</TableCell>
              <TableCell className='px-3 py-1'>{ task.completionDate && task?.completionDate.toString()}</TableCell>
              <TableCell className='px-3 py-1'>{task.isCompleted ? 'Sim' : 'Não'}</TableCell>
              <TableCell className='px-3 py-1 flex flex-row gap-2'>
                <Button
                  variant={'outline'}
                  size={'sm'}
                  onClick={() => {
                    if(task.id){
                    setTaskId(task.id)
                    }
                    setModalOpen(!modalOpen)
                  }}
                >
                  Editar
                </Button>
                <Button
                  variant={'default'}
                  size={'sm'}
                  onClick={() => task.id && submitResolveTask(task.id)}
                  disabled={loading}
                >
                  Finalizar
                </Button>
              </TableCell>
            </TableRow>
          ))
        }
      </TableBody>
    </Table>
  )
}

export default TaskList