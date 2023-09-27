'use client'

import Head from "next/head";
import { useState, useEffect } from "react";
import { useCompletion } from 'ai/react';
import styles from "./styles.module.scss";


export default function Home() {
  const [loadingState, setLoadingState] = useState(false);
  const {complete, completion, input, setInput, handleInputChange, stop} = useCompletion({api: "/api/completion", 
  onFinish: () => {
    setLoadingState(false);
  }, 
  onError: (error) => {
    setLoadingState(false);
  }});
  
  useEffect(() => {
    const responseTextarea = document.getElementById('result');
  if (responseTextarea) {
    // Check if the user has scrolled up
    const isUserScrolledUp = responseTextarea.scrollTop < responseTextarea.scrollHeight - responseTextarea.clientHeight;
    
    // If the user hasn't scrolled up, scroll to the bottom
    if (!isUserScrolledUp) {
      responseTextarea.scrollTop = responseTextarea.scrollHeight;
    }
  }
  }, [completion]); // Trigger the effect whenever 'completion' changes

  function handleSubmitButtonClick(event) {
    event.preventDefault();
    if(!loadingState) {
      setLoadingState(true);
      complete(input);
    }
    else {
      stop();
      setLoadingState(false);
    }
  }
  
  
  function ExplainerVideoButton() {
    return <a id="explainer-video-button" className={`${styles.button} ${styles.explainerVideoButton}`} target="_blank" href="https://learn.mbatraining.com.au/products/0342156b-44f7-4b3b-921e-824608b58d2e/categories/6f9bfd7c-bc14-4c9f-bc4b-fa8bf4ad0181/posts/494c8b2b-1e68-47ee-bf33-2e763304f36e">Watch Explainer Video</a>
  }
  


  function CheatsheetButton() {
    return <a id="cheatsheet-button" className={`${styles.button} ${styles.cheatsheetButton}`} target="_blank" href="https://docs.google.com/document/d/1PrMT_zrB6UF8v_2CzW8f_sVkKUlaltBD9-tl6enDO38/edit?usp=sharing">Ai Cheatsheet</a>
  }


  function RecipeButton(props) {
    return <button className={`${styles.button} ${styles.recipeButton}`} onClick={() => {setInput(props.prompt)}} value={props.prompt}>{props.buttonText}</button>
  }

 

  return (
    <div className={styles.all}>
      <Head>
        <title>MBA Ai Assistant</title>
      </Head>
      <header className={styles.header}>
        <h3>MEET YOUR ARTIFICIAL INTELLIGENCE ASSISTANT</h3>
        <h4>Watch the video below for instructions on how to use this A.I.</h4>
        <ExplainerVideoButton/>
      </header>
      <main className={styles.main}>
        <video autoPlay={true} loop={true} muted={true} playsInline={true} src="/matrix.mp4"></video>
        <div className={styles.grid}>
          <form className={styles.input}>
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
                  onChange={handleInputChange}
                />
              </div>
            </div>
            {loadingState ? (
              <button type="button" id="submit-button" onClick={handleSubmitButtonClick} className={`${styles.button} ${styles.loading}`}>
                Thinking
              </button>
            ) : (
              <button type="submit" id="submit-button" className={styles.button} onClick={handleSubmitButtonClick}>
                Ask Ai Assistant
              </button>
            )}
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
                    value={completion}
                />
                {loadingState ? (<button className={styles.stopButton} onClick={() => {stop(); setLoadingState(false)}}>Stop Generating</button>) : null}
              </div>
            </div>
            <div className={styles.buttonContainer}>
              <CheatsheetButton/>
            </div>
          </div>
        </div>
        
        <div className={styles.recipes}>
          <h3>Use a recipe by clicking on your task</h3>
          <div className={styles.recipeGrid}>
            <div className={styles.recipeItem}>
              <RecipeButton 
                buttonText="Audience Strategy Profile" 
                prompt={`I am creating an advertising campaign for (audience) who are struggling with (problem), want to (achieve outcome) and are considering (service type) as a solution.
                \nWe are creating a detailed messaging strategy document to understand the audience better before proceeding to create any advertisements. We are doing this by asking questions and brainstorming answers.
                \nHelp me complete this document by suggesting responses to the following questions. Repeat each question and Include at least 5 bullet point answers for each:
                \nWhat pains and problems is the target customer likely facing?
                \nIf the target customer does not find a solution, what consequences occur to their life?
                \nWhat is the customer likely doing or trying right now that is not helping to solve their problem?
                \nWhat is the potential best or “dream” outcome for this target customer?
                \nWhat frustrations, pains or feelings does the target customer want to avoid?
                \nHow does the customer want to feel after solving their problem and finding a solution?
                \nWhat other products, services or solutions are they potentially considering?
                \nWhat are some potential ways that our solution could be better than these other potential options?
                \nWhat are some short term or instant benefits for the customer after solving their problem?
                \nWhat are the long term or bigger holistic benefits of solving their problem?
                `}/>
              <h4>Provides an audience strategy profile</h4>
            </div>
            <div className={styles.recipeItem}>
              <RecipeButton 
                buttonText="Write A Facebook Ad" 
                prompt={`You are acting as an expert copywriter and digital marketer. Write 3 direct response facebook advertisements using these parameters: 
                \nTarget Audience = Trades Businesses. 
                \nDesire = Have more disposable income and financial abundance for themselves and their family. 
                \nProblem = Earning good revenue but not keeping much of their money. Paying too much in tax, expenses and operational costs. 
                \nSolution = Speaking to a Financial Coach. 
                \nOffer = Free “Wealthkeeping Plan” which is a tailored session with a financial advisor who will show them how to solve the problem using a proven strategy.
                \nSeparate each advertisement with a heading. Make one advertisement focused on the Target Audience’s frustrations, another focused on the desired outcome of the Target Audience and the last focused on a personal story of someone who the target audience would resonate with.
                \nUse simple conversational language in the voice of Frank Kern and use emojis to illustrate your points. End each advertisement with a call to action that creates urgency and scarcity that reminds the reader the importance of solving their problems now and not waiting.`
                }
                />
              <h4>Writes 3X Facebook Ads for you</h4>
            </div>
            <div className={styles.recipeItem}>
              <RecipeButton 
              buttonText="Imagine Niche Ideas" 
              prompt={`I am starting a new business venture, providing advertising lead generation services for businesses that are selling B2C offers priced above $3,000. 
              \nYou are helping me conduct market research into potential services offers that could be a fit for advertising on platforms like Facebook so that I can start approaching businesses to work with.
              \nGive me a list of 30 B2C products and services in the [INDUSTRY] industry that are above $3000. Include the general price range of each option and rate the demand for each of these options from a general B2C audience.
              \n—--------
              \nOR
              \n—--------
              \nGive me a list of 30 B2C products and services that solve (Audience Problem), that are suitable for Facebook Advertising and that are generally above $3000 in price point.
              `}/>
              <h4>Come up with potential niche ideas</h4>
            </div>
            <div className={styles.recipeItem}>
              <RecipeButton 
                buttonText="Write Landing Page" 
                prompt={`You are acting as an expert copywriter and digital marketer writing a landing page for the following audience.
                \nTarget Audience = Trades Businesses owners
                \nDesire = Have more disposable income and financial abundance for themselves and their family
                \nProblem = Earning good revenue but not keeping much of their money. Paying too much in tax, expenses and operational costs.
                \nSolution = Speaking to a Financial Coach.
                \nOffer = Free “Wealthkeeping Plan” which is a tailored session with a financial advisor who will show them how to solve the problem using a proven strategy
                \nThe landing page has the following elements that you must create copy for:
                \n1. Headline - A promise driven headline that clearly states the big benefit for the audience if they claim the offer. The headline should be centered around achieving their desired outcome without the pain and frustration of doing it on their own.
                \n2. Benefits Bullet Points - Four short benefit lines that are focused on solving the audience's problems, achieving their desires and accomplishing their goals. The benefits can focus on the speed, reliability and simplicity of results and should make big promises.
                \n3. Before and After Situation - A short paragraph on the typical struggles the audience is having before solving the problem followed by another paragraph of what the dream outcome could look like once solving the problem.
                \n4. Unique Mechanism - This is a section that makes the offer seem unique and talks about the tailored nature of the service and why it’s superior to alternative solutions and doing it on one’s own. The reader should feel that there is a science or system behind achieving the outcome that they will unlock should they choose to claim the offer.
                \n5. Who It’s For - This is a list of benefit points that qualifies the right type audience. The audience should be ready and willing to change their circumstances, make the most of the opportunity and be ready to dedicate the time to solving their problems.
                \n6. Call to Action - A call to action that creates urgency and scarcity that reminds the reader the importance of solving their problems now and not waiting. It should justify why now is the right time to take action on solving their problems with both a logical and emotional reason.
                \nWrite the copy for each of these 6 sections.
                \nUse simple but emotionally driven language in a similar style to direct response copywriters such as Frank Kern.
                `}/>
              <h4>Write copy for a landing page</h4>
            </div>
            <div className={styles.recipeItem}>
              <RecipeButton 
                buttonText="Provide Feedback" 
                prompt={`You're acting as an expert copywriting and direct response marketing coach who is reviewing a piece of written marketing.
                \nYour job is to review and critique the copy in terms of its effectiveness and likelihood to get results. You will supply a detailed breakdown with suggested improvements.
                \nYou will draw on industry best practice to inform your critique and suggest ways of saying things to be simpler, less passive, and more compelling for the reader. Draw on inspiration from great direct response marketers like Frank Kern when providing feedback or suggested changes.
                \nKey considerations when reviewing copy involve:
                \nContent Quality: Regardless of length or structure, good ad copy should be relevant, engaging, simple to understand and persuasive. Check for spammy or redundant phrases that would reduce the quality of the copy or for things that could be said in a simpler way.
                \nCall to Action (CTA): Good ad copy often includes a strong CTA, urging the audience to take a specific action. Assess the strength and clarity of the CTAs.
                \nCreativity and Uniqueness: High-performing ad copy often stands out from the crowd. Assess the uniqueness of the copy. Evaluate the creative aspects of the copy, such as unexpected twists, humor, or emotive language.
                \nGrammar and Style: Although the focus is not solely on traditional writing, basic grammar and style rules should still be respected for clarity and professionalism.
                \nConformity to Best Practices: While acknowledging that unconventional copy can be effective, you should still recognize industry-standard best practices for comparison.
                \nProvide a critique of the following copy and suggest at least 3 action items to make improvements:
                \n[INSERT COPY]
                `}/>
              <h4>Provides critique on any written copy</h4>
            </div>
            <div className={styles.recipeItem}>
              <RecipeButton 
                buttonText="Write Email" 
                prompt={`You are acting as an expert copywriter and digital marketer. Write a direct response email using these parameters:
                \nTarget Audience = Trades Businesses owners
                \nDesire = Have more disposable income and financial abundance for themselves and their family
                \nProblem = Earning good revenue but not keeping much of their money. Paying too much in tax, expenses and operational costs.
                \nSolution = Speaking to a Financial Coach.
                \nOffer = Free “Wealthkeeping Plan” which is a tailored session with a financial advisor who will show them how to solve the problem using a proven strategy
                \nUse simple conversational language in the voice of Frank Kern and end the email with a call to action that creates urgency and scarcity that reminds the reader the importance of solving their problems now and not waiting.
                `}/>
                <h4>Writes a marketing email for your offer</h4>
            </div>
            <div className={styles.recipeItem}>
              <RecipeButton 
                buttonText="Enhance Copy" 
                prompt={`You're acting as an expert copywriter and direct response marketing consultant who is re-writing a piece of written marketing for a client to make it more effective.
                \nYour job is to rewrite the copy to improve its effectiveness and likelihood to get leads for the client. You will supply an alternative version that is similar to the original but enhanced based on your expert advice.
                \nYou will draw on industry best practice to make the copy simpler, less passive, and more compelling for the reader. You will draw on inspiration from great direct response marketers like Frank Kern when making changes.
                \nKey considerations when re-writing the copy involve:
                \nContent Quality: Regardless of length or structure, good ad copy should be relevant, engaging, simple to understand and persuasive. Check for spammy or redundant phrases that would reduce the quality of the copy or for things that could be said in a simpler way.
                \nCall to Action (CTA): Good ad copy often includes a strong CTA, urging the audience to take a specific action. Assess the strength and clarity of the CTAs and if they are not present, add them.
                \nCreativity and Uniqueness: High-performing ad copy often stands out from the crowd. Look for ways to enhance the uniqueness of the copy such as unexpected twists, humor, use of similes or emotive language.
                \nGrammar and Style: Although the focus is not solely on traditional writing, basic grammar rules should still be respected for clarity and professionalism.
                \nConformity to Best Practices: While acknowledging that unconventional copy can be effective, you should still recognise industry-standard best practices for comparison.
                \nProvide an alternative version of the following copy and a detailed explanation of why the changes were made:
                \n[INSERT COPY]
                `}/>
              <h4>Enhances your copy by reviewing it.</h4>
            </div>
            <div className={styles.recipeItem}>
              <RecipeButton 
                buttonText="Write Benefit List" 
                prompt={`You are acting as an expert copywriter and digital marketer. Write me a list of benefits for the following offer.
                \nTarget Audience = Trades Businesses owners
                \nDesire = Have more disposable income and financial abundance for themselves and their family
                \nProblem = Earning good revenue but not keeping much of their money. Paying too much in tax, expenses and operational costs.
                \nSolution = Speaking to a Financial Coach.
                \nOffer = Free “Wealthkeeping Plan” which is a tailored session with a financial advisor who will show them how to solve the problem using a proven strategy
                \nInclude 10 examples of short term and long term benefits of claiming this offer and the effect that it could have on the Target Audience’s life circumstances.
                `}/>
              <h4>Writes a list of benefits for your offer</h4>
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
}
