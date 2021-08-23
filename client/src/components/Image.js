import { useState, useEffect } from "react";
import styled from "styled-components";

const StyledImage = styled.img`
  width: 100%;
`;

const loadImage = async imageName => {
  const image = await import(`assets/images/${imageName}.png`);

  return image.default;
};

export function Image({ imageName }) {
  const [image, setImage] = useState("");

  useEffect(() => {
    (async () => {
      const imageSrc = await loadImage(imageName);
      setImage(imageSrc);
    })();
  }, [imageName]);

  return <StyledImage alt={image} src={image} />;
}
