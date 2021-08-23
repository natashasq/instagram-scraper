//components
import { Images } from "components/Images";
import { PageWrapper, Profile } from "./components";

//data
import {
  profileName,
  profileInfo,
  imagesCount
} from "./data/instaScrapeResult";

function App() {
  return (
    <PageWrapper>
      <Profile profileName={profileName} profileInfo={profileInfo} />
      <Images imagesCount={imagesCount} />
    </PageWrapper>
  );
}

export default App;
