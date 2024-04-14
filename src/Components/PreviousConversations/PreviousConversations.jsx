import { useContext, useEffect, useState } from "react";
import MyContext from "../Context";
import { Rating, Pagination } from "@mui/material";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { enqueueSnackbar } from "notistack";

export default () => {
  const { chatHistory, setChatHistory } = useContext(MyContext);
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
    if (rating > 0) {
      setCurrentPage(1);
      setNumberOfAvailableConversations(filteredChatHistory?.length);
      setItemsToShow(filteredChatHistory);
    }
  }, [filteredChatHistory]);

  return (
    <div className="max-h-[100vh] overflow-y-auto pb-[80px] w-full">
      <h1 className="ml-[30px] mt-[8px] mb-[20px] hidden lg:block text-[28px] leading-[32.17px] font-bold text-[#9785BA]">
        Bot AI
      </h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (rating > 0) {
            setFilteredChatHistory(
              chatHistory.filter(
                (prevHistory) => prevHistory[1][0].rating >= rating
              )
            );
          } else {
            enqueueSnackbar("selecte a rating", { variant: "info" });
          }
        }}
        className="flex justify-center mb-[55px] gap-3 items-center"
      >
        <span className="text-bold font-medium text-[18px]">Filter: </span>
        <Rating
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          name="filterByRating"
        />
        <button type="submit" className="border-0 outline-0">
          <IoIosCheckmarkCircle className="w-7 h-7 itemsToGetHoverEffect text-green-500" />
        </button>
      </form>
      <div>
        {itemsToShow?.[currentPage - 1]?.[1]?.[0]?.rating ? (
          <div className="flex mb-4 items-center px-2 sm:px-4 font-medium fomt-[var(--font-secondary)]">
            Rating:{" "}
            <Rating
              value={itemsToShow[currentPage - 1][1][0].rating}
              readOnly
              name="rating"
              className="ml-1"
            />
          </div>
        ) : (
          ""
        )}

        {itemsToShow?.[currentPage - 1]?.[1]?.[0].feedback ? (
          <div className="flex items-start px-2 sm:px-4 fomt-[var(--font-secondary)]">
            <span className="font-medium">Feedback:&nbsp;</span>{" "}
            {itemsToShow[currentPage - 1][1][0].feedback}
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
                className="px-2 lg:px-[50px] flex flex-col gap-8 mt-14 mb-8"
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
                  </div>
                </div>
              </div>
            );
          })
        : ""}
      <div className="fixed bottom-0 py-3 px-2 left-[50%] translate-x-[-50%] flex justify-center items-center flex-wrap bg-[#dacdf2] w-full">
        <Pagination
          onChange={(e, val) => setCurrentPage(Number(val))}
          page={currentPage}
          color="secondary"
          count={numberOfAvailableConversations}
        />
      </div>
    </div>
  );
};
