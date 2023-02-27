export const Endpoints = {
  Home: {
    NewRelease: "/manga/newstest",
    HighestRated: "/manga/awesome",
    TopSell: "/manga/top",
  },
  Manga: {
    Get: "/manga",
    Detail: "/manga/detail",
    NewRelease: "/manga/newstest",
  },
  User: {
    NewUser: "/user",
    Verify: "/user/verify",
    Login: "/session",
    GoogleLogin: "/oauth/google",
  },
  Search: {
    keywords: "manga/search",
  }
}

// https://x4cczk9r43.execute-api.ap-south-1.amazonaws.com/v1/oauth/google