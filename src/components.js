import React from "react";
import { CSSTransitionGroup } from 'react-transition-group';

import checkIfMandarin from './utils';

const Twit = ({ content }) => {
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.5)",
            backgroundColor: "#f0f3fb",
            marginLeft: "0.5rem",
            marginBottom: "0.3rem",
        }}>
            <div style={{
                marginLeft: '0.5em',
                marginTop: '0.2em',
                fontFamily: 'HelveticaNeue',
                fontSize: "1.7em",
                fontWeight: '300',
                fontStyle: 'normal',
                fontStretch: 'normal',
                lineHeight: 'normal',
                letterSpacing: '-0.6px',
            }}>
                {content}
            </div>
        </div>
    );
}

export const History = ({ contentType, canScroll, history }) => {
    let filteredHistory = [];
    switch (contentType) {
        case "All":
            filteredHistory = history;
            break;
        case "Mandarin":
            filteredHistory = history.filter(checkIfMandarin);
            break;
        case "English":
            filteredHistory = history.filter(content => !checkIfMandarin(content));
            break;
        default:
            break;
    }

    return (
        <CSSTransitionGroup
            transitionName="example"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}>
            {
                filteredHistory.map(twit => <Twit content={twit} key={twit} />)
            }
        </CSSTransitionGroup>
    );
}

export const Operate = ({ contentType, changeContentType, wsStatus, bottomAnchor }) => {
    return (
        <div style={{
            position: "fixed",
            height: "10em",
            width: "2em",
            bottom: "5em",
            right: "3em",
        }}>
            <Button onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}>
                ↑
            </Button>
            <Button onClick={() => changeContentType("All")} highlight={contentType === "All"}>
                All
            </Button>
            <Button onClick={() => changeContentType("English")} highlight={contentType === "English"}>
                En
            </Button>
            <Button onClick={() => changeContentType("Mandarin")} highlight={contentType === "Mandarin"}>
                汉
            </Button>
            <Button>
                <span style={{
                    height: "0.7em",
                    width: "0.7em",
                    borderRadius: "50%",
                    display: "inline-block",
                    backgroundColor: wsStatus ? "teal" : "crimson",
                }} />
            </Button>
            <Button onClick={() => bottomAnchor.current.scrollIntoView({ behavior: 'smooth' })}>
                ↓
            </Button>
        </div>
    );
};

const Button = ({ children, highlight, ...rest }) => (
    <button {...rest} style={{
        height: "20%",
        width: "2em",
        ...(
            highlight
                ? { backgroundColor: "mintcream" }
                : {}
        )
    }}>
        {children}
    </button>
);
