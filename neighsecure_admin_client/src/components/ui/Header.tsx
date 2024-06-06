import {useState} from 'react';

import {MdClose, MdLogout, MdMenu} from "react-icons/md";

import {motion} from 'framer-motion';
import NeighLogo from "@/assets/NeighLogo.svg";

import {Button} from "@/components/ui/button.tsx";
import {Link, useNavigate, useLocation} from "react-router-dom";
import {routes} from "@/data/dummydata.ts";

export default function Header() {

    const [menu, setMenu] = useState(false);
    const location = useLocation();

    return (
      <header>
        <nav className="sticky top-0 bg-white xl:bg-primaryColor left-0 z-50 flex w-screen flex-row items-center justify-between gap-10 self-start px-12 py-4 xl:px-4 lg:w-64 xl:h-screen xl:flex-col xl:py-8">
          <div
              className={"hidden xl:flex xl:flex-col w-full h-full justify-around"}
          >
            <div
              className={
                "flex flex-col justify-center items-center gap-4 text-lg text-white"
              }
            >
              <img src={NeighLogo} alt={"Logo"} />
              <p>{"Neigh Secure"}</p>
            </div>

            <hr className={"bg-secondaryText"} />

            <div>
              <h4 className={"text-white px-4 font-normal"}>{"Menu"}</h4>
              <div className={"flex flex-col gap-3 py-4"}>
                {routes.map((route) => (
                  <HeaderItem
                    key={route.name}
                    icon={route.icon}
                    text={route.name}
                    route={route.route}
                    active={location.pathname === route.route}
                  />
                ))}
              </div>
            </div>

              <HeaderItem text={"Cerrar sesión"} route={"/"} isSelected={true} />
          </div>

          <motion.div
            initial={wrapperVariants.closed}
            animate={menu ? "open" : "closed"}
            variants={wrapperVariants}
            style={{ originY: "top", originX: "center" }}
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
            whileTap={{ scale: 0.9 }}
            className="flex h-8 w-8 cursor-pointer flex-row items-center justify-center text-primaryColor"
          >
            {menu ? (
              <div className={"flex flex-row justify-center items-center"}>
                <MdClose className={"text-2xl"} />
                <span className={"font-title"}>CLOSE</span>
              </div>
            ) : (
              <MdMenu className={"text-2xl"} />
            )}
          </motion.div>
        </nav>
      </header>
    );
};

interface HeaderItemProps {
  icon?: string;
  text: string;
  route: string;
  isSelected?: boolean;
  active?: boolean;
}

function HeaderItem({icon, text, route, isSelected = false, active = false}: HeaderItemProps) {
    const navigate = useNavigate();
    return (
      <Button
        onClick={() => {
          navigate(route);
        }}
        variant={"ghost"}
        className={`icon flex flex-row gap-4 py-6 px-4 items-center justify-start bg-primaryColor hover:bg-white hover:text-primaryColor text-white ${
          !isSelected ? " " : "bg-white text-primaryColor"
        } ${!active ? " " : "bg-white active text-primaryColor"} `}
      >
        {icon ? <img src={icon} alt={text} /> : <MdLogout />}
        <span>{text}</span>
      </Button>
    );
}

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
