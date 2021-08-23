import styled from "styled-components";
import profilePhoto from "assets/images/profilePhoto.png";

const ProfileWrap = styled.div`
  display: flex;
  height: 300px;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const ProfilePhoto = styled.img`
  border-radius: 50%;
  width: 150px;
  height: 150px;
  object-fit: cover;
`;

const ProfileInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 25px;
`;

const ProfileName = styled.h2`
  color: white;
`;

const ProfileInfoInner = styled.div`
  display: flex;
`;

const ProfileInfo = styled.h4`
  color: #e6e6e6;
  margin-right: 15px;
`;


export function Profile({ profileName, profileInfo }) {
  return (
    <ProfileWrap>
      <a href={`${process.env.REACT_APP_INSTAGRAM_URL}/${profileName}`}>
        <ProfilePhoto src={profilePhoto} />
      </a>
      <ProfileInfoWrap>
        <ProfileName>{profileName}</ProfileName>
        <ProfileInfoInner>
          {profileInfo.map(info => (
            <>
            <ProfileInfo key={info}>{info}</ProfileInfo>
            </>
          ))}
        </ProfileInfoInner>
      </ProfileInfoWrap>
    </ProfileWrap>
  );
}
