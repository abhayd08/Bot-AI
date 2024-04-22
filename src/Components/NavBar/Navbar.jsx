import { FaRegEdit } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import MyContext from "../Context";
import { enqueueSnackbar } from "notistack";
import { MdHistory } from "react-icons/md";
import { IoIosBackspace } from "react-icons/io";

const Navbar = () => {
  const {
    toShowPreviousConversations,
    currentConversation,
    setToShowPreviousConversations,
    setIsFeedbackModalOpen,
    setIsConfirmationModalOpen,
    isDarkModeChecked,
    setCurrentConversation,
    setChatHistory,
    setQuestion,
  } = useContext(MyContext);

  return (
    <nav
      className={`hidden overflow-y-auto lg:flex flex-col navbar ${
        isDarkModeChecked ? "bg-gray-950" : "bg-white"
      } w-[250px] ${
        toShowPreviousConversations ? "mb-[56px]" : "mb-[65px]"
      } min-w-[250px]`}
    >
      <div className="flex flex-col w-full h-[-webkit-fill-available] pb-[11px] justify-between items-center gap-2">
        <div className="flex flex-col w-full gap-[11px] items-center">
          <div
            onClick={() => {
              if (
                document
                  .getElementsByClassName("askBtn")[0]
                  ?.hasAttribute("disabled")
              ) {
                enqueueSnackbar("Kindly await the arrival of the response.", {
                  variant: "info",
                });
              } else {
                if (currentConversation?.[0]?.length > 0) {
                  setIsConfirmationModalOpen(true);
                } else {
                  setQuestion("");
                  setToShowPreviousConversations(false);
                  setIsFeedbackModalOpen(false);
                  setIsConfirmationModalOpen(false);
                }
              }
            }}
            className="bg-gradient-to-r from-[#2aa8ff] to-white rounded-[10px] mt-0.5 w-[97%] active:scale-[0.97] itemsToGetBackgroundEffect text-black hover:text-white hover:from-[white] cursor-pointer py-[5px] flex justify-between gap-[22px] px-2.5 items-center"
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
              if (
                document
                  .getElementsByClassName("askBtn")[0]
                  ?.hasAttribute("disabled")
              ) {
                enqueueSnackbar("Kindly await the arrival of the response.", {
                  variant: "info",
                });
              } else {
                if (toShowPreviousConversations === true) {
                  setToShowPreviousConversations(false);
                } else {
                  setToShowPreviousConversations(true);
                }
              }
            }}
            className={`w-[190px] flex justify-center items-center gap-2 active:scale-[0.97] cursor-pointer ring-1 itemsToGetHoverEffect ${
              toShowPreviousConversations
                ? "text-[#f31260] ring-[#f31260] text-danger hover:ring-[#2aa8ff]"
                : "ring-[#2aa8ff] text-[#2aa8ff] hover:ring-[#f31260] hover:text-[#f31260!important]"
            } rounded-[10px] py-[10px] text-center text-[15px] font-bold leading-[18.38px]`}
          >
            Past Conversations
            {toShowPreviousConversations ? (
              <IoIosBackspace className="w-[18px] h-[18px]" />
            ) : (
              <MdHistory className="w-[18px] h-[18px]" />
            )}
          </div>
        </div>
        <div
          onClick={() => {
            if (
              document
                .getElementsByClassName("askBtn")[0]
                ?.hasAttribute("disabled")
            ) {
              enqueueSnackbar("Kindly await the arrival of the response.", {
                variant: "info",
              });
            } else {
              setCurrentConversation([[]]);
              setChatHistory([]);
              setQuestion("");
            }
          }}
          className={`w-[185px] active:scale-[0.97] mt-5 cursor-pointer itemsToGetHoverEffect text-[#f31260] ring-1 ring-[#f31260] hover:ring-[#2aa8ff] rounded-[10px] py-[10px] text-center text-[15px] font-bold leading-[18.38px]`}
        >
          RESET
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
