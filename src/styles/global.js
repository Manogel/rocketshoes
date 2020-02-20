import { createGlobalStyle } from 'styled-components';
import background from '../assets/background.svg';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,400i,500,700,700i,900&display=swap');

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    background: #191920 url(${background}) no-repeat center top;
    -webkit-font-smoothing: antialiased !important
  }
  body, input, button {
    border: 0;
    color: #222;
    font-size: 14px;
    font-family: 'Roboto', sans-serif;
  }

  #root {
    max-width: 1020px;
    margin: 0 auto;
    padding: 0 20px 50px;
  }

  button {
    cursor: pointer;
  }
  li {
    list-style: none;
  }
  a {
    text-decoration: none;
  }
`;
