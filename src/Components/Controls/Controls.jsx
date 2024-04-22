import { useContext, useState } from "react";
import MyContext from "../Context";
import { enqueueSnackbar } from "notistack";

export default () => {
  const {
    question,
    setQuestion,
    currentConversation,
    setIsFeedbackModalOpen,
    isDarkModeChecked,
    askBtnContent,
    runChat,
  } = useContext(MyContext);

  return (
    <div
      className={`py-3 rounded-t-[8px] bottom-0 left-[50%] w-full ${
        isDarkModeChecked ? "bg-gray-900" : "bg-[#bfe5ff]"
      } translate-x-[-50%] fixed px-2 flex justify-center items-center`}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (question.trim().length > 0) {
            runChat(question);
          } else {
            enqueueSnackbar(
              "Could you please provide the question you'd like to ask?",
              { variant: "info" }
            );
          }
        }}
        className="flex w-full justify-center items-center gap-[24px] gap-y-[15px] flex-col lg:flex-row"
      >
        <textarea
          type="text"
          required
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-[845px] questionInputBox text-black p-[0.6rem] text-[15px] outline-0 max-w-[94vw] min-h-[41px] overflow-hidden h-[41px] max-h-[60px] border-[0] ring-1 ring-[#2aa8ff] rounded-[10px] bg-white"
        ></textarea>
        <div className="flex justify-center items-center gap-[24px]">
          <button
            className={`askBtn active:scale-[0.96] ring-1 ring-[white] rounded-[10px] text-white itemsToGetBackgroundEffect border-0 outline-0 w-[73.82px] h-[41px] ${
              askBtnContent !== "Ask"
                ? "bg-[#f31260] cursor-default"
                : "bg-[#2aa8ff]"
            } text-center`}
            type="submit"
          >
            {askBtnContent}
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              if (currentConversation[0].length > 0) {
                setIsFeedbackModalOpen(true);
              } else {
                enqueueSnackbar("Initiate a conversation first.", {
                  variant: "info",
                });
              }
            }}
            className={`rounded-[10px] active:scale-[0.96] ${
              askBtnContent !== "Ask" ? "cursor-default" : ""
            } saveBtn border-0 outline-0 ring-1 ring-[white] text-white itemsToGetBackgroundEffect cursor-pointer w-[73.82px] flex justify-center items-center h-[41px] bg-[#2aa8ff] text-center`}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};
