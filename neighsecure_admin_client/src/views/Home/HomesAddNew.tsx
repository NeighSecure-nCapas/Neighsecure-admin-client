import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MdArrowBack, MdClose, MdInfoOutline } from 'react-icons/md';
import { LiaIdCard } from 'react-icons/lia';
import PopoverDemo from './HomesPopover.tsx';
import HomesMemberInfo from './HomesMemberInfo.tsx';
import { toast } from 'sonner';
import { POST } from '@/hooks/Dashboard.tsx';
import { useNavigate } from 'react-router-dom';
import { mutate } from 'swr';

const HomesAddNew = () => {

    const [membersNumber, setMembersNumber] = useState<number>(5);
    const navigate = useNavigate();

    const [homeNumberState, setHomeNumberState] = useState<{
        homeNumber?: number;
        errorFieldHomeNumber?: string;
    }>({
        homeNumber: 0,
        errorFieldHomeNumber: ''
    });

    const [address, setAddress] = useState<{
        address?: string;
        errorFieldAddress?: string;
    }>({
        address: '',
        errorFieldAddress: ''
    });

    const [home, setNewHome] = useState<Home>(
        {
            admin: null,
            users: []
        }
    );

    const onSaveHome = async () => {

        if (!homeNumberState.homeNumber || homeNumberState.homeNumber < 0) {
            setHomeNumberState({
                errorFieldHomeNumber: 'Este es un campo requerido.'
            });
            return;
        }

        if (!address.address || address.address.length < 0) {
            setAddress({
                errorFieldAddress: 'Este es un campo requerido.'
            });
            return;
        }

        if (!home!.admin) {
            toast.error('¡Ups! Residente encargado necesario.', {
                description:
                    'Es necesario que agregues al menos un residente encargado.',
                dismissible: true
            });
            return;
        }

        home!.homeNumber = homeNumberState.homeNumber;
        home!.membersNumber = membersNumber;
        home!.address = address.address;

        // * Save home
        const newHomeRequest = {
            homeNumber: home!.homeNumber,
            address: home!.address,
            membersNumber: home!.membersNumber,
            userAdmin: home!.admin.id,
            homeMembers: home!.users?.map((user) => user.id)
        };
        POST('/admin/homes/register', newHomeRequest).then(
            () => {
                mutate('/admin/homes?page=0&size=10');
                navigate('/admin/hogares');
                toast.success('Listo!.', {
                    description: 'Hogar actualizado con exito.'
                });
            }
        );
    };

    const handleRemoveUser = async () => {
        setNewHome({...home, admin: null});
        toast.success('Listo!.', {
            description: 'Residente eliminado con exito.'
        });
    };

    return (
        <>
            <section
                className={
                    'container flex flex-col gap-8 min-h-dvh justify-center items-center p-12'
                }
            >
                <Button
                    className={'space-x-4 self-start'}
                    variant={'ghost'}
                    size={'lg'}
                    onClick={() => {
                        window.history.back();
                    }}
                >
                    <MdArrowBack className="h-4 w-4"/>
                    <span>Regresar</span>
                </Button>
                <hr className="w-full h-2 opacity-85"/>
                <div className="flex flex-row justify-around items-start w-full">
                    <div className={'flex flex-col gap-8'}>
                        <label className={'flex flex-col gap-6 text-[18px]'}>
                            <span className="font-medium">{'Informacion del hogar'}</span>
                            <Input
                              id="homeNumber"
                              type="number"
                              min={0}
                              value={homeNumberState.homeNumber}
                              onChange={(e) =>
                                  {
                                      if (parseInt(e.target.value) && parseInt(e.target.value) > 0)
                                          {setHomeNumberState({
                                              homeNumber: parseInt(e.target.value)
                                          });}
                                  }
                              }
                              className={'w-[375px]'}
                              errorMessage={homeNumberState.errorFieldHomeNumber}
                              placeholder={'Número de casa'}
                              required
                            />
                        </label>

                        <label className={'flex flex-col gap-6 text-[18px]'}>
                            <span className="font-medium">{'Direccion del hogar'}</span>
                            <Input
                              id="homeAddress"
                              type="text"
                              value={address.address}
                              onChange={(e) =>
                                setAddress({
                                    address: e.target.value
                                })
                              }
                              className={'w-[375px]'}
                              errorMessage={address.errorFieldAddress}
                              placeholder={'Dirección'}
                              required
                            />
                        </label>

                        <h2 className="text-[18px] font-medium">{'Residente encargado'}</h2>
                        {home?.admin && (
                          <div className="flex flex-row gap-6 justify-around items-center">
                              <LiaIdCard className="h-10 w-10" />
                              <div className="flex flex-col gap-2 shrink-0 mr-auto">
                                  <span className="text-lg">{home?.admin?.name}</span>
                                  <span className="text-secondaryText text-sm font-light">
                    {'Residente encargado'}
                  </span>
                              </div>
                              <Button
                                onClick={handleRemoveUser}
                                variant={'ghost'}
                                size={'icon'}
                              >
                                  <MdClose className="h-6 w-6 cursor-pointer" />
                              </Button>
                          </div>
                        )}
                        {!home?.admin && (
                          <div className="flex flex-row items-center justify-center gap-4 text-secondaryText">
                              <MdInfoOutline className="h-6 w-6" />
                              <span className="text-[14px]">
                  {'No hay ningún residente encargado.'}
                </span>
                          </div>
                        )}
                        <>
                            <h2 className="text-[18px] font-medium">
                                {'Miembros del hogar'}
                            </h2>
                            <div className="flex flex-col gap-6">
                                {home?.users?.map((user, index) =>
                                  UserCard(user, index, home, setNewHome)
                                )}
                                {!home?.users?.length && (
                                  <InfoMessage message="No hay ningún miembro en el hogar." />
                                )}
                            </div>
                            <div className="flex flex-row gap-6 items-center shrink-0">
                            <span className="text-secondaryText text-sm">
                              {`${home?.users?.length || 0} / ${membersNumber} Restantes`}
                            </span>
                                <PopoverDemo
                                  membersNumber={membersNumber}
                                  setMembersNumber={setMembersNumber}
                                />
                            </div>
                        </>
                    </div>

                    <HomesMemberInfo
                      home={home}
                      setNewHome={setNewHome}
                      membersNumber={membersNumber}
                    />
                </div>
                <Button
                  onClick={onSaveHome}
                  variant={'default'}
                  size={'lg'}
                  className='mt-8'
                >
                    Guardar Hogar
                </Button>
            </section>
        </>
    );
};

export const UserCard = (
  user: User,
  index?: number,
  home?: Home,
  setHome?: (home: Home | HomeResponse) => void
): JSX.Element => {
    const handleRemoveUser = () => {
        const updatedUsers = home!.users?.filter((_u, i) => i !== index);
        setHome!({ ...home, users: updatedUsers });
        toast.success('Listo!.', {
            description: 'Residente eliminado con exito.'
        });
    };

    return (
      <div
        key={index}
        className="flex flex-row gap-6 items-center justify-between p-5 border border-primary rounded-xl"
        >
            <LiaIdCard className="h-10 w-10"/>
            <div className="flex flex-col mr-auto gap-2 shrink-0">
                <span className="text-sm">{user?.name || 'Fernando Figueroa'}</span>
                <span className="text-secondaryText text-sm font-light">{'Residente'}</span>
            </div>
            <Button onClick={handleRemoveUser} variant={'ghost'} size={'icon'}>
                <MdClose className="h-6 w-6 cursor-pointer"/>
            </Button>
        </div>
    );
};

export const InfoMessage = ({message}: { message: string }) => {
    return (
        <div
            className="flex flex-row items-center max-w-sm text-[14px] text-wrap justify-center gap-4 text-secondaryText">
            <MdInfoOutline className="h-6 w-6 flex-shrink-0"/>
            <span className="">{message}</span>
        </div>
    );
};

export default HomesAddNew;
