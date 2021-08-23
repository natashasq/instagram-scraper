import styled from "styled-components";

const Wrap = styled.div`
  padding: 20px;
  height: 100%;
`;

export function PageWrapper({ children }) {
  return <Wrap>{children}</Wrap>;
}
