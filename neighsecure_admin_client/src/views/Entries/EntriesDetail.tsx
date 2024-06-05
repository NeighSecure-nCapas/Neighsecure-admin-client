import {Button} from "@/components/ui/button.tsx";
import {MdArrowBack} from "react-icons/md";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {entries} from "@/data/dummydata.ts";
import {InfoMessage} from "@/views/Home/AddNewHome.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";

const EntriesDetail = () => {

    let {id} = useParams();

    const [entry, setEntry] = useState<Entries | null>(null);

    useEffect(() => {
        if (id) {
            const foundEntry = entries.find((entry) => entry.id === id);
            setEntry(foundEntry!);
        } else {
            window.history.back()
        }
    }, []);

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
            <h2 className={'text-xl p-4 font-medium self-start'}>
                Entrada {entry?.entryType}
            </h2>
            <div className="flex flex-row justify-around min-h-[60dvh] items-center w-full">
                <div className={'flex flex-col gap-8'}>
                    <span className={'font-medium'}>
                        Nombre
                    </span>
                    <span>
                        {entry?.name}
                    </span>
                    <span className={'font-medium'}>
                        Fecha
                    </span>
                    <span>
                        {entry?.date}
                    </span>
                    <span className={'font-medium'}>
                        Tipo de entrada
                    </span>
                    <span>
                        {entry?.entryType}
                    </span>
                    <span className={'font-medium'}>
                        Casa destino
                    </span>
                    <span>
                        {entry?.name}
                    </span>
                </div>
                <div className={'flex flex-col justify-center gap-8'}>
                    <h2 className={'font-medium'}>
                        Comentario
                    </h2>
                    <InfoMessage message={"En caso de ser una visita anónima el vigilante pudo haber agregado un comentario sobre la entrada."}/>
                    <Textarea
                        className={"h-40dvh"}
                        placeholder={entry?.comment!} />
                </div>
            </div>
        </section>
    )
}

export default EntriesDetail;
