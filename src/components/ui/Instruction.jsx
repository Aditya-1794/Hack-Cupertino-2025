import React, { useState } from 'react'
import "./Instruction.css"

import { supabase } from '/Users/ayaanjha/Hack-Cupertino-2025/src/backend/SupabaseClient.jsx'

function Instruction({ title, difficulty, instructions, materials }) {
  const [showPopup, setShowPopup] = useState(false)

  const handleClick = () => {
    setShowPopup(true)
  }

  const handleClose = () => {
    setShowPopup(false)
  }

  const difficultyColor = {
    Easy: 'green',
    Medium: 'orange',
    Hard: 'red'
  }

  const saveCraft = async (title, difficulty, materials, instructions) => {
    const { data: { session }, error } = await supabase.auth.getSession();
    const user = session?.user;

  
    if (error) {
      console.error('Error fetching user:', error.message);
      return;
    }
  
    if (!user) {
      console.log('User not logged in');
      return;
    }
  
    const { error: insertError } = await supabase
    .from('SavedCrafts')
    .insert([
        {
        id: user.id,
        title: title,
        difficulty: difficulty,
        materials: materials, // already a string
        instructions: instructions, // already a string
        }
    ]);

  
    if (insertError) {
      console.error('Error inserting craft:', insertError.message);
    } else {
      console.log('Craft saved successfully!');
    }
  };

  return (
    <>
      <div className="instruction-header" onClick={handleClick}>
        <span className="instructionTitle">{title}</span>
        <span className="instructionDiff" style={{ color: difficultyColor[difficulty] }}>{difficulty}</span>
      </div>
      {showPopup && (
        <div className='instructionPopup'>
            <div className="popupHeader">
                <button className="closePopupButton" onClick={handleClose}>X</button>
                <h2>{title}</h2>
                <h3 style={{ color: difficultyColor[difficulty] }}>{difficulty}</h3>
            </div>

            

            <div className='popupBody'>
                <h3 className='popupHeading'>Materials</h3>
                <h5 className="materials">
                    {materials.split(", ").map((mat, i) => (
                        <span key={i}>{i+1}. {mat}<br /></span>
                    ))}
                </h5>

                <h3 className='popupHeading'>Instructions</h3>
                <h5 className='instructions'>
                    {instructions.split(/\d+\.\s/).map((step, index) => (
                        step.trim() && (
                        <div key={index} className="instruction-step">
                            {index}. {step.trim()}
                        </div>
                        )
                    ))}
                    </h5>

            </div>

            <br />
            <br />
            <br />
            <br />

            <div className='saveButtonContainer'>
                <button className='saveButton' onClick={() => saveCraft(title, difficulty, materials, instructions)}>Save Craft</button>
            </div>
        </div>
      )}

    </>
  )
}

export default Instruction
