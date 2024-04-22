import { useContext } from "react";
import MyContext from "../Context";
import { enqueueSnackbar } from "notistack";

export default ({ question, description, subDescription }) => {
  const { runChat, isDarkModeChecked } = useContext(MyContext);

  return (
    <div
      onClick={() => {
        if (
          document.getElementsByClassName("askBtn")[0]?.hasAttribute("disabled")
        ) {
          enqueueSnackbar("Kindly await the arrival of the response.", {
            variant: "info",
          });
        } else {
          runChat(question);
        }
      }}
      className={`${
        isDarkModeChecked ? "bg-gray-900" : "bg-white"
      } p-4 rounded-[10px] drop-shadow-xl w-[calc(100vw-20px)] md:w-[calc(50vw-40px)] lg:w-[calc(100vw-350px)] xl:w-[calc(50vw-190px)] xl:max-w-[40rem] cursor-pointer hover:scale-[0.98] transition-all active:scale-95 max-w-[94vw] h-[6rem] flex flex-col justify-center gap-1`}
    >
      <span
        className={`text-[18px] ${
          isDarkModeChecked ? "text-white" : "text-black"
        } font-bold`}
      >
        {description}
      </span>
      {subDescription ? (
        <span
          className={`text-[14px] ${
            isDarkModeChecked ? "text-gray-400" : "text-[#00000080]"
          } `}
        >
          {subDescription}
        </span>
      ) : (
        ""
      )}
    </div>
  );
};
