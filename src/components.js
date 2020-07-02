import React from "react";

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

export const History = ({ content }) => (
    <>
    {
        content.map(twit => <Twit content={twit} key={twit} />)
    }
    </>
);

export const Operate = ({
    contentType, setContentType,
    wsStatus,
    needUpdate,
    jumpToTop, jumpToBottom,
}) => {
    return (
        <div style={{
            position: "fixed",
            height: "10em",
            width: "2em",
            bottom: "5em",
            right: "3em",
        }}>
            <Button onClick={jumpToTop} highlight={needUpdate}>
                ↑
            </Button>
            <Button onClick={() => setContentType("All")} highlight={contentType === "All"}>
                All
            </Button>
            <Button onClick={() => setContentType("English")} highlight={contentType === "English"}>
                En
            </Button>
            <Button onClick={() => setContentType("Mandarin")} highlight={contentType === "Mandarin"}>
                汉
            </Button>
            <Button>
                <span style={{
                    height: "0.7em",
                    width: "0.7em",
                    borderRadius: "50%",
                    display: "inline-block",
                    backgroundColor: wsStatus ? "#6abe83" : "#f1ac9d",
                }} />
            </Button>
            <Button onClick={jumpToBottom}>
                ↓
            </Button>
        </div>
    );
};

const Button = ({ children, highlight, ...rest }) => (
    <button {...rest} style={{
        height: "20%",
        width: "2em",
        WebkitAppearance: "none",
        backgroundColor: highlight ? "#6abe83" : "#dee2d1",
    }}>
        {children}
    </button>
);
