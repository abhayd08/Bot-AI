import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import MenuIcon from "@mui/icons-material/Menu";
import { Drawer } from "@mui/material";

export default () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (window.innerWidth >= 1024) {
      document.getElementsByClassName("menuIcon")[0].style.display = "none";
      setOpen(false);
    } else {
      document.getElementsByClassName("menuIcon")[0].style.display = "block";
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 1024) {
        document.getElementsByClassName("menuIcon")[0].style.display = "none";
        setOpen(false);
      } else {
        document.getElementsByClassName("menuIcon")[0].style.display = "block";
        setOpen(false);
      }
    });
  });

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <div className="px-2 py-4 lg:hidden flex items-center mb-[40px] gap-3.5">
      <MenuIcon
        onClick={toggleDrawer(true)}
        sx={{ fontSize: "2.25rem" }}
        className="cursor-pointer menuIcon itemsToGetHoverEffect text-[#9785BA]"
      />
      <span className="font-bold leading-[36.77px] text-[32px] text-[#9785BA]">
        Bot AI
      </span>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <nav className="flex flex-col navbar bg-white w-[250px]">
          <div className="flex flex-col gap-[11px] items-center">
            <div className="bg-[#D7C7F4] cursor-pointer w-[100%] py-[5px] flex justify-between gap-[22px] px-2.5 items-center">
              <img
                src="/assets/logo1.png"
                alt="Logo"
                className="w-[33.58px] h-[32px] mt-[7px]"
              />
              <span className="text-[20px] font-medium leading-[22.98px] text-black">
                New Chat
              </span>
              <FaRegEdit style={{ width: "24px" }} className="mb-[0.09rem]" />
            </div>
            <div className="w-[185px] bg-[#D7C7F4] rounded-[10px] py-[10px] text-center text-[16px] font-bold leading-[18.38px] text-[#414146]">
              Past Conversations
            </div>
          </div>
        </nav>
      </Drawer>
    </div>
  );
};