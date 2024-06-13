import React, { useEffect } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { Button } from '../ui/button'
import ProjectForm from '../ProjectForm/ProjectForm'
import { IProject, ITask } from '@/services/ProjectService'
import TaskForm from '../TaskForm/TaskForm'

interface ModalProps {
  taskId: number | null
  // setIsTaskModal: React.Dispatch<React.SetStateAction<boolean>>
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  setProjects: React.Dispatch<React.SetStateAction<IProject[]>>
  project: IProject | null
  setProject: React.Dispatch<React.SetStateAction<IProject | null>>
}

const Modal = ({ open, onOpenChange, title, setProjects, project, setProject, taskId }: ModalProps) => {
  const [task, setTask] = React.useState<ITask | null>(null);

  useEffect(() => {
    if (project?.tasks && taskId !== 0) {
      const filteredTask = project?.tasks.filter(task => task.id === taskId);
      if (filteredTask.length > 0) {
        setTask(filteredTask[0]);
      }
    }

    if(taskId === 0) {
      setTask({
        title: "",
        description: "",
        projectId: project?.id,
      })}
  }, [taskId])
  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div>

          {taskId || taskId === 0 ? (
            <TaskForm
            setProjects={setProjects}
            onOpenChange={onOpenChange}
              projectId={project?.id}
              task={task}
            />
          ) : (
            <ProjectForm
              onOpenChange={onOpenChange}
              setProjects={setProjects}
              project={project}
              setProject={setProject}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default Modal