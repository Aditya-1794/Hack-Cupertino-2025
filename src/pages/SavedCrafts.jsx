import React, { useState, useEffect } from 'react'
import "./SavedCrafts.css"

import { TbRecycle } from "react-icons/tb"
import { Link } from 'react-router-dom'

import Instruction from "../components/ui/Instruction"
import Login from '../components/ui/Login'
import { supabase } from '../backend/SupabaseClient'

function SavedCrafts() {
  const [savedCrafts, setSavedCrafts] = useState([])

  useEffect(() => {
    const fetchSavedCrafts = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      const user = session?.user

      if (!user) {
        console.log("Not logged in")
        return
      }

      const { data, error } = await supabase
        .from('SavedCrafts')
        .select('*')
        .eq('id', user.id)

        console.log(user.id);
        console.log(data);

      if (error) {
        console.error("Error fetching saved crafts:", error.message)
      } else {
        setSavedCrafts(data)
      }
    }

    fetchSavedCrafts()
  }, [])

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

      <div className="savedCraftsContainer">
        <h1 style={{fontWeight: "bold", fontSize: "2rem", textAlign: "left", marginTop: "40px"}}>Saved Crafts</h1>
        {savedCrafts.length > 0 ? (
          savedCrafts.map((craft, index) => (
            <Instruction
              key={index}
              title={craft.title}
              difficulty={craft.difficulty}
              materials={craft.materials}
              instructions={craft.instructions}
            />
          ))
        ) : (
          <p style={{ textAlign: 'center', marginTop: '2rem' }}>No saved crafts yet.</p>
        )}
      </div>
    </>
  )
}

export default SavedCrafts
