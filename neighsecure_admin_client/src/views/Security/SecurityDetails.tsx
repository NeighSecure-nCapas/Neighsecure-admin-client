import {Button} from "@/components/ui/button.tsx";
import {MdArrowBack} from "react-icons/md";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {users} from "@/data/dummydata.ts";
import SecurityForm from "@/views/Security/SecurityForm.tsx";
import AnimationWrap from "@/components/ui/AnimationWraper.tsx";

const SecurityDetails = () => {

    let {id} = useParams();

    const [securityPerson, setSecurityPerson] = useState<User | null>(null);
    const [isNewSecurityPerson, setIsNewSecurityPerson] = useState(false);

    useEffect(() => {
        if (id) {
            const foundSecurityPerson = users.find((user) => user.id === id);
            setSecurityPerson(foundSecurityPerson!);
            setIsNewSecurityPerson(false);
        } else {
            setIsNewSecurityPerson(true);
            setSecurityPerson({
                fullName: "",
                dui: "",
                email: "",
                roles: [],
                homeId: "",
            });
        }
    }, []);

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
                {securityPerson ? (
                    <>
                        <SecurityForm
                            user={securityPerson}
                            isNewUser={isNewSecurityPerson}
                        />
                    </>
                ) : (
                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    </svg>
                )}
            </div>
        </AnimationWrap>
    )
}

export default SecurityDetails;
