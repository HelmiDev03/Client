'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

const Authprovider = ({ children }: { children: React.ReactNode }) => {
  const auth = useSelector((state: any) => state.auth);
  const router = useRouter();
  console.log(auth);
  const company = useSelector((state: any) => state.company);
  const dispatch = useDispatch();
  const errors = useSelector((state: any) => state.errors);
  const success = useSelector((state: any) => state.sucess);


  useEffect(() => {

    if (success?.message != '') {
      dispatch(
        {
          type: "SUCCESS",
          payload: '',
        })
    }
    if (Object.keys(errors).length > 0) {
      dispatch({
        type: "ERRORS",
        payload: {},
      }
      )
    }

    if (!auth.isConnected) {




      router.push('/login');

    }
    if (!company.package) {
      router.push('/packages');
    }

  }, [router, auth.isConnected]);

  return <main>{children}</main>;
};

export default Authprovider;