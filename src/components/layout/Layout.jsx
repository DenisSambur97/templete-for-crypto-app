import AppHeader from "./AppHeader";
import Sider from "./Sider";
import Content from "./Content";
import React, {useContext} from "react";
import {CryptoContext} from "../../context/crypto-context";
import {Spin, Layout} from "antd";

export default function LayoutApp(){
    const {loading} = useContext(CryptoContext);

    if (loading) {
        return <Spin fullscreen/>
    }

    return (
        <Layout>
            <AppHeader/>
            <Layout>
                <Sider/>
                <Content/>
            </Layout>
        </Layout>
    )
}