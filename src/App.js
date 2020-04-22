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
    const bottomAnchor = useRef(null);

    useEffect(() => {
        ws.current = new ReconnectingWebSocket(
            "ws://sn.chashuibiao.org/",
            null,
            {
                debug: false,
            },
        );
        ws.current.onopen = () => console.log("ws opened");
        ws.current.onclose = () => console.log("ws closed");
        ws.current.onmessage = e => {
            updateHistory(prevHistory => [...new Set([e.data, ...prevHistory])]);
        };

        return () => {
            ws.current.close();
        };
    }, []);

    return (
        <div className="typo" style={{
            marginTop: "0.1em",
            marginRight: "0.3em",
        }}>
            <History contentType={contentType} canScroll={true} history={history} />
            <Operate
                contentType={contentType}
                changeContentType={changeContentType}
                wsStatus={ws.current && ws.current.readyState === 1}
                bottomAnchor={bottomAnchor}
            />
            <div ref={bottomAnchor} />
        </div>
    );
}

export default App;
