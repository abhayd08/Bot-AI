import Controls from "../Controls/Controls";
import { useContext, useState } from "react";
import MyContext from "../Context";
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";

export default () => {
  const {
    question,
    setQuestion,
    currentConversation,
    setCurrentConversation,
    chatHistory,
  } = useContext(MyContext);

  console.log(chatHistory);

  return (
    <div className="w-full pb-[130px] xl:pb-[75px] max-h-[100vh] overflow-y-auto px-2 flex flex-col">
      <h1 className="ml-[22px] mt-[8px] mb-[50px] hidden lg:block text-[28px] leading-[32.17px] font-bold text-[#9785BA]">
        Bot AI
      </h1>
      {currentConversation[0].length > 0 ? (
        currentConversation[0].map((convo) => {
          return (
            <div
              key={convo.id}
              className="px-2 lg:px-[50px] flex flex-col gap-8 mb-8"
            >
              <div className="flex gap-4">
                <img
                  src="/assets/user.png"
                  className="w-6 h-6 mt-[0.075rem]"
                  alt="User"
                />
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-[18px]">You</span>
                  <span className="ml-[0.06rem]">{convo.question}</span>
                  <div className="text-[12px] ml-[0.06rem] mt-3.5 font-[var(--font-secondary)]">
                    {convo.questionAskedTime?.toLocaleString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <img
                  src="/assets/logo1.png"
                  className="w-6 h-6 mt-[0.242rem]"
                  alt="User"
                />
                <div
                  className="flex flex-col gap-1 pb-1"
                  onMouseEnter={() => {
                    document.getElementsByClassName(
                      "likeBtn"
                    )[0].style.visibility = "visible";
                    document.getElementsByClassName(
                      "dislikeBtn"
                    )[0].style.visibility = "visible";
                  }}
                  onMouseLeave={() => {
                    document.getElementsByClassName(
                      "likeBtn"
                    )[0].style.visibility = "hidden";
                    document.getElementsByClassName(
                      "dislikeBtn"
                    )[0].style.visibility = "hidden";
                  }}
                >
                  <span className="font-semibold text-[18px]">Bot AI</span>
                  <span className="ml-[0.05rem]">{convo.answer}</span>
                  <div className="text-[12px] flex items-center gap-3 ml-[0.05rem] mt-3.5 font-[var(--font-secondary)]">
                    {convo.answerTime?.toLocaleString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                    <AiFillLike className="w-4 h-4 likeBtn invisible itemsToGetHoverEffect text-gray-600 cursor-pointer" />
                    <AiFillDislike className="w-4 dislikeBtn invisible h-4 itemsToGetHoverEffect text-gray-600 cursor-pointer" />
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="mt-[120px] flex flex-col justify-center items-center gap-3">
          <h3 className="text-center font-medium text-[28px] leading-[38px] text-black">
            How Can I Help You Today?
          </h3>
          <img src="/assets/logo2.png" className="w-[65.3px] mr-2" alt="Logo" />
        </div>
      )}
      <Controls />
    </div>
  );
};