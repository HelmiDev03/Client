'use client'
import ButtonSubmit from '@/app/(components)/ButtonSubmit/Button'
import ButtonCancel from '@/app/(components)/ButtonCancel/Button'
import { Input4 } from '@/app/(components)/Inputs/TextInput'
import DateInput from '@/app/(components)/Inputs/DateInput'
import { SelectInput2, SelectInput22, SelectInput222 } from '@/app/(components)/Inputs/SelectInput'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styles from '../profile.module.css'
import axios from 'axios'

const Prof = () => {
    const auth = useSelector((state: any) => state.auth)
    const [inputDisble, setInputDisable] = useState(true)
    const [email, setEmail] = useState(auth.user.email)
    const [role, setRole] = useState(auth.user.role)
    const [matricule, setMatricule] = useState(auth.user.matricule)
    const createdAtValue = auth.user.createdAt ? new Date(auth.user.createdAt) : null;
    const createdAtString = createdAtValue ? createdAtValue.toISOString().split('T')[0] : '';

    const [createdAt, setCreatedAt] = useState(createdAtString);
    const edit = () => { setInputDisable(!inputDisble) }
    
    const [manager, setManager] = useState<{ firstname: string, lastname: string, profilepicture: string }>({ firstname: '', lastname: '', profilepicture: '' });


    useEffect(() => {
        axios.get(process.env.NEXT_PUBLIC_DOMAIN+`/api/employees/employee/${auth.user.manager}`)
            .then((res:any) => {
               
                setManager({firstname: res.data.employee.firstname, lastname: res.data.employee.lastname, profilepicture: res.data.employee.profilepicture})
                //exclude manager from all managers
                
                
            })
            .catch((err) => {
                setManager({firstname: 'No Manager Yet', lastname: '', profilepicture: ''})
            })
    }, [])


    return (
        <div className="h-full py-14 px-12 flex flex-col">
            <section className="flex gap-12 pb-4">
              <div className="mb-3 w-full">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                Email Adress
                </label>
                <input
                  type="text"
                  id="email"
                  value={email}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  disabled
                />
              </div>
              <div className="mb-3 w-full">
                <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900">
                Role
                </label>
                <SelectInput2
                    placeholder={auth.user.role}
                    options={['Admin', 'Manager', 'Employee']}
                    isDisabled={true}
                />
              </div>
            </section>
            <section className="flex gap-12 pb-4">
              <div className="mb-3 w-full">
                <label htmlFor="Manager" className="block mb-2 text-sm font-medium text-gray-900">
                Manager
                </label>
                <SelectInput222
                    placeholder={manager.firstname + ' ' + manager.lastname }
                    options={[{label: manager.firstname + ' ' + manager.lastname, value: auth.user.manager}]}
                />
              </div>
              
              <div className="mb-3 w-full">
                <label htmlFor="Matricule" className="block mb-2 text-sm font-medium text-gray-900">
                Matricule
                </label>
                <input
                  type="text"
                  id="Matricule"
                  value={auth.user.matricule}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  disabled
                />
              </div>
            </section>
            <section className="flex gap-12 pb-4">
              <div className="mb-3 w-full">
                <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900">
                Joining Date
                </label>
                <DateInput value={auth.user.createdAt} type='date' isDisabled={true} />
              </div>
            </section>
        </div>
    );
}

export default Prof