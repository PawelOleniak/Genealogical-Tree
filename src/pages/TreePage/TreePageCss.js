import styled from 'styled-components';

export const TreeWrapper = styled.div`
  font-size: 20px;
  margin: 10px 20px;
  position: relative;
  display: flex;

  height: calc(${({ height }) => height}px + 80vh);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  stroke: rgb(150, 150, 150);
  //overflow-y: hidden;
  svg {
    width: 100%;
    // overflow: hidden;
    background-color: rgba(50, 50, 50, 0.5);
  }
  g {
    width: 1000vw;
    height: 1000vh;
  }
  .scroller {
    transform-origin: center;
    transform: scale(${({ offset }) => offset});
  }

  .partnerLine {
    stroke: red;
  }
  .parentLine {
    stroke-width: 1;
  }

  .menuButtons {
    display: flex;
    flex-direction: row;

    width: 100%;
    justify-content: space-between;
  }
  .dataButtons {
    display: flex;
    flex-direction: row;
  }
`;
