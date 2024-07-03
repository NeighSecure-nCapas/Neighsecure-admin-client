import {Button} from "@/components/ui/button.tsx";
import {MdArrowBack} from "react-icons/md";
import {useParams} from "react-router-dom";
import useSWR from "swr";
import {GET} from "@/hooks/Dashboard.tsx";
import LoadingSpinner from "@/components/LoadingSpinner.tsx";

const VisitorsDetails = () => {

    let {id} = useParams();
    const {data, isLoading}  = useSWR(`/admin/users/${id}`, GET);

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
            {isLoading && (<LoadingSpinner/>)}
            {data && (
                    <div className="flex flex-row justify-around gap-8 min-h-[60dvh] items-center w-full">
                        <div className={'flex flex-col gap-8'}>
                            <span className={'font-medium'}>Nombre</span>
                            <span>{data?.name}</span>
                            <span className={'font-medium'}>DUI</span>
                            <span>{data?.dui}</span>
                            <span className={'font-medium'}>Numero de telefono</span>
                            <span>{data.phoneNumber ?  data.phoneNumber : '-'}</span>
                        </div>
                        <div className={'flex flex-col w-1/3 justify-center gap-8'}>
                        <img
                                className={'h-auto rounded-2xl'}
                                src={'/cuate.svg'}
                                alt={'visitor'}
                            />
                        </div>
                    </div>
                )}
        </section>
    )
}

export default VisitorsDetails;
