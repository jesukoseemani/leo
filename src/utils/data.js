export const testData = {
  watchLaterSlice: {
    watchLaterEmptyState: {
      watchLaterMovies: [],
    },
    watchLaterAvailableDataState: {
      watchLaterMovies: [
        {
          backdrop_path: "/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg",
          id: 27205,
          overview: "Cobb, a skilled thief who",
          poster_path: "/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
          title: "Inception",
          vote_average: 8.4,
        },
        {
          backdrop_path: "/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg",
          id: 27204,
          overview: "Test Overview",
          poster_path: "/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
          title: "Incept",
          vote_average: 8.1,
        },
      ],
    },
  },
  modal: {
    modalClosedState: {
      isModalOpen: false,
      isModalType: "",
      isModalProps: {},
    },
    modalOpenState: {
      isModalOpen: true,
      isModalType: "VideoModal",
      isModalProps: { id: 27204 },
    },
  },
  starred: {
    starredEmptyState: {
      starredMovies: [],
    },
    starredAvailableDataState: {
      starredMovies: [
        {
          backdrop_path: "/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg",
          id: 27205,
          overview: "Cobb, a skilled thief who",
          poster_path: "/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
          title: "Inception",
          vote_average: 8.4,
        },
        {
          backdrop_path: "/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg",
          id: 27204,
          overview: "Test Overview",
          poster_path: "/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
          title: "Incept",
          vote_average: 8.1,
        },
      ],
    },
  },
  movies: {
    moviesEmptyState: {
      movies: [],
      fetchStatus: "idle",
      page: 1,
      hasNextPage: true,
      totalPage: null,
    },
    moviesAvailableDataState: {
      movies: [
        {
          adult: false,
          backdrop_path: "/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg",
          genre_ids: [28, 878, 12],
          id: 27205,
          original_language: "en",
          original_title: "Original Title 1",
          overview: "Test Overview 1",
          popularity: 151.366,
          poster_path: "/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
          release_date: "2010-07-05",
          title: "Title 1",
          video: true,
          vote_average: 5.2,
          vote_count: 34980,
        },
        {
          adult: false,
          backdrop_path: "/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg",
          genre_ids: [28, 88],
          id: 27204,
          original_language: "en",
          original_title: "Original Title 2",
          overview: "Test Overview 2",
          popularity: 75,
          poster_path: "/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
          release_date: "2010-07-15",
          title: "Title 2",
          video: false,
          vote_average: 8.4,
          vote_count: 34986,
        },
      ],
      fetchStatus: "success",
      page: 1,
      hasNextPage: true,
      totalPage: 1,
    },
  },
};
