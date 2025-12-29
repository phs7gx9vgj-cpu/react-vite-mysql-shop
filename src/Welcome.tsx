import React from "react"; 
 
interface WelcomeProps { 
  name: string; 
  age: number; 
} 
 
const Welcome: React.FC<WelcomeProps> = ({ name, age }) => { 
  return ( 
    <div> 
      <h2>Xin chào, {name}!</h2> 
      <p>Tuổi của bạn: {age}</p> 
    </div> 
  ); 
}; 
 
export default Welcome; 