import { useContext, useState } from "react";
import MyContext from "../Context";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { v4 as uuidv4 } from "uuid";
import { enqueueSnackbar } from "notistack";

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

  const MODEL_NAME = "gemini-1.0-pro";
  const API_KEY = "";

  async function runChat(question) {
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
      });

      return newConversation;
    });
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
            className="rounded-[5px] text-white itemsToGetBackgroundEffect border-0 outline-0 w-[73.82px] h-[42px] bg-[purple] text-center"
            type="submit"
          >
            Ask
          </button>
          <div
            onClick={() => {
              if (currentConversation[0].length > 0) {
                setIsFeedbackModalOpen(true);
              } else {
                enqueueSnackbar("Initaiat a chat first", {
                  variant: "warning",
                });
              }
            }}
            className="rounded-[5px] text-white itemsToGetBackgroundEffect cursor-pointer w-[73.82px] flex justify-center items-center h-[42px] bg-[purple] text-center"
          >
            Save
          </div>
        </div>
      </form>
    </div>
  );
};