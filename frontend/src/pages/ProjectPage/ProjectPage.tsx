import List from '@/components/List/List'
import Modal from '@/components/Modal/Modal'
import { Button } from '@/components/ui/button'
import { Collapsible } from '@/components/ui/collapsible'
import { IProject, getProjects } from '@/services/ProjectService'
import { useEffect, useState } from 'react'

const ProjectPage = () => {
  const [open, setOpen] = useState(false);
  const [collapsibleOpen, setCollapsibleOpen] = useState(false);
  const [projects, setProjects] = useState<IProject[]>([]);
  const [selectedProject, setSelectedProject] = useState<IProject | null>(null);
  const [taskId, setTaskId] = useState<number | null>(null);


  async function getAllProjects() {
    const projects = await getProjects();
    setProjects(projects)
  }

  useEffect(() => {
    getAllProjects()
  }, [])
  const toggleModal = () => {
    setOpen(!open)
    setTaskId(null)
  }
  return (
    <>
      <div className='flex flex-col w-full'>
        <header className='w-full h-auto '>
          <div className='flex flex-row justify-between p-3'>
            <h1>Projetos</h1>
            <Button onClick={() => {
              setSelectedProject(null)
              toggleModal()
            }}>Novo Projeto</Button>
          </div>
        </header>
        <Collapsible
          open={collapsibleOpen}
          onOpenChange={setCollapsibleOpen}
        >
          <List
            setProjects={setProjects}
            projects={projects}
            setCollapsibleOpen={setCollapsibleOpen}
            collapsibleOpen={collapsibleOpen}
            modalOpen={open}
            setModalOpen={setOpen}
            project={selectedProject}
            setProject={setSelectedProject}
            setTaskId={setTaskId}
          />

        </Collapsible>
      </div>
      <Modal
        taskId={taskId}
        open={open}
        onOpenChange={toggleModal}
        title={taskId ? 'Editar Tarefa' : 'Novo Projeto'}
        setProjects={setProjects}
        project={selectedProject}
        setProject={setSelectedProject}
      />
    </>
  )
}

export default ProjectPage