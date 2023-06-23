import { useState } from 'react';
import myStyledButton from './myStyledButton';

const Button = myStyledButton`
  background: ${props => props.secondary ? "#BF4F74" : "white"};
  color: ${props => props.secondary ? "white" : "#BF4F74"};
  padding: 0.25em 1em;
  border: 2px solid #BF4F74;
`;

function App() {
  const [isSecondary, setIsSecondary] = useState(false);

  return <Button secondary={isSecondary} onClick={() => setIsSecondary(!isSecondary)}>Botão</Button>
}

export default App