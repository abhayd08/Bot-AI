import { useContext, useEffect, useState } from "react";
import MyContext from "../Context";
import { Rating, Pagination } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";

export default () => {
  const { chatHistory } = useContext(MyContext);
  const [filteredChatHistory, setFilteredChatHistory] = useState([]);
  const [rating, setRating] = useState(0);
  const [numberOfAvailableConversations, setNumberOfAvailableConversations] =
    useState(chatHistory?.length);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsToShow, setItemsToShow] = useState(chatHistory);

  useEffect(() => {
    setCurrentPage(1);
    setNumberOfAvailableConversations(chatHistory?.length);
    setItemsToShow([...chatHistory]);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
    setNumberOfAvailableConversations(chatHistory?.length);
    setItemsToShow([...chatHistory]);
  }, [chatHistory]);

  useEffect(() => {
    if (filteredChatHistory?.length > 0) {
      setCurrentPage(1);
      setNumberOfAvailableConversations(filteredChatHistory?.length);
      setItemsToShow(filteredChatHistory);
    } else {
      setCurrentPage(1);
      setNumberOfAvailableConversations(chatHistory?.length);
      setItemsToShow([...chatHistory]);
    }
  }, [filteredChatHistory]);

  return (
    <div className="max-h-[100vh] overflow-y-auto pb-[110px] lg:pb-[25px] w-full">
      <a
        href="/"
        className="ml-[30px] mt-[8px] mb-[25px] hidden lg:block text-[28px] leading-[32.17px] font-bold text-[#2aa8ff]"
      >
        Bot <span className="text-[#0095ff]">AI</span>
      </a>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (filteredChatHistory.length > 0) {
            setFilteredChatHistory([]);
            return;
          }
          if (rating > 0) {
            const filteredHistory = chatHistory.filter(
              (prevHistory) => prevHistory[1][0].rating >= rating
            );
            if (filteredHistory.length > 0) {
              setFilteredChatHistory(filteredHistory);
            } else {
              enqueueSnackbar("No matching search results found.", {
                variant: "warning",
              });
            }
          } else {
            enqueueSnackbar("Please select a rating to use as a filter.", {
              variant: "info",
            });
          }
        }}
        className="flex justify-center px-2 mb-[55px] gap-3 items-center"
      >
        <Rating
          value={Number(rating)}
          onChange={(e) => setRating(e.target.value)}
          name="filterByRating"
        />
        {filteredChatHistory.length > 0 ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              setFilteredChatHistory([]);
            }}
            className="border-0 outline-0"
          >
            <span className={`text-[#f31260]`}>Cancel</span>
          </button>
        ) : (
          <button type="submit" className="border-0 outline-0">
            <span
              className={`itemsToGetHoverEffect hover:text-[#f31260!important] text-[#2aa8ff]`}
            >
              Filter
            </span>
          </button>
        )}
      </form>
      <div className="mb-[55px]">
        {itemsToShow?.[currentPage - 1]?.[1]?.[0]?.rating ? (
          <div className="flex mb-4 items-center px-2 sm:px-4 font-medium">
            Rating:{" "}
            <Rating
              value={Number(itemsToShow[currentPage - 1][1][0].rating)}
              readOnly
              name="rating"
              className="ml-1"
            />
          </div>
        ) : (
          ""
        )}

        {itemsToShow?.[currentPage - 1]?.[1]?.[0].feedback ? (
          <div className="flex items-start px-2 mb-4 sm:px-4">
            <span className="font-medium">Feedback:&nbsp;</span>{" "}
            {itemsToShow[currentPage - 1][1][0].feedback}
          </div>
        ) : (
          ""
        )}

        {itemsToShow?.[currentPage - 1]?.[1]?.[0].date ? (
          <div className="flex items-center text-[0.72rem] text-gray-600 px-2 sm:px-4">
            {new Date(itemsToShow[currentPage - 1][1][0].date).toLocaleString(
              "en-US",
              {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              }
            )}
          </div>
        ) : (
          ""
        )}
      </div>
      {itemsToShow?.[currentPage - 1]?.[0]?.length > 0
        ? itemsToShow[currentPage - 1][0].map((convo) => {
            return (
              <div
                key={convo.id}
                className="px-4 lg:px-[50px] flex flex-col gap-8 my-8"
              >
                <div className="flex gap-4">
                  <img
                    src="/assets/user.png"
                    className="w-6 h-6 mt-[0.075rem]"
                    alt="User"
                  />
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-[18px]">You</span>
                    <span className="ml-[0.07rem]">{convo.question}</span>
                    <div className="text-[12px] ml-[0.06rem] mt-3.5 font-[var(--font-secondary)]">
                      {new Date(convo.questionAskedTime)?.toLocaleString(
                        "en-US",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <img
                    src="/assets/logo1.png"
                    className="w-6 h-6 mt-[0.242rem]"
                    alt="User"
                  />
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-[18px]">Bot AI</span>
                    <span className="ml-[0.05rem]">{convo.answer}</span>
                    <div className="text-[12px] flex items-center gap-3 ml-[0.05rem] mt-3.5 font-[var(--font-secondary)]">
                      {new Date(convo.answerTime)?.toLocaleString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                      {convo.liked === true ? (
                        <AiFillLike className="w-4 h-4 text-green-500" />
                      ) : convo.liked === false ? (
                        <AiFillDislike className="w-4 h-4 text-[#f31260]" />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        : ""}
      <div className="fixed bottom-0 py-3 px-2 left-[50%] translate-x-[-50%] flex justify-center items-center flex-wrap bg-[#bfe5ff] w-full">
        <Pagination
          onChange={(e, val) => setCurrentPage(Number(val))}
          page={currentPage}
          color="primary"
          count={numberOfAvailableConversations}
        />
      </div>
    </div>
  );
};
