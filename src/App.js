import React, {
    useEffect,
    useState,
    useRef,
} from "react";

import ReconnectingWebSocket from 'shopify-reconnecting-websocket';
import Elevator from'elevator.js';

import {
    History,
    Operate,
} from './components';
import {filterTweet} from './utils';

const App = () => {
    const [content, setContent] = useState([]);
    const [contentType, setContentType] = useState("Mandarin");
    const [canUpdate, setCanUpdate] = useState(false);

    const ws = useRef(null);
    const history = useRef([]);

    const elevator = new Elevator({
        duration: 5000,
    });

    const elevatorToBottom = new Elevator({
        targetElement: document.querySelector('#elevator-bottom'),
        duration: 5000,
    });

    useEffect(() => {
        ws.current = new ReconnectingWebSocket(
            "wss://ws.timeline.minganci.org/",
            null,
            {
                debug: false,
            },
        );
        ws.current.onopen = () => console.log("ws opened");
        ws.current.onclose = () => console.log("ws closed");
        ws.current.onmessage = e => {
            history.current = [...new Set([e.data, ...history.current])];
            const deservedContent = filterTweet(history.current, "Mandarin");
            if (deservedContent.length < 30) {
                setContent(deservedContent);
            } else {
                setCanUpdate(true);
            }
        };

        return () => {
            // ws.close(code=1000, reason)
            ws.current.close(1000, "page refreshed or closed");
        };
    }, [setContent, setCanUpdate]);

    useEffect(() => {
        setContent(filterTweet(history.current, contentType));
        setCanUpdate(false);
    }, [contentType])

    function jumpToTop() {
        setContent(filterTweet(history.current, contentType));
        setCanUpdate(false);
        elevator.elevate();
    }

    function jumpToBottom() {
        elevatorToBottom.elevate();
    }

    return (
        <div className="typo" style={{
            marginTop: "0.1em",
            marginRight: "0.3em",
        }}>
            <History content={content} />
            <Operate
                contentType={contentType}
                setContentType={setContentType}
                wsStatus={ws.current && ws.current.readyState === 1}
                needUpdate={canUpdate}
                jumpToTop={jumpToTop}
                jumpToBottom={jumpToBottom}
            />
            <div id="elevator-bottom" />
        </div>
    );
}

export default App;
