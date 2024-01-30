import {Button, Drawer, Layout, Modal, Select, Space} from "antd";
import React, {useEffect, useState} from "react";
import {useCrypto} from "../../context/crypto-context";
import CoinInfoModal from "../CoinInfoModal";
import AddAssetForm from "../AddAssetForm";

const headerStyle = {
    width: '100%',
    textAlign: 'center',
    height: 60,
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
};

export default function AppHeader() {
    const [select, setSelect] = useState(false);
    const [modal, setModal] = useState(false);
    const [coin, setCoin] = useState(null);
    const [drawer, setDrawer] = useState(false);
    const {crypto} = useCrypto()

    useEffect(() => {
        const keypress = event => {
            if (event.key === '/') {
                setSelect((prevState) => !prevState)
            }
        }
        document.addEventListener('keypress', keypress)
        return () => document.removeEventListener('keypress', keypress)
    }, []);

    function handleSelect(value) {
        setCoin(crypto.find((c) => c.id === value))
        setModal(true)
    }

    return (
        <Layout.Header style={headerStyle}>
            <Select
                style={{
                    width: 250
                }}
                open={select}
                onSelect={handleSelect}
                onClick={() => setSelect((prevState) => !prevState)}
                value="press / to open"
                options={crypto.map(coin => ({
                    label: coin.name,
                    value: coin.id,
                    icon: coin.icon
                }))}
                optionRender={(option) => (
                    <Space>
                        <img
                            style={{width: '20px'}}
                            src={option.data.icon}
                            alt={option.data.label}/>
                        {option.data.label}
                    </Space>
                )}
            />
            <Button
                type={"primary"}
                onClick={() => setDrawer(true)}
            >
                Add asset
            </Button>

            <Modal
                open={modal}
                footer={null}
                onCancel={() => setModal(false)}
            >
                <CoinInfoModal coin={coin}/>
            </Modal>

            <Drawer
                width={600}
                title="Add Asset"
                open={drawer}
                onClose={() => setDrawer(false)}
                destroyOnClose
            >
                <AddAssetForm onClose={() => setDrawer(false)}/>
            </Drawer>
        </Layout.Header>)
}