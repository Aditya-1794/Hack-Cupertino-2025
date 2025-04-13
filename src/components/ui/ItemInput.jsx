// src/components/ui/ItemInput.jsx
import React, { useState } from 'react';
import './ItemInput.css';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const ItemInput = ({ itemName, extraInfo, onItemNameChange, onExtraInfoChange }) => {
    return (
      <div className='inputContainer'>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="item">New item</Label>
          <Input
            type="text"
            id="item"
            placeholder="Item name"
            value={itemName}
            onChange={onItemNameChange}
          />
        </div>
  
        <div className="grid w-full gap-1.5">
          {/* <Label htmlFor="addInfo">Extra info</Label> */}
          <Textarea
            placeholder="Enter any additional info about your item"
            id="addInfo"
            value={extraInfo}
            onChange={onExtraInfoChange}
          />
        </div>
      </div>
    );
  };
  

export default ItemInput;