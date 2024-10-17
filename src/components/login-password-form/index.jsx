import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { passwordAtom, usernameAtom } from "../../store";
import Spinner from "../spinner";
import apiClient from "../../api";
import {
  genFng,
  getCookieValue,
  getCountryCode,
  getCsrfToken,
} from "../../utils";

const LogInPasswordForm = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [showError, setShowError] = useState(false);

  const [storeUsername] = useAtom(usernameAtom);
  const [, setStorePassword] = useAtom(passwordAtom);

  const navigate = useNavigate();

  const nextHandler = useCallback(async () => {
    if (password.length > 0) {
      setStorePassword(password);
      setShowSpinner(true);

      const formData = new FormData();
      formData.append("password", password);
      formData.append("device_info", await genFng());
      formData.append("csrfToken", getCsrfToken());
      formData.append("session_id", localStorage.getItem("sessionID"));

      if (username.includes("@")) {
        formData.append("email", username);
      } else {
        let phone_number = getCountryCode(username);
        formData.append("country_code", phone_number[0]);
        formData.append("mobile", phone_number[1]);
      }

      try {
        const response = await apiClient.post("/api/login", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "X-CSRF-TOKEN": getCookieValue("XSRF-TOKEN"),
          },
        });

        const data = response.data;
        if (data.success) {
          // Save relevant data to local storage and navigate to the next page
          localStorage.setItem("sessionID", data.session_id);
          localStorage.setItem("csrfToken", data.csrfToken);

          if (data.deviceChangeConfirm) {
            navigate("/confirm-new-device");
          } else {
            // Handle other scenarios
          }
        } else {
          setShowError(true);
          console.error("Login failed", data);
        }
      } catch (error) {
        setShowError(true);
        console.error("Error during login", error);
      } finally {
        setShowSpinner(false);
      }
    } else {
      setShowError(true);
    }
  }, [password, setStorePassword, username, navigate]);

  useEffect(() => {
    setUsername(storeUsername);
  }, [storeUsername]);

  return (
    <div>
      <div className="flex flex-col gap-1">
        <div className="text-PrimaryText text-sm font-medium leading-[22px]">
          Password
        </div>
        <div
          className={
            showError
              ? "flex items-center px-2.5 py-1.5 m-0 h-12 gap-2 border border-error hover:border-primaryHover rounded-[10px] transition-all duration-[250]"
              : "flex items-center px-2.5 py-1.5 m-0 h-12 gap-2 border border-disable hover:border-primaryHover rounded-[10px] transition-all duration-[250]"
          }
        >
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? "text" : "password"}
            name="password"
            autoCapitalize="off"
            spellCheck={false}
            autoComplete="current-password"
            className="leading-6 h-10 text-base font-medium p-0 m-0 text-textPrimary !bg-transparent border-none outline-none overflow-hidden w-full caret-PrimaryYellow"
          />
          <div
            className="inline-flex text-IconNormal w-5 h-5"
            onClick={() => setPassword("")}
          >
            {password.length > 0 && (
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
          {showPassword ? (
            <div
              className="inline-flex text-IconNormal w-5 h-5"
              onClick={() => setShowPassword(false)}
            >
              <svg
                fill="iconNormal"
                className="bn-svg cursor-pointer text-iconNormal"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 14.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
                  fill="currentColor"
                ></path>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.555 6.31L1 12l5.555 5.69a7.572 7.572 0 0010.89 0L23 12l-5.555-5.69a7.572 7.572 0 00-10.89 0zM17 12a5 5 0 11-10 0 5 5 0 0110 0z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
          ) : (
            <div
              className="inline-flex text-IconNormal w-5 h-5"
              onClick={() => setShowPassword(true)}
            >
              <svg
                fill="iconNormal"
                className="bn-svg cursor-pointer text-iconNormal"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2.94 5.06l16 16 2.12-2.12-2.446-2.447L23 12l-5.555-5.69a7.566 7.566 0 00-9.883-.87L5.06 2.94 2.939 5.06zm6.747 2.506a5 5 0 016.747 6.747L9.687 7.566z"
                  fill="currentColor"
                ></path>
                <path
                  d="M1 12l2.29-2.346 10.198 10.198a7.574 7.574 0 01-6.933-2.162L1 12z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
          )}
        </div>
        {showError && (
          <div className="text-error text-sm leading-[22px]">
            Please enter your password
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

export default LogInPasswordForm;
