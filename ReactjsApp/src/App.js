// import logo from './logo.svg';
// import './App.css';

// import { Home } from './Home';
// import { Customer } from './Customer';
// import { Product } from './Product';
// import { Shop } from './Shop';
// import { BrowserRouter, Route, NavLink, Routes } from 'react-router-dom';
// import { FileOutlined, PieChartOutlined, UserOutlined } from '@ant-design/icons';
// import { Breadcrumb, Layout, Menu, theme } from 'antd';
// import { useState } from 'react';
// const { Header, Content, Footer, Sider } = Layout;
// function getItem(label, key, icon, children) {
//   return {
//     key,
//     icon,
//     children,
//     label,
//   };
// }
// const items = [
//   getItem('Option 1', '1', <PieChartOutlined />),
//   getItem('Option 2', '2', <DesktopOutlined />),
//   getItem('User', 'sub1', <UserOutlined />, [
//     getItem('Tom', '3'),
//     getItem('Bill', '4'),
//     getItem('Alex', '5'),
//   ]),
//   getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
//   getItem('Files', '9', <FileOutlined />),
// ];
// const App = () => {
//   const [collapsed, setCollapsed] = useState(false);
//   const {
//     token: { colorBgContainer },
//   } = theme.useToken();
//   return (
//     <Layout
//     style={{
//       minHeight: '100vh',
//     }}
//   >
//     <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
//       <div className="demo-logo-vertical" />
//       <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
//     </Sider>
//     <Layout>
//       <Header
//         style={{
//           padding: 0,
//           background: colorBgContainer,
//         }}
//       />
//       <Content
//         style={{
//           margin: '0 16px',
//         }}
//       >
//         <Breadcrumb
//           style={{
//             margin: '16px 0',
//           }}
//         >
//           <Breadcrumb.Item>User</Breadcrumb.Item>
//           <Breadcrumb.Item>Bill</Breadcrumb.Item>
//         </Breadcrumb>
//         <div
//           style={{
//             padding: 24,
//             minHeight: 360,
//             background: colorBgContainer,
//           }}
//         >
//           Bill is a cat.
//         </div>
//       </Content>
//       <Footer
//         style={{
//           textAlign: 'center',
//         }}
//       >
//         Ant Design ©2023 Created by Ant UED
//       </Footer>
//     </Layout>
//   </Layout>
    // <BrowserRouter>
    //   <div className="App container">
    //     <h3 className="d-flex justify-content-center m-3">
    //       Dao's React App
    //     </h3>

    //     <nav className="navbar navbar-expand-sm bg-light navbar-dark">
    //       <ul className="navbar-nav">
    //         <li className="nav-item m-1">
    //           <NavLink className="btn btn-light btn-outline-primary" to="/home">
    //             Home
    //           </NavLink>
    //         </li>
    //         <li className="nav-item m-1">
    //           <NavLink className="btn btn-light btn-outline-primary" to="/Customer">
    //             Customer
    //           </NavLink>
    //         </li>
    //         <li className="nav-item m-1">
    //           <NavLink className="btn btn-light btn-outline-primary" to="/Shop">
    //             Shop
    //           </NavLink>
    //         </li>
    //         <li className="nav-item m-1">
    //           <NavLink className="btn btn-light btn-outline-primary" to="/Product">
    //             Product
    //           </NavLink>
    //         </li>
    //       </ul>
    //     </nav>

        
    //       <Routes>
    //       <Route path='/home' Component={Home}></Route>
    //       <Route path='/Customer' Component={Customer}></Route>
    //       <Route path='/Shop' Component={Shop}></Route>
    //       <Route path='/Product' Component={Product}></Route>
    //       </Routes>
        
    //   </div>
    // </BrowserRouter>
//   );
// }

// export default App;
import { FileOutlined, HomeOutlined, UserOutlined,DesktopOutlined,TeamOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { useState } from 'react';
import { Home } from './Home';
 import { Customer } from './Customer';
import { Product } from './Product';
import { Shop } from './Shop';
import { BrowserRouter, Route, NavLink, Routes,useNavigate } from 'react-router-dom';
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  {label :'home', key:'/1',icon: <HomeOutlined />},
  {label :'product', key:'/product',icon: <DesktopOutlined />},
  {label :'customer', key:'/customer',icon: <UserOutlined />},
  {label :'shop', key:'/shop',icon: <TeamOutlined />},
 
];
const App = () => {
  //const navigate= useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }} 
    > 
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" 
        items={[
            {label :'home', key:'',icon: <HomeOutlined />},
            {label :'product', key:'/product',icon: <DesktopOutlined />},
          {label :'customer', key:'/customer',icon: <UserOutlined />},
          {label :'shop', key:'/shop',icon: <TeamOutlined />},
]} 
// onClick ={({key})=>{
//   if(key === ""){
//     navigate('/home')
//   } else{
//     navigate(key)
//   }
// }}
>
  </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <BrowserRouter>
      <div className="App container">
        <nav className="navbar navbar-expand-sm bg-light navbar-dark">
          <ul className="navbar-nav">
            <li className="nav-item m-1">
              <NavLink className="btn btn-light btn-outline-primary" to="/home">
                Home
              </NavLink>
            </li>
            <li className="nav-item m-1">
              <NavLink className="btn btn-light btn-outline-primary" to="/Customer">
                Customer
              </NavLink>
            </li>
            <li className="nav-item m-1">
              <NavLink className="btn btn-light btn-outline-primary" to="/Shop">
                Shop
              </NavLink>
            </li>
            <li className="nav-item m-1">
              <NavLink className="btn btn-light btn-outline-primary" to="/Product">
                Product
              </NavLink>
            </li>
          </ul>
        </nav>

        
          <Routes>
          <Route path='/home' Component={Home}></Route>
          <Route path='/Customer' Component={Customer}></Route>
          <Route path='/Shop' Component={Shop}></Route>
          <Route path='/Product' Component={Product}></Route>
          </Routes>
        
      </div>
    </BrowserRouter>
              
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default App;