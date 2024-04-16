import { FaRegEdit } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import MyContext from "../Context";
import MenuIcon from "@mui/icons-material/Menu";
import { Drawer } from "@mui/material";

export default () => {
  const [open, setOpen] = useState(false);
  const {
    toShowPreviousConversations,
    currentConversation,
    setToShowPreviousConversations,
    setIsFeedbackModalOpen,
    setIsConfirmationModalOpen,
  } = useContext(MyContext);

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
    <div className="px-2 py-4 lg:hidden flex items-center mb-[15px] gap-3.5">
      <MenuIcon
        onClick={toggleDrawer(true)}
        sx={{ fontSize: "2rem" }}
        className="cursor-pointer menuIcon itemsToGetHoverEffect text-[#2aa8ff]"
      />
      <a href="/" className="font-bold text-[32px] text-[#2aa8ff]">
        Bot AI
      </a>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <nav className="flex flex-col bg-white w-[250px]">
          <div className="flex flex-col gap-[11px] items-center">
            <div
              onClick={() => {
                if (currentConversation?.[0]?.length > 0) {
                  setIsConfirmationModalOpen(true);
                } else {
                  setToShowPreviousConversations(false);
                  setIsFeedbackModalOpen(false);
                  setIsConfirmationModalOpen(false);
                }
              }}
              className="bg-gradient-to-r from-[#2aa8ff] to-white rounded-[10px] w-[97%] active:scale-[0.97] itemsToGetBackgroundEffect text-black hover:text-white hover:from-[white] cursor-pointer py-[5px] flex justify-between gap-[22px] px-2.5 items-center"
            >
              <img
                src="/assets/logo1.png"
                alt="Logo"
                className="w-[33.58px] h-[32px] mt-[7px]"
              />
              <span className="text-[20px] font-medium leading-[22.98px]">
                New chat
              </span>
              <FaRegEdit style={{ width: "24px" }} className="mb-[0.09rem]" />
            </div>
            <div
              onClick={() => {
                if (currentConversation?.[0]?.length > 0) {
                  setIsConfirmationModalOpen(true);
                } else {
                  if (toShowPreviousConversations === true) {
                    setToShowPreviousConversations(false);
                  } else {
                    setToShowPreviousConversations(true);
                  }
                }
              }}
              className={`w-[185px] active:scale-[0.97] cursor-pointer text-white itemsToGetBackgroundEffect ${
                toShowPreviousConversations ? "bg-[#f31260]" : "bg-[#2aa8ff]"
              } rounded-[10px] py-[10px] text-center text-[16px] font-bold leading-[18.38px]`}
            >
              Past Conversations
            </div>
          </div>
        </nav>
      </Drawer>
    </div>
  );
};
