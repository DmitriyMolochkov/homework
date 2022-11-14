//@ts-nocheck

async function getNews(): Promise<any> {
  const news = await this.app.newsService.getAllNews()
  for (const n of news) {
    const user = await this.app.userService.getUser(n.userId)
    n.userName = user ? user.name : 'anonimous'
    n.userStars = user ? await this.app.starsService.getUserStars(user) : 0
  }
  return news
}


function processNews(news: any, index = 0): Promise<any> {
  const n = news[index];

  return this.app.userService.getUser(n.userId)
    .then((user: any) => {
      n.userName = user ? user.name : 'anonimous'
      return new Promise(resolve => {
        if (user) {
          this.app.starsService.getUserStars(user)
            .then((status: any) => {
              n.userStars = status;
              resolve(undefined);
            });
        }
        else {
          n.userStars = 0;
          resolve(undefined);
        }
      }).then(() => {
        if ((news.length - 1) > index)
          return processNews(news, index + 1);
      })
    })

}

// Sequential news processing
export function getNewsWithoutAwaitV1(): Promise<any> {
  return this.app.newsService.getAllNews()
    .then((news: any) => processNews(news).then(() => news));
}

// Asynchronous news processing
export function getNewsWithoutAwaitV2(): Promise<any> {
  return this.app.newsService.getAllNews()
    .then((news: any) =>
      Promise.all(news.map((n: any) =>
          this.app.userService.getUser(n.userId)
            .then((user: any) => {
              n.userName = user ? user.name : 'anonimous'
              if (user) {
                return this.app.starsService.getUserStars(user)
                  .then((status: any) => {
                    n.userStars = status;
                  });
              }
              n.userStars = 0;
            })
        )
      ).then(() => news)
    );
}
