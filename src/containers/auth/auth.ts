import axios from "axios";
import {
  getClientFromEmail,
  tryKeyCloakLogOut,
  tryKeyCloakLogin,
  tryKeyCloakRefresh,
} from "../../services/apiServices/apis/api";
// import {
//   tryKeyCloakLoginOptions,
//   tryLoginOptions,
// } from "../../services/interfaces";
import CryptoJS from "crypto-js";
import { activityState } from "@/configs/constants";
import { Cookies } from "react-cookie";
import { clearDB, fetchTokenFromDb } from "@/services/keycloackconfig.util";
import LocalDb from "@/services/dbServices/dbServices";

//Interface
export interface tryLoginOptions {
  username: string;
  password: string;
}
export interface tryKeyCloakLoginOptions {
  realm?: string;
  sname?: string;
  grant_type?: "password" | "refresh_token";
  username?: string;
  password?: string;
  refresh_token?: string;
}

const cookies = new Cookies();
const Authv2 = {
  isAuthenticated: activityState.LOADING,
  token: {},
  realm: "",
  client: "",
  userId: "",
  sname: "",
  timeOut: 0,
  generatedTime: new Date(),
  async tryLogin(options: tryLoginOptions, callback: Function) {
    const res: boolean = await handleClient(options.username);
    // debugger
    if (res) {
      const payload: tryKeyCloakLoginOptions = {
        username: options.username,
        password: options.password,
        grant_type: "password",
        sname: Authv2.client,
        realm: Authv2.realm,
      };
      const login: any = await tryKeyCloakLogin(payload);
      if (login.status === 200) {
        const token_data = {
          token_info: login.data,
          logged_time: Date.now(),
          username: options.username,
          tenant: Authv2.sname,
        };
        const tokenStore = LocalDb.loadLocalDB("token", "TokenList", 2);
        LocalDb.set(tokenStore, "TokenList", "dataCookie", {
          value: token_data,
          title: "TokenData",
        });
        // const realm = {
        //     sname: Authv2.client,
        //     realm: Authv2.realm,
        //     userId: Authv2.userId
        // }
        // var data = JSON.stringify({ realm })
        // var ciphertext = CryptoJS.AES.encrypt(data, 'ncs').toString();
        // cookies.set('ncs_rlm', ciphertext, { path: '/' });
        // window.localStorage.setItem("ncs_rlm", ciphertext);
        // const loginData = login.data
        // data = JSON.stringify({ loginData })
        // var ciphertext = CryptoJS.AES.encrypt(data, Authv2.userId).toString();
        // window.localStorage.setItem("ncs_ac", ciphertext);
        // cookies.set('ncs_ac', ciphertext, { path: '/' });
        Authv2.token = login.data;
        Authv2.isAuthenticated = activityState.SUCCESS;
        callback(true, login.data);
      } else {
        Authv2.isAuthenticated = activityState.ERROR;
        callback(false, "Invalid Username or Password");
      }
    } else {
      Authv2.isAuthenticated = activityState.ERROR;
      callback(false, "Invalid Username or Password");
    }
  },
  signIn(tokens: any, onSignInComplete: Function) {
    Authv2.isAuthenticated = activityState.SUCCESS;
    window.localStorage.setItem("ncs_ac", JSON.stringify(tokens));
    cookies.set("ncs_ac", JSON.stringify(tokens), {
      path: "/",
      domain: "localhost",
    });
    setTimeout(onSignInComplete, 100);
  },
  async checkClient(onCheckClientComplete: Function) {
    Authv2.isAuthenticated = activityState.LOADING;
    // console.log("tokenInfo", "Start")
    await fetchTokenFromDb()
      .then(async (tokenInfo: any) => {
        // console.log("tokenInfo", tokenInfo)
        if (tokenInfo.token_info.refresh_token) {
          const res: boolean = await handleClient(tokenInfo.username);
          if (res) {
            // console.log(tokenInfo, "tokenINffoooo")
            const payload: tryKeyCloakLoginOptions = {
              refresh_token: tokenInfo.token_info.refresh_token,
              grant_type: "refresh_token",
              sname: Authv2.client,
              realm: Authv2.realm,
            };

            const login: any = await tryKeyCloakRefresh(payload);
            // debugger
            if (login.status === 200) {
              const token_data = {
                token_info: login.data,
                logged_time: Date.now(),
                username: tokenInfo.username,
                tenant: Authv2.sname,
              };
              const tokenStore = LocalDb.loadLocalDB("token", "TokenList", 2);
              LocalDb.set(tokenStore, "TokenList", "dataCookie", {
                value: token_data,
                title: "TokenData",
              });
              Authv2.token = login.data;
              Authv2.isAuthenticated = activityState.SUCCESS;
            } else {
              Authv2.isAuthenticated = activityState.ERROR;
              Authv2.token = {};
              window.localStorage.clear();
              clearAxios();
            }
            // debugger
            // setTimeout(onCheckClientComplete(Authv2.token), 100);
          }
        } else {
          clearDB();
          Authv2.isAuthenticated = activityState.ERROR;
          Authv2.token = {};
          window.localStorage.clear();
          clearAxios();
          // setTimeout(onCheckClientComplete({}), 100);
        }
      })
      .catch((e: any) => {
        // console.log("tokenInfo", "Error")

        Authv2.isAuthenticated = activityState.ERROR;
        Authv2.token = {};
        window.localStorage.clear();
        clearAxios();
        // setTimeout(onCheckClientComplete({}), 100);
      })
      .finally(() => {
        // console.log("tokenInfo Finally")
      });
    // console.log("tokenInfo", Authv2.token)
    setTimeout(onCheckClientComplete(Authv2.token), 100);
  },
  async syncCookie(onSyncComplete: Function) {
    // var ncs_rlm: string = window.localStorage.getItem("ncs_rlm") || '';
    var ncs_rlm: string = cookies.get("ncs_rlm") || "";
    if (ncs_rlm) {
      var bytes = CryptoJS.AES.decrypt(ncs_rlm, "ncs");
      const rlm: any = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      // const ncs_ac = window.localStorage.getItem("ncs_ac");
      const ncs_ac = cookies.get("ncs_ac");
      if (ncs_ac) {
        var bytes = CryptoJS.AES.decrypt(ncs_ac, rlm.realm.userId);
        const tokens = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        Authv2.isAuthenticated = activityState.SUCCESS;
        Authv2.token = tokens.loginData;
      } else {
        Authv2.isAuthenticated = activityState.ERROR;
        Authv2.token = {};
        clearAxios();
        cookies.remove("ncs_rlm", { path: "/" });
      }
    } else {
      Authv2.isAuthenticated = activityState.ERROR;
      Authv2.token = {};
      clearAxios();
    }
    setTimeout(onSyncComplete(Authv2.token), 100);
  },
  async signOut(refresh_token: string, onSignOutComplete: VoidFunction) {
    // var ncs_rlm: string = window.localStorage.getItem("ncs_rlm") || '';
    var ncs_rlm: string = cookies.get("ncs_rlm") || "";
    if (ncs_rlm) {
      var bytes = CryptoJS.AES.decrypt(ncs_rlm, "ncs");
      const rlm: any = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      const payload: tryKeyCloakLoginOptions = {
        refresh_token: refresh_token,
        grant_type: "refresh_token",
        sname: rlm.realm.sname,
        realm: rlm.realm.realm,
      };
      const result = await tryKeyCloakLogOut(payload);
      clearAxios();
      clearDB();
      cookies.remove("ncs_rlm", { path: "/" });
      cookies.remove("ncs_ac", { path: "/" });
      Authv2.isAuthenticated = activityState.ERROR;
      Authv2.token = {};
      window.localStorage.clear();
    }
    cookies.remove("ncs_rlm", { path: "/" });
    cookies.remove("ncs_ac", { path: "/" });
    setTimeout(onSignOutComplete, 100);
  },
};
async function handleClient(email: string): Promise<boolean> {
  const response: any = await getClientFromEmail(email);
  if (response.status === 200) {
    Authv2.realm = response.data.realm;
    Authv2.client = response.data.sname;
    Authv2.userId = response.data.user_uuid;
    if (response.data.brand_sname) {
      Authv2.sname = response.data.brand_sname;
    }
    return true;
  } else {
    return false;
  }
}
const clearAxios = () => {
  delete axios.defaults.headers.common["Authorization"];
  cookies.remove("ncs_rlm", { path: "/" });
  cookies.remove("ncs_ac", { path: "/" });
};

export { Authv2, handleClient };
