import Header from "../Header/Header";
import NavBar from "../NavBar/Navbar";
import Dashboard from "../Dashboard/Dashboard";
import MyContext from "../Context";
import { useState, useEffect } from "react";
import PreviousConversations from "../PreviousConversations/PreviousConversations";
import Feedback from "../Feedback/Feedback";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import { CircularProgress } from "@mui/material";
import markdownit from "markdown-it";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { v4 as uuidv4 } from "uuid";

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

  useEffect(() => {
    window.addEventListener("resize", () => {
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
  });

  const [question, setQuestion] = useState("");
  const [currentConversation, setCurrentConversation] = useState([[]]);
  const [chatHistory, setChatHistory] = useState([]);
  const [toShowPreviousConversations, setToShowPreviousConversations] =
    useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const md = markdownit({
    html: true,
    linkify: true,
    typographer: true,
  });

  const MODEL_NAME = import.meta.env.VITE_REACT_APP_MODEL_NAME;
  const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;

  const [askBtnContent, setAskBtnContent] = useState("Ask");

  async function runChat(question) {
    try {
      setAskBtnContent(
        <CircularProgress style={{ padding: ".4rem", color: "white" }} />
      );
      document
        .getElementsByClassName("askBtn")[0]
        .setAttribute("disabled", true);
      document
        .getElementsByClassName("saveBtn")[0]
        .setAttribute("disabled", true);

      const questionAskedTime = new Date();
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: MODEL_NAME });

      const generationConfig = {
        temperature: 0.9,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
      };

      const safetySettings = [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
      ];

      const chat = model.startChat({
        generationConfig,
        safetySettings,
        history: [],
      });

      const result = await chat.sendMessage(question.trim());
      const response = result.response;
      const updatedResult = md.render(response.text());
      setCurrentConversation((prevConversation) => {
        const newConversation = [...prevConversation];
        newConversation[0].push({
          question: question,
          answer: updatedResult,
          id: uuidv4(),
          questionAskedTime: questionAskedTime,
          answerTime: new Date(),
          liked: null,
        });
        return newConversation;
      });
    } catch (error) {
      enqueueSnackbar(
        "There is an issue loading the response. Please refresh the page or try again later.",
        {
          variant: "error",
        }
      );
      console.log(error);
    } finally {
      const timer = setTimeout(() => {
        setQuestion("");
        setAskBtnContent("Ask");
        document
          .getElementsByClassName("askBtn")[0]
          .removeAttribute("disabled");
        document
          .getElementsByClassName("saveBtn")[0]
          .removeAttribute("disabled");
        document.getElementsByClassName("questionInputBox")[0].style.height =
          "41px";
      }, 0);

      return () => clearTimeout(timer);
    }
  }

  useEffect(() => {
    if (localStorage.getItem("chatHistory")) {
      setChatHistory(JSON.parse(localStorage.getItem("chatHistory")));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
  }, [chatHistory]);

  console.log(currentConversation);

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
        askBtnContent,
        setAskBtnContent,
        runChat,
      }}
    >
      <div className={`h-screen`}>
        <Header />
        <div className="flex transition-all mainContainer h-[-webkit-fill-available]">
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
