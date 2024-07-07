import {Button} from "@/components/ui/button.tsx";
import { MdArrowBack } from "react-icons/md";
import { useParams } from "react-router-dom";
import { InfoMessage } from "@/views/Home/HomesAddNew.tsx";
import  {Textarea } from "@/components/ui/textarea.tsx";
import useSWR from "swr";
import { GET } from "@/hooks/Dashboard.tsx";
import {format} from "date-fns";
import {es} from "date-fns/locale";
import LoadingSpinner from "@/components/LoadingSpinner.tsx";

const EntriesDetail = () => {

    let {id} = useParams();
    const  { data, isLoading } = useSWR(`/admin/entries/${id}`, GET);

    let formatedDate = "-";
    if (data?.date) {
        const date = new Date(data.date);
        formatedDate = format(date, "PPP,p", {locale: es});
    }

    return (
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
                <MdArrowBack className="h-4 w-4"/>
                <span>Regresar</span>
            </Button>
            <hr className="w-full h-2 opacity-85"/>
            {isLoading && (<LoadingSpinner />)}
            {
                data && (
                    <div className="flex flex-row justify-around min-h-[60dvh] items-center w-full">
                        <div className={'flex flex-col gap-8'}>
                    <span className={'font-medium'}>
                        Nombre
                    </span>
                            <span>
                        {data?.user}
                    </span>
                            <span className={'font-medium'}>
                        Fecha
                    </span>
                            <span>
                        {formatedDate}
                    </span>
                            <span className={'font-medium'}>
                        Tipo de entrada
                    </span>
                            <span>
                        {data?.entryType}
                    </span>
                            <span className={'font-medium'}>
                        Casa destino
                    </span>
                            <span>
                        {data?.homeNumber}
                    </span>
                        </div>
                        <div className={'flex flex-col justify-center gap-8'}>
                            <h2 className={'font-medium'}>
                                Comentario
                            </h2>
                            <InfoMessage
                                message={"En caso de ser una visita anónima el vigilante pudo haber agregado un comentario sobre la entrada."}/>
                            <Textarea
                                disabled
                                className={"h-40dvh"}
                                placeholder={data?.comment!}
                            />
                        </div>
                    </div>
                )
            }
        </section>
    )
}

export default EntriesDetail;
