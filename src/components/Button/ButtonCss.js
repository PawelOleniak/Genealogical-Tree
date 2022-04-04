import styled from 'styled-components';

export const RootButton = styled.button`
  cursor: pointer;
  border: none;
  background-color: gray;
  &:hover {
    opacity: 0.8;
  }
`;
export const InlineButton = styled(RootButton)`
  &:hover {
    text-decoration: underline;
  }
`;
export const IconButton = styled(RootButton)`
  background: transparent;
`;
export const RegularButton = styled(RootButton)`
  background: darkgray;
  margin: 10px;
  padding: 5px;
  border: 1px solid ivory;
  border-radius: 4px;
  box-shadow: 1px 1px 5px 1px darkgray;
`;
