import React, { useState, useEffect } from "react";


const OAuth = () => {
  const [googleState, setGoogleState] = useState("")

  // useEffect(() => {
  //   console.log("googleState:", googleState);
  // }, [googleState]);

  const handleGoogleOAuth = () => {
    window.open(
      "https://x4cczk9r43.execute-api.ap-south-1.amazonaws.com/v1/oauth/google/register",
      "newwindows",
      "height=500, width=500, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no"
    );
    // 監聽
    window.addEventListener(
      "message",
      function (e) {
        console.log("e:", e.data);
        setGoogleState(e.data)
      },
      false
    );
  };

  // const handleGoogleOAuth = () => {
  //   const width = 500;
  //   const height = 500;
  //   const left = (window.innerWidth - width) / 2;
  //   const top = (window.innerHeight - height) / 2;

  //   const popup = window.open(
  //     "https://x4cczk9r43.execute-api.ap-south-1.amazonaws.com/v1/oauth/google/register",
  //     "newwindows",
  //     `height=${height}, width=${width}, top=${top}, left=${left}, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no`
  //   );

  //   const checkPopup = setInterval(() => {
  //     if (!popup || popup.closed) {
  //       clearInterval(checkPopup);
  //       setGoogleState(popup?.googleState);
  //     }
  //   }, 1000);
  // };

  
  // const handleGithubOAuth = () => {
  //   window.open(
  //     "https://x4cczk9r43.execute-api.ap-south-1.amazonaws.com/v1/oauth/github",
  //     "newwindows",
  //     "height=500, width=500, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no"
  //   );
  //   window.addEventListener(
  //     "message",
  //     function (e) {
  //       console.log("e:", e.data);
  //     },
  //     false
  //   );
  // };
  return (
    <div className="relative w-full h-full flex justify-center">
      <div className="self-center">
        <button
          className="py-1 px-2 bg-white rounded-md hover:bg-gray-100 transition-all"
          onClick={() => handleGoogleOAuth()}
        >
          Google
        </button>
        {/* <button
          className="py-1 px-2 bg-white rounded-md hover:bg-gray-100 transition-all"
          onClick={() => handleGithubOAuth()}
        >
          Github
        </button> */}
      </div>
    </div>
  );
};

export default OAuth;
