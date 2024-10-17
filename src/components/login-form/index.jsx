import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";

import { usernameAtom } from "../../store";
import Spinner from "../spinner";

const LogInForm = () => {
  const [username, setUsername] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);
  const [showError, setShowError] = useState(false);

  const [, setStoreUsername] = useAtom(usernameAtom);

  const navigate = useNavigate();

  const nextHandler = useCallback(() => {
    if (username.length > 0) {
      setStoreUsername(username);
      setShowSpinner(true);

      let timer = setTimeout(() => {
        navigate("/login-password");
        return () => {
          clearTimeout(timer);
        };
      }, 3000);
    } else {
      setShowError(true);
    }
  }, [navigate, setStoreUsername, username]);

  return (
    <div>
      <div className="flex flex-col gap-1">
        <div className="text-PrimaryText text-sm font-medium leading-[22px]">
          Indirizzo email/numero di telefono
        </div>
        <div
          className={
            showError
              ? "flex items-center px-2.5 py-1.5 m-0 h-12 gap-2 border border-error hover:border-primaryHover rounded-[10px] transition-all duration-[250]"
              : "flex items-center px-2.5 py-1.5 m-0 h-12 gap-2 border border-disable hover:border-primaryHover rounded-[10px] transition-all duration-[250]"
          }
        >
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            name="username"
            autoCapitalize="off"
            spellCheck={false}
            autoComplete="username"
            className="leading-6 h-10 text-base font-medium p-0 m-0 text-textPrimary !bg-transparent border-none outline-none overflow-hidden w-full caret-PrimaryYellow"
          />
          <div
            className="inline-flex text-IconNormal w-5 h-5"
            onClick={() => setUsername("")}
          >
            {username.length > 0 && (
              <svg
                fill="iconNormal"
                className="bn-svg cursor-pointer text-[20px]"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-7.233 0l3.006 3.005-1.768 1.768L12 13.767l-3.005 3.005-1.768-1.768 3.005-3.005-3.005-3.005 1.768-1.767L12 10.23l3.005-3.005 1.768 1.767L13.767 12z"
                  fill="currentColor"
                ></path>
              </svg>
            )}
          </div>
        </div>
        {showError && (
          <div className="text-error text-sm leading-[22px]">
            Please enter a valid email or phone number. Spaces or special
            characters are not allowed for phone numbers.
          </div>
        )}
      </div>
      <button
        onClick={nextHandler}
        type="button"
        className="mt-6 px-4 text-base font-medium leading-6 rounded-[10px] h-12 min-h-12 w-full min-w-20 bg-BtnBg hover:opacity-80 text-TextOnYellow inline-flex justify-center items-center border-none cursor-pointer outline-none text-center"
      >
        {showSpinner ? <Spinner color="#202630" /> : <>Successivo</>}
      </button>
    </div>
  );
};

export default LogInForm;
