import Head from "next/head";
import { useState } from "react";
import styles from "./styles.module.scss";

export default function Home() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    let button = document.getElementById("submit-button")
    button.value = "Loading..."
    event.preventDefault();
    //console.log(JSON.stringify({ niche: nicheInput }));
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
         input: input,
        }),
    });
    const data = await response.json();
    console.log(data)
    setResult(data.result.choices[0].text.trim())
    button.value = "ASK YOUR Ai ASSISTANT"
  }

  // async function copy() {
  //   let textareaElement = document.getElementById("result");
  //   let button = document.getElementById("copy-button")
  //   // Select the text inside the textarea
  //   //textareaElement.select();

  //   // Copy the text to the clipboard
  //   await navigator.clipboard.writeText(textareaElement.value);

  //   button.innerHTML = "Copied!"
  //   setTimeout(() => {
  //     button.innerHTML = "Copy This Text"
  //   }, "5000")
  //}

  return (
    <div className={styles.all}>
      <Head>
        <title>MBA Ai Assistant</title>
        <link rel="icon" href="/MBA PNG LOGO.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Barlow+Semi+Condensed:wght@400;700;900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Viga&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Passion+One&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Blinker&display=swap" rel="stylesheet" />

      </Head>
      <header className={styles.header}>
        <h3>MEET YOUR ARTIFICIAL INTELLIGENCE ASSISTANT</h3>
        {/* <h4>Watch the below for instructions on how to use this A.I.</h4>
        <button>Watch Explainer Video</button> */}
      </header>
      <main className={styles.main}>
        <video autoPlay={true} loop={true} muted={true} playsInline={true}>
          <source src="https://player.vimeo.com/progressive_redirect/playback/781795783/rendition/540p/file.mp4?loc=external&signature=9da22a11712585ca4080f35dea5521544ce358a0a5155ef2d11fd0a3ebf85af8" type="video/mp4"/>
        </video>
        <div className={styles.grid}>
          <form onSubmit={onSubmit} className={styles.input}>
            <div>
              <h3>Human</h3>
              <h4>Input a detailed question, request or recipe and the Ai Assistant will respond to help.</h4>
              <div className={styles.inputWrapper}>
                <textarea
                  type="text"
                  rows={20}
                  name="audience"
                  placeholder={`Write Your Request Here

                  The more detailed your request, the more specific the Ai will be in giving you a response.

                  You can ask it to adapt it's responses by copying them and pasting them here with new instructions.`}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
              </div>
            </div>
            <input id="submit-button" type="submit" value="ASK YOUR Ai ASSISTANT" />
          </form>
          <div className={styles.output}>
            <div>
              <h3>Ai Assistant</h3>
              <h4>Copy & Paste the response. Use it to enhance your ideas or ask it to make new versions.</h4>
              <div className={styles.resultWrapper}>
                <textarea 
                    readOnly={true}
                    type="text"
                    rows={20}
                    name="result"
                    id="result"
                    className={styles.result}
                    placeholder={`A message from the Ai

                    My suggestions should be improved on by you, the human.

                    I am designed to be a smart tool to give you ideas, accelerate your work and help you with research.

                    I am not a replacement for human intelligence.`}
                    value={result}
                />
              </div>
              {/* <div className={styles.revisionWrapper}>
                <textarea
                  type="text"
                  rows={5}
                  name="revisions"
                  id="revisions"
                  className
                />
              </div> */}
              
            </div>
            {/* <button id="copy-button" onClick={copy}>Copy This Text</button> */}
          </div>
        </div>
      </main>
    </div>
  );
}
