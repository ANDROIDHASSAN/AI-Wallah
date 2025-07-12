import React, { useState } from "react";
import { URL } from "./constants";
import Answer from "./components/answers";

const App = () => {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState(undefined);

  const payload = {
    contents: [
      {
        parts: [
          {
            text: question,
          },
        ],
      },
    ],
  };
  const askQuestion = async () => {
    let response = await fetch(URL, {
      method: "POST",
      body: JSON.stringify(payload),
    });

    response = await response.json();

    let datastring = response.candidates[0].content.parts[0].text;
    datastring = datastring.split("* ");
    datastring = datastring.map((item) => item.trim());

    setResult(datastring);
  };

  return (
    <div className="grid grid-cols-5">
      <div className="h-screen col-span-1 bg-zinc-800"></div>
      <div className="col-span-4 p-10">
        <div className="container mb-5 overflow-y-scroll h-110 scroll-smooth scrollbar-hide ">
          <div className="text-white ">
            <ul>
              {result &&
                result.map((item, index) => (
                  <li className="p-1 text-left">
                    <Answer ans={item} key={index} />
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <div className="flex w-1/2 h-16 p-1 pr-5 m-auto text-white border bg-zinc-800 rounded-4xl border-zinc-700 ">
          <input
            type="text"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder="Ask me Anything"
            className="w-full h-full p-3 outline-none "
          ></input>
          <button onClick={askQuestion}>Ask</button>
        </div>
      </div>
    </div>
  );
};

export default App;
