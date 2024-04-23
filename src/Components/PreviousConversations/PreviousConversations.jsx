import { useContext, useEffect, useState } from "react";
import MyContext from "../Context";
import { Rating, Pagination } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

const CustomStarIcon = ({ filled, color, width, height }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={filled ? color : "none"}
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
};

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "white",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: "#2aa8ff",
    width: 32,
    height: 32,
    "&::before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: "white",
    borderRadius: 20 / 2,
  },
}));

export default () => {
  const { chatHistory, isDarkModeChecked, setIsDarkModeChecked } =
    useContext(MyContext);
  const [filteredChatHistory, setFilteredChatHistory] = useState([]);
  const [rating, setRating] = useState(0);
  const [numberOfAvailableConversations, setNumberOfAvailableConversations] =
    useState(chatHistory?.length);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsToShow, setItemsToShow] = useState(chatHistory);

  useEffect(() => {
    setCurrentPage(1);
    setNumberOfAvailableConversations(chatHistory?.length || 1);
    setItemsToShow([...chatHistory]);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
    setNumberOfAvailableConversations(chatHistory?.length || 1);
    setItemsToShow([...chatHistory]);
  }, [chatHistory]);

  useEffect(() => {
    if (filteredChatHistory?.length > 0) {
      setCurrentPage(1);
      setNumberOfAvailableConversations(filteredChatHistory?.length || 1);
      setItemsToShow(filteredChatHistory);
    } else {
      setCurrentPage(1);
      setNumberOfAvailableConversations(chatHistory?.length || 1);
      setItemsToShow([...chatHistory]);
    }
  }, [filteredChatHistory]);

  return (
    <div className="overflow-y-auto pt-[20px] mt-[88px] lg:mt-[74px] mb-[56px] pb-[90px] sm:pb-[50px] w-full">
      <div
        className={`hidden fixed top-0 lg:flex w-[-webkit-fill-available] items-center px-2 py-5 z-10 lg:px-4 justify-between gap-10`}
      >
        <a
          href="/"
          className="text-[28px] leading-[32.17px] font-bold text-[#2aa8ff]"
        >
          Bot <span className="text-[#0095ff]">AI</span>
        </a>
        <FormGroup>
          <FormControlLabel
            control={
              <MaterialUISwitch
                checked={isDarkModeChecked}
                onChange={(e) => setIsDarkModeChecked(e.target.checked)}
              />
            }
          />
        </FormGroup>
      </div>
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
          className="gap-1"
          icon={
            <CustomStarIcon color="#2aa8ff" filled width={20} height={20} />
          }
          emptyIcon={<CustomStarIcon color="#2aa8ff" width={20} height={20} />}
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
      <div className="mb-[55px] flex flex-col gap-4">
        {itemsToShow?.[currentPage - 1]?.[1]?.[0]?.rating ? (
          <div
            className={`flex ${
              isDarkModeChecked ? "text-gray-400" : ""
            } items-center px-2 sm:px-4 font-medium`}
          >
            Rating:{" "}
            <Rating
              value={Number(itemsToShow[currentPage - 1][1][0].rating)}
              readOnly
              name="rating"
              className="gap-1 ml-1.5"
              icon={
                <CustomStarIcon color="#2aa8ff" filled width={18} height={18} />
              }
              emptyIcon={
                <CustomStarIcon color="#2aa8ff" width={18} height={18} />
              }
            />
          </div>
        ) : (
          ""
        )}

        {itemsToShow?.[currentPage - 1]?.[1]?.[0].feedback ? (
          <div className="flex items-start px-2 sm:px-4">
            <span
              className={`font-medium ${
                isDarkModeChecked ? "text-gray-400" : ""
              }`}
            >
              Feedback:&nbsp;
            </span>{" "}
            {itemsToShow[currentPage - 1][1][0].feedback}
          </div>
        ) : (
          ""
        )}

        {itemsToShow?.[currentPage - 1]?.[1]?.[0].date ? (
          <div
            className={`flex items-center text-[0.72rem] ${
              isDarkModeChecked ? "text-gray-400" : "text-gray-800"
            }  px-2 sm:px-4`}
          >
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
      <div className="flex flex-col gap-8">
        {itemsToShow?.[currentPage - 1]?.[0]?.length > 0 ? (
          itemsToShow[currentPage - 1][0].map((convo) => {
            return (
              <div
                key={convo.id}
                className="px-2.5 lg:px-[50px] flex flex-col gap-8"
              >
                <div className="flex gap-4">
                  <img
                    src="/assets/user.png"
                    className="w-6 h-6 mt-[0.075rem]"
                    alt="User"
                  />
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-[18px]">You</span>
                    <h6 className="ml-[0.02rem]">
                      {convo.question.split("\n").map((text, index) => {
                        return (
                          <div key={index}>
                            <span>{text}</span>
                            <br />
                          </div>
                        );
                      })}
                    </h6>
                    <div
                      className={`text-[12px] ${
                        isDarkModeChecked ? "text-gray-400" : "text-gray-800"
                      } ml-[0.02rem] mt-3.5 font-[var(--font-secondary)]`}
                    >
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
                  <div className="flex flex-col gap-2">
                    <span className="font-semibold text-[18px]">Bot AI</span>
                    <div
                      className="ml-[0.01rem] flex flex-col gap-1.5"
                      dangerouslySetInnerHTML={{ __html: convo.answer }}
                    ></div>
                    <div
                      className={`text-[12px] ${
                        isDarkModeChecked ? "text-gray-400" : "text-gray-800"
                      } flex items-center gap-3 ml-[0.01rem] mt-3.5 font-[var(--font-secondary)]`}
                    >
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
        ) : (
          <h5 className="px-2 lg:px-4 text-[lg] text[17px]">
            {" "}
            Oops! We couldn't find any previous conversations.
          </h5>
        )}
      </div>
      <div
        className={`fixed bottom-0 py-3 px-2 left-[50%] translate-x-[-50%] overflow-x-auto flex justify-center items-center flex-wrap ${
          isDarkModeChecked ? "bg-gray-900" : "bg-[#bfe5ff]"
        } w-full`}
      >
        <Pagination
          onChange={(e, val) => setCurrentPage(Number(val))}
          page={currentPage}
          color="primary"
          className={`${isDarkModeChecked ? "textWhite" : ""}`}
          count={numberOfAvailableConversations}
        />
      </div>
    </div>
  );
};
