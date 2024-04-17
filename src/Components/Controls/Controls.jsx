import { useContext, useState } from "react";
import MyContext from "../Context";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { v4 as uuidv4 } from "uuid";
import { enqueueSnackbar } from "notistack";
import { CircularProgress } from "@mui/material";

export default () => {
  const {
    question,
    setQuestion,
    currentConversation,
    setCurrentConversation,
    setIsFeedbackModalOpen,
    isDarkModeChecked,
  } = useContext(MyContext);

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
      setCurrentConversation((prevConversation) => {
        const newConversation = [...prevConversation];
        newConversation[0].push({
          question: question,
          answer: response.text(),
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
      }, 0);

      return () => clearTimeout(timer);
    }
  }

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
        className="flex w-full justify-center items-center gap-[24px] gap-y-[15px] flex-col xl:flex-row"
      >
        <input
          type="text"
          required
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-[845px] text-black px-2 text-[15px] outline-0 max-w-[90vw] h-[41px] border-[0] ring-1 ring-[#2aa8ff] rounded-[10px] bg-white"
        />
        <div className="flex justify-center items-center gap-[24px]">
          <button
            className={`askBtn active:scale-[0.96] ring-1 ring-[white] rounded-[10px] text-white itemsToGetBackgroundEffect border-0 outline-0 w-[73.82px] h-[42px] ${
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
            } saveBtn border-0 outline-0 ring-1 ring-[white] text-white itemsToGetBackgroundEffect cursor-pointer w-[73.82px] flex justify-center items-center h-[42px] bg-[#2aa8ff] text-center`}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};
