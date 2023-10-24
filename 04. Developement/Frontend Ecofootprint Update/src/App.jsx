import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './Home/App'
import Food from './Food/App'
import DistanceTravelled from './Transportation/DistanceTravelled'
import House from './House/House'
import Trash from './Trash/Trash';

import Result from './Result/Result';
import Solution from './Result/Solution';
import Detail from './Result/detail';
import Forum from './Result/Forum';

import User from './User/App';
import Activity from './User/Activity';
import Chart from './User/Chart';
import Setting from './User/Setting';
import Article from './User/Article';
import Diary from './User/Diary';

import Admin from './Admin/App';
import Account from './Admin/Account';
import Category from './Admin/Category';
import AdminActivity from './Admin/Activity';
import AdminArticle from './Admin/Article';
import AdminAnalysis from './Admin/Analysis';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/food" element={<Food />} />
        <Route path="/house" element={<House />} />
        <Route path="/travelled" element={<DistanceTravelled />} />
        <Route path="/trash" element={<Trash />} />
        <Route path="/user" element={<User />} />
        <Route path="/user/activity" element={<Activity />} />
        <Route path="/user/chart" element={<Chart/>}/>
        <Route path="/user/setting" element={<Setting/>}/>
        <Route path="/user/article" element={<Article/>}/>
        <Route path="/user/diary" element={<Diary/>}/>
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/admin/account' element={<Account/>}/>
        <Route path='/admin/category' element={<Category/>}/>
        <Route path='/admin/activity' element={<AdminActivity/>}/>
        <Route path='/admin/article' element={<AdminArticle/>}/>
        <Route path='/admin/analysis' element={<AdminAnalysis/>}/>
        <Route path="/result" element={<Result />} />
        <Route path="/solution" element={<Solution />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/forum" element={<Forum />} />
      </Routes>
    </Router>
  );
}

export default App;