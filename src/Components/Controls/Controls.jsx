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
    chatHistory,
    setChatHistory,
    isFeedbackModalOpen,
    setIsFeedbackModalOpen,
  } = useContext(MyContext);

  const MODEL_NAME = process.env.Model_Name;
  const API_KEY = process.env.API_KEY;

  const [askBtnContent, setAskBtnContent] = useState("Ask");

  async function runChat(question) {
    try {
      setAskBtnContent(<CircularProgress />);
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

      const result = await chat.sendMessage(question);
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
      console.log(error);
    } finally {
      const timer = setTimeout(() => {
        setQuestion("");
      }, 0);

      setAskBtnContent("Ask");
      document.getElementsByClassName("askBtn")[0].removeAttribute("disabled");
      document.getElementsByClassName("saveBtn")[0].removeAttribute("disabled");

      return () => clearTimeout(timer);
    }
  }

  return (
    <div className="py-3 rounded-t-[5px] bottom-0 left-[50%] w-full bg-[#dacdf2] translate-x-[-50%] fixed px-2 flex justify-center items-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          runChat(question);
        }}
        className="flex w-full justify-center items-center gap-[24px] gap-y-[15px] flex-col xl:flex-row"
      >
        <input
          type="text"
          required
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-[845px] text-black px-2 text-[15px] outline-0 max-w-[90vw] h-[41px] border-[1px] border-solid border-[#00000073]  rounded-[5px] bg-white"
        />
        <div className="flex justify-center items-center gap-[24px]">
          <button
            className="askBtn rounded-[5px] text-white itemsToGetBackgroundEffect border-0 outline-0 w-[73.82px] h-[42px] bg-[purple] text-center"
            type="submit"
          >
            {askBtnContent}
          </button>
          <button
            onClick={() => {
              if (currentConversation[0].length > 0) {
                setIsFeedbackModalOpen(true);
              } else {
                enqueueSnackbar("Initaiat a chat first", {
                  variant: "warning",
                });
              }
            }}
            className="rounded-[5px] saveBtn text-white itemsToGetBackgroundEffect cursor-pointer w-[73.82px] flex justify-center items-center h-[42px] bg-[purple] text-center"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};
