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
        document.body.style.backgroundColor = "rgb(17 24 39)";
      } else {
        document.getElementsByClassName("mainContainer")[0].style.background =
          "linear-gradient(180deg, black, black)";
        document.body.style.color = "white";
        document.body.style.backgroundColor = "rgb(17 24 39)";
      }
    } else {
      if (window.innerWidth >= 1024) {
        document.getElementsByClassName("mainContainer")[0].style.background =
          "linear-gradient(to right, white, rgb(191 229 255))";
        document.body.style.color = "black";
        document.body.style.backgroundColor = "white";
      } else {
        document.getElementsByClassName("mainContainer")[0].style.background =
          "linear-gradient(180deg, white, rgb(191 229 255))";
        document.body.style.color = "black";
        document.body.style.backgroundColor = "white";
      }
    }
  }, []);

  useEffect(() => {
    if (isDarkModeChecked) {
      if (window.innerWidth >= 1024) {
        document.getElementsByClassName("mainContainer")[0].style.background =
          "linear-gradient(to right, black, black)";
        document.body.style.color = "white";
        document.body.style.backgroundColor = "rgb(17 24 39)";
      } else {
        document.getElementsByClassName("mainContainer")[0].style.background =
          "linear-gradient(180deg, black, black)";
        document.body.style.color = "white";
        document.body.style.backgroundColor = "rgb(17 24 39)";
      }
    } else {
      if (window.innerWidth >= 1024) {
        document.getElementsByClassName("mainContainer")[0].style.background =
          "linear-gradient(to right, white, rgb(191 229 255))";
        document.body.style.color = "black";
        document.body.style.backgroundColor = "white";
      } else {
        document.getElementsByClassName("mainContainer")[0].style.background =
          "linear-gradient(180deg, white, rgb(191 229 255))";
        document.body.style.color = "black";
        document.body.style.backgroundColor = "white";
      }
    }
  });

  const [question, setQuestion] = useState("");
  const [currentConversation, setCurrentConversation] = useState([[]]);
  const [chatHistory, setChatHistory] = useState([]);
  const [toShowPreviousConversations, setToShowPreviousConversations] =
    useState(false);
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
            ? "h-[calc(100vh-52px)]"
            : "h-[calc(100vh-115px)] xl:h-[calc(100vh-60px)]"
        }`}
      >
        <Header />
        <div className="flex mainContainer h-full">
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
