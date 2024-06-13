
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Button } from '../ui/button';
import { IProject, deleteProject } from '@/services/ProjectService';
import { ChevronsUpDown } from 'lucide-react';
import { CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { Dispatch, SetStateAction, useContext, useState } from 'react';
import TaskList from '../TaskList/TaskList';
import { LoadingContext } from '@/context/Loading';

interface ListProps {
  projects: IProject[]
  setProjects: React.Dispatch<React.SetStateAction<IProject[]>>
  setCollapsibleOpen: React.Dispatch<React.SetStateAction<boolean>>
  collapsibleOpen?: boolean
  modalOpen?: boolean
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  project: IProject | null
  setProject: Dispatch<SetStateAction<IProject | null>>
  setTaskId: Dispatch<React.SetStateAction<number | null>>
}


const List = ({ projects, setCollapsibleOpen, collapsibleOpen, modalOpen, setModalOpen, setProject, setTaskId, setProjects }: ListProps) => {
  const [openProjectId, setOpenProjectId] = useState<number>(0);
  const { loading, setLoading } = useContext(LoadingContext);

  async function removeProject(id: number) {
    setLoading(true);
    await deleteProject(id);
    setProjects((currentProjects) => currentProjects.filter((project) => project.id !== id));
    setLoading(false);
  }
  return (
    <Table
    >
      <TableCaption>Lista de projetos</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Nome</TableHead>
          <TableHead>Descrição</TableHead>
          <TableHead>Data de início</TableHead>
          <TableHead>Opções</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {projects.map((project) => (
          <>
            <TableRow key={project.id}>
              <TableCell className="font-medium flex flex-row">
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-9 p-0"
                    onClick={() => {
                      if (project.id) {
                        setOpenProjectId(project.id)
                      }
                      setCollapsibleOpen(!collapsibleOpen)
                    }}
                  >
                    <ChevronsUpDown className="h-4 w-4" />
                    <span className="sr-only">Toggle</span>
                  </Button>
                </CollapsibleTrigger>
                {project.name}
              </TableCell>
              <TableCell>{project.description}</TableCell>
              <TableCell>{project.startDate.toString()}</TableCell>
              <TableCell className='flex text-center gap-3'>
                <Button
                  size={'sm'}
                  variant={'outline'}
                  onClick={() => {
                    setProject(project)
                    setModalOpen(true)
                  }}
                >
                  Editar
                </Button>
                <Button
                  size={'sm'}
                  variant={'destructive'}
                  onClick={() => project.id && removeProject(project.id)}
                >
                  Excluir
                </Button>
                <Button
                  size={'sm'}
                  variant={'outline'}
                  onClick={() => {
                    setProject(project);
                    setTaskId(0);
                    setModalOpen(true);
                  }}
                >
                  Adicionar Tarefa
                </Button>
              </TableCell>
            </TableRow>
            {openProjectId === project.id && (
              <CollapsibleContent >
                <TaskList
                  setProjects={setProjects}
                  tasks={project.tasks}
                  modalOpen={modalOpen}
                  setModalOpen={setModalOpen}
                  setTaskId={setTaskId}
                />
              </CollapsibleContent>
            )}
          </>
        ))}
      </TableBody>
    </Table>
  )
}

export default List