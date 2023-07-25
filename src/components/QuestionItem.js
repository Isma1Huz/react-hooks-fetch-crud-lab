import React from "react";

function QuestionItem({ question, onDelete }) {
  console.log(question);
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleDelete(id) {
    fetch(`http://localhost:3000/questions/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({}), // Provide an empty JSON object as the body
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response or any UI updates here if needed
        console.log(data);
      })
      .catch((error) => {
        // Handle error if the DELETE request fails
        console.error(error);
      });
      onDelete()
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick={() => handleDelete(id)}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
