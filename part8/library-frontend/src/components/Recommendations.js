import React, { useEffect, useState } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GENRE_FILTER, ME } from "../queries";

const Recommendations = ({ show }) => {
  const result = useQuery(ME);
  const [getUserBooks, userBooks] = useLazyQuery(GENRE_FILTER);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (userBooks.data) {
      setBooks(userBooks.data.allBooks);
    }
  }, [setBooks, userBooks]);

  useEffect(() => {
    if (result.data) {
      getUserBooks({ variables: { genre: result.data?.me?.favoriteGenre } });
    }
  }, [result.data, getUserBooks]);

  if (!show) {
    return null;
  }

  if (userBooks.loading) {
    return <div>loading...</div>;
  }
  console.log(books);
  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre{" "}
        <strong>{result.data.me.favoriteGenre}</strong>
      </p>
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
    </div>
  );
};

export default Recommendations;
