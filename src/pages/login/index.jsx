import React from "react";
import AppFooter from "../../components/footer";
import QrGenerator from "../../components/qr-generator";
import LogInForm from "../../components/login-form";

const LogInPage = () => {
  return (
    <div className="flex flex-col items-center w-screen h-screen bg-BasicBg overflow-y-auto">
      <div className="inline-flex flex-1">
        <div className="pt-20 pb-12 px-6">
          <div className="w-[425px] min-h-[580px] p-10 border border-line rounded-3xl">
            <div className="mb-8">
              <img src="/binance-logo.png" alt="Binance Logo" width={140} />
            </div>
            <div className="flex justify-between mb-8">
              <h2 className="text-textPrimary text-[32px] leading-10 font-semibold">
                Accedi
              </h2>
              <QrGenerator />
            </div>
            <LogInForm />
            <div>
              <div className="mt-6 mb-2 flex items-center justify-between">
                <div className="h-px flex-1 bg-line" />
                <div className="text-sm leading-[22px] px-4 text-SecondaryText">
                  o
                </div>
                <div className="h-px flex-1 bg-line" />
              </div>
              <div className="flex flex-col gap-4">
                <button className="flex relative justify-center items-center text-base font-medium leading-6 h-12 px-4 min-w-20 rounded-[10px] w-full border border-line">
                  <img src="/logogoogle.png" alt="Google Logo" width={16} height={16} className="absolute left-4 top-1/2 -translate-y-1/2" />
                  <div className="leading-6 font-medium text-base text-textPrimary">Continua con Google</div>
                </button>
                <button className="flex relative justify-center items-center text-base font-medium leading-6 h-12 px-4 min-w-20 rounded-[10px] w-full border border-line">
                  <img src="/ios.png" alt="Google Logo" width={16} height={16} className="absolute left-4 top-1/2 -translate-y-1/2" />
                  <div className="leading-6 font-medium text-base text-textPrimary">Continua con Apple</div>
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-4 max-md:mt-6 text-base font-normal leading-6">
            <button className="text-sm font-medium leading-[22px] h-8 text-TextLink hover:text-BtnBg">Crea un account Binance</button>
          </div>
        </div>
      </div>
      <AppFooter />
    </div>
  );
};

export default LogInPage;
