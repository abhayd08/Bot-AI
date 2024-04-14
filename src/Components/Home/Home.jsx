import Header from "../Header/Header";
import NavBar from "../NavBar/Navbar";
import Dashboard from "../Dashboard/Dashboard";
import MyContext from "../Context";
import { useState, useEffect } from "react";
import PreviousConversations from "../PreviousConversations/PreviousConversations";
import Feedback from "../Feedback/Feedback";

export default () => {
  useEffect(() => {
    if (window.innerWidth >= 1024) {
      document.getElementsByClassName("mainContainer")[0].style.background =
        "linear-gradient(to right, white, rgba(151, 133, 186, 0.2))";
    } else {
      document.getElementsByClassName("mainContainer")[0].style.background =
        "linear-gradient(180deg, white, #EDE4FF)";
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 1024) {
        document.getElementsByClassName("mainContainer")[0].style.background =
          "linear-gradient(to right, white, rgba(151, 133, 186, 0.2))";
        setOpen(false);
      } else {
        document.getElementsByClassName("mainContainer")[0].style.background =
          "linear-gradient(180deg, white, #EDE4FF)";
        setOpen(false);
      }
    });
  });

  const [question, setQuestion] = useState("");
  const [currentConversation, setCurrentConversation] = useState([[]]);
  const [chatHistory, setChatHistory] = useState([]);
  const [toShowPreviousConversations, setToShowPreviousConversations] =
    useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("chatHistory")) {
      setChatHistory(JSON.parse(localStorage.getItem("chatHistory")));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
  }, [chatHistory]);

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
      }}
    >
      <div className="h-[100vh]">
        <Header />
        <div className="flex mainContainer h-full">
          <NavBar />
          {toShowPreviousConversations ? (
            <PreviousConversations />
          ) : (
            <Dashboard />
          )}
          <Feedback />
        </div>
      </div>
    </MyContext.Provider>
  );
};
