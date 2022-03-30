import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}    
body {
    background: #1b1b1b;
    color: white;
    font-family: 'Inter', sans-serif;
}

html {
    &::-webkit-scrollbar {
        width: 0.5rem;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #23d997;
    }
    &::-webkit-scrollbar-track {
    background: white;
  }

button {
    font-weight: bold;
    font-size: 1.1rem;
    cursor: pointer;
    padding: 1rem 2rem;
    border: 3px solid #23d997;
    background: transparent;
    color: white;
    transition: all 0.5s ease;
    &:hover {
        background-color: #23d997;
        color: white;
    }
}
h2 {
    font-weight: lighter;
    font-size: 4rem;
}
h3 {
    color: white;
}
h4 {
    font-weight: bold;
}
span {
    font-weight: bold;
    color: #23d997; 
}
p{
    padding: 3rem 0rem;
    color: #ccc;
    font-size: 1.3rem;
    line-height: 1.9;
}
a {
  text-decoration: none;
  color: inherit;
  font-size: 1.3rem;
}

ul {
  list-style: none;
}
`

export default GlobalStyle