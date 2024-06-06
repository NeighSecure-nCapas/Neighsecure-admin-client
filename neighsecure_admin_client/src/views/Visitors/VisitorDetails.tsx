import {Button} from "@/components/ui/button.tsx";
import {MdArrowBack} from "react-icons/md";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {visitors} from "@/data/dummydata.ts";

const VisitorsDetails = () => {

    let {id} = useParams();

    const [visit, setVisit] = useState<Visitor | null>(null);

    useEffect(() => {
        if (id) {
            const foundVisitor = visitors.find((entry) => entry.id === id);
            setVisit(foundVisitor!);
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
            <div className="flex flex-row justify-around gap-8 min-h-[60dvh] items-center w-full">
                <div className={'flex flex-col gap-8'}>
                    <span className={'font-medium'}>
                        Nombre
                    </span>
                    <span>
                            {visit?.visitorName}
                    </span>
                    <span className={'font-medium'}>
                            Fecha
                    </span>
                    <span>
                            {visit?.date}
                    </span>
                    <span className={'font-medium'}>
                            Casa a visitar
                    </span>
                    <span>
                            {visit?.homeNumber}
                    </span>
                </div>
                <div className={'flex flex-col w-1/3 justify-center gap-8'}>
                    <img
                        className={'h-auto rounded-2xl'}
                        src={'/cuate.svg'}
                        alt={'visitor'}
                    />
                </div>
            </div>
        </section>
    )
}

export default VisitorsDetails;
