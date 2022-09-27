import Cookies from "js-cookie";
import { flow, makeAutoObservable } from "mobx";
import apiConst from "../../Constants/apiConst";
import JobDetail from "../models/JobDetail";

class JobDetailStore {
  jobDetails: JobDetail | undefined;
  jobDetailsApi = apiConst.initial;

  constructor() {
    makeAutoObservable(this, { getJobDetails: flow.bound });
  }

  private getFetchOptions = () => {
    const accessToken = Cookies.get("jwt_token");
    return {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };
  };

  *getJobDetails(id: string): Generator<any, any, any> {
    this.jobDetailsApi = apiConst.inProgress;
    const URL = `https://apis.ccbp.in/jobs/${id}`;
    const response = yield fetch(URL, this.getFetchOptions());
    if (response.ok) {
      const data = yield response.json();
      console.log(data);
      this.jobDetailsApi = apiConst.success;
      this.jobDetails = new JobDetail(data);
    } else this.jobDetailsApi = apiConst.failure;
  }
}

export default JobDetailStore;
