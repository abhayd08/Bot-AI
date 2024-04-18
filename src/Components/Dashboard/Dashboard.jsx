import Controls from "../Controls/Controls";
import { useContext, useState } from "react";
import MyContext from "../Context";
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

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
  const {
    currentConversation,
    setCurrentConversation,
    isDarkModeChecked,
    setIsDarkModeChecked,
  } = useContext(MyContext);

  return (
    <div className="w-full pb-[130px] lg:pb-[25px] max-h-[100vh] pt-[20px] mt-[86px] lg:mt-[66px] lg:pt-[20px] overflow-y-auto px-2 flex flex-col">
      <div className="hidden fixed top-0 lg:flex w-[-webkit-fill-available] items-center lg:px-2 py-[8px] mb-[42px] justify-between gap-10">
        <a
          href="/"
          className="cursor-pointer text-[28px] leading-[32.17px] font-bold text-[#2aa8ff]"
        >
          Bot <span className="text-[#0095ff]">AI</span>
        </a>
        <FormGroup>
          <FormControlLabel
            control={
              <MaterialUISwitch
                checked={isDarkModeChecked}
                onChange={(e) => setIsDarkModeChecked(e.target.checked)}
                sx={{ m: 1 }}
              />
            }
          />
        </FormGroup>
      </div>
      {currentConversation[0].length > 0 ? (
        currentConversation[0].map((convo) => {
          return (
            <div
              key={convo.id}
              className="px-1 lg:px-[50px] flex flex-col gap-8 mb-8"
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
                  <div
                    className={`text-[12px] ${
                      isDarkModeChecked ? "text-gray-400" : "text-gray-800"
                    } ml-[0.06rem] mt-3.5 font-[var(--font-secondary)]`}
                  >
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
                    document.getElementsByClassName("likeBtn")[
                      currentConversation[0].indexOf(convo)
                    ].style.visibility = "visible";
                    document.getElementsByClassName("dislikeBtn")[
                      currentConversation[0].indexOf(convo)
                    ].style.visibility = "visible";
                  }}
                  onMouseLeave={() => {
                    document.getElementsByClassName("likeBtn")[
                      currentConversation[0].indexOf(convo)
                    ].style.visibility = "hidden";
                    document.getElementsByClassName("dislikeBtn")[
                      currentConversation[0].indexOf(convo)
                    ].style.visibility = "hidden";
                  }}
                >
                  <span className="font-semibold text-[18px]">Bot AI</span>
                  <div
                    className="ml-[0.05rem]"
                    dangerouslySetInnerHTML={{ __html: convo.answer }}
                  ></div>
                  <div
                    className={`text-[12px] ${
                      isDarkModeChecked ? "text-gray-400" : "text-gray-800"
                    } flex items-center gap-3 ml-[0.05rem] mt-3.5 font-[var(--font-secondary)]`}
                  >
                    {convo.answerTime?.toLocaleString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                    <AiFillLike
                      onClick={() => {
                        setCurrentConversation((prevConversation) => {
                          const newConvo = [...prevConversation];
                          const index = newConvo[0].indexOf(convo);
                          if (newConvo[0][index].liked === true) {
                            newConvo[0][index].liked = null;
                          } else {
                            newConvo[0][index].liked = true;
                          }
                          return newConvo;
                        });
                      }}
                      className={`w-4 h-4 invisible likeBtn ${
                        convo.liked === true
                          ? "text-green-500"
                          : "text-gray-500 itemsToGetHoverEffect cursor-pointer"
                      }`}
                    />
                    <AiFillDislike
                      onClick={() => {
                        setCurrentConversation((prevConversation) => {
                          const newConvo = [...prevConversation];
                          const index = newConvo[0].indexOf(convo);
                          if (newConvo[0][index].liked === false) {
                            newConvo[0][index].liked = null;
                          } else {
                            newConvo[0][index].liked = false;
                          }
                          return newConvo;
                        });
                      }}
                      className={`w-4 h-4 dislikeBtn invisible ${
                        convo.liked === false
                          ? "text-[#f31260]"
                          : "text-gray-500 itemsToGetHoverEffect cursor-pointer"
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="mt-[120px] flex flex-col justify-center items-center gap-3">
          <h3 className="text-center font-medium text-[28px] tracking-wide leading-[38px]">
            How Can I Help You Today?
          </h3>
          <img src="/assets/logo2.png" className="w-[65.3px] mr-2" alt="Logo" />
        </div>
      )}
      <Controls />
    </div>
  );
};
