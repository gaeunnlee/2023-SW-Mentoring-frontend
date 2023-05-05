import {
  BrowserRouter,
  RouterProvider,
  Route,
  Link,
  Routes,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Nav from "./components/Nav";
import Mission from "./pages/Mission";
import Post from "./pages/Post";
import Team from "./pages/Team";
import Setting from "./pages/Setting";
import TeamDetail from "./pages/TeamDetail";
import MissionDetail from "./pages/MissionDetail";
import MyMission from "./pages/MyMission";
import PostDetail from "./pages/PostDetail";
import { useRecoilValue } from "recoil";
import { LoginStateAtom } from "./state/LoginState";
import LostPw from "./pages/LostPw";

export default function Router() {
  const token = useRecoilValue(LoginStateAtom)
  const isLoggedIn = token.accessToken > 0
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/metoring-frontend/" element={<Home />} />
        <Route path="/metoring-frontend/login" element={<Login />} />
        <Route path="/metoring-frontend/mission" element={<Mission />} />
        <Route path="/metoring-frontend/mission/:missionId" element={<MissionDetail />} />
        <Route path="/metoring-frontend/post" element={<Post />} />
        <Route path={`/metoring-frontend/post/:postId`} element={<PostDetail />} />
        <Route path="/metoring-frontend/team/" element={<Team />} />
        <Route path={`/metoring-frontend/team/:teamId`} element={<TeamDetail />} />
        <Route path="/metoring-frontend/setting" element={<Setting />} />
        <Route path="/metoring-frontend/my-mission" element={<MyMission />} />
        <Route path="/metoring-frontend/lost-pw" element={<LostPw/>} />
      </Routes>``
    </BrowserRouter>
  );
}
