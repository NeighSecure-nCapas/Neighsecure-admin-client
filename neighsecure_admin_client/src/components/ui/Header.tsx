import {useState} from 'react';

import {
    MdArrowBackIosNew,
    MdArrowForwardIos,
    MdClose,
    MdLogout,
    MdMenu
} from "react-icons/md";

import {motion} from 'framer-motion';
import NeighLogo from "@/assets/NeighLogo.svg";

import {Button} from "@/components/ui/button.tsx";
import {Link, useNavigate, useLocation} from "react-router-dom";
import {routes} from "@/data/dummydata.ts";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.tsx";
import {useAuthContext} from "@/providers/AuthContext.tsx";

export default function Header() {

    const [menu, setMenu] = useState(false);
    const [hidden, setHidden] = useState(false);
    const location = useLocation();

    return (
        <header>
            <motion.nav
                variants={navVariants}
                animate={hidden ? "closed" : "open"}
                className={`sticky top-0 transition-all lg:w-64 duration-200 bg-white xl:bg-primaryColor left-0 z-50 flex w-screen flex-row justify-around ${hidden ? 'items-center' : 'px-6'} w-full gap-10 self-start py-4 xl:h-screen xl:flex-col xl:py-12`}>
                <div
                    className={`hidden xl:flex xl:flex-col ${hidden ? 'w-fit items-center justify-center' : 'w-full'} h-full justify-around`}
                >
                    <motion.div
                        variants={item}
                        animate={!hidden ? "open" : "closed"}
                        className={`flex flex-col w-full justify-center items-center gap-4 text-lg text-white`}
                    >
                        <img src={NeighLogo} alt={"Logo"}/>
                        <p className={`${hidden? 'hidden' : 'visible'}`}>{"Neigh Secure"}</p>
                    </motion.div>

                    <Button onClick={
                        () => setHidden(!hidden)
                    } size={"icon"} variant={"ghost"}
                            className={"flex flex-row absolute top-8 left-6 items-center justify-center bg-gray-50 text-primaryColor"}>
                        {hidden ? <MdArrowForwardIos/> : <MdArrowBackIosNew/>}
                    </Button>


                    <div>
                        <motion.h4
                            animate={!hidden ? "open" : "closed"}
                            variants={item}
                            className={"text-white px-4 font-normal"}>{"Menu"}</motion.h4>
                        <div className={`flex flex-col  ${hidden ? 'items-center' : ''} gap-5 py-4`}>
                            {routes.map((route) => (
                                <HeaderItem
                                    key={route.name}
                                    icon={route.icon}
                                    text={route.name}
                                    route={route.route}
                                    hidden={hidden}
                                    active={location.pathname === route.route}
                                />
                            ))}
                        </div>
                    </div>

                    <HeaderItem
                        hidden={hidden}
                        text={"Cerrar sesión"}
                        isSelected={true}
                        route={"/logout"}
                    />
                </div>

                <motion.div
                    initial={wrapperVariants.closed}
                    animate={menu ? "open" : "closed"}
                    variants={wrapperVariants}
                    style={{originY: "top", originX: "center"}}
                    className={`absolute -left-0 top-16 self-center overflow-hidden w-screen h-screen xl:left-[6rem] xl:flex xl:top-0 font-title bg-white`}
                >
                    <ul className="my-10 flex flex-col items-center gap-10 xl:items-start xl:justify-center xl:pl-64">
                        {routes.map((route) => (
                            <motion.li
                                key={route.name}
                                variants={itemsVariants}
                                whileHover={{
                                    x: 3,
                                    transition: {
                                        duration: 1,
                                        type: "spring",
                                        ease: "easeInOut",
                                    },
                                }}
                                className="relative w-max text-lg font-normal uppercase tracking-widest one xl:text-3xl"
                            >
                                <Link
                                    onClick={() => setMenu(!menu)}
                                    className="border-b transition-colors text-secondaryText border-gray hover:text-primaryColor"
                                    to={route.route}
                                >
                                    {" "}
                                    {route.name}{" "}
                                </Link>
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>

                <motion.div
                    onClick={() => setMenu(!menu)}
                    whileTap={{scale: 0.9}}
                    className="flex h-8 w-8 cursor-pointer flex-row items-center justify-center xl:hidden"
                >
                    {menu ? (
                        <div className={"flex flex-row justify-center items-center"}>
                            <MdClose className={"text-2xl"}/>
                            <span className={"font-title"}>CLOSE</span>
                        </div>
                    ) : (
                        <MdMenu className={"text-2xl"}/>
                    )}
                </motion.div>
            </motion.nav>
        </header>
    );
};

interface HeaderItemProps {
    icon?: string;
    text: string;
    route: string;
    isSelected?: boolean;
    active?: boolean;
    hidden?: boolean;
}

function HeaderItem({icon, text, route, isSelected = false, active = false, hidden}: HeaderItemProps) {
    const navigate = useNavigate();
    const { logout } = useAuthContext();
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <Button
                        onClick={() => {
                            if (route === "/logout")
                                logout();
                            else
                                navigate(route);
                        }}
                        size={hidden ? 'icon' : 'default'}
                        variant={"ghost"}
                        className={`icon flex flex-row flex-shrink-0 w-full gap-4 py-6 px-4 items-center justify-start bg-primaryColor hover:bg-white hover:text-primaryColor text-white ${
                            !isSelected ? " " : "bg-white text-primaryColor"
                        } ${!active ? " " : "bg-white active text-primaryColor"} `}
                    >
                        {icon ? <img width={24} height={24} src={icon} alt={text}/> : <MdLogout/>}
                        <motion.span
                            animate={!hidden ? "open" : "closed"}
                            variants={item}
                            className={`${hidden ? 'sr-only' : ''}`}
                        >{text}</motion.span>
                    </Button>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={5}>
                    {hidden ? text : null}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}

const item = {
    open : {
        translateX : 1,
        opacity : 1,
        transition : {
            duration : 0.4,
            ease : "easeIn"
        }
    },
    closed : {
        translateX: -20,
        opacity: 0,
        transition: {
            duration : 0.1,
            ease : "easeIn"
        }
    }
}

const navVariants = {
    open: {width: "256px", transition: {duration: 0.1, ease: "easeInOut"}},
    closed: {width: "90px", transition: {duration: 0.1, ease: "easeInOut"}},
};

const wrapperVariants = {
    open: {
        scaleY: 1,
        transition: {
            when: "beforeChildren",
            staggerChildren: 0.1,
        },
    },
    closed: {
        scaleY: 0,
        transition: {
            when: "afterChildren",
            staggerChildren: 0.1,
        },
    },
};

const itemsVariants = {
    open: {
        opacity: 1,
        y: 0,
        transition: {type: "spring", stiffness: 300, damping: 24, duration: 1}
    },
    closed: {opacity: 0, y: 20, transition: {duration: 0.5}}
};
