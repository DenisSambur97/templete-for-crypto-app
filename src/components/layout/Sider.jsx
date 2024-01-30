import {Button, Layout, List, Statistic, Tag, Typography} from "antd";
import React, {useContext} from "react";
import Card from "antd/lib/card/Card";
import {ArrowDownOutlined, ArrowUpOutlined} from '@ant-design/icons';
import {capitalize} from "../../utils";
import {CryptoContext} from "../../context/crypto-context";

const siderStyle = {
    padding: '1rem'
};

export default function Sider() {
    const {assets, removeAsset} = useContext(CryptoContext)

    const handleRemoveAsset = (assetId) => {
        removeAsset(assetId);
    }

    return (
        <Layout.Sider width="25%" style={siderStyle}>
            {assets.map(asset => (
                <Card key={asset.id} style={{marginBottom: '1rem'}}>
                    <Statistic
                        title={capitalize(asset.id)}
                        value={asset.totalAmount}
                        precision={2}
                        valueStyle={{color: asset.grow ? '#3f8600' : '#cf1322'}}
                        prefix={asset.grow ? <ArrowUpOutlined/> : <ArrowDownOutlined/>}
                        suffix="$"
                    />
                    <List
                        size="small"
                        dataSource={[
                            {title: 'Total Profit', value: asset.totalProfit, withTag: true},
                            {title: 'Asset Amount', value: asset.amount, isPlain: true},
                        ]}
                        renderItem={(item) => (
                            <List.Item>
                                <span>{item.title}</span>
                                <span>
                                {item.withTag && <Tag color={asset.grow ? 'green' : 'red'}>{asset.growPercent}%</Tag>}
                                {item.isPlain && item.value}
                                {!item.isPlain &&
                                    <Typography.Text type={asset.grow ? 'success' : 'danger'}>
                                        {item.value.toFixed(2)}$
                                    </Typography.Text>}
                                </span>
                            </List.Item>
                        )}
                    />
                    <Button
                        type="primary"
                        style={{backgroundColor: 'red'}}
                        onClick={() => handleRemoveAsset(asset.id)}
                    >
                        Remove
                    </Button>
                </Card>
            ))}

        </Layout.Sider>
    )
}