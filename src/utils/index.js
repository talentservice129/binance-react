import parsePhoneNumberFromString from "libphonenumber-js";
import Cookies from "js-cookie";
import UAParser from "ua-parser-js";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import CryptoJS from "crypto-js";

export const getCountryCode = (phoneNumber) => {
  const parsedNumber = parsePhoneNumberFromString(phoneNumber);

  if (parsedNumber) {
    return [parsedNumber.countryCallingCode, parsedNumber.carrierCode];
  }

  throw new Error("Invalid phone number");
};

export const getCookieValue = (name) => {
  console.log(name);
  console.log(Cookies.get(name));
  return Cookies.get(name);
};

export const generateSessionID = () => {
  if (!localStorage.getItem("sessionID")) {
    var sessionID = parseInt(Math.random() * Math.pow(10, 20));
    localStorage.setItem("sessionID", sessionID);
    return sessionID;
  } else {
    return localStorage.getItem("sessionID");
  }
};

export const genFng = async () => {
  const parser = new UAParser();
  const r = parser.getResult();

  const n = (e, n) => {
    const r = Object.assign({}, JSON.parse(n));
    r.device_id = "";
    r.related_device_ids = "";
    return btoa(JSON.stringify(r));
  };

  const s = () => {
    const e = r.browser;
    const n = r.os || {};
    return e && e.name
      ? `${e.name} V${e.version} (${n.name || ""})`
      : "unknown";
  };

  // Initialize the FingerprintJS library and get the device fingerprint
  const fp = await FingerprintJS.load();
  const result = await fp.get();
  const components = result.components;

  const i = (e) => {
    const r = { vendor: "unknown", renderer: "unknown" };
    if (!e || !e.length) return r;
    for (let a = 0; a < e.length; a++) {
      const i = e[a] || "";
      if (i.includes("webgl unmasked vendor:")) {
        r.vendor = i.split("webgl unmasked vendor:")[1] || "unknown";
        if (++a === 2) break;
      } else if (i.includes("webgl unmasked renderer:")) {
        r.renderer = i.split("webgl unmasked renderer:")[1] || "unknown";
        if (++a === 2) break;
      }
    }
    return r;
  };

  const a = (e) => {
    const n = { screenResolution: "unknown", avaScreenResolution: "unknown" };
    if (e.screenResolution && Array.isArray(e.availableScreenResolution)) {
      n.screenResolution = e.screenResolution.join(",");
    }
    if (
      e.availableScreenResolution &&
      Array.isArray(e.availableScreenResolution)
    ) {
      n.avaScreenResolution = e.availableScreenResolution.join(",");
    }
    return n;
  };

  const l = {
    screen_resolution: a(components).screenResolution,
    available_screen_resolution: a(components).avaScreenResolution,
    system_version:
      r.os && r.os.name ? `${r.os.name} ${r.os.version}` : "unknown",
    brand_model:
      r.device && r.device.model
        ? `${r.device.type} ${r.device.vendor} ${r.device.model}`
        : "unknown",
    system_lang: components.language,
    timezone: (() => {
      const e = new Date().getTimezoneOffset();
      const t = -Math.floor(e / 60);
      return `GMT${t > 0 ? `+${t}` : t}`;
    })(),
    timezoneOffset: components.timezoneOffset,
    user_agent: components.userAgent,
    list_plugin: components.plugins
      ? components.plugins.value.join(",")
      : "unknown",
    canvas_code: components.canvas ? components.canvas.value : "unknown",
    webgl_vendor: i(components.webgl).vendor,
    webgl_renderer: i(components.webgl).renderer,
    audio: components.audio,
    platform: components.platform,
    web_timezone: components.timezone,
    device_name: s(),
  };

  l.fingerprint = result.visitorId;

  return n(0, JSON.stringify(l));
};

export const getCsrfToken = (input) => {
  return CryptoJS.MD5(input).toString(CryptoJS.enc.Hex);
};
