import React, { useState } from 'react'
import './Home.css'

import { Button } from "@/components/ui/button"
import { BsHammer } from "react-icons/bs"
import { TbRecycle } from "react-icons/tb"

import Instruction from "../components/ui/Instruction"

import { Link } from 'react-router-dom'

import Login from '../components/ui/Login'

import { supabase } from '../backend/SupabaseClient'

import ItemInput from '../components/ui/ItemInput'
import homepageSplash from '../images/craftsImage.png'

import { SkeletonDemo } from '../components/ui/SkeletonDemo'



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
      
          const prompt = `You are an expert DIY crafting assistant.

          A user has the following items:
          ${itemDescriptions}
          
          Based on these items, suggest exactly 3 **distinct** upcycling craft projects:
          - One should be **Easy**, one **Medium**, and one **Hard** difficulty.
          - Each project must include these **three clearly labeled sections**, in **this exact order**:
            1. **Difficulty** (just the word: Easy, Medium, or Hard — no extra text)
            2. **Materials** (a bulleted list using "- ", focused on the user's items)
            3. **Instructions** (a numbered list starting with "1. ", with clear step-by-step guidance)
          
          Important formatting rules:
          - Title the project with this format exactly (no variation):  
            \`### Project X: <Title> (<Difficulty>)\`  
            For example: \`### Project 2: Bottle Lamp (Medium)\`
          - Use **exactly** this delimiter between each project:  
            \`--*--*--\` (on its own line)
          - Each section header must be: \`**Difficulty**:\`, \`**Materials**:\`, or \`**Instructions**:\` (spelled exactly like this, with the colon and bold asterisks).
          - Do **not** include any extra commentary, explanations, or greetings.
          - Leave one blank line between sections within each project.
          
          Your response should look exactly like this (with content substituted):
          
          ### Project 1: Cool Title (Easy)  
          **Difficulty**: Easy  
          
          **Materials**:  
          - Item 1  
          - Item 2  
          
          **Instructions**:  
          1. Do the first thing  
          2. Do the second thing  
          
          --*--*--
          
          [Repeat for Project 2 and Project 3]
          `;
          
      
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
        console.log('Response Text:', responseText); // Log the full response
    
        const parsedCrafts = responseText.split('--*--*--').map((section, index) => {
            console.log(`Section ${index + 1}:`, section); // Log each section
    
            //Extract parts of the response using regex
            const titleMatch = section.match(/### Project \d+:\s*(.+?)\s*\(/);
            const difficultyMatch = section.match(/\*\*Difficulty\*\*:\s*(.+)/);
            const materialsMatch = section.match(/\*\*Materials\*\*:\s*([\s\S]*?)\n\s*\*\*/);
            const instructionsMatch = section.match(/\*\*Instructions\*\*:\s*([\s\S]*)/);
    
            console.log('Title Match:', titleMatch);
            console.log('Difficulty Match:', difficultyMatch);
            console.log('Materials Match:', materialsMatch);
            console.log('Instructions Match:', instructionsMatch);
    
            try {
                const title = titleMatch?.[1]?.trim() || '';
                const difficulty = difficultyMatch?.[1]?.trim() || '';
                console.log('PrevMaterials', materialsMatch?.[1]);
    
                const materials = materialsMatch?.[1]
                    .split('-')
                    .map(m => m.trim())
                    .filter(Boolean);
                
                console.log('Materials:', materials);

                const instructions = instructionsMatch?.[1]
                    .split('\n')
                    .map(m => m.trim())
                    .filter(Boolean);
                console.log('Formatted Instructions:', instructions);
    
                if (!instructions || instructions.length === 0) {
                    alert(`Blank instructions returned! Full response section:\n${section}`);
                }
    
                return {
                    title,
                    difficulty,
                    materials,
                    instructions
                };
            } catch (error) {
                alert(`An error occurred: ${error.message}`);
                return {
                    title: '',
                    difficulty: '',
                    materials: [],
                    instructions: []
                };
            }
        });
    
        console.log('Parsed Crafts:', parsedCrafts); 
        setCrafts(parsedCrafts); // Update the crafts state with the parsed data
    };
    
      
  
    return (
    <>
      
      <div className='header'>
            <h1 className='logo'><div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', gap: '10px'}}><span><TbRecycle /> </span>Upcycle</div></h1>
            <div className='menubar'>
                <Link to="/"><h2 className='menuBarHome' style={{fontWeight: "bold", fontSize: "1.4rem", marginTop:"-12px", marginLeft: "20px"}}>Home</h2></Link>
                <Link to="/SavedCrafts"><h2 className='menuBarHome' style={{fontWeight: "bold", fontSize: "1.4rem", marginTop:"-12px", marginLeft: "20px"}}>Saved Crafts</h2></Link>
                <Link to="/OurMission"><h2 className='menuBarHome' style={{fontWeight: "bold", fontSize: "1.4rem", marginTop:"-12px", marginLeft: "20px"}}>Our Mission</h2></Link>
                
                <Login></Login>
            </div>
        </div>
        

        <div className='heroSectionContainer'>
            <div className="heroSection">
            <h1 className="giantText uniqueGiantText">
            Sustain <br />your{" "}
            <span style={{ fontFamily: 'Underdog' }}>
                <span style={{ color: "#8B5E3C" }}>c</span>
                <span style={{ color: "#C89F76" }}>r</span>
                <span style={{ color: "#A3A847" }}>a</span> 
                <span style={{ color: "#6B8E23" }}>f</span>
                <span style={{ color: "#5D737E" }}>t</span> 
                </span>

            </h1>

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
        
        <h1 style={{textAlign: "left", fontWeight: "bold", fontSize: "45px", paddingBottom: "40px"}}>What will <span style={{textDecoration: "underline"}}>you</span> <span>create</span>?</h1>
        <div className = 'addButtonContainer'> 
          <button onClick={() => {addNewObjectInput()}}><h3 className='addButton'>Add an item</h3></button>
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
        <br/>
        <div className = 'addButtonContainer'> 
          <button onClick={() => {generateCrafts()}}><h3 className='addButton'>Find crafts <BsHammer /></h3></button>
        </div>
        
        {/* This is where the instructions will be displayed */}
        <div className="craftsContainer">
            {loading ? (
                // <h1 style={{textAlign: "left", paddingTop: "20px", paddingBottom: "100px"}}>Loading crafts...</h1>
                <>
                    <SkeletonDemo />
                    <SkeletonDemo />
                    <SkeletonDemo />
                </>
            ) : (
                crafts.map((craft, index) => {
                    if (!Array.isArray(craft.instructions)) {
                        console.log(`Instructions for craft at index ${index} is not an array:`, craft.instructions);
                    }
                    return (
                        <Instruction 
                            key={index} 
                            title={craft.title} 
                            difficulty={craft.difficulty} 
                            instructions={Array.isArray(craft.instructions) ? craft.instructions.join('\n') : craft.instructions} 
                            materials={craft.materials.join(', ')} 
                        />
                    );
                })
            )}
        </div>
    </>
  )
}

export default Home
