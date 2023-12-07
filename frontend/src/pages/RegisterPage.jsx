import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext.jsx'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function RegisterPage () {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { signup, isAuthenticated, errors: registerErrors } = useAuth()
  const navegate = useNavigate()

  useEffect(() => {
    // Inicialmente: isAuthenticated está en false. Cuando se efectue el registro de un usuario, isAuthenticated pasará a true.
    // Si isAuthenticated === true, navega hacia la página de las tareas.
    if (isAuthenticated) navegate('/tasks')
  }, [isAuthenticated])

  return (
    <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
      <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
        {
          registerErrors.map((error, i) => (
            <div key={i} className='bg-red-500 p-2 text-white text-center my-2'>
              {error}
            </div>
          ))
        }
        <h1 className='text-2xl font-bold'>Register</h1>
        <form onSubmit={handleSubmit(async (values) => { signup(values) })}>
          <input type='text' placeholder='username' {...register('username', { required: true })} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' />
          {errors.username && <p className='text-red-500'>Username is required!</p>}

          <input type='email' placeholder='email' {...register('email', { required: true })} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' />
          {errors.email && <p className='text-red-500'>Email is required!</p>}

          <input type='password' placeholder='password' {...register('password', { required: true })} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' />
          {errors.password && <p className='text-red-500'>Password is required!</p>}

          <button className='bg-indigo-500 px-4 py-1 rounded-sm' type='submit'>Signup</button>
        </form>

        <p className='flex gap-x-2 justify-between my-4'>Already have an account?<Link className='text-sky-500' to='/login'>Signin</Link></p>
      </div>
    </div>
  )
}

export default RegisterPage
