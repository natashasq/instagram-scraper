import styled from "styled-components";
import { Image } from "./Image";

const ImagesWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  padding-bottom: 20px;
  max-width: 1024px;
  margin: 0 auto;
  margin-bottom: 30px;
`;

export function Images({ imagesCount }) {
  return (
    <ImagesWrapper>
      {[...Array(imagesCount)].map((_, index) => (
        <Image key={index} imageName={index + 1} />
      ))}
    </ImagesWrapper>
  );
}
