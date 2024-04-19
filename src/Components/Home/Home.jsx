import Header from "../Header/Header";
import NavBar from "../NavBar/Navbar";
import Dashboard from "../Dashboard/Dashboard";
import MyContext from "../Context";
import { useState, useEffect } from "react";
import PreviousConversations from "../PreviousConversations/PreviousConversations";
import Feedback from "../Feedback/Feedback";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";

export default () => {
  const [isDarkModeChecked, setIsDarkModeChecked] = useState(false);

  useEffect(() => {
    if (isDarkModeChecked) {
      if (window.innerWidth >= 1024) {
        document.getElementsByClassName("mainContainer")[0].style.background =
          "linear-gradient(to right, black, black)";
        document.body.style.color = "white";
        document.body.style.background =
          "linear-gradient(to right, black, black)";
      } else {
        document.getElementsByClassName("mainContainer")[0].style.background =
          "linear-gradient(180deg, black, black)";
        document.body.style.color = "white";
        document.body.style.background =
          "linear-gradient(180deg, black, black)";
      }
    } else {
      if (window.innerWidth >= 1024) {
        document.getElementsByClassName("mainContainer")[0].style.background =
          "linear-gradient(to right, white, rgb(191 229 255))";
        document.body.style.color = "black";
        document.body.style.background =
          "linear-gradient(to right, white, rgb(191 229 255))";
      } else {
        document.getElementsByClassName("mainContainer")[0].style.background =
          "linear-gradient(180deg, white, rgb(191 229 255))";
        document.body.style.color = "black";
        document.body.style.background =
          "linear-gradient(180deg, white, rgb(191 229 255))";
      }
    }
  }, []);

  useEffect(() => {
    if (isDarkModeChecked) {
      if (window.innerWidth >= 1024) {
        document.getElementsByClassName("mainContainer")[0].style.background =
          "linear-gradient(to right, black, black)";
        document.body.style.color = "white";
        document.body.style.background =
          "linear-gradient(to right, black, black)";
      } else {
        document.getElementsByClassName("mainContainer")[0].style.background =
          "linear-gradient(180deg, black, black)";
        document.body.style.color = "white";
        document.body.style.background =
          "linear-gradient(180deg, black, black)";
      }
    } else {
      if (window.innerWidth >= 1024) {
        document.getElementsByClassName("mainContainer")[0].style.background =
          "linear-gradient(to right, white, rgb(191 229 255))";
        document.body.style.color = "black";
        document.body.style.background =
          "linear-gradient(to right, white, rgb(191 229 255))";
      } else {
        document.getElementsByClassName("mainContainer")[0].style.background =
          "linear-gradient(180deg, white, rgb(191 229 255))";
        document.body.style.color = "black";
        document.body.style.background =
          "linear-gradient(180deg, white, rgb(191 229 255))";
      }
    }
  });

  const [question, setQuestion] = useState("");
  const [currentConversation, setCurrentConversation] = useState([[]]);
  const [chatHistory, setChatHistory] = useState([]);
  const [toShowPreviousConversations, setToShowPreviousConversations] =
    useState(true);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("chatHistory")) {
      setChatHistory(JSON.parse(localStorage.getItem("chatHistory")));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
  }, [chatHistory]);
  console.log(isDarkModeChecked);
  return (
    <MyContext.Provider
      value={{
        question,
        setQuestion,
        currentConversation,
        setCurrentConversation,
        chatHistory,
        setChatHistory,
        toShowPreviousConversations,
        setToShowPreviousConversations,
        isFeedbackModalOpen,
        setIsFeedbackModalOpen,
        isConfirmationModalOpen,
        setIsConfirmationModalOpen,
        isDarkModeChecked,
        setIsDarkModeChecked,
      }}
    >
      <div
        className={`${
          toShowPreviousConversations
            ? "h-[calc(100vh-56px)] max-h-[calc(100vh-56px)]"
            : "h-[calc(100vh-123px)] max-h-[calc(100vh-123px)] lg:h-[calc(100vh-66px)] lg:max-h-[calc(100vh-66px)]"
        }`}
      >
        <Header />
        <div className="flex mainContainer h-[-webkit-fill-available]">
          <NavBar />
          {toShowPreviousConversations ? (
            <PreviousConversations />
          ) : (
            <Dashboard />
          )}
          <Feedback />
          <ConfirmationModal />
        </div>
      </div>
    </MyContext.Provider>
  );
};
