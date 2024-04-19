'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

const Authprovider = ({ children }: { children: React.ReactNode }) => {
  const auth = useSelector((state: any) => state.auth);
  const router = useRouter();
  const company = useSelector((state: any) => state.company);
  const dispatch = useDispatch();
  const errors = useSelector((state: any) => state.errors);
  const success = useSelector((state: any) => state.sucess);

  const todayhour = useSelector((state: any) => state.todayhour);
  const time = useSelector((state: any) => state.time);
  dispatch ({
    type: 'SET_TIMER',
    payload: Math.floor(todayhour.hr * 3600 + todayhour.min * 60 + todayhour.sec)
  
  })
  
 
  


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
    if (company.package === '') {
      router.push('/packages');
    }

    const timer = setInterval(() => {
      if (todayhour.increment) {
        let prevTime = time;
        dispatch ({
          type: 'SET_TIMER',
          payload: time +1 
        
        })
        dispatch({
          type: 'SET_HOURS',
          payload: {
            hr: Math.floor((time+1)/ 3600),
            min: Math.floor(((time+1)% 3600) / 60),
            sec: (time+1)% 60,
            increment: true,
            lastclockin: todayhour.lastclockin?.toString()
          }
        });
      }
    }, 1000);
  
    return () => clearInterval(timer);

  }, [router, auth.isConnected , todayhour.increment , time ]);

  return <main>{children}</main>;
};

export default Authprovider;