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

export default function Router() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mission" element={<Mission />} />
        <Route path="/mission/:missionId" element={<MissionDetail />} />
        <Route path="/post" element={<Post />} />
        <Route path="/team/" element={<Team />} />
        <Route path={`/team/:teamId`} element={<TeamDetail />} />
        <Route path="/setting" element={<Setting />} />
      </Routes>
    </BrowserRouter>
  );
}
