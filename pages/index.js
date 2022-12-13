import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [audienceInput, setAudienceInput] = useState("");
  const [serviceInput, setServiceInput] = useState("");
  const [offerInput, setOfferInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    //console.log(JSON.stringify({ niche: nicheInput }));
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
         audience: audienceInput,
         service: serviceInput,
         offer: offerInput 
        }),
    });
    const data = await response.json();
    console.log(data)
    setResult(data.result.choices[0].text.trim())
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Barlow+Semi+Condensed&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Viga&display=swap" rel="stylesheet" />
      </Head>
      <main className={styles.main}>
        <h3>Facebook Ad Copy A.I. Helper</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="audience"
            placeholder="Enter an audience... e.g. young professionals"
            value={audienceInput}
            onChange={(e) => setAudienceInput(e.target.value)}
          />
          <input
            type="text"
            name="service"
            placeholder="Enter a service... e.g. buyers agent"
            value={serviceInput}
            onChange={(e) => setServiceInput(e.target.value)}
          />
          <input
            type="text"
            name="offer"
            placeholder="Enter an offer... e.g. Free Property Buyers Checklist"
            value={offerInput}
            onChange={(e) => setOfferInput(e.target.value)}
          />
          <input type="submit" value="Generate ad copy" />
        </form>
        <div className={styles.output}>
          <h4>Your Copy Suggestion:</h4>
          <div className={styles.resultWrapper}>
            <div className={styles.result}>{result}</div>
          </div>
        </div>
      </main>
    </div>
  );
}
