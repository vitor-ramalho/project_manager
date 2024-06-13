import { zodResolver } from '@hookform/resolvers/zod'
import React, { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { DatePicker } from '../DatePicker/DatePicker'
import { LoadingContext } from '@/context/Loading'
import { IProject, createProject, editProject } from '@/services/ProjectService'
import { useToast } from '../ui/use-toast'

interface ProjectFormProps {
  onOpenChange: (open: boolean) => void
  setProjects: React.Dispatch<React.SetStateAction<IProject[]>>
  project: IProject | null
  setProject: React.Dispatch<React.SetStateAction<IProject | null >>
}

const ProjectForm = ({onOpenChange, setProjects, project, setProject}: ProjectFormProps) => {
  const {loading, setLoading} = useContext(LoadingContext);

  const { toast } = useToast()

  const formSchema = z.object({
    name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
    description: z.string().min(2, {
      message: "Description must be at least 2 characters.",
    }),
    startDate: z.date(),
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      startDate: new Date(),
    },
  })

  async function submitCreateProject(values: z.infer<typeof formSchema>) {
    const validationResult = formSchema.safeParse(values);
  
    if (!validationResult.success) {
      toast({
        title: "Não foi possível criar projeto",
        variant: "destructive"
      })
    }
    
    if(!validationResult.success) return;
    const { startDate, description, name } = validationResult.data;
    setLoading(true);
    const project = await createProject({ startDate, description, name });
    setProjects((currentProjects) => [...currentProjects, project]);
    setLoading(false);
    toast({
      title: "Projeto criado com sucesso",
      variant: "default"
    })
    setTimeout(() => {
    onOpenChange(false);
    }, 2000);
  }

  async function submitEditProject(values: z.infer<typeof formSchema>) {
    const validationResult = formSchema.safeParse(values);
  
    if (!validationResult.success) {
      toast({
        title: "Não foi possível criar projeto",
        variant: "destructive"
      })
      return;
    }
    
    const { startDate, description, name } = validationResult.data;
    setLoading(true);
    const project = await editProject({ startDate, description, name });
    setProjects((currentProjects) => [...currentProjects, project]);
    setLoading(false);
    toast({
      title: "Projeto criado com sucesso",
      variant: "default"
    })
    onOpenChange(false);
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if(project) {
      submitEditProject(values)
    } else {
      submitCreateProject(values)
    }
  }

  useEffect(() => {
    if(project) {
      form.setValue('name', project.name)
      form.setValue('description', project.description)
      form.setValue('startDate', project.startDate)
    }
  }, [project])
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
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
        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel>Data de início</FormLabel>
              <FormControl>
                <DatePicker date={field.value} setDate={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button  loading={loading}  type="submit">{project ? 'Editar Projeto' : 'Criar projeto'}</Button>
      </form>
    </Form>
  )
}

export default ProjectForm