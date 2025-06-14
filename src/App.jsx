import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Feed from "./components/Feed";
import UserProfile from "./components/UserProfile";
import PhotoPage from "./components/PhotoPage";
import WatchPage from "./components/WatchPage";
import VideoPost from "./components/VideoPost";
import VideoFeed from "./components/VideoFeed";
import ReelsFeed from "./components/ReelsFeed";
import Reel from "./components/Reel";

function App() {
  return (
    <div className="app">
      <Header />
      <div className="app-body">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route
            path="/profile/:userId"
            element={
              <UserProfile user={{ name: "John Doe", profilePic: "profile.jpg" }} />
            }
          />
          <Route path="/photos" element={<PhotoPage />} />
          <Route path="/watch" element={<WatchPage />} />
          <Route path="/reels" element={<Reel />} />
          <Route path="/reelsfeed" element={<ReelsFeed />} />
          {/* Additional routes (for video posts, etc.) can be added here */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
