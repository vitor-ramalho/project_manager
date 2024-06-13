import { zodResolver } from '@hookform/resolvers/zod'
import React, { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { DatePicker } from '../DatePicker/DatePicker'
import { LoadingContext } from '@/context/Loading'
import { IProject, ITask, createProject } from '@/services/ProjectService'
import { useToast } from '../ui/use-toast'
import { createTask } from '@/services/TaskService'

interface TaskFormProps {
  task: ITask | null
  setTask?: React.Dispatch<React.SetStateAction<ITask | null >>
  projectId?: number,
  setProjects: React.Dispatch<React.SetStateAction<IProject[]>>
  onOpenChange: (open: boolean) => void
}


const TaskForm = ({ task, projectId, setProjects, onOpenChange}: TaskFormProps) => {
  const {loading, setLoading} = useContext(LoadingContext);

  const { toast } = useToast()

  const formSchema = z.object({
    title: z.string().min(2, {
      message: "Title must be at least 2 characters.",
    }),
    description: z.string().min(2, {
      message: "Description must be at least 2 characters.",
    }),
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const validationResult = formSchema.safeParse(values);
  
    if (!validationResult.success) {
      toast({
        title: "Não foi possível criar projeto",
        variant: "destructive"
      })
      return;
    }

    const { description, title } = validationResult.data;
    setLoading(true);
    const newTask = await createTask({ description, title, projectId });
    setProjects((currentProjects) => currentProjects.map(project => {
      if (project.id === projectId) {
        return { ...project, tasks: [...project.tasks, newTask] };
      }
      return project;
    }));
    setLoading(false);
    toast({
      title: "Tarefa criada com sucesso",
      variant: "default"
    })
    onOpenChange(false);
  }

  useEffect(() => {
    if(task) {
      form.setValue('title', task.title)
      form.setValue('description', task.description)
    }
  }, [task])
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
              <FormItem>
                <FormLabel>Título</FormLabel>
                <FormControl>
                  <Input placeholder="Nome" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Input placeholder="Descrição" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button  loading={loading}  type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default TaskForm