import Cookies from "js-cookie";
import { flow, makeAutoObservable } from "mobx";
import apiConst from "../../Constants/apiConst";
import Job from "../models/Job";
import ProfileDataModel from "../models/ProfileData";

class JobStore {
  jobsApiStatus = apiConst.initial;
  profileApiStatus = apiConst.initial;
  jobsData: Job[] = [];
  profileData: ProfileDataModel | null = null;
  jobTypes: string[] = [];
  salaryRange = "";
  searchKey = "";

  constructor() {
    makeAutoObservable(
      this,
      { getJobsData: flow.bound, getProfileData: flow.bound },
      { autoBind: true }
    );
  }

  private getFetchOptions() {
    const accessToken = Cookies.get("jwt_token");
    return {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };
  }

  *getJobsData(): Generator<any, any, any> {
    const { jobTypes, salaryRange, searchKey } = this;
    this.jobsApiStatus = apiConst.inProgress;

    const queryParams = [];
    queryParams.push(`employment_type=${jobTypes.join(",")}`);
    queryParams.push(`minimum_package=${salaryRange}`);
    queryParams.push(`search=${searchKey}`);

    const URL = `https://apis.ccbp.in/jobs?${queryParams.join("&")}`;
    console.log("Fetching jobs data ::", URL);
    const fetchOptions = this.getFetchOptions();
    const response = yield fetch(URL, fetchOptions);
    if (response.ok) {
      const data = yield response.json();
      this.jobsData = data.jobs.map((j: any) => new Job(j));
      this.jobsApiStatus = apiConst.success;
      console.log(`Successfully fetched ${data.total} items...`);
    } else {
      this.jobsApiStatus = apiConst.failure;
    }
  }

  *getProfileData(): Generator<any, any, any> {
    this.profileApiStatus = apiConst.inProgress;
    const fetchOptions = this.getFetchOptions();
    const URL = "https://apis.ccbp.in/profile";
    const response = yield fetch(URL, fetchOptions);
    if (response.ok) {
      const data = yield response.json();
      this.profileData = new ProfileDataModel(
        data.profile_details.name,
        data.profile_details.profile_image_url,
        data.profile_details.short_bio
      );
      this.profileApiStatus = apiConst.success;
    } else {
      this.profileApiStatus = apiConst.failure;
    }
  }
}

export default JobStore;
