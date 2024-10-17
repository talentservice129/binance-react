import React, { useEffect, useState } from "react";
import AppFooter from "../../components/footer";
import { useAtom } from "jotai";
import { usernameAtom } from "../../store";
import LogInPasswordForm from "../../components/login-password-form";

const LogInPasswordPage = () => {
  const [storeUsername] = useAtom(usernameAtom);

  const [username, setUsername] = useState("");

  useEffect(() => {
    setUsername(storeUsername);
  }, [storeUsername]);

  return (
    <div className="flex flex-col items-center w-screen h-screen bg-BasicBg overflow-y-auto">
      <div className="inline-flex flex-1">
        <div className="pt-20 pb-12 px-6">
          <div className="w-[425px] min-h-[580px] p-10 border border-line rounded-3xl">
            <div className="mb-8">
              <img src="/binance-logo.png" alt="Binance Logo" width={140} />
            </div>
            <div className="flex flex-col justify-between gap-2 mb-8">
              <h2 className="text-textPrimary text-[32px] leading-10 font-semibold">
                Inserisci la tua password
              </h2>
              <div className="text-SecondaryText">
                {username.split("@")[0][0]}****@{username.split("@")[1]}
              </div>
            </div>
            <LogInPasswordForm />
            <div className="flex justify-center mt-6 max-md:mt-6 text-base font-normal leading-6">
              <button className="text-sm font-medium leading-[22px] h-8 text-TextLink hover:text-BtnBg">
                Hai dimenticato la password?
              </button>
            </div>
          </div>
        </div>
      </div>
      <AppFooter />
    </div>
  );
};

export default LogInPasswordPage;
