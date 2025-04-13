import React, { useState } from 'react'
import './Home.css'

import { Button } from "@/components/ui/button"
import { BsHammer } from "react-icons/bs"

import Instruction from "../components/ui/Instruction"

import { Link } from 'react-router-dom'

import ItemInput from '../components/ui/ItemInput'
import homepageSplash from '../images/craftsImage.png'
//import { SkeletonDemo } from "@/components/ui/skeleton"

import { CohereClientV2 } from 'cohere-ai';

import {
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
  } from "@/components/ui/menubar"

  const scrollToContent = () => {
    window.scrollTo({
        top: window.innerHeight * 10, 
        behavior: 'smooth', 
    });
};
function Home() {
    const [inputs, setInputs] = useState([
        { itemName: '', extraInfo: '' }
      ]);
      
      const addNewObjectInput = () => {
        setInputs([...inputs, { itemName: '', extraInfo: '' }]);
      };

      const handleInputChange = (index, field, value) => {
        const updatedInputs = [...inputs];
        updatedInputs[index][field] = value;
        setInputs(updatedInputs);
      };
      
      const generateCrafts = () => {
        const itemDescriptions = inputs
          .map((input, i) => {
            const base = `Item ${i + 1}: ${input.itemName || "Unnamed item"}`;
            const extra = input.extraInfo ? ` (Extra info: ${input.extraInfo})` : "";
            return base + extra;
          })
          .join('\n');
      
        const prompt = `You are an expert DIY crafting assistant. A user has the following items:\n${itemDescriptions}\n\nBased on this, suggest 3 upcycling craft projects:\n- One should be easy, one medium, and one hard difficulty.\n- Each craft must list the required materials (centered around the items listed) and provide step-by-step numbered instructions.\n- Separate each craft with the symbol: --*--*--`;
      
        run(prompt);
      };
      
      const [crafts, setCrafts] = useState([]);
      const [loading, setLoading] = useState(false);

      const cohere = new CohereClientV2({
        token: 'o6wravLGPwpZ5lT5EpXKPfMHTS3DjI5I7uU6VsRf',
      });
      
      const run = async (prompt) => {
        setLoading(true); // start loading
        try {
          const response = await cohere.chat({
            model: 'command-a-03-2025',
            messages: [{ role: 'user', content: prompt }],
          });
      
          const replyText = response.message.content[0].text;
          parseCraftsResponse(replyText);
        } catch (error) {
          console.error("Error fetching crafts:", error);
        } finally {
          setLoading(false); // stop loading
        }
      };

      const parseCraftsResponse = (responseText) => {
        const parsedCrafts = responseText.split('--*--*--').map((section) => {
            const difficultyMatch = section.match(/###\s+\*\*(.*?) Difficulty: (.*?)\*\*/);
            const materialsMatch = section.match(/\*\*Materials:\*\*([\s\S]*?)\*\*Instructions:\*\*/);
            const instructionsMatch = section.match(/\*\*Instructions:\*\*([\s\S]*)/);
    
            const difficulty = difficultyMatch?.[1]?.trim() || '';
            const title = difficultyMatch?.[2]?.trim() || '';
    
            const materials = materialsMatch?.[1]
                .split('-')
                .map(m => m.trim())
                .filter(Boolean);
    
            const instructions = instructionsMatch?.[1]
                .split(/\d+\.\s+/)
                .map(step => step.trim())
                .filter(Boolean);
    
            console.log(instructions)

            return {
                difficulty,
                title,
                materials,
                instructions
            };
        });
    
        setCrafts(parsedCrafts);  // Set the crafts state with the parsed data
    };
      
      
  
    return (
    <>
      
        <div className='header'>
            <h1 className='logo'>Upcycle</h1>
            <div className='menubar'>
                <Link to="/"><h2>Home</h2></Link>
            </div>
        </div>
        

        <div className='heroSectionContainer'>
            <div className="heroSection">
                <h1 className="giantText uniqueGiantText">Sustain <br />your craft</h1>
                <img src={homepageSplash} alt="Homepage Splash" className="heroImage" />
            </div>
            
            <div className="buttonContainer">
            <button className="scrollButton" onClick={scrollToContent}>
                Get Started
            </button>
           </div>
           <div className = "theProcess">
              <div className="theProcessItem">
              <h2 className = "theProcessNumber">1</h2>
                <div className = "theProcessText">
                  <h4 className = "theProcessText">Enter the items you want into our boxes</h4>
                </div>
              </div>
              <div className="theProcessItem">
                <h2 className = "theProcessNumber">2</h2>
                <div className = "theProcessText">
                  <h4 className = "theProcessText">Click the button to find crafts that fit your items</h4>
                </div>
              </div>
              <div className="theProcessItem">
              <h2 className = "theProcessNumber">3</h2>
                <div className = "theProcessText">
                <h4 className = "theProcessText">Follow the instructions to create your crafts</h4>
                </div>
              </div>
           </div>    
        </div> 
        
        <div className = 'addButtonContainer'> 
          <button onClick={() => {addNewObjectInput()}}><h3 className='addButton'>Add another item</h3></button>
        </div>
        <br/>
        <div className='objectInputContainer'>
            {inputs.map((input, index) => (
                <ItemInput
                key={index}
                itemName={input.itemName}
                extraInfo={input.extraInfo}
                onItemNameChange={(e) => handleInputChange(index, 'itemName', e.target.value)}
                onExtraInfoChange={(e) => handleInputChange(index, 'extraInfo', e.target.value)}
                />
            ))}
        </div>
        <div className = 'addButtonContainer'> 
          <button onClick={() => {generateCrafts()}}><h3 className='addButton'>Find crafts <BsHammer /></h3></button>
        </div>
        
        {/* This is where the instructions will be displayed */}
        <div className="craftsContainer">
        {loading ? (
            <h1>Loading crafts...</h1>
            ) : (
            crafts.map((craft, index) => (
                <Instruction 
                key={index} 
                title={craft.title} 
                difficulty={craft.difficulty} 
                instructions={craft.instructions.join(' ')} 
                materials={craft.materials.join(', ')} 
                />
            ))
            )}
            </div>
    </>
  )
}

export default Home
