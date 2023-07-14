import React from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate  } from "react-router-dom";

export default function RootButton() {

  const navigate = useNavigate();

  function goSpecialPricePage() {
    navigate("/special")
  }
  
  return (

    <div className="centered-div">
      <Button variant="dark" onClick={goSpecialPricePage}>Special Price</Button>{' '}
    </div>
  );
}
