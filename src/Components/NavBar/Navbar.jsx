import { FaRegEdit } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import MyContext from "../Context";

const Navbar = () => {
  const {
    toShowPreviousConversations,
    currentConversation,
    setToShowPreviousConversations,
    setIsFeedbackModalOpen,
    setIsConfirmationModalOpen,
  } = useContext(MyContext);

  return (
    <nav className="hidden pb-[130px] xl:pb-[75px] max-h-[100vh] overflow-y-auto lg:flex flex-col navbar bg-white w-[270px] min-w-[270px]">
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
  );
};

export default Navbar;
