import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

const Api = "http://localhost:3000/questions";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch(Api)
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  console.log(questions);

  function handleQuestionDelete(id) {
    // Perform the DELETE operation on the server first
    fetch(`${Api}/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // After successful deletion on the server, update the state in QuestionList
        setQuestions((prevQuestions) =>
          prevQuestions.filter((question) => question.id !== id)
        );
      })
      .catch((error) => {
        console.error("Error deleting question:", error);
      });
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question, index) => (
          <QuestionItem
            key={index}
            question={question}
            onDelete={() => handleQuestionDelete(question.id)}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
