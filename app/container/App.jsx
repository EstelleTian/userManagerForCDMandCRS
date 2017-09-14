import React from 'react';
import { Link } from 'react-router';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Reducer from '../reducers';
import { Layout, Menu, Breadcrumb, Icon} from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import './app.less';

const Store = createStore(Reducer)

const App = (props) => {
    return(
        <Provider store={Store}>
            <Layout style={{ minHeight: '100vh'}}>
                <Sider collapsed={false} >
                    <div className="logo header_title">
                        用户管理
                    </div>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1">
                            <Link to="/"><Icon type="user" />用户列表</Link>
                        </Menu.Item >
                        {/*<Menu.Item key="3">*/}
                            {/*<Link to="/role"><Icon type="user" />角色列表</Link>*/}
                        {/*</Menu.Item >*/}
                    </Menu>
                </Sider>
                <Layout>
                    <Content className="us_content">
                        {props.children}
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Design ©2017 Created by ADCC
                    </Footer>
                </Layout>
            </Layout>
        </Provider>
    )
}


export default App;