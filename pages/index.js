import Image from 'next/image'
import React, { useState } from "react";
import { Configuration, OpenAIApi } from 'openai'

const Home = () => {
  const [isShown, setIsShown] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [moveDown, setMoveDown] = useState(false);
  const [showStatic, setShowStatic] = useState(false);
  const [prompt, setPrompt] = useState("")
  const [result, setResult] = useState('')

  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY
  const configuration = new Configuration({apiKey: apiKey});
  const openai = new OpenAIApi(configuration);

  const generateImage = async () => {
    const response = await openai.createImage({
        prompt: prompt,
        n: 4,
        size: "512x512",
        // max_tokens: 2200,
    });
    const urls = response.data.data.map(item => item.url);
    setResult(urls);
  };

  const handleClick = () => {
    generateImage();
    setFadeOut(true);
    setTimeout(() => {
      setIsShown(false)
    }, 300);
    setTimeout(() => {
      setMoveDown(true)
    }, 600); 
    setTimeout(() => {
      setShowStatic(true)
    }, 1000); 
  }

  return (
    <>
      <main>
        <header></header>
        <div className="body">
          <div className='image-wrapper'>
            {result.length > 0 ? result.map((url, index) => <img key={index} className='result-image' src={url || ""} alt={`result ${index}`} />) : ""}
          </div>
            <input placeholder="prompt"name="prompt" type="text" onChange={(event) => { setPrompt(event.target.value) }}/>
            <button onClick={handleClick}> Generate </button>
            <div>
              <div>
                <button>Reprompt</button>
                <button>Reroll</button>
              </div>
            </div>
        </div>
      </main>
    </>
  )
}

export default Home