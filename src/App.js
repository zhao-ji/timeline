import React, {
    useEffect,
    useState,
    useRef,
} from "react";

import ReconnectingWebSocket from 'shopify-reconnecting-websocket';

import {
    History,
    Operate,
} from './components';

const App = () => {
    const [history, updateHistory] = useState([]);
    const [contentType, changeContentType] = useState("Mandarin");

    const ws = useRef(null);

    useEffect(() => {
        ws.current = new ReconnectingWebSocket(
            "ws://sn.chashuibiao.org/",
            null,
            {
                debug: true,
            },
        );
        ws.current.onopen = () => console.log("ws opened");
        ws.current.onclose = () => console.log("ws closed");

        return () => {
            ws.current.close();
        };
    }, []);

    useEffect(() => {
        if (!ws.current) return;

        ws.current.onmessage = e => {
            updateHistory([...new Set([e.data, ...history])]);
        };
    });

    return (
        <div className="typo" style={{
            marginTop: "0.1em",
            marginRight: "0.3em",
        }}>
            <History contentType={contentType} canScroll={true} history={history} />
            <Operate contentType={contentType} changeContentType={changeContentType} wsStatus={true} />
        </div>
    );
}

export default App;
