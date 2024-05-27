import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MdArrowBack, MdClose, MdInfoOutline } from "react-icons/md";
import { LiaIdCard } from "react-icons/lia";
import PopoverDemo from "./Popover";
import MemberInfo from "./MemberInfo";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { homes } from "@/data/dummydata";
import { useParams } from "react-router-dom";

const AddNewHome = () => {
  let { id } = useParams();

  // ! This is a dummy data, you should replace it with a real data
  // ? This is where you should get the home data from the API
  const sendedHome = homes.find((home) => home.id === id);

  const [home, setNewHome] = useState<Home | null>(sendedHome || null);
  const [membersNumber, setMembersNumber] = useState<number>(
    sendedHome?.membersNumber || 5
  );
  const [homeNumberState, setHomeNumberState] = useState<{
    homeNumber?: number;
    errorFieldHomeNumber?: string;
  }>({
    homeNumber: home?.homeNumber || 0,
    errorFieldHomeNumber: "",
  });

  const onSaveHome = () => {
    
    if (sendedHome) {
      // TODO: Save updatedHomes to the API
      home!.homeNumber = homeNumberState.homeNumber;
      home!.membersNumber = membersNumber;
      
      toast({
        title: "¡Hogar actualizado con éxito!",
        description: "El hogar ha sido actualizado con éxito.",
        action: <ToastAction altText="Ok!">Entendido!</ToastAction>,
      });
      window.history.back();
      return;
    }

    if (!homeNumberState.homeNumber && !home?.homeNumber) {
      setHomeNumberState({
        errorFieldHomeNumber: "Este es un campo requerido.",
      });
      return;
    }

    if (!home?.admin) {
      toast({
        variant: "destructive",
        title: "¡Ups! Residente encargado necesario.",
        description:
          "Es necesario que agregues al menos un residente encargado.",
        action: <ToastAction altText="Ok!">Entendido!</ToastAction>,
      });
      return;
    }

    home.id = `${homes.length + 1}`;
    home.homeNumber = homeNumberState.homeNumber;
    home.membersNumber = membersNumber;

    // * Save home

    homes.push(home);
    toast({
      title: "¡Hogar guardado con éxito!",
      description: "El hogar ha sido guardado con éxito.",
      action: <ToastAction altText="Ok!">Entendido!</ToastAction>,
    });
    window.history.back();
  };

  const handleRemoveUser = () => {
    setNewHome(prevHome => ({
      ...prevHome,
      admin: null,
    }));
  };

  return (
    <>
      <section
        className={
          "container flex flex-col gap-8 min-h-dvh justify-center items-center p-12"
        }
      >
        <Button
          className={"space-x-4 self-start"}
          variant={"ghost"}
          size={"lg"}
          onClick={() => {
            window.history.back();
          }}
        >
          <MdArrowBack className="h-4 w-4" />
          <span>Regresar</span>
        </Button>
        <hr className="w-full h-2 opacity-85" />
        <div className="flex flex-row justify-around items-start w-full">
          <div className={"flex flex-col gap-8"}>
            <label className={"flex flex-col gap-6 text-[18px]"}>
              <span className="font-medium">{"Informacion del hogar"}</span>
              <Input
                id="homeNumber"
                type="number"
                min={0}
                value={homeNumberState.homeNumber || home?.homeNumber}
                onChange={(e) =>
                  setHomeNumberState({
                    homeNumber: parseInt(e.target.value),
                  })
                }
                className={"w-[375px]"}
                errorMessage={homeNumberState.errorFieldHomeNumber}
                placeholder={"Número de casa"}
                required
              />
            </label>
            <h2 className="text-[18px] font-medium">{"Residente encargado"}</h2>
            {home?.admin && (
              <div className="flex flex-row gap-6 justify-around items-center">
                <LiaIdCard className="h-10 w-10" />
                <div className="flex flex-col gap-2 shrink-0 mr-auto">
                  <span className="text-lg">{home?.admin?.fullName}</span>
                  <span className="text-secondaryText text-sm font-light">
                    {"Residente encargado"}
                  </span>
                </div>
                <Button
                  onClick={handleRemoveUser}
                  variant={"ghost"}
                  size={"icon"}
                >
                  <MdClose className="h-6 w-6 cursor-pointer" />
                </Button>
              </div>
            )}
            {!home?.admin && (
              <div className="flex flex-row items-center justify-center gap-4 text-secondaryText">
                <MdInfoOutline className="h-6 w-6" />
                <span className="text-[14px]">
                  {"No hay ningún residente encargado."}
                </span>
              </div>
            )}
            <>
              <h2 className="text-[18px] font-medium">
                {"Miembros del hogar"}
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

          <MemberInfo
            home={home}
            setNewHome={setNewHome}
            membersNumber={membersNumber}
          />
        </div>
        <Button
          onClick={onSaveHome}
          variant={"default"}
          size={"lg"}
          className="mt-20"
        >
          Guardar Hogar
        </Button>
      </section>
    </>
  );
};

const UserCard = (
  user: User,
  index: number,
  home: Home,
  setHome: (home: Home) => void
): JSX.Element => {
  const handleRemoveUser = () => {
    const updatedUsers = home.users?.filter((u, i) => i !== index);
    setHome({ ...home, users: updatedUsers });
  };

  return (
    <div
      key={index}
      className="flex flex-row gap-6 items-center justify-between p-5 border border-primary rounded-xl"
    >
      <LiaIdCard className="h-10 w-10" />
      <div className="flex flex-col mr-auto gap-2 shrink-0">
        <span className="text-sm">{user?.fullName || "Fernando Figueroa"}</span>
        <span className="text-secondaryText text-sm font-light">
          {user?.roles[0] || "Residente encargado"}
        </span>
      </div>
      <Button onClick={handleRemoveUser} variant={"ghost"} size={"icon"}>
        <MdClose className="h-6 w-6 cursor-pointer" />
      </Button>
    </div>
  );
};

export const InfoMessage = ({ message }: { message: string }) => {
  return (
    <div className="flex flex-row items-center max-w-sm text-[14px] text-wrap justify-center gap-4 text-secondaryText">
      <MdInfoOutline className="h-6 w-6 flex-shrink-0" />
      <span className="">{message}</span>
    </div>
  );
};

export default AddNewHome;
