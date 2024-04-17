import { FaRegEdit } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import MyContext from "../Context";
import MenuIcon from "@mui/icons-material/Menu";
import { Drawer } from "@mui/material";
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
    backgroundColor: "gray",
    borderRadius: 20 / 2,
  },
}));

export default () => {
  const [open, setOpen] = useState(false);
  const {
    toShowPreviousConversations,
    currentConversation,
    setToShowPreviousConversations,
    setIsFeedbackModalOpen,
    setIsConfirmationModalOpen,
    isDarkModeChecked,
    setIsDarkModeChecked,
  } = useContext(MyContext);

  useEffect(() => {
    if (window.innerWidth >= 1024) {
      document.getElementsByClassName("menuIcon")[0].style.display = "none";
      setOpen(false);
    } else {
      document.getElementsByClassName("menuIcon")[0].style.display = "block";
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 1024) {
        document.getElementsByClassName("menuIcon")[0].style.display = "none";
        setOpen(false);
      } else {
        document.getElementsByClassName("menuIcon")[0].style.display = "block";
        setOpen(false);
      }
    });
  });

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <div
      className={`px-2 py-4 lg:hidden flex items-center ${
        isDarkModeChecked ? "bg-black" : ""
      } gap-3.5`}
    >
      <MenuIcon
        onClick={toggleDrawer(true)}
        sx={{ fontSize: "2rem" }}
        className="cursor-pointer menuIcon itemsToGetHoverEffect text-[#2aa8ff]"
      />
      <div className="flex items-center w-full gap-10 justify-between">
        <a href="/" className="font-bold text-[32px] text-[#2aa8ff]">
          Bot AI
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
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <nav
          className={`flex flex-col w-[250px] h-full ${
            isDarkModeChecked ? "bg-gray-950" : "bg-white"
          }`}
        >
          <div className="flex flex-col gap-[11px] items-center">
            <div
              onClick={() => {
                if (currentConversation?.[0]?.length > 0) {
                  setIsConfirmationModalOpen(true);
                } else {
                  setToShowPreviousConversations(false);
                  setIsFeedbackModalOpen(false);
                  setIsConfirmationModalOpen(false);
                }
              }}
              className="bg-gradient-to-r from-[#2aa8ff] to-white rounded-[10px] mt-0.5 w-[97%] active:scale-[0.97] itemsToGetBackgroundEffect text-black hover:text-white hover:from-[white] cursor-pointer py-[5px] flex justify-between gap-[22px] px-2.5 items-center"
            >
              <img
                src="/assets/logo1.png"
                alt="Logo"
                className="w-[33.58px] h-[32px] mt-[7px]"
              />
              <span className="text-[20px] font-medium leading-[22.98px]">
                New chat
              </span>
              <FaRegEdit style={{ width: "24px" }} className="mb-[0.09rem]" />
            </div>
            <div
              onClick={() => {
                if (currentConversation?.[0]?.length > 0) {
                  setIsConfirmationModalOpen(true);
                } else {
                  if (toShowPreviousConversations === true) {
                    setToShowPreviousConversations(false);
                  } else {
                    setToShowPreviousConversations(true);
                  }
                }
              }}
              className={`w-[185px] active:scale-[0.97] cursor-pointer text-white itemsToGetBackgroundEffect ${
                toShowPreviousConversations ? "bg-[#f31260]" : "bg-[#2aa8ff]"
              } rounded-[10px] py-[10px] text-center text-[16px] font-bold leading-[18.38px]`}
            >
              Past Conversations
            </div>
          </div>
        </nav>
      </Drawer>
    </div>
  );
};
