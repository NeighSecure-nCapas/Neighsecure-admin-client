import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {users} from "@/data/dummydata";
import {ToastAction} from "@/components/ui/toast";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";
import {InfoMessage} from "@/views/Home/HomesAddNew.tsx";
import {GET, POST} from "@/hooks/Dashboard.tsx";

const duiRegex = new RegExp(/^\d{8}-\d$/);

const addMemberSchema = z.object({
    email: z
        .string()
        .email("El correo electrónico no es válido. Ej. example@gmail.com"),
    dui: z
        .string()
        .length(10, "El DUI debe contener como maxmimo 9 caracteres")
        .regex(duiRegex, "El formato del DUI no es válido. Ej. 00000000-0"),
});

const SecurityForm = () => {

    const form = useForm<z.infer<typeof addMemberSchema>>({
        resolver: zodResolver(addMemberSchema),
        defaultValues: {
            email: "",
            dui: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof addMemberSchema>) => {
        // * Check if the user is already exists
        const userExists : User = await GET(`/admin/users/${values.dui}/${values.email}`);

        if (!userExists) {
            toast.warning("¡Ups! Ha ocurrido un problema.", {
                description: "El usuario no existe.",
                action: <ToastAction altText="Ok!">Entendido!</ToastAction>,
            });
            return;
        }

        // * If the user is already exists and has 'vigilante' rol, return an error message
        if (userExists && userExists.roles.map((role) => role.rol).includes("Vigilante")) {
            toast.warning("¡Ups! Ha ocurrido un problema.", {
                description: "El usuario ya existe y es vigilante.",
                action: <ToastAction altText="Ok!">Entendido!</ToastAction>,
            });
            return;
        }



        form.reset();
        return window.history.back();
    }

    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={"flex flex-col gap-8 items-start"}
        >
            <h2 className="text-[18px] font-medium">
                {isNewUser ? "Agregar nuevo vigilante" : "Actualizar información del vigilante"}
            </h2>
            <InfoMessage
                message="Por favor ingresa el correo electrónico, de la persona que quieres agregar como vigilante."/>
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

export default SecurityForm;
