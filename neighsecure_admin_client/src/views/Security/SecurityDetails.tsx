import {Button} from "@/components/ui/button.tsx";
import {MdArrowBack} from "react-icons/md";
import SecurityForm from "@/views/Security/SecurityForm.tsx";
import AnimationWrap from "@/components/ui/AnimationWraper.tsx";

const SecurityDetails = () => {

    return (
        <AnimationWrap
            position={-100}
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
            <div className="flex flex-col justify-center min-h-[60dvh] items-center w-full">
                <SecurityForm />
            </div>
        </AnimationWrap>
    )
}

export default SecurityDetails;
