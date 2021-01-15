import { gql } from "@apollo/client";

const MUSICS = gql`
  query GetMusicList {
    getMusicList {
      _id
      author
      title
      avatar
      link
    }
  }
`;

const SEARCH_MUSIC = gql`
  mutation MusicSearch($text: String!) {
    musicSearch(text: $text) {
      author
      title
      avatar
      link
    }
  }
`;

const SAVE_MUSIC = gql`
  mutation SaveMusicSearch(
    $author: String!
    $title: String!
    $avatar: String!
    $link: String!
  ) {
    saveMusicSearch(
      author: $author
      title: $title
      avatar: $avatar
      link: $link
    ) {
      _id
      author
      title
      avatar
      link
    }
  }
`;

const GET_MUSIC_SEARCH = gql`
  mutation MusicSearchGet($link: String!) {
    musicSearchGet(link: $link)
  }
`;

export { MUSICS, SEARCH_MUSIC, GET_MUSIC_SEARCH, SAVE_MUSIC };
