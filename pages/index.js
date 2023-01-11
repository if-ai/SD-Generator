import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import IFLogo from '../assets/iF-logo.png';

const Home = () => {
  // Don't retry more than 20 times
  const maxRetries = 20;
  const [input, setInput] = useState('');
  const [img, setImg] = useState('');
  const [retry, setRetry] = useState(0);
  const [retryCount, setRetryCount] = useState(maxRetries);
  const [isGenerating, setIsGenerating] = useState(false);
  // Add new state here
  const [finalPrompt, setFinalPrompt] = useState('');
  const [mod1, setMod1] = useState('');
  const [mod2, setMod2] = useState('');
  const [mod3, setMod3] = useState('');
  const [mod4, setMod4] = useState('');
  const [mod5, setMod5] = useState('');
  const [mod6, setMod6] = useState('');
  const [mod7, setMod7] = useState('');
  const [mod8, setMod8] = useState('');

  const onChange = (e) => {
    setInput(e.target.value);
  };

  const handleMod1Change = (e) => {
    setMod1(e.target.value);
  };

  const handleMod2Change = (e) => {
    setMod2(e.target.value);
  };

  const handleMod3Change = (e) => {
    setMod3(e.target.value);
  };

  const handleMod4Change = (e) => {
    setMod4(e.target.value);
  };

  const handleMod5Change = (e) => {
    setMod5(e.target.value);
  };

  const handleMod6Change = (e) => {
    setMod6(e.target.value);
  };

  const handleMod7Change = (e) => {
    setMod7(e.target.value);
  };

  const handleMod8Change = (e) => {
    setMod8(e.target.value);
  };

  const copyMod1ToInput = () => {
    setInput(input + mod1);
  };

  const copyMod2ToInput = () => {
    setInput(input + mod2);
  };

  const copyMod3ToInput = () => {
    setInput(input + mod3);
  };

  const copyMod4ToInput = () => {
    setInput(input + mod4);
  };

  const copyMod5ToInput = () => {
    setInput(input + mod5);
  };

  const copyMod6ToInput = () => {
    setInput(input + mod6);
  };

  const copyMod7ToInput = () => {
    setInput(input + mod7);
  };
  
  const copyMod8ToInput = () => {
    setInput(input + mod8);
  };

  const generateAction = async () => {
    console.log('Generating...');
    console.log(input);

      // Add this check to make sure there is no double click
      iF (isGenerating && retry === 0) return;

      setIsGenerating(true);
  
      if (retry > 0) {
        setRetryCount((prevState) => {
          if (prevState === 0) {
            return 0;
          } else {
            return prevState - 1;
          }
        });
  
        setRetry(0);
      }
      // Replace the prompt here 
      const finalInput = input.replace(/cristiano|cr7|ronaldo/gi, 'CrisRo07');
  
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'image/jpeg',
        },
        body: JSON.stringify({ input: finalInput}),
      });
  
      const data = await response.json();
  
      if (response.status === 503) {
        setRetry(data.estimated_time);
        return;
      }
  
      if (!response.ok) {
        console.log(`Error: ${data.error}`);
        setIsGenerating(false);
        return;
      }
  
      // Set final prompt here
      setFinalPrompt(input);
      // Remove content from input box
      setInput('');
      setImg(data.image);
      setIsGenerating(false);
  };

  const sleep = (ms) => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  };

  useEffect(() => {
    const runRetry = async () => {
      if (retryCount === 0) {
        console.log(`Model still loading after ${maxRetries} retries. Try request again in 5 minutes.`);
        setRetryCount(maxRetries);
        return;
        }

      console.log(`Trying again in ${retry} seconds.`);

      await sleep(retry * 1000);

      await generateAction();
    };

    if (retry === 0) {
      return;
    }

    runRetry();
  }, [retry]);
	

  return (
    <div className="root">
      <Head>
        <title>Ronaldo Picture Creator</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>CR7 Generator</h1>
          </div>
          <div className="header-subtitle">
            <h2>
              <center>
                To construct the prompt start with the first box select something and copy to input until you reach the Object Dropdown. Then write what you want to create in the input field and continue adding with the rest of the boxes Finally click the Generate button to create your image.
              </center>
            </h2>
          </div> 
          <br />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <select value={mod1} onChange={handleMod1Change}>
              <option value="">Adjective</option>
              <option value="a beautiful ">a beautiful</option>
              <option value="an epic ">an epic</option>
              <option value="an awesome ">an awesome</option>
              <option value="a glorious ">a glorious</option>
              <option value="a magnificent ">a magnificent</option>
              <option value="a gorgeous ">a gorgeous</option>
              <option value="a fantastic ">a fantastic</option>
              <option value="a splendid ">a splendid</option>
              <option value="a marvelous ">a marvelous</option>
              <option value="a wonderful ">a wonderful</option>
              <option value="a cute and adorable ">cute and adorable</option>
            </select>
            <button onClick={copyMod1ToInput}>Copy to input</button>
            <select value={mod2} onChange={handleMod2Change}>
              <option value="">Aesthetic</option>
              <option value="cyberpunk ">cyberpunk</option>
              <option value="retro ">retro</option>
              <option value="vaporwave ">vaporwave</option>
              <option value="retrowave ">retrowave</option>
              <option value="futuristic ">futuristic</option>
              <option value="Mediaval age ">Mediaval</option>
              <option value="Bronce age ">Bronce age</option>
              <option value="prehistoric age ">Pre-History</option>
              <option value="steampunk ">steampunk</option>
              <option value="fantasy ">fantasy</option>
              <option value="scifi ">scifi</option>
              <option value="anime ">anime</option>
              <option value="manga ">manga</option>
              <option value="realistic ">realistic</option>
              <option value="cartoon ">cartoon</option>
              <option value="comic ">comic</option>
              <option value="abstract ">abstract</option>
              <option value="pixel art ">pixel art</option>
              <option value="vector art ">vector art</option>
              <option value="photorealistic ">photorealistic</option>
            </select>
            <button onClick={copyMod2ToInput}>Copy to input</button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <select value={mod3} onChange={handleMod3Change}>
              <option value="">Framing</option>
              <option value="Full shot ">Full shot</option>
              <option value="close-up shot ">close-up shot</option>
              <option value="medium shot ">Mid Shot</option>
              <option value="over-the-shoulder shot ">Over the shoulder</option>
              <option value="long shot ">Long shot</option>
              <option value="Extreme close-up shot ">Extreme close-up shot</option>
              <option value="High angle ">High angle</option>
              <option value="ground level shot ">ground level shot</option>
              <option value="Low angle ">Low angle</option>
              <option value="Dutch angle shot ">Dutch shot</option>
              <option value="top-down view ">top-down view</option>
              <option value="aerial view ">aerial</option>
              <option value="3/4 view ">3/4 view </option>
              <option value="tilt shift ">tilt shift</option>
              <option value="tilt shot ">tilt shot</option>
              <option value="birds-eye-view shot ">Sbirds-eye-view shot</option>
              <option value="POV shot ">POV shot</option>
              <option value="deep focus ">deep focus</option>
              <option value="macro shot ">macro shot</option>
              <option value="long exposure ">long exposure</option>
              <option value="Bokeh ">Bokeh</option>
              <option value="FOV 90 degrees ">FOV 90 degrees</option>
            </select>
            <button onClick={copyMod3ToInput}>Copy to input</button>
            <select value={mod4} onChange={handleMod4Change}>
              <option value="">Object</option>
              <option value="painting of ">painting of</option>
              <option value="photo of ">photo of</option>
              <option value="Illustration of ">illustration of</option>
              <option value="concept art of ">concept art of</option>
              <option value="render of ">render of</option>
              <option value="photoshoot of ">photoshoot of</option>
              <option value="cover illustration of ">cover</option>
              <option value="3d render ">3d render</option>
            </select>
            <button onClick={copyMod4ToInput}>Copy to input</button>
          </div>
          <br />
          <div className="prompt-container">
            <input className="prompt-box" value={input} onChange={onChange} />
            <div className="prompt-buttons">
              <a
                className={
                  isGenerating ? 'generate-button loading' : 'generate-button'
                }
                onClick={generateAction}
              >
                <div className="generate">
                  {isGenerating ? (
                    <span className="loader"></span>
                  ) : (
                    <p>Generate</p>
                  )}
                </div>
              </a>
            </div>
          </div>
          <br />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <select value={mod5} onChange={handleMod5Change}>
              <option value="">Artist Comb</option>
              <option value="by Ed Blinkey, Atey Ghailan, Studio Ghibli, Jeremy Mann, Greg Manchess, Antonio Moro, Greg Rutkowski, ">Illustration A</option>
              <option value="by James Gurney, james jean and artgerm, brian despain, alberto mielgo, greg rutkowski, wlop, ilya kuvshinov, ">Illustration B</option>
              <option value="by Loish, Guweiz, Yoji Shinkawa, Greg Rutkowski, Juan Gimenes, Ian McQue, and James Gurney,  ">Illustration C</option>
              <option value="by Greg Manchess, Greg Rutkowski, James Jean, and James Gurney, ">Illustration D</option>
              <option value="by Yoshitaka Amano, Kōji Watanabe, Tetsuya Nomura, Atsushi Nakamura, Takeshi Obata, Yusuke Murata, Hirokazu Kojima, Yoko Taro, ">Manga Team,</option>
              <option value="by Jillian Tamaki, Tillie Walden, Gabriel Ba, John Pham, Joe Sacco, Brian K. Vaughan, Raina Telgemeier, Jeff Lemire, ">Graphic Novel F</option>
              <option value="by Ansel Adams, Dorothea Lange, Henri Cartier-Bresson, Robert Capa, Cindy Sherman, ">Photo Team</option>
              <option value="by David Fincher, Christopher Nolan, Quentin Tarantino, Martin Scorsese, David Lynch, Stanley Kubrick, Steven Spielberg, ">Director Team</option>
              <option value="by Wong Kar-Wai, Roger Deakins, Emmanuel Lubezki, Roger Pratt, Janusz Kaminski, Roger A. Deakins, David Lynch, Stanley Kubrick, Spielberg, ">Cinematic Team</option>
              <option value="by Jean baptiste monge, ">Animal Team</option>
              <option value="by Carvagio, jhon singer Sargent">Classic Painter Team</option>
              <option value="by Leonardo Da Vinci, Michelangelo, Raphael, Rembrandt, Caravaggio, ">Renaissance Team</option>
              <option value="by Norman Rockwell, J.C Leyendecker,  Maxfield Parrish, Howard Pyle, N.C. Wyeth, John Held Jr, ">Old Timer Team</option>
              <option value="by Edgar Degas, Pablo Picasso, Vincent Van Gogh, Claude Monet, Paul Cezanne, Paul Gauguin, Henri Matisse, ">Impressionist Team</option>
              <option value="by Pablo Picasso, Salvador Dali, Joan Miro, Henri Matisse, ">Modernist Team</option>
              <option value="by Andy Warhol, Roy Lichtenstein, ">Pop Art Team</option>
              <option value="by Jackson Pollock, Mark Rothko, ">Abstract Expressionist Team</option>
              <option value="by Moebius, Ghibli, artgerm, James Gurney , Guweiz,  Greg Rutkowski, Yoji Shinkawa, wlop, ilya kuvshinov, Luis Royo, Frank Frazzetta,  ">Overpowered meant to mix</option>
            </select>
            <button onClick={copyMod5ToInput}>Copy to input</button>
            <select value={mod6} onChange={handleMod6Change}>
              <option value="">lighting</option>
              <option value="Dramatic lighting ">Dramatic</option>
              <option value="Soft lighting ">Soft</option>
              <option value="Surreal lighting ">Surreal</option>
              <option value="Realistic lighting ">Realistic</option>
              <option value="Cinematic lighting ">Cinematic</option>
              <option value="Dynamic lighting ">Dynamic</option>
              <option value="Natural lighting ">Natural</option>
              <option value="volumetric lighting ">volumetric lighting</option>
              <option value="studio lighting ">Studio</option>
              <option value="backlight ">backlight</option>
              <option value="rim light ">rim</option>
              <option value="hard light ">hard</option>
              <option value="Global illumination ">GI </option>
              <option value="Bokeh ">Bokeh</option>
              <option value="HDR ">HDR</option>
              <option value="Neon lights ">Neon</option>
            </select>
            <button onClick={copyMod6ToInput}>Copy to input</button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <select value={mod7} onChange={handleMod7Change}>
              <option value="">Flair</option>
              <option value="trending on ArtStation, trending on CGSociety, Intricate, High Detail ">Flair 1</option>
              <option value="masterpiece, best quality, a colorful, 8k, intricate detail, ">Flair 2</option>
              <option value="warm colors, 8K, 3D behance, HD, octane, rendered with photoshop filter. unreal engine 5 ">Natural</option>
              <option value="colorful,  ">volumetric lighting</option>
              <option value="studio lighting ">Studio</option>
              <option value="backlight ">backlight</option>
              <option value="rim light ">rim</option>
              <option value="hard light ">hard</option>
              <option value="cinematic lighting ">cinematic </option>
            </select>
            <button onClick={copyMod7ToInput}>Copy to input</button>
            <select value={mod8} onChange={handleMod8Change}>
              <option value="">Negative</option>
              <option value=":2 | gross proportions, malformed limbs, ugly, blurry, deformed, disfigured, mutation, mutated, mutilated, extra limbs, extra fingers, extra arms, extra legs, fused fingers, too many fingers, long neck, Photoshop, video game, 3d render, tiling, wierd colors, cross-eye,close up, out of frame, body out of frame, duplicate, cloned face, 3d, deformed, disfigured, mutated hands, mutilated, morbid, mutated hands:-2 ">V2 Negative1</option>
              <option value=":2 | ugly, bad anatomy, bad art, frame, deformed, disfigured, extra limbs, extra head, text,meme, low quality, mutated, ordinary, overexposed, pixelated, poorly drawn, signature, thumbnail, too dark, too light, unattractive, useless, watermark, writing:-2 ">V2 Negative2</option>
              <option value=":2 | nude, black and white, close up, cartoon, 3d, denim, (disfigured), (deformed), (poorly drawn), (extra limbs), blurry, boring, sketch, lackluster, signature, letters, watermark, low res , horrific , mutated , artifacts , bad art , gross , b&w , poor quality , low quality , cropped:-2 ">V1 Negative1</option>
              <option value=":2 | nsfw, lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry, artist name, ((((ugly)))), (((duplicate))), ((morbid)), ((mutilated)), [out of frame], extra fingers, mutated hands, ((poorly drawn hands)), ((poorly drawn face)), (((mutation))), (((deformed))), ((ugly)), blurry, ((bad anatomy)), (((bad proportions))), ((extra limbs)), cloned face, (((disfigured))), out of frame, ugly, extra limbs, (bad anatomy), gross proportions, (malformed limbs), ((missing arms)), ((missing legs)), (((extra arms))), (((extra legs))), mutated hands, (fused fingers), (too many fingers), (((long neck))):-2 ">V1 Negative2</option>
            </select>
            <button onClick={copyMod8ToInput}>Copy to input</button>
          </div>
        </div>
        <br />
        {/* Add output container */}
        {img && (
          <div className="output-content">
            <Image src={img} width={512} height={512} alt={input} />
            {/* Add prompt here */}
            <p>{finalPrompt}</p>
          </div>
        )}
      </div>
      <div className="badge-container grow">
        <a
          href="https://Impactframes.art"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={IFLogo} alt="IF logo" />
            <p>build with IF</p>
          </div>
        </a>
      </div>
    </div>
  );
}; 

export default Home;
