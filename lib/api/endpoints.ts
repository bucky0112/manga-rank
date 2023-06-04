const comment = '/point'

export const Endpoints = {
  Home: {
    NewRelease: '/manga/newstest',
    HighestRated: '/manga/awesome',
    TopSell: '/manga/top'
  },
  Manga: {
    Get: '/manga',
    Detail: '/manga/detail',
    NewRelease: '/manga/newstest',
    Category: '/manga/category'
  },
  User: {
    NewUser: '/user',
    Verify: '/user/verify',
    Login: '/session',
    GoogleLogin: '/oauth/google'
  },
  Search: {
    keywords: 'manga/search'
  },
  Comment: {
    Get: comment,
    New: comment,
    Delete: comment,
    Put: comment
  },
  agree: {
    post: '/agree'
  }
}
