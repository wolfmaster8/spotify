import styled from "styled-components";

export const ButtonContainer = styled.button`
    padding: 1rem;
  &.primary{
    background: ${({theme}) => theme.gradients.main};
  }
  
  &.secondary{
    
  }
`