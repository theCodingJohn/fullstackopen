import React, { useState } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import { GET_BOOKS, GENRE_FILTER } from "../queries";
import FilterButton from "./FilterButton";

const Books = (props) => {
  const [genre, setGenre] = useState("allGenres");
  const result = useQuery(GET_BOOKS);
  const [getFilteredBooks, filteredBooks] = useLazyQuery(GENRE_FILTER);
  const genres = [
    "refactoring",
    "agile",
    "patterns",
    "design",
    "crime",
    "classic",
    "allGenres",
  ];

  if (!props.show) {
    return null;
  }

  if (result.loading || filteredBooks.loading) {
    return <div>loading...</div>;
  }

  const changeGenre = (genre) => {
    getFilteredBooks({ variables: { genre } });
    setGenre(genre);
  };

  const books =
    genre === "allGenres" || !filteredBooks.data
      ? result.data.allBooks
      : filteredBooks.data.allBooks;

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((genre, i) => (
        <FilterButton
          key={i}
          name={genre}
          handleClick={() => changeGenre(genre)}
        />
      ))}
    </div>
  );
};

export default Books;
