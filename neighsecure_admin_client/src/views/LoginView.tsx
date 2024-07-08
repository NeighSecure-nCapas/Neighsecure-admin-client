import { useAuthContext } from '@/providers/AuthContext';
import LoginImage from '../assets/loginImage.svg';
import NeighLogo from '../assets/NeighLogo.svg';
import { Button } from '@/components/ui/button.tsx';
import { FcGoogle } from 'react-icons/fc';

export default function LoginView() {

  const { login } = useAuthContext();

  return (
    <>
      <section
        className={'flex flex-col-reverse lg:flex-row gap-16 min-h-dvh justify-center items-center'}
      >
        <div className={'relative w-full h-1/3 lg:w-1/2'}>
          <img
            src={LoginImage}
            alt={'Login Image'}
            className={'lg:h-dvh h-[50dvh] w-full object-cover object-center'}
          />
          <div
            className={
              'absolute flex flex-col justify-center items-center gap-4 text-2xl text-white -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'
            }
          >
            <img src={NeighLogo} alt={'Logo'} />
            <p>{'Neigh Secure'}</p>
          </div>
        </div>
        <div className={'flex flex-col gap-8 p-12 lg:p-0 w-full h-[50dvh] lg:h-full justify-center items-start lg:w-1/2'}>
          <h1 className={'text-2xl'}>{'Bienvenido'}/a</h1>
          <p className={'text-secondaryText text-xl font-light w-full lg:w-1/2'}>
            {'Modulo de administración de NeighSecure, por favor inicia sesión.'}
          </p>
          <Button onClick={() => {
            login();
          }} size={'lg'}>
            <FcGoogle className={'h-[32px] w-[32px] mr-4'} />
            {'Continuar con Google'}
          </Button>
        </div>
      </section>
    </>
  );
}

