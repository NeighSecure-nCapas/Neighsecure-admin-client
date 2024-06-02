import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { users } from "@/data/dummydata";
import { ToastAction } from "@/components/ui/toast";
import { Input } from "@/components/ui/input";
import { InfoMessage } from "./AddNewHome";
import { Button } from "@/components/ui/button";
import {toast} from "sonner";

const duiRegex = new RegExp(/^\d{8}-\d$/);

const addMemberSchema = z.object({
  email: z
    .string()
    .email("El correo electrónico no es válido. Ej. example@gmail.com"),
  dui: z
    .string()
    .length(10, "El DUI debe contener como maxmimo 9 caracteres")
    .regex(duiRegex, "El formato del DUI no es válido. Ej. 00000000-0"),
  isAdmin: z.boolean().default(false).optional(),
});

type MemberInfoProps = {
  home?: Home | null;
  membersNumber: number;
  setNewHome: (home: Home) => void;
};

const MemberInfo = ({ home, membersNumber, setNewHome }: MemberInfoProps) => {
  const form = useForm<z.infer<typeof addMemberSchema>>({
    resolver: zodResolver(addMemberSchema),
    defaultValues: {
      email: "",
      dui: "",
      isAdmin: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof addMemberSchema>) => {
    let currentHome = home;

    // * Check if the user is already in the home
    const userInHome =
      currentHome!.users?.find((user) => user.email === values.email) ||
      currentHome!.admin?.email === values.email;

    // * If the user is already in the home, return an error message
    if (userInHome) {
      toast.error("¡Ups! El usuario ya está en el hogar.",{
        description: "El usuario ya se encuentra en el hogar.",
        action: <ToastAction altText="Ok!">Entendido!</ToastAction>,
      });
      return;
    }

    // TODO: Connect to API
    // * Check if the user exists
    const userExists = users.find((user) => user.email === values.email);

    // * If the user does not exist, return an error message
    if (!userExists) {
      toast.error( "Uh oh! El usuario no existe.",{
        description:
          "No hemos encontrado el usuario dentro de la base de datos.",
      });
      return;
    }

    // * If the user exists, add it to the home
    if (values.isAdmin) {
      // * If the user is an admin, we set it as the admin of the home
      userExists?.roles.push("encargado");
      currentHome!.admin = userExists;
    } else {
      // TODO: If the user is not an admin, we add it to the users of the home and set user rol to "residente"
      currentHome!.users?.length! >= membersNumber
        ? toast.warning("Uh oh! maximo de personas alcanzado.",{
            description:
              "No puedes anadir mas del maximo de personas establecido.",
            action: <ToastAction altText="Ok!">Entendido!</ToastAction>,
          })
        : currentHome!.users?.push(userExists);
    }

    setNewHome({ ...currentHome! });
    toast.success("Listo!.",{
      description: `Haz agregado a ${userExists.fullName} con exito.`
    });

    // Limpia el formulario
    form.reset();
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className={"flex flex-col gap-8 items-start"}
    >
      <h2 className="text-[18px] font-medium">{"Agregar un miembro"}</h2>
      <InfoMessage message="Por favor ingresa el correo electrónico, de la persona que quieres agregar como residente." />
      <Input
        id="email"
        autoComplete="email"
        {...form.register("email")}
        type="email"
        className={"w-[375px]"}
        placeholder={"Correo electrónico"}
        errorMessage={form.formState.errors.email?.message}
        required
      />
      <Input
        id="dui"
        maxLength={10}
        {...form.register("dui")}
        type="text"
        className={"w-[375px]"}
        placeholder={"DUI"}
        errorMessage={form.formState.errors.dui?.message}
        required
      />
      <div className="flex flex-row shrink-0 gap-4 items-center">
        <Checkbox
          id="isAdmin"
          className="h-6 w-6"
          onCheckedChange={(value) =>
            form.setValue("isAdmin", value as boolean)
          }
        />
        <span className="text-[14px] text-secondaryText">
          {"Residente encargado"}
        </span>
      </div>
      <InfoMessage message="Si agregas este residente como residente encargado, el residente encargado actual será remplazado" />
      <Button
        disabled={form.formState.isLoading}
        type="submit"
        variant={"default"}
        size={"lg"}
      >
        Listo
      </Button>
    </form>
  );
};

export default MemberInfo;
